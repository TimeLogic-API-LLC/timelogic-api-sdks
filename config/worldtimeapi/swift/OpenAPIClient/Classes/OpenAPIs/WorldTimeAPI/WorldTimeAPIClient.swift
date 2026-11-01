// WorldTimeAPIClient.swift
//
// WorldTimeAPI-compatible client for the TimeLogic API /api/* routes.
//
// Contract: openapi/openapi-worldtimeapi.yaml. The routes answer the same paths, field
// names and plain-text variants as worldtimeapi.org; a TimeLogic API key is required and
// is sent as the X-API-Key header. The types in this file are prefixed WorldTimeAPI and do
// not use or change the generated /v1 APIs, TimeLogicAPIClient or TransportConfiguration.

import Foundation
#if canImport(FoundationNetworking)
import FoundationNetworking
#endif

/// Time object returned by /api/timezone/{zone} and /api/ip, with the worldtimeapi.org
/// field names (JSON) and types.
public struct WorldTimeAPIDateTime: Codable, Equatable {
    public var abbreviation: String
    public var clientIp: String
    public var datetime: String
    public var dayOfWeek: Int
    public var dayOfYear: Int
    public var dst: Bool
    public var dstFrom: String?
    public var dstOffset: Int
    public var dstUntil: String?
    public var rawOffset: Int
    public var timezone: String
    public var unixtime: Int64
    public var utcDatetime: String
    public var utcOffset: String
    public var weekNumber: Int

    public enum CodingKeys: String, CodingKey, CaseIterable {
        case abbreviation
        case clientIp = "client_ip"
        case datetime
        case dayOfWeek = "day_of_week"
        case dayOfYear = "day_of_year"
        case dst
        case dstFrom = "dst_from"
        case dstOffset = "dst_offset"
        case dstUntil = "dst_until"
        case rawOffset = "raw_offset"
        case timezone
        case unixtime
        case utcDatetime = "utc_datetime"
        case utcOffset = "utc_offset"
        case weekNumber = "week_number"
    }

    public func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(abbreviation, forKey: .abbreviation)
        try container.encode(clientIp, forKey: .clientIp)
        try container.encode(datetime, forKey: .datetime)
        try container.encode(dayOfWeek, forKey: .dayOfWeek)
        try container.encode(dayOfYear, forKey: .dayOfYear)
        try container.encode(dst, forKey: .dst)
        try container.encode(dstFrom, forKey: .dstFrom)
        try container.encode(dstOffset, forKey: .dstOffset)
        try container.encode(dstUntil, forKey: .dstUntil)
        try container.encode(rawOffset, forKey: .rawOffset)
        try container.encode(timezone, forKey: .timezone)
        try container.encode(unixtime, forKey: .unixtime)
        try container.encode(utcDatetime, forKey: .utcDatetime)
        try container.encode(utcOffset, forKey: .utcOffset)
        try container.encode(weekNumber, forKey: .weekNumber)
    }
}

/// HTTP answer, including the X-TimeLogic-Signature* headers when signing is enabled
/// (header names are lower-case).
public struct WorldTimeAPIRawResponse {
    public let status: Int
    public let headers: [String: String]
    public let body: Data

    public var text: String { String(decoding: body, as: UTF8.self) }
}

/// Errors from the WorldTimeAPI-compatible client.
public enum WorldTimeAPIError: Error, Equatable {
    /// The 404 {"error":"unknown location"} answer.
    case unknownLocation(status: Int)
    /// Any other non-2xx answer. `error` is the worldtimeapi.org-style message (for example
    /// "malformed ip") or the TimeLogic message for authentication and quota errors.
    case api(status: Int, error: String, code: String?, body: String)
    /// A zone name with no segments or more than three.
    case invalidTimezone(String)
    /// Transport failure or an answer without an HTTP status.
    case transport(String)
    /// The body could not be decoded.
    case decoding(String)

    public var isUnknownLocation: Bool {
        if case .unknownLocation = self { return true }
        return false
    }

    public var isMalformedIp: Bool {
        if case let .api(status, error, _, _) = self { return status == 404 && error == "malformed ip" }
        return false
    }

