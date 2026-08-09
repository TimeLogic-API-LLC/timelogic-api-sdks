# TimezoneResolvedResponse

Standard single-target timezone resolution payload.

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

## Example

```python
from timelogic_direct_api.models.timezone_resolved_response import TimezoneResolvedResponse

# TODO update the JSON string below
json = "{}"
# create an instance of TimezoneResolvedResponse from a JSON string
timezone_resolved_response_instance = TimezoneResolvedResponse.from_json(json)
# print the JSON string representation of the object
print(TimezoneResolvedResponse.to_json())

# convert the object into a dict
timezone_resolved_response_dict = timezone_resolved_response_instance.to_dict()
# create an instance of TimezoneResolvedResponse from a dict
timezone_resolved_response_from_dict = TimezoneResolvedResponse.from_dict(timezone_resolved_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


