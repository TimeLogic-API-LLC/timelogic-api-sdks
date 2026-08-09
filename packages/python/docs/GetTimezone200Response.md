# GetTimezone200Response


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
**offset** | **int** |  |
**dst** | **bool** |  |
**matching_zones** | [**List[TimezoneMatch]**](TimezoneMatch.md) |  |

## Example

```python
from timelogic_direct_api.models.get_timezone200_response import GetTimezone200Response

# TODO update the JSON string below
json = "{}"
# create an instance of GetTimezone200Response from a JSON string
get_timezone200_response_instance = GetTimezone200Response.from_json(json)
# print the JSON string representation of the object
print(GetTimezone200Response.to_json())

# convert the object into a dict
get_timezone200_response_dict = get_timezone200_response_instance.to_dict()
# create an instance of GetTimezone200Response from a dict
get_timezone200_response_from_dict = GetTimezone200Response.from_dict(get_timezone200_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


