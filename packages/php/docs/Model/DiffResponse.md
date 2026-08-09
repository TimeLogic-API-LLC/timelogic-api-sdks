# # DiffResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**seconds** | **int** |  |
**minutes** | **int** |  |
**hours** | **int** |  |
**days** | **int** |  |
**direction** | **string** | &#x60;forward&#x60; means &#x60;to&#x60; is after &#x60;from&#x60;. &#x60;backward&#x60; means &#x60;to&#x60; is before &#x60;from&#x60;. &#x60;same&#x60; means both sides resolve to the same instant. |
**human** | **string** |  |
**formatted** | **string** |  | [optional]
**businessDays** | **int** |  | [optional]
**from** | [**\TimeLogic\Api\Model\DiffEndpointRef**](DiffEndpointRef.md) |  |
**to** | [**\TimeLogic\Api\Model\DiffEndpointRef**](DiffEndpointRef.md) |  |

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)
