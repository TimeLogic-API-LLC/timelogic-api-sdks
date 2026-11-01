//! WorldTimeAPI-compatible client for the TimeLogic API `/api/*` routes.
//!
//! Contract: `openapi/openapi-worldtimeapi.yaml`. The routes answer the same paths, field
//! names and plain-text variants as worldtimeapi.org; a TimeLogic API key is required and is
//! sent as the `X-API-Key` header. This module does not use or change the generated `/v1`
//! `apis` and `models` modules or their `Configuration`.
//!
//! ```no_run
//! # async fn run() -> Result<(), timelogic_api::worldtimeapi::Error> {
//! use timelogic_api::worldtimeapi::Client;
//!
//! let client = Client::new(std::env::var("TIMELOGIC_API_KEY").unwrap());
//! let now = client.get_timezone("Europe/London").await?;
//! println!("{} {}", now.datetime, now.utc_offset);
//! # Ok(())
//! # }
//! ```

use std::collections::HashMap;
use std::fmt;

use serde::{Deserialize, Serialize};

/// Default host for the WorldTimeAPI-compatible routes.
pub const DEFAULT_BASE_URL: &str = "https://api.timelogicapi.com";

/// Time object returned by `/api/timezone/{zone}` and `/api/ip`, with the worldtimeapi.org
/// field names and types.
#[derive(Clone, Debug, PartialEq, Serialize, Deserialize)]
pub struct DateTime {
    pub abbreviation: String,
    pub client_ip: String,
    pub datetime: String,
    pub day_of_week: i32,
    pub day_of_year: i32,
    pub dst: bool,
    pub dst_from: Option<String>,
    pub dst_offset: i64,
    pub dst_until: Option<String>,
    pub raw_offset: i64,
    pub timezone: String,
    pub unixtime: i64,
    pub utc_datetime: String,
    pub utc_offset: String,
    pub week_number: i32,
}

/// HTTP answer, including the `X-TimeLogic-Signature*` headers when signing is enabled
/// (header names are lower-case).
#[derive(Clone, Debug)]
pub struct RawResponse {
    pub status: u16,
    pub headers: HashMap<String, String>,
    pub body: String,
}

/// Errors from the WorldTimeAPI-compatible client.
#[derive(Debug)]
pub enum Error {
    /// The 404 `{"error":"unknown location"}` answer.
    UnknownLocation { status: u16, body: String },
    /// Any other non-2xx answer. `error` is the worldtimeapi.org-style message (for example
    /// `malformed ip`) or the TimeLogic message for authentication and quota errors.
    Api { status: u16, error: String, code: Option<String>, body: String },
    /// A zone name with no segments or more than three.
    InvalidTimezone(String),
    /// Transport failure.
    Http(reqwest::Error),
    /// The body could not be decoded.
    Json(serde_json::Error),
}

impl Error {
    /// True for the 404 `{"error":"unknown location"}` answer.
    pub fn is_unknown_location(&self) -> bool {
        matches!(self, Error::UnknownLocation { .. })
    }

    /// True for the 404 `{"error":"malformed ip"}` answer.
    pub fn is_malformed_ip(&self) -> bool {
        matches!(self, Error::Api { status: 404, error, .. } if error == "malformed ip")
    }

    /// HTTP status of an API answer.
    pub fn status(&self) -> Option<u16> {
        match self {
            Error::UnknownLocation { status, .. } | Error::Api { status, .. } => Some(*status),
            Error::Http(e) => e.status().map(|s| s.as_u16()),
            _ => None,
        }
    }
}

impl fmt::Display for Error {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Error::UnknownLocation { status, .. } => {
                write!(f, "WorldTimeAPI-compatible request failed ({}): unknown location", status)
            }
            Error::Api { status, error, .. } => {
                write!(f, "WorldTimeAPI-compatible request failed ({}): {}", status, error)
            }
            Error::InvalidTimezone(message) => write!(f, "{}", message),
            Error::Http(e) => write!(f, "{}", e),
            Error::Json(e) => write!(f, "{}", e),
        }
    }
}

impl std::error::Error for Error {}

impl From<reqwest::Error> for Error {
    fn from(e: reqwest::Error) -> Self {
        Error::Http(e)
    }
}

impl From<serde_json::Error> for Error {
    fn from(e: serde_json::Error) -> Self {
        Error::Json(e)
    }
}

/// Parses a non-2xx answer.
pub fn error_from_response(status: u16, body: &str) -> Error {
    let mut message = body.trim().to_string();
    let mut code = None;
    if let Some(rest) = message.strip_prefix("Error:") {
        message = rest.trim().to_string();
    } else if let Ok(serde_json::Value::Object(map)) = serde_json::from_str::<serde_json::Value>(body) {
        match map.get("error") {
            Some(serde_json::Value::String(text)) => message = text.clone(),
            Some(serde_json::Value::Object(nested)) => {
                message = nested.get("message").and_then(|v| v.as_str()).unwrap_or("").to_string();
                code = nested.get("code").and_then(|v| v.as_str()).map(|s| s.to_string());
            }
            _ => {}
        }
    }
    if status == 404 && message == "unknown location" {
        Error::UnknownLocation { status, body: body.to_string() }
    } else {
        Error::Api { status, error: message, code, body: body.to_string() }
    }
}

