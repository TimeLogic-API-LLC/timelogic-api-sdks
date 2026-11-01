import XCTest
#if canImport(FoundationNetworking)
import FoundationNetworking
#endif
@testable import TimeLogicAPI

/// Typed /v1 response decoding. The offline tests decode recorded API
/// responses with the SDK's decoder. The live tests are skipped unless
/// TIMELOGIC_SDK_TEST_API_KEY (or TIMELOGIC_API_KEY) is set.
final class V1ResponsesTests: XCTestCase {
    static let single = #"{"unix":1772366400,"unix_ms":1772366400000,"utc":"2026-03-01T12:00:00Z","iso_local":"2026-03-01T21:00:00+09:00","rfc2822":"Sun, 01 Mar 2026 21:00:00 +0900","human":"March 1, 2026, 9:00 PM Asia/Tokyo","day_number":1,"day_short":"Sun","day_full":"Sunday","timezone":"Asia/Tokyo"}"#
    static let bulk = #"[{"unix":1772366400,"unix_ms":1772366400000,"utc":"2026-03-01T12:00:00Z","iso_local":"2026-03-01T21:00:00+09:00","rfc2822":"Sun, 01 Mar 2026 21:00:00 +0900","human":"March 1, 2026, 9:00 PM Asia/Tokyo","day_number":1,"day_short":"Sun","day_full":"Sunday","timezone":"Asia/Tokyo"},{"item":"Bad/Zone","error":{"code":"INVALID_PARAMETER","message":"Invalid timezone.","details":{"tz":"Bad/Zone"}},"request_id":"a6116a2e-8809-46e9-99c5-765cf0d50fcb"}]"#
    static let timezone = #"{"unix":1772366400,"unix_ms":1772366400000,"utc":"2026-03-01T12:00:00Z","iso_local":"2026-03-01T21:00:00+09:00","rfc2822":"Sun, 01 Mar 2026 21:00:00 +0900","human":"March 1, 2026, 9:00 PM Asia/Tokyo","day_number":1,"day_short":"Sun","day_full":"Sunday","timezone":"Asia/Tokyo","offset":540,"dst":false}"#
    static let offset = #"{"unix":1772366400,"unix_ms":1772366400000,"utc":"2026-03-01T12:00:00Z","iso_local":"2026-03-01T17:30:00+05:30","rfc2822":"Sun, 01 Mar 2026 21:00:00 +0900","human":"March 1, 2026, 5:30 PM UTC+05:30","day_number":1,"day_short":"Sun","day_full":"Sunday","timezone":null,"offset":330,"dst":false,"matching_zones":[{"timezone":"Asia/Colombo","offset":330,"dst":false},{"timezone":"Asia/Kolkata","offset":330,"dst":false}]}"#
    static let error = #"{"error":{"code":"INVALID_PARAMETER","message":"Invalid timezone.","details":{"tz":"Bad/Zone"}},"request_id":"a6116a2e-8809-46e9-99c5-765cf0d50fcb"}"#

    private func decode<T: Decodable>(_ type: T.Type, _ json: String) throws -> T {
        try CodableHelper.decode(type, from: Data(json.utf8)).get()
    }

    func testSingleResultIsTimePayload() throws {
        guard case .typeTimePayload(let payload) = try decode(GetCurrentTime200Response.self, Self.single) else {
            return XCTFail("expected a TimePayload")
        }
        XCTAssertEqual(payload.unixMs, 1_772_366_400_000)
        XCTAssertEqual(payload.isoLocal, "2026-03-01T21:00:00+09:00")
    }

    func testBulkItemsAreTimePayloadOrBulkError() throws {
        guard case .typeTimePayloadBulkResponse(let items) = try decode(GetCurrentTime200Response.self, Self.bulk) else {
            return XCTFail("expected a bulk array")
        }
        XCTAssertEqual(items.count, 2)
        guard case .typeTimePayload(let first) = items[0], case .typeBulkError(let second) = items[1] else {
            return XCTFail("expected a TimePayload then a BulkError")
        }
        XCTAssertEqual(first.timezone, "Asia/Tokyo")
        XCTAssertEqual(second.item, "Bad/Zone")
        XCTAssertEqual(second.error.code, .invalidParameter)
        XCTAssertEqual(second.requestId, "a6116a2e-8809-46e9-99c5-765cf0d50fcb")
    }

    func testTimezoneLookupsDecode() throws {
        let zone = try decode(TimezoneResponse.self, Self.timezone)
        XCTAssertEqual(zone.timezone, "Asia/Tokyo")
        XCTAssertEqual(zone.offset, 540)
        XCTAssertNil(zone.matchingZones)
        let lookup = try decode(TimezoneResponse.self, Self.offset)
        XCTAssertNil(lookup.timezone)
        XCTAssertEqual(lookup.matchingZones?.map(\.timezone), ["Asia/Colombo", "Asia/Kolkata"])
        XCTAssertEqual(lookup.matchingZones?[1].offset, 330)
        XCTAssertEqual(lookup.matchingZones?[1].dst, false)
    }

    func testErrorBodyDecodes() throws {
        let body = try decode(ModelErrorResponse.self, Self.error)
        XCTAssertEqual(body.error.code, .invalidParameter)
        XCTAssertEqual(body.requestId, "a6116a2e-8809-46e9-99c5-765cf0d50fcb")
    }