    /// Parses a non-2xx answer.
    public static func from(status: Int, body: String) -> WorldTimeAPIError {
        var message = body.trimmingCharacters(in: .whitespacesAndNewlines)
        var code: String?
        if message.hasPrefix("Error:") {
            message = String(message.dropFirst("Error:".count)).trimmingCharacters(in: .whitespaces)
        } else if let data = body.data(using: .utf8),
                  let object = (try? JSONSerialization.jsonObject(with: data, options: [])) as? [String: Any] {
            if let text = object["error"] as? String {
                message = text
            } else if let nested = object["error"] as? [String: Any] {
                message = nested["message"].map { "\($0)" } ?? ""
                code = nested["code"].map { "\($0)" }
            }
        }
        if status == 404 && message == "unknown location" {
            return .unknownLocation(status: status)
        }
        return .api(status: status, error: message, code: code, body: body)
    }
}

/// Client for the TimeLogic API WorldTimeAPI-compatible routes (/api/*).
///
///     let wta = WorldTimeAPIClient(apiKey: ProcessInfo.processInfo.environment["TIMELOGIC_API_KEY"]!)
///     wta.getTimezone("Europe/London") { result in print(result) }
open class WorldTimeAPIClient {
    /// Default host for the WorldTimeAPI-compatible routes.
    public static let defaultBaseURL = "https://api.timelogicapi.com"

    public let apiKey: String
    public let baseURL: String
    public let sign: Bool
    public let session: URLSession

    /// - Parameters:
    ///   - apiKey: TimeLogic API key, sent as the X-API-Key header.
    ///   - baseURL: defaults to https://api.timelogicapi.com
    ///   - sign: adds sign=true so responses carry detached signature headers.
    ///   - session: URLSession to use (defaults to URLSession.shared).
    public init(apiKey: String, baseURL: String = WorldTimeAPIClient.defaultBaseURL, sign: Bool = false, session: URLSession = .shared) {
        self.apiKey = apiKey
        var base = baseURL
        while base.hasSuffix("/") { base.removeLast() }
        self.baseURL = base
        self.sign = sign
        self.session = session
    }

    /// Path for "Europe/London", "America/Argentina/Salta" or a one-word zone such as "UTC".
    public static func zonePath(_ timezone: String, text: Bool = false) throws -> String {
        let segments = timezone.split(separator: "/").map(String.init).filter { !$0.isEmpty }
        guard (1...3).contains(segments.count) else {
            throw WorldTimeAPIError.invalidTimezone("timezone must have one to three segments, for example \"Europe/London\"")
        }
        return "/api/timezone/" + segments.map(encode).joined(separator: "/") + (text ? ".txt" : "")
    }

    /// /api/ip or /api/ip/{ip}.
    public static func ipPath(_ ip: String? = nil, text: Bool = false) -> String {
        let base: String
        if let ip = ip, !ip.isEmpty { base = "/api/ip/" + encode(ip) } else { base = "/api/ip" }
        return base + (text ? ".txt" : "")
    }

    private static func encode(_ segment: String) -> String {
        var allowed = CharacterSet.urlPathAllowed
        allowed.remove(charactersIn: "/:")
        return segment.addingPercentEncoding(withAllowedCharacters: allowed) ?? segment
    }

    /// GET /api/timezone
    public func listTimezones(completion: @escaping (Result<[String], WorldTimeAPIError>) -> Void) {
        getDecoded("/api/timezone", as: [String].self, completion: completion)
    }

    /// GET /api/timezone.txt
    public func listTimezonesText(completion: @escaping (Result<String, WorldTimeAPIError>) -> Void) {
        getText("/api/timezone.txt", completion: completion)
    }

    /// GET /api/timezone/{area}
    public func listTimezonesInArea(_ area: String, completion: @escaping (Result<[String], WorldTimeAPIError>) -> Void) {
        withPath({ try WorldTimeAPIClient.zonePath(area) }, completion: completion) { path in
            self.getText(path) { result in
                completion(result.flatMap { body in
                    if let names = try? JSONDecoder().decode([String].self, from: Data(body.utf8)) {
                        return .success(names)
                    }
                    return .failure(.api(status: 200, error: "\(area) is a timezone, not an area; use getTimezone", code: nil, body: body))
                })
            }
        }
    }

