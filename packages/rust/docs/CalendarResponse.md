# CalendarResponse

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
**year** | **i32** |  |
**month** | **i32** |  |
**month_name** | **String** |  |
**day** | **i32** |  |
**week_number** | Option<**i32**> | ISO 8601 week number (present with `week=true`). It belongs to the ISO week-year, which is not returned and can differ from `year` near January 1 (2027-01-01 is week 53 of 2026). | [optional]

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


