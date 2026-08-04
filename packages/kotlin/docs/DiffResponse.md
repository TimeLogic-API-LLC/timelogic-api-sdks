
# DiffResponse

## Properties
| Name | Type | Description | Notes |
| ------------ | ------------- | ------------- | ------------- |
| **seconds** | **kotlin.Int** |  |  |
| **minutes** | **kotlin.Int** |  |  |
| **hours** | **kotlin.Int** |  |  |
| **days** | **kotlin.Int** |  |  |
| **direction** | [**inline**](#Direction) | &#x60;forward&#x60; means &#x60;to&#x60; is after &#x60;from&#x60;. &#x60;backward&#x60; means &#x60;to&#x60; is before &#x60;from&#x60;. &#x60;same&#x60; means both sides resolve to the same instant. |  |
| **human** | **kotlin.String** |  |  |
| **from** | [**DiffEndpointRef**](DiffEndpointRef.md) |  |  |
| **to** | [**DiffEndpointRef**](DiffEndpointRef.md) |  |  |
| **formatted** | **kotlin.String** |  |  [optional] |
| **businessDays** | **kotlin.Int** |  |  [optional] |


<a id="Direction"></a>
## Enum: direction
| Name | Value |
| ---- | ----- |
| direction | forward, backward, same |



