# DiffResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**seconds** | **int** |  | 
**minutes** | **int** |  | 
**hours** | **int** |  | 
**days** | **int** |  | 
**direction** | **str** | &#x60;forward&#x60; means &#x60;to&#x60; is after &#x60;from&#x60;. &#x60;backward&#x60; means &#x60;to&#x60; is before &#x60;from&#x60;. &#x60;same&#x60; means both sides resolve to the same instant. | 
**human** | **str** |  | 
**formatted** | **str** |  | [optional] 
**business_days** | **int** |  | [optional] 
**var_from** | [**DiffEndpointRef**](DiffEndpointRef.md) |  | 
**to** | [**DiffEndpointRef**](DiffEndpointRef.md) |  | 

## Example

```python
from timelogic_direct_api.models.diff_response import DiffResponse

# TODO update the JSON string below
json = "{}"
# create an instance of DiffResponse from a JSON string
diff_response_instance = DiffResponse.from_json(json)
# print the JSON string representation of the object
print(DiffResponse.to_json())

# convert the object into a dict
diff_response_dict = diff_response_instance.to_dict()
# create an instance of DiffResponse from a dict
diff_response_from_dict = DiffResponse.from_dict(diff_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


