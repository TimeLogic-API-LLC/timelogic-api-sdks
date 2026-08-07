# TimeLogic.Api.Model.TimePayloadBulkItem
One bulk array item, either a successful time payload or a per-item bulk error.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Unix** | **long** |  | 
**UnixMs** | **long** |  | 
**Utc** | **DateTime** |  | 
**IsoLocal** | **string** |  | 
**Rfc2822** | **string** |  | 
**Human** | **string** |  | 
**DayNumber** | **int** |  | 
**DayShort** | **string** |  | 
**DayFull** | **string** |  | 
**Timezone** | **string** |  | 
**Formatted** | **string** |  | [optional] 
**Error** | [**ApiError**](ApiError.md) |  | 
**RequestId** | **string** |  | 
**Timestamp** | **DateTime** | Intentionally omitted from public API error responses to avoid exposing request timing; use request_id for support correlation. | [optional] 
**Item** | **string** |  | 

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

