//! Typed /v1 response decoding. The offline tests decode recorded API
//! responses with the generated models. The live tests run only when
//! TIMELOGIC_SDK_TEST_API_KEY (or TIMELOGIC_API_KEY) is set:
//!   cargo test --test v1_responses

use timelogic_api::apis::{configuration::Configuration, time_api, utility_api, Error};
use timelogic_api::models::{GetCurrentTime200Response, TimePayloadBulkItem, TimezoneResponse};

const SINGLE: &str = r#"{"unix":1772366400,"unix_ms":1772366400000,"utc":"2026-03-01T12:00:00Z","iso_local":"2026-03-01T21:00:00+09:00","rfc2822":"Sun, 01 Mar 2026 21:00:00 +0900","human":"March 1, 2026, 9:00 PM Asia/Tokyo","day_number":1,"day_short":"Sun","day_full":"Sunday","timezone":"Asia/Tokyo"}"#;
const BULK: &str = r#"[{"unix":1772366400,"unix_ms":1772366400000,"utc":"2026-03-01T12:00:00Z","iso_local":"2026-03-01T21:00:00+09:00","rfc2822":"Sun, 01 Mar 2026 21:00:00 +0900","human":"March 1, 2026, 9:00 PM Asia/Tokyo","day_number":1,"day_short":"Sun","day_full":"Sunday","timezone":"Asia/Tokyo"},{"item":"Bad/Zone","error":{"code":"INVALID_PARAMETER","message":"Invalid timezone.","details":{"tz":"Bad/Zone"}},"request_id":"a6116a2e-8809-46e9-99c5-765cf0d50fcb"}]"#;
const TIMEZONE: &str = r#"{"unix":1772366400,"unix_ms":1772366400000,"utc":"2026-03-01T12:00:00Z","iso_local":"2026-03-01T21:00:00+09:00","rfc2822":"Sun, 01 Mar 2026 21:00:00 +0900","human":"March 1, 2026, 9:00 PM Asia/Tokyo","day_number":1,"day_short":"Sun","day_full":"Sunday","timezone":"Asia/Tokyo","offset":540,"dst":false}"#;
const OFFSET: &str = r#"{"unix":1772366400,"unix_ms":1772366400000,"utc":"2026-03-01T12:00:00Z","iso_local":"2026-03-01T17:30:00+05:30","rfc2822":"Sun, 01 Mar 2026 21:00:00 +0900","human":"March 1, 2026, 5:30 PM UTC+05:30","day_number":1,"day_short":"Sun","day_full":"Sunday","timezone":null,"offset":330,"dst":false,"matching_zones":[{"timezone":"Asia/Colombo","offset":330,"dst":false},{"timezone":"Asia/Kolkata","offset":330,"dst":false}]}"#;

#[test]
fn single_result_is_time_payload() {
    match serde_json::from_str::<GetCurrentTime200Response>(SINGLE).unwrap() {
        GetCurrentTime200Response::TimePayload(payload) => {
            assert_eq!(payload.unix_ms, 1772366400000);
            assert_eq!(payload.iso_local.as_deref(), Some("2026-03-01T21:00:00+09:00"));
        }
        other => panic!("expected a TimePayload, got {:?}", other),
    }
}

#[test]
fn bulk_result_items_are_time_payload_or_bulk_error() {
    let items = match serde_json::from_str::<GetCurrentTime200Response>(BULK).unwrap() {
        GetCurrentTime200Response::TimePayloadBulkResponse(items) => items,
        other => panic!("expected a bulk response, got {:?}", other),
    };
    assert_eq!(items.len(), 2);
    match &items[0] {
        TimePayloadBulkItem::TimePayload(payload) => assert_eq!(payload.timezone.as_deref(), Some("Asia/Tokyo")),
        other => panic!("expected a TimePayload, got {:?}", other),
    }
    match &items[1] {
        TimePayloadBulkItem::BulkError(error) => {
            assert_eq!(error.item, "Bad/Zone");
            assert_eq!(error.request_id, "a6116a2e-8809-46e9-99c5-765cf0d50fcb");
            assert_eq!(serde_json::to_value(error.error.code).unwrap(), "INVALID_PARAMETER");
        }
        other => panic!("expected a BulkError, got {:?}", other),
    }
}

#[test]
fn timezone_lookups_decode() {
    let zone: TimezoneResponse = serde_json::from_str(TIMEZONE).unwrap();
    assert_eq!(zone.timezone.as_deref(), Some("Asia/Tokyo"));
    assert_eq!(zone.offset, 540);
    assert!(zone.matching_zones.is_none());
    let offset: TimezoneResponse = serde_json::from_str(OFFSET).unwrap();
    assert!(offset.timezone.is_none());
    let zones = offset.matching_zones.unwrap();
    assert_eq!(zones.len(), 2);
    assert_eq!(zones[1].timezone, "Asia/Kolkata");
    assert_eq!(zones[1].offset, 330);
    assert!(!zones[1].dst);
}

