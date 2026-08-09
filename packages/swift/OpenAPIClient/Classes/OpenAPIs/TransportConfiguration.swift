import Foundation

public enum TransportConfiguration {
    public static let defaultApiBaseURL = "https://api.timelogicapi.com"
    public static let defaultRapidApiHost = "timelogic-api-world-time-timezones-time-calculations.p.rapidapi.com"
    public static let defaultRapidApiBaseURL = "https://\(defaultRapidApiHost)"

    @discardableResult
    public static func configure(apiKey: String, rapidApi: Bool = false, baseURL: String? = nil, rapidApiHost: String? = nil) -> String {
        precondition(!apiKey.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty, "apiKey is required")
        let host = rapidApiHost?.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty == false ? rapidApiHost! : defaultRapidApiHost
        let resolvedBaseURL = (baseURL?.isEmpty == false ? baseURL! : (rapidApi ? "https://\(host)" : defaultApiBaseURL)).trimmingCharacters(in: CharacterSet(charactersIn: "/"))
        TimeLogicAPIClient.basePath = resolvedBaseURL
        TimeLogicAPIClient.customHeaders.removeAll()
        if rapidApi {
            TimeLogicAPIClient.customHeaders["X-RapidAPI-Key"] = apiKey
            TimeLogicAPIClient.customHeaders["X-RapidAPI-Host"] = host
        } else {
            TimeLogicAPIClient.customHeaders["Authorization"] = "Bearer \(apiKey)"
        }
        return resolvedBaseURL
    }
}
