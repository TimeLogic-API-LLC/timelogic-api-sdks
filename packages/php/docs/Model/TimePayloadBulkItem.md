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
**dayNumber** | **int** |  |
**dayShort** | **string** |  |
**dayFull** | **string** |  |
**timezone** | **string** |  |
**formatted** | **string** |  | [optional]
**error** | [**\TimeLogic\DirectApi\Model\ApiError**](ApiError.md) |  |
**requestId** | **string** |  |
**timestamp** | **\DateTime** | Intentionally omitted from public API error responses to avoid exposing request timing; use request_id for support correlation. | [optional]
**item** | **string** |  |

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)
