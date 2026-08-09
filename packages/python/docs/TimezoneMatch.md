# TimezoneMatch


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
from timelogic_direct_api.models.timezone_match import TimezoneMatch

# TODO update the JSON string below
json = "{}"
# create an instance of TimezoneMatch from a JSON string
timezone_match_instance = TimezoneMatch.from_json(json)
# print the JSON string representation of the object
print(TimezoneMatch.to_json())

# convert the object into a dict
timezone_match_dict = timezone_match_instance.to_dict()
# create an instance of TimezoneMatch from a dict
timezone_match_from_dict = TimezoneMatch.from_dict(timezone_match_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


