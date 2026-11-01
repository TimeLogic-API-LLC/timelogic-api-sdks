# # TimePayloadBulkItem

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
**error** | [**\TimeLogic\Api\Model\ApiError**](ApiError.md) |  |
**requestId** | **string** |  |
**timestamp** | **\DateTime** | Intentionally omitted from public API error responses, including per-item errors inside bulk arrays, to avoid exposing request timing; use request_id for support correlation. | [optional]
**item** | **string** |  |

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)