fn encode_segment(segment: &str) -> String {
    url::form_urlencoded::byte_serialize(segment.as_bytes()).collect::<String>().replace('+', "%20")
}

/// Path for `Europe/London`, `America/Argentina/Salta` or a one-word zone such as `UTC`.
pub fn zone_path(timezone: &str, text: bool) -> Result<String, Error> {
    let segments: Vec<String> = timezone.split('/').filter(|s| !s.is_empty()).map(encode_segment).collect();
    if segments.is_empty() || segments.len() > 3 {
        return Err(Error::InvalidTimezone(
            "timezone must have one to three segments, for example \"Europe/London\"".to_string(),
        ));
    }
    Ok(format!("/api/timezone/{}{}", segments.join("/"), if text { ".txt" } else { "" }))
}

/// `/api/ip` or `/api/ip/{ip}`.
pub fn ip_path(ip: Option<&str>, text: bool) -> String {
    let base = match ip {
        Some(ip) if !ip.is_empty() => format!("/api/ip/{}", encode_segment(ip)),
        _ => "/api/ip".to_string(),
    };
    format!("{}{}", base, if text { ".txt" } else { "" })
}

/// Decodes a raw answer: a 2xx body is returned, anything else becomes an [`Error`].
pub fn check(raw: RawResponse) -> Result<String, Error> {
    if (200..300).contains(&raw.status) {
        Ok(raw.body)
    } else {
        Err(error_from_response(raw.status, &raw.body))
    }
}

/// Client for the WorldTimeAPI-compatible routes.
#[derive(Clone, Debug)]
pub struct Client {
    api_key: String,
    base_url: String,
    sign: bool,
    http: reqwest::Client,
}

impl Client {
    /// Client for the default host.
    pub fn new(api_key: impl Into<String>) -> Self {
        Self::with_options(api_key, DEFAULT_BASE_URL, false)
    }

    /// `sign` adds `sign=true` so responses carry detached signature headers.
    pub fn with_options(api_key: impl Into<String>, base_url: &str, sign: bool) -> Self {
        let http = reqwest::Client::builder()
            .redirect(reqwest::redirect::Policy::none())
            .timeout(std::time::Duration::from_secs(30))
            .build()
            .unwrap_or_else(|_| reqwest::Client::new());
        Self::with_http_client(api_key, base_url, sign, http)
    }

    /// Uses the given `reqwest::Client`.
    pub fn with_http_client(api_key: impl Into<String>, base_url: &str, sign: bool, http: reqwest::Client) -> Self {
        Client { api_key: api_key.into(), base_url: base_url.trim_end_matches('/').to_string(), sign, http }
    }

    /// Full URL for a path, including `sign=true` when signing is enabled.
    pub fn url(&self, path: &str) -> String {
        format!("{}{}{}", self.base_url, path, if self.sign { "?sign=true" } else { "" })
    }

    /// GET /api/timezone
    pub async fn list_timezones(&self) -> Result<Vec<String>, Error> {
        Ok(serde_json::from_str(&self.get_text("/api/timezone").await?)?)
    }

    /// GET /api/timezone.txt
    pub async fn list_timezones_text(&self) -> Result<String, Error> {
        self.get_text("/api/timezone.txt").await
    }

    /// GET /api/timezone/{area}
    pub async fn list_timezones_in_area(&self, area: &str) -> Result<Vec<String>, Error> {
        let body = self.get_text(&zone_path(area, false)?).await?;
        parse_area(area, &body)
    }

    /// GET /api/timezone/{area}.txt
    pub async fn list_timezones_in_area_text(&self, area: &str) -> Result<String, Error> {
        self.get_text(&zone_path(area, true)?).await
    }

    /// GET /api/timezone/{area}/{location}[/{region}], or a one-word zone such as `UTC`.
    pub async fn get_timezone(&self, timezone: &str) -> Result<DateTime, Error> {
        Ok(serde_json::from_str(&self.get_text(&zone_path(timezone, false)?).await?)?)
    }

    /// Plain-text variant of [`Client::get_timezone`].
    pub async fn get_timezone_text(&self, timezone: &str) -> Result<String, Error> {
        self.get_text(&zone_path(timezone, true)?).await
    }

    /// GET /api/ip (the caller's address) when `ip` is `None`, else /api/ip/{ip}.
    pub async fn get_ip(&self, ip: Option<&str>) -> Result<DateTime, Error> {
        Ok(serde_json::from_str(&self.get_text(&ip_path(ip, false)).await?)?)
    }