fn live_configuration() -> Option<Configuration> {
    let key = std::env::var("TIMELOGIC_SDK_TEST_API_KEY")
        .or_else(|_| std::env::var("TIMELOGIC_API_KEY"))
        .ok()
        .filter(|key| !key.is_empty())?;
    let base = std::env::var("TIMELOGIC_SDK_TEST_BASE_URL").ok().filter(|base| !base.is_empty());
    Some(Configuration::with_api_key(key, false, base, None))
}

#[tokio::test]
async fn live_every_operation_decodes() {
    let Some(config) = live_configuration() else {
        eprintln!("skipped: set TIMELOGIC_SDK_TEST_API_KEY to run live calls");
        return;
    };
    match time_api::get_current_time(&config, Some("America/New_York"), None, None, None, None, None, None, None).await.unwrap() {
        GetCurrentTime200Response::TimePayload(payload) => assert_eq!(payload.timezone.as_deref(), Some("America/New_York")),
        other => panic!("current: {:?}", other),
    }
    match time_api::get_current_time(&config, Some("America/New_York,Europe/London,Bad/Zone"), None, None, None, None, None, None, None).await.unwrap() {
        GetCurrentTime200Response::TimePayloadBulkResponse(items) => {
            assert_eq!(items.len(), 3);
            assert!(matches!(&items[1], TimePayloadBulkItem::TimePayload(payload) if payload.timezone.as_deref() == Some("Europe/London")));
            assert!(matches!(&items[2], TimePayloadBulkItem::BulkError(error) if error.item == "Bad/Zone"));
        }
        other => panic!("current bulk: {:?}", other),
    }
    match time_api::convert_time(&config, Some(1772366400), None, None, None, None, None, None, None, Some("Asia/Tokyo"), None, None, None, None, None, None, None, None).await.unwrap() {
        GetCurrentTime200Response::TimePayload(payload) => assert_eq!(payload.iso_local.as_deref(), Some("2026-03-01T21:00:00+09:00")),
        other => panic!("convert: {:?}", other),
    }
    match time_api::convert_time(&config, Some(1772366400), None, None, None, None, None, None, None, None, None, None, None, Some("+01:00,+02:00"), None, None, None, None).await.unwrap() {
        GetCurrentTime200Response::TimePayloadBulkResponse(items) => assert_eq!(items.len(), 2),
        other => panic!("convert bulk: {:?}", other),
    }
    let zone = time_api::get_timezone(&config, Some("Europe/London"), None, None, None, None, None, None, None).await.unwrap();
    assert_eq!(zone.timezone.as_deref(), Some("Europe/London"));
    assert!(zone.matching_zones.is_none());
    let offset = time_api::get_timezone(&config, None, None, None, None, Some("+05:30"), None, None, None).await.unwrap();
    assert!(offset.timezone.is_none());
    assert_eq!(offset.matching_zones.unwrap()[0].offset, 330);
    let diff = time_api::diff_time(&config, "iso=2026-01-01T00:00:00Z", "iso=2026-03-01T12:00:00Z", None, None, None, None, None, None, None, None, None, None, None, None, None, None, None).await.unwrap();
    assert_eq!(diff.days, 59);
    let elapsed = time_api::get_elapsed(&config, None, None, Some("2026-01-01T00:00:00Z"), None, None, None, None, None, None, None, Some("2026-02-01T00:00:00Z"), None, None, None, None, None, None, None, None, None, None, None, None, None, None, None, None).await.unwrap();
    assert_eq!(elapsed.days, 31);
    let keys = utility_api::get_public_signing_key(&config, None).await.unwrap();
    assert!(!keys.keys.is_empty());
}

#[tokio::test]
async fn live_api_error_keeps_code_and_request_id() {
    let Some(config) = live_configuration() else {
        eprintln!("skipped: set TIMELOGIC_SDK_TEST_API_KEY to run live calls");
        return;
    };
    match time_api::get_current_time(&config, Some("Bad/Zone"), None, None, None, None, None, None, None).await {
        Err(Error::ResponseError(response)) => {
            assert_eq!(response.status.as_u16(), 400);
            match response.entity {
                Some(time_api::GetCurrentTimeError::Status400(body)) => {
                    assert_eq!(serde_json::to_value(body.error.code).unwrap(), "INVALID_PARAMETER");
                    assert!(!body.request_id.is_empty());
                }
                other => panic!("unexpected entity {:?}", other),
            }
        }
        other => panic!("expected a 400 response error, got {:?}", other),
    }
}
