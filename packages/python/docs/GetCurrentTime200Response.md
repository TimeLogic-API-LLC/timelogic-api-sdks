# GetCurrentTime200Response


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**unix** | **int** |  |
**unix_ms** | **int** |  |
**utc** | **datetime** |  |
**iso_local** | **str** |  |
**rfc2822** | **str** |  |
**human** | **str** |  |
**day_number** | **int** |  |
**day_short** | **str** |  |
**day_full** | **str** |  |
**timezone** | **str** |  |
**formatted** | **str** |  | [optional]

## Example

```python
from timelogic_direct_api.models.get_current_time200_response import GetCurrentTime200Response

# TODO update the JSON string below
json = "{}"
# create an instance of GetCurrentTime200Response from a JSON string
get_current_time200_response_instance = GetCurrentTime200Response.from_json(json)
# print the JSON string representation of the object
print(GetCurrentTime200Response.to_json())

# convert the object into a dict
get_current_time200_response_dict = get_current_time200_response_instance.to_dict()
# create an instance of GetCurrentTime200Response from a dict
get_current_time200_response_from_dict = GetCurrentTime200Response.from_dict(get_current_time200_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


