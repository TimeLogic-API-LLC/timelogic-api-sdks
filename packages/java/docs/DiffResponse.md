

# DiffResponse


## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**seconds** | **Integer** |  |  |
|**minutes** | **Integer** |  |  |
|**hours** | **Integer** |  |  |
|**days** | **Integer** |  |  |
|**direction** | [**DirectionEnum**](#DirectionEnum) | &#x60;forward&#x60; means &#x60;to&#x60; is after &#x60;from&#x60;. &#x60;backward&#x60; means &#x60;to&#x60; is before &#x60;from&#x60;. &#x60;same&#x60; means both sides resolve to the same instant. |  |
|**human** | **String** |  |  |
|**formatted** | **String** |  |  [optional] |
|**businessDays** | **Integer** |  |  [optional] |
|**from** | [**DiffEndpointRef**](DiffEndpointRef.md) |  |  |
|**to** | [**DiffEndpointRef**](DiffEndpointRef.md) |  |  |



## Enum: DirectionEnum

| Name | Value |
|---- | -----|
| FORWARD | &quot;forward&quot; |
| BACKWARD | &quot;backward&quot; |
| SAME | &quot;same&quot; |



