# JwkKey


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**kty** | **str** |  | 
**crv** | **str** |  | 
**alg** | **str** |  | 
**use** | **str** |  | 
**kid** | **str** |  | 
**x** | **str** |  | 

## Example

```python
from timelogic_direct_api.models.jwk_key import JwkKey

# TODO update the JSON string below
json = "{}"
# create an instance of JwkKey from a JSON string
jwk_key_instance = JwkKey.from_json(json)
# print the JSON string representation of the object
print(JwkKey.to_json())

# convert the object into a dict
jwk_key_dict = jwk_key_instance.to_dict()
# create an instance of JwkKey from a dict
jwk_key_from_dict = JwkKey.from_dict(jwk_key_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


