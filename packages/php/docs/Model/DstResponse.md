# # DstResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**unix** | **int** |  |
**unixMs** | **int** |  |
**utc** | **\DateTime** |  |
**isoLocal** | **string** |  |
**rfc2822** | **string** |  |
**human** | **string** |  |
**dayNumber** | **int** | Day of the week counted from Sunday (1 &#x3D; Sunday, 2 &#x3D; Monday ... 7 &#x3D; Saturday). |
**dayShort** | **string** |  |
**dayFull** | **string** |  |
**timezone** | **string** |  |
**formatted** | **string** |  | [optional]
**dstActive** | **bool** |  |
**nextTransition** | **\DateTime** | Present only with &#x60;next&#x3D;true&#x60;. The instant of the next UTC offset change, written in the offset in force before it (e.g. &#x60;2026-11-01T02:00:00-04:00&#x60;); the new offset is not returned. &#x60;null&#x60; when no change is scheduled, for offset targets and with no selector. Tracks offset changes only, so &#x60;dst_active&#x60; can change without one. | [optional]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)
