# TimeLogic.DirectApi.Model.BulkError
Per-item error wrapper used inside bulk arrays returned by bulk-capable routes.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Error** | [**ApiError**](ApiError.md) |  | 
**RequestId** | **string** |  | 
**Timestamp** | **DateTime** | Intentionally omitted from public API error responses to avoid exposing request timing; use request_id for support correlation. | [optional] 
**Item** | **string** |  | 

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

