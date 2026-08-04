# JwksResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**keys** | [**List[JwkKey]**](JwkKey.md) |  | 

## Example

```python
from timelogic_direct_api.models.jwks_response import JwksResponse

# TODO update the JSON string below
json = "{}"
# create an instance of JwksResponse from a JSON string
jwks_response_instance = JwksResponse.from_json(json)
# print the JSON string representation of the object
print(JwksResponse.to_json())

# convert the object into a dict
jwks_response_dict = jwks_response_instance.to_dict()
# create an instance of JwksResponse from a dict
jwks_response_from_dict = JwksResponse.from_dict(jwks_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