    // MARK: - Live API

    private func liveKey() throws -> String {
        let environment = ProcessInfo.processInfo.environment
        let key = [environment["TIMELOGIC_SDK_TEST_API_KEY"], environment["TIMELOGIC_API_KEY"]].compactMap { $0 }.first { !$0.isEmpty }
        guard let key = key else { throw XCTSkip("set TIMELOGIC_SDK_TEST_API_KEY to run live calls") }
        return key
    }

    private func run<T>(_ builder: RequestBuilder<T>) -> Swift.Result<T, ErrorResponse> {
        let done = DispatchSemaphore(value: 0)
        var outcome: Swift.Result<T, ErrorResponse>!
        builder.execute(DispatchQueue.global()) { result in
            outcome = result.map { $0.body }
            done.signal()
        }
        done.wait()
        return outcome
    }

    override func tearDown() {
        TimeLogicAPIClient.basePath = TransportConfiguration.defaultApiBaseURL
        TimeLogicAPIClient.customHeaders.removeAll()
        super.tearDown()
    }

    func testLiveEveryOperationDecodes() throws {
        _ = TransportConfiguration.configure(apiKey: try liveKey(), baseURL: ProcessInfo.processInfo.environment["TIMELOGIC_SDK_TEST_BASE_URL"])
        guard case .typeTimePayload(let one) = try run(TimeAPI.getCurrentTimeWithRequestBuilder(tz: "America/New_York")).get() else {
            return XCTFail("expected a TimePayload")
        }
        XCTAssertEqual(one.timezone, "America/New_York")
        guard case .typeTimePayloadBulkResponse(let many) = try run(TimeAPI.getCurrentTimeWithRequestBuilder(tz: "America/New_York,Europe/London,Bad/Zone")).get(),
              case .typeTimePayload(let london) = many[1], case .typeBulkError(let bad) = many[2] else {
            return XCTFail("expected a bulk array with a per-item error")
        }
        XCTAssertEqual(london.timezone, "Europe/London")
        XCTAssertEqual(bad.item, "Bad/Zone")
        guard case .typeTimePayloadBulkResponse(let converted) = try run(TimeAPI.convertTimeWithRequestBuilder(unix: 1_772_366_400, offset: "+01:00,+02:00")).get(),
              case .typeTimePayload(let plusTwo) = converted[1] else {
            return XCTFail("expected a bulk offset conversion")
        }
        XCTAssertEqual(plusTwo.isoLocal, "2026-03-01T14:00:00+02:00")
        XCTAssertNil(try run(TimeAPI.getTimezoneWithRequestBuilder(tz: "Europe/London")).get().matchingZones)
        XCTAssertEqual(try run(TimeAPI.getTimezoneWithRequestBuilder(offset: "+05:30")).get().matchingZones?.first?.offset, 330)
        let diff = try run(TimeAPI.diffTimeWithRequestBuilder(from: "iso=2026-01-01T00:00:00Z", to: "iso=2026-03-01T12:00:00Z")).get()
        XCTAssertEqual(diff.days, 59)
        XCTAssertEqual(diff.from.unixMs, 1_767_225_600_000)
        XCTAssertEqual(try run(TimeAPI.addTimeWithRequestBuilder(unix: 0, seconds: 60, utc: true)).get().unix, 60)
        XCTAssertGreaterThan(try run(TimeAPI.getCalendarWithRequestBuilder(tz: "America/New_York", week: true)).get().weekNumber ?? 0, 0)
        XCTAssertNotNil(try run(TimeAPI.getDstWithRequestBuilder(tz: "America/New_York", next: true)).get().nextTransition)
        XCTAssertEqual(try run(TimeAPI.getElapsedWithRequestBuilder(iso: "2026-01-01T00:00:00Z", compareIso: "2026-02-01T00:00:00Z")).get().days, 31)
        XCTAssertTrue(try run(TimeAPI.getClockWithRequestBuilder(style: .digitalBroadcast, tz: "UTC")).get().contains("timelogic-clock"))
        XCTAssertEqual(try run(UtilityAPI.getPublicSigningKeyWithRequestBuilder()).get().keys.first?.kty, .okp)
    }

    func testLiveApiErrorKeepsCodeAndRequestId() throws {
        _ = TransportConfiguration.configure(apiKey: try liveKey(), baseURL: ProcessInfo.processInfo.environment["TIMELOGIC_SDK_TEST_BASE_URL"])
        let failures: [Swift.Result<Void, ErrorResponse>] = [
            run(TimeAPI.getCurrentTimeWithRequestBuilder(tz: "Bad/Zone")).map { _ in () },
            run(TimeAPI.convertTimeWithRequestBuilder(unix: 0, tz: "Bad/Zone")).map { _ in () },
            run(TimeAPI.getTimezoneWithRequestBuilder(tz: "Bad/Zone")).map { _ in () },
        ]
        for failure in failures {
            guard case .failure(.error(let status, let data, _, _)) = failure, let data = data else {
                return XCTFail("expected an HTTP error with a body")
            }
            XCTAssertEqual(status, 400)
            let body = try CodableHelper.decode(ModelErrorResponse.self, from: data).get()
            XCTAssertEqual(body.error.code, .invalidParameter)
            XCTAssertFalse(body.requestId.isEmpty)
        }
    }
}