    /// Plain-text variant of [`Client::get_ip`].
    pub async fn get_ip_text(&self, ip: Option<&str>) -> Result<String, Error> {
        self.get_text(&ip_path(ip, true)).await
    }

    /// GET any `/api/*` path and return status, headers and body without turning a non-2xx
    /// status into an error.
    pub async fn request_raw(&self, path: &str) -> Result<RawResponse, Error> {
        let accept = if path.ends_with(".txt") { "text/plain" } else { "application/json" };
        let response = self
            .http
            .get(self.url(path))
            .header("X-API-Key", &self.api_key)
            .header("Accept", accept)
            .send()
            .await?;
        let status = response.status().as_u16();
        let headers = response
            .headers()
            .iter()
            .map(|(name, value)| (name.as_str().to_lowercase(), value.to_str().unwrap_or("").to_string()))
            .collect();
        let body = response.text().await?;
        Ok(RawResponse { status, headers, body })
    }

    async fn get_text(&self, path: &str) -> Result<String, Error> {
        check(self.request_raw(path).await?)
    }
}

/// Decodes an `/api/timezone/{area}` body into zone names.
pub fn parse_area(area: &str, body: &str) -> Result<Vec<String>, Error> {
    match serde_json::from_str::<serde_json::Value>(body)? {
        serde_json::Value::Array(_) => Ok(serde_json::from_str(body)?),
        _ => Err(Error::Api {
            status: 200,
            error: format!("{} is a timezone, not an area; use get_timezone", area),
            code: None,
            body: body.to_string(),
        }),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    const LONDON: &str = r#"{"utc_offset":"+00:00","timezone":"Europe/London","day_of_week":0,"day_of_year":305,"datetime":"2026-11-01T03:34:38.413000+00:00","utc_datetime":"2026-11-01T03:34:38.413000+00:00","unixtime":1793504078,"raw_offset":0,"week_number":44,"dst":false,"abbreviation":"GMT","dst_offset":0,"dst_from":null,"dst_until":null,"client_ip":"203.0.113.7"}"#;

    #[test]
    fn decodes_the_fifteen_fields() {
        let value: DateTime = serde_json::from_str(LONDON).unwrap();
        assert_eq!(value.timezone, "Europe/London");
        assert_eq!(value.unixtime, 1793504078);
        assert_eq!(value.dst_from, None);
        let round_trip = serde_json::to_value(&value).unwrap();
        let original: serde_json::Value = serde_json::from_str(LONDON).unwrap();
        assert_eq!(round_trip, original);
        assert_eq!(round_trip.as_object().unwrap().len(), 15);
    }

    #[test]
    fn builds_the_worldtimeapi_paths() {
        assert_eq!(zone_path("Europe/London", false).unwrap(), "/api/timezone/Europe/London");
        assert_eq!(zone_path("America/Argentina/Salta", false).unwrap(), "/api/timezone/America/Argentina/Salta");
        assert_eq!(zone_path("Europe", true).unwrap(), "/api/timezone/Europe.txt");
        assert_eq!(zone_path("UTC", false).unwrap(), "/api/timezone/UTC");
        assert!(zone_path("", false).is_err());
        assert!(zone_path("a/b/c/d", false).is_err());
        assert_eq!(ip_path(None, false), "/api/ip");
        assert_eq!(ip_path(Some("8.8.8.8"), true), "/api/ip/8.8.8.8.txt");
        assert_eq!(ip_path(Some("2001:db8::1"), false), "/api/ip/2001%3Adb8%3A%3A1");
        let signed = Client::with_options("k", "https://example.test/", true);
        assert_eq!(signed.url("/api/timezone"), "https://example.test/api/timezone?sign=true");
    }

    #[test]
    fn maps_errors() {
        let unknown = check(RawResponse { status: 404, headers: HashMap::new(), body: r#"{"error":"unknown location"}"#.into() });
        assert!(unknown.unwrap_err().is_unknown_location());
        let unknown_text = check(RawResponse { status: 404, headers: HashMap::new(), body: "Error: unknown location".into() });
        assert!(unknown_text.unwrap_err().is_unknown_location());
        let malformed = error_from_response(404, r#"{"error":"malformed ip"}"#);
        assert!(malformed.is_malformed_ip());
        match error_from_response(401, r#"{"error":{"code":"UNAUTHORIZED","message":"Missing API key credentials."}}"#) {
            Error::Api { status, code, .. } => {
                assert_eq!(status, 401);
                assert_eq!(code.as_deref(), Some("UNAUTHORIZED"));
            }
            other => panic!("unexpected {:?}", other),
        }
        assert_eq!(check(RawResponse { status: 200, headers: HashMap::new(), body: "ok".into() }).unwrap(), "ok");
    }

    #[test]
    fn decodes_area_lists() {
        assert_eq!(parse_area("Europe", r#"["Europe/London"]"#).unwrap(), vec!["Europe/London".to_string()]);
        assert!(parse_area("UTC", LONDON).is_err());
    }
}