    /// GET /api/timezone/{area}.txt
    public func listTimezonesInAreaText(_ area: String, completion: @escaping (Result<String, WorldTimeAPIError>) -> Void) {
        withPath({ try WorldTimeAPIClient.zonePath(area, text: true) }, completion: completion) { self.getText($0, completion: completion) }
    }

    /// GET /api/timezone/{area}/{location}[/{region}], or a one-word zone such as UTC.
    public func getTimezone(_ timezone: String, completion: @escaping (Result<WorldTimeAPIDateTime, WorldTimeAPIError>) -> Void) {
        withPath({ try WorldTimeAPIClient.zonePath(timezone) }, completion: completion) {
            self.getDecoded($0, as: WorldTimeAPIDateTime.self, completion: completion)
        }
    }

    /// Plain-text variant of getTimezone.
    public func getTimezoneText(_ timezone: String, completion: @escaping (Result<String, WorldTimeAPIError>) -> Void) {
        withPath({ try WorldTimeAPIClient.zonePath(timezone, text: true) }, completion: completion) { self.getText($0, completion: completion) }
    }

    /// GET /api/ip (the caller's address) when ip is nil, else /api/ip/{ip}.
    public func getIp(_ ip: String? = nil, completion: @escaping (Result<WorldTimeAPIDateTime, WorldTimeAPIError>) -> Void) {
        getDecoded(WorldTimeAPIClient.ipPath(ip), as: WorldTimeAPIDateTime.self, completion: completion)
    }

    /// Plain-text variant of getIp.
    public func getIpText(_ ip: String? = nil, completion: @escaping (Result<String, WorldTimeAPIError>) -> Void) {
        getText(WorldTimeAPIClient.ipPath(ip, text: true), completion: completion)
    }

    /// GET any /api/* path and return status, headers and body without failing on non-2xx answers.
    public func requestRaw(_ path: String, completion: @escaping (Result<WorldTimeAPIRawResponse, WorldTimeAPIError>) -> Void) {
        guard let url = URL(string: baseURL + path + (sign ? "?sign=true" : "")) else {
            completion(.failure(.transport("invalid URL")))
            return
        }
        var request = URLRequest(url: url)
        request.httpMethod = "GET"
        request.setValue(apiKey, forHTTPHeaderField: "X-API-Key")
        request.setValue(path.hasSuffix(".txt") ? "text/plain" : "application/json", forHTTPHeaderField: "Accept")
        session.dataTask(with: request) { data, response, error in
            if let error = error {
                completion(.failure(.transport(error.localizedDescription)))
                return
            }
            guard let http = response as? HTTPURLResponse else {
                completion(.failure(.transport("no HTTP response")))
                return
            }
            var headers: [String: String] = [:]
            for (name, value) in http.allHeaderFields {
                headers["\(name)".lowercased()] = "\(value)"
            }
            completion(.success(WorldTimeAPIRawResponse(status: http.statusCode, headers: headers, body: data ?? Data())))
        }.resume()
    }

    private func withPath<T>(_ makePath: () throws -> String,
                             completion: @escaping (Result<T, WorldTimeAPIError>) -> Void,
                             run: (String) -> Void) {
        do {
            run(try makePath())
        } catch let error as WorldTimeAPIError {
            completion(.failure(error))
        } catch {
            completion(.failure(.invalidTimezone("\(error)")))
        }
    }

    private func getText(_ path: String, completion: @escaping (Result<String, WorldTimeAPIError>) -> Void) {
        requestRaw(path) { result in
            completion(result.flatMap { raw in
                (200...299).contains(raw.status) ? .success(raw.text) : .failure(WorldTimeAPIError.from(status: raw.status, body: raw.text))
            })
        }
    }

    private func getDecoded<T: Decodable>(_ path: String, as type: T.Type, completion: @escaping (Result<T, WorldTimeAPIError>) -> Void) {
        getText(path) { result in
            completion(result.flatMap { body in
                do {
                    return .success(try JSONDecoder().decode(T.self, from: Data(body.utf8)))
                } catch {
                    return .failure(.decoding("\(error)"))
                }
            })
        }
    }
}
