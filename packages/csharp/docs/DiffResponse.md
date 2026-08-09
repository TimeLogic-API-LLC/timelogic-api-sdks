# TimeLogic.Api.Model.DiffResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Seconds** | **int** |  |
**Minutes** | **int** |  |
**Hours** | **int** |  |
**Days** | **int** |  |
**Direction** | **string** | &#x60;forward&#x60; means &#x60;to&#x60; is after &#x60;from&#x60;. &#x60;backward&#x60; means &#x60;to&#x60; is before &#x60;from&#x60;. &#x60;same&#x60; means both sides resolve to the same instant. |
**Human** | **string** |  |
**Formatted** | **string** |  | [optional]
**BusinessDays** | **int** |  | [optional]
**From** | [**DiffEndpointRef**](DiffEndpointRef.md) |  |
**To** | [**DiffEndpointRef**](DiffEndpointRef.md) |  |

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

