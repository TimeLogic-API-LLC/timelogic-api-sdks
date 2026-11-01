

# ElapsedResponse


## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**seconds** | **Integer** |  |  |
|**minutes** | **Integer** |  |  |
|**hours** | **Integer** |  |  |
|**days** | **Integer** |  |  |
|**human** | **String** |  |  |
|**direction** | [**DirectionEnum**](#DirectionEnum) | &#x60;left&#x60; means the reference instant is after the compared instant (now, or &#x60;compare_*&#x60;). &#x60;passed&#x60; means it is before it, or equal to it. |  |
|**formatted** | **String** |  |  [optional] |
|**businessDays** | **Integer** |  |  [optional] |



## Enum: DirectionEnum

| Name | Value |
|---- | -----|
| LEFT | &quot;left&quot; |
| PASSED | &quot;passed&quot; |



