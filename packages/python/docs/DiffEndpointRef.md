# DiffEndpointRef

Resolved endpoint reference for diff calculations. This object intentionally includes only the resolved epoch-millisecond instant.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**unix_ms** | **int** |  |

## Example

```python
from timelogic_direct_api.models.diff_endpoint_ref import DiffEndpointRef

# TODO update the JSON string below
json = "{}"
# create an instance of DiffEndpointRef from a JSON string
diff_endpoint_ref_instance = DiffEndpointRef.from_json(json)
# print the JSON string representation of the object
print(DiffEndpointRef.to_json())

# convert the object into a dict
diff_endpoint_ref_dict = diff_endpoint_ref_instance.to_dict()
# create an instance of DiffEndpointRef from a dict
diff_endpoint_ref_from_dict = DiffEndpointRef.from_dict(diff_endpoint_ref_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


