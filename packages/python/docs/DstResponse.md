# DstResponse


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
**dst_active** | **bool** |  | 
**next_transition** | **datetime** |  | [optional] 

## Example

```python
from timelogic_direct_api.models.dst_response import DstResponse

# TODO update the JSON string below
json = "{}"
# create an instance of DstResponse from a JSON string
dst_response_instance = DstResponse.from_json(json)
# print the JSON string representation of the object
print(DstResponse.to_json())

# convert the object into a dict
dst_response_dict = dst_response_instance.to_dict()
# create an instance of DstResponse from a dict
dst_response_from_dict = DstResponse.from_dict(dst_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


