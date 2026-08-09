import XCTest
@testable import TimeLogicAPI

final class TransportConfigurationTests: XCTestCase {
    override func tearDown() {
        TimeLogicAPIClient.basePath = TransportConfiguration.defaultApiBaseURL
        TimeLogicAPIClient.customHeaders.removeAll()
        super.tearDown()
    }

    func testConfigurationUsesBearerHeader() {
        let baseURL = TransportConfiguration.configure(apiKey: "test-key")

        XCTAssertEqual(baseURL, TransportConfiguration.defaultApiBaseURL)
        XCTAssertEqual(TimeLogicAPIClient.basePath, TransportConfiguration.defaultApiBaseURL)
        XCTAssertEqual(TimeLogicAPIClient.customHeaders["Authorization"], "Bearer test-key")
    }

    func testRapidApiConfigurationUsesRapidApiHeaders() {
        let baseURL = TransportConfiguration.configure(apiKey: "rapid-key", rapidApi: true)

        XCTAssertEqual(baseURL, TransportConfiguration.defaultRapidApiBaseURL)
        XCTAssertEqual(TimeLogicAPIClient.customHeaders["X-RapidAPI-Key"], "rapid-key")
        XCTAssertEqual(TimeLogicAPIClient.customHeaders["X-RapidAPI-Host"], TransportConfiguration.defaultRapidApiHost)
        XCTAssertNil(TimeLogicAPIClient.customHeaders["Authorization"])
    }
}
