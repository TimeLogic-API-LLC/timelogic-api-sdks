# ElapsedResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**seconds** | **int** |  | 
**minutes** | **int** |  | 
**hours** | **int** |  | 
**days** | **int** |  | 
**human** | **str** |  | 
**direction** | **str** | &#x60;left&#x60; means the target instant is still in the future. &#x60;passed&#x60; means the target instant is already in the past. | 
**formatted** | **str** |  | [optional] 
**business_days** | **int** |  | [optional] 

## Example

```python
from timelogic_direct_api.models.elapsed_response import ElapsedResponse

# TODO update the JSON string below
json = "{}"
# create an instance of ElapsedResponse from a JSON string
elapsed_response_instance = ElapsedResponse.from_json(json)
# print the JSON string representation of the object
print(ElapsedResponse.to_json())

# convert the object into a dict
elapsed_response_dict = elapsed_response_instance.to_dict()
# create an instance of ElapsedResponse from a dict
elapsed_response_from_dict = ElapsedResponse.from_dict(elapsed_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


