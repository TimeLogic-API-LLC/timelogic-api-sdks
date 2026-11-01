# TimePayloadBulkItem

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**unix** | **Int64** |  |
**unixMs** | **Int64** |  |
**utc** | **Date** |  |
**isoLocal** | **String** |  |
**rfc2822** | **String** |  |
**human** | **String** |  |
**dayNumber** | **Int** | Day of the week counted from Sunday (1 &#x3D; Sunday, 2 &#x3D; Monday ... 7 &#x3D; Saturday). |
**dayShort** | **String** |  |
**dayFull** | **String** |  |
**timezone** | **String** |  |
**formatted** | **String** |  | [optional]
**error** | [**ApiError**](ApiError.md) |  |
**requestId** | **String** |  |
**timestamp** | **Date** | Intentionally omitted from public API error responses, including per-item errors inside bulk arrays, to avoid exposing request timing; use request_id for support correlation. | [optional]
**item** | **String** |  |

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


