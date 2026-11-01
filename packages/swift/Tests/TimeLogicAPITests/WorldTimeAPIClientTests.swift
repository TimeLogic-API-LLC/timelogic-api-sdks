import XCTest
#if canImport(FoundationNetworking)
import FoundationNetworking
#endif
@testable import TimeLogicAPI

final class WorldTimeAPIMockURLProtocol: URLProtocol {
    static var routes: [String: (Int, String)] = [:]
    static var requests: [URLRequest] = []

    override class func canInit(with request: URLRequest) -> Bool { true }
    override class func canonicalRequest(for request: URLRequest) -> URLRequest { request }

    override func startLoading() {
        WorldTimeAPIMockURLProtocol.requests.append(request)
        let path = request.url?.path ?? ""
        let (status, body) = WorldTimeAPIMockURLProtocol.routes[path] ?? (404, "{\"error\":\"not found\"}")
        let response = HTTPURLResponse(url: request.url!, statusCode: status, httpVersion: "HTTP/1.1",
                                       headerFields: ["X-TimeLogic-Signature": "sig"])!
        client?.urlProtocol(self, didReceive: response, cacheStoragePolicy: .notAllowed)
        client?.urlProtocol(self, didLoad: Data(body.utf8))
        client?.urlProtocolDidFinishLoading(self)
    }

    override func stopLoading() {}
}

final class WorldTimeAPIClientTests: XCTestCase {
    static let london = "{\"utc_offset\":\"+00:00\",\"timezone\":\"Europe/London\",\"day_of_week\":0,\"day_of_year\":305,\"datetime\":\"2026-11-01T03:34:38.413000+00:00\",\"utc_datetime\":\"2026-11-01T03:34:38.413000+00:00\",\"unixtime\":1793504078,\"raw_offset\":0,\"week_number\":44,\"dst\":false,\"abbreviation\":\"GMT\",\"dst_offset\":0,\"dst_from\":null,\"dst_until\":null,\"client_ip\":\"203.0.113.7\"}"

    private func client(_ routes: [String: (Int, String)], sign: Bool = false) -> WorldTimeAPIClient {
        WorldTimeAPIMockURLProtocol.routes = routes
        WorldTimeAPIMockURLProtocol.requests = []
        let configuration = URLSessionConfiguration.ephemeral
        configuration.protocolClasses = [WorldTimeAPIMockURLProtocol.self]
        return WorldTimeAPIClient(apiKey: "test-key", baseURL: "https://example.test/", sign: sign,
                                  session: URLSession(configuration: configuration))
    }

    private func wait<T>(_ call: (@escaping (Result<T, WorldTimeAPIError>) -> Void) -> Void) -> Result<T, WorldTimeAPIError> {
        let done = expectation(description: "response")
        var outcome: Result<T, WorldTimeAPIError>?
        call { result in
            outcome = result
            done.fulfill()
        }
        wait(for: [done], timeout: 10)
        return outcome!
    }

    func testGetTimezoneReturnsTheFifteenFields() throws {
        let api = client(["/api/timezone/Europe/London": (200, Self.london)])
        let value = try wait { api.getTimezone("Europe/London", completion: $0) }.get()
        XCTAssertEqual(value.timezone, "Europe/London")
        XCTAssertEqual(value.unixtime, 1793504078)
        XCTAssertNil(value.dstFrom)
        XCTAssertEqual(WorldTimeAPIDateTime.CodingKeys.allCases.count, 15)
        XCTAssertEqual(WorldTimeAPIMockURLProtocol.requests.first?.value(forHTTPHeaderField: "X-API-Key"), "test-key")
        let encoded = try JSONSerialization.jsonObject(with: JSONEncoder().encode(value)) as? [String: Any]
        let original = try JSONSerialization.jsonObject(with: Data(Self.london.utf8)) as? [String: Any]
        XCTAssertEqual(Set(encoded?.keys.map { $0 } ?? []), Set(original?.keys.map { $0 } ?? []))
    }

