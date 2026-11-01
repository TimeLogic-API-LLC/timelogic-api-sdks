# DstResponse

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
**dst_active** | **bool** |  |
**next_transition** | Option<**String**> | Present only with `next=true`. The instant of the next UTC offset change, written in the offset in force before it (e.g. `2026-11-01T02:00:00-04:00`); the new offset is not returned. `null` when no change is scheduled, for offset targets and with no selector. Tracks offset changes only, so `dst_active` can change without one. | [optional]

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


