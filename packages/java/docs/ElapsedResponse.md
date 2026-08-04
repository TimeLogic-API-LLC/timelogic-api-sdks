

# ElapsedResponse


## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**seconds** | **Integer** |  |  |
|**minutes** | **Integer** |  |  |
|**hours** | **Integer** |  |  |
|**days** | **Integer** |  |  |
|**human** | **String** |  |  |
|**direction** | [**DirectionEnum**](#DirectionEnum) | &#x60;left&#x60; means the target instant is still in the future. &#x60;passed&#x60; means the target instant is already in the past. |  |
|**formatted** | **String** |  |  [optional] |
|**businessDays** | **Integer** |  |  [optional] |



## Enum: DirectionEnum

| Name | Value |
|---- | -----|
| LEFT | &quot;left&quot; |
| PASSED | &quot;passed&quot; |