    func testUsesTheWorldTimeAPIPaths() throws {
        let api = client([
            "/api/timezone": (200, "[\"Europe/London\",\"UTC\"]"),
            "/api/timezone.txt": (200, "Europe/London\nUTC"),
            "/api/timezone/Europe": (200, "[\"Europe/London\"]"),
            "/api/timezone/Europe.txt": (200, "Europe/London"),
            "/api/timezone/America/Argentina/Salta": (200, Self.london),
            "/api/timezone/Europe/London.txt": (200, "abbreviation: GMT"),
            "/api/ip": (200, Self.london),
            "/api/ip/8.8.8.8": (200, Self.london),
            "/api/ip.txt": (200, "abbreviation: GMT"),
            "/api/ip/8.8.8.8.txt": (200, "abbreviation: GMT"),
        ])
        XCTAssertEqual(try wait { api.listTimezones(completion: $0) }.get(), ["Europe/London", "UTC"])
        XCTAssertEqual(try wait { api.listTimezonesText(completion: $0) }.get(), "Europe/London\nUTC")
        XCTAssertEqual(try wait { api.listTimezonesInArea("Europe", completion: $0) }.get(), ["Europe/London"])
        XCTAssertEqual(try wait { api.listTimezonesInAreaText("Europe", completion: $0) }.get(), "Europe/London")
        XCTAssertEqual(try wait { api.getTimezone("America/Argentina/Salta", completion: $0) }.get().timezone, "Europe/London")
        XCTAssertEqual(try wait { api.getTimezoneText("Europe/London", completion: $0) }.get(), "abbreviation: GMT")
        XCTAssertEqual(try wait { api.getIp(completion: $0) }.get().timezone, "Europe/London")
        XCTAssertEqual(try wait { api.getIp("8.8.8.8", completion: $0) }.get().timezone, "Europe/London")
        XCTAssertEqual(try wait { api.getIpText(completion: $0) }.get(), "abbreviation: GMT")
        XCTAssertEqual(try wait { api.getIpText("8.8.8.8", completion: $0) }.get(), "abbreviation: GMT")
        XCTAssertEqual(WorldTimeAPIMockURLProtocol.requests.count, 10)
    }

    func testUnknownLocationIsItsOwnCase() {
        let api = client([
            "/api/timezone/Nowhere/Land": (404, "{\"error\":\"unknown location\"}"),
            "/api/timezone/Nowhere/Land.txt": (404, "Error: unknown location"),
            "/api/ip/999.1.1.1": (404, "{\"error\":\"malformed ip\"}"),
        ])
        let json = wait { api.getTimezone("Nowhere/Land", completion: $0) }
        XCTAssertEqual(json.failureValue, .unknownLocation(status: 404))
        XCTAssertTrue(json.failureValue?.isUnknownLocation ?? false)
        XCTAssertTrue(wait { api.getTimezoneText("Nowhere/Land", completion: $0) }.failureValue?.isUnknownLocation ?? false)
        XCTAssertTrue(wait { api.getIp("999.1.1.1", completion: $0) }.failureValue?.isMalformedIp ?? false)
    }

    func testAuthErrorsKeepTheTimeLogicCode() {
        let api = client(["/api/timezone/UTC": (401, "{\"error\":{\"code\":\"UNAUTHORIZED\",\"message\":\"Missing API key credentials.\"}}")])
        guard case let .api(status, _, code, _)? = wait({ api.getTimezone("UTC", completion: $0) }).failureValue else {
            return XCTFail("expected an API error")
        }
        XCTAssertEqual(status, 401)
        XCTAssertEqual(code, "UNAUTHORIZED")
    }

    func testSignAddsTheQueryAndRawExposesHeaders() throws {
        let api = client(["/api/timezone/Europe/London": (200, Self.london)], sign: true)
        let raw = try wait { api.requestRaw("/api/timezone/Europe/London", completion: $0) }.get()
        XCTAssertEqual(WorldTimeAPIMockURLProtocol.requests.first?.url?.query, "sign=true")
        XCTAssertEqual(raw.headers["x-timelogic-signature"], "sig")
    }

    func testLiveSmoke() throws {
        guard let key = ProcessInfo.processInfo.environment["TIMELOGIC_API_KEY"], !key.isEmpty else {
            throw XCTSkip("TIMELOGIC_API_KEY is not set")
        }
        let api = WorldTimeAPIClient(apiKey: key)
        XCTAssertEqual(try wait { api.getTimezone("Europe/London", completion: $0) }.get().timezone, "Europe/London")
        XCTAssertTrue(wait { api.getTimezone("Nowhere/Land", completion: $0) }.failureValue?.isUnknownLocation ?? false)
    }
}

private extension Result {
    var failureValue: Failure? {
        if case let .failure(error) = self { return error }
        return nil
    }
}
