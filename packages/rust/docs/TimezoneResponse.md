# TimezoneResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**unix** | **i64** |  |
**unix_ms** | **i64** |  |
**utc** | **String** |  |
**iso_local** | Option<**String**> |  |
**rfc2822** | **String** |  |
**human** | **String** |  |
**day_number** | **i32** | Day of the week counted from Sunday (1 = Sunday, 2 = Monday ... 7 = Saturday). |
**day_short** | **String** |  |
**day_full** | **String** |  |
**timezone** | Option<**String**> |  |
**formatted** | Option<**String**> |  | [optional]
**offset** | **i32** | UTC offset of the resolved target in minutes, for example `-240` for UTC-04:00. |
**dst** | **bool** | Whether daylight saving time is in effect for the resolved target. Always `false` for `offset` lookups. |
**offset_seconds** | Option<**i32**> | Exact UTC offset in seconds. Present only when the resolved offset has a seconds part (historical local mean time); no zone has one at the current instant, so lookups today do not include it. | [optional]
**matching_zones** | Option<[**Vec<models::TimezoneMatch>**](TimezoneMatch.md)> | Present only for `offset=` lookups. The geographic zones whose current offset equals the requested one. `UTC` and `Etc/_*` zones are intentionally excluded; use `tz=UTC` for UTC. | [optional]

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


