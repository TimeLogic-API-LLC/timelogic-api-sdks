# TimezoneOffsetResponse

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
**offset** | **i32** |  |
**dst** | **bool** |  |
**matching_zones** | [**Vec<models::TimezoneMatch>**](TimezoneMatch.md) | For `offset=` lookups, the geographic zones whose current offset equals the requested one. `UTC` and `Etc/_*` zones are intentionally excluded; use `tz=UTC` for UTC. |

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


