# TimezoneOffsetResponse

Offset-based timezone lookup result with `matching_zones` for the current request-time offset match.

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
from timelogic_direct_api.models.timezone_offset_response import TimezoneOffsetResponse

# TODO update the JSON string below
json = "{}"
# create an instance of TimezoneOffsetResponse from a JSON string
timezone_offset_response_instance = TimezoneOffsetResponse.from_json(json)
# print the JSON string representation of the object
print(TimezoneOffsetResponse.to_json())

# convert the object into a dict
timezone_offset_response_dict = timezone_offset_response_instance.to_dict()
# create an instance of TimezoneOffsetResponse from a dict
timezone_offset_response_from_dict = TimezoneOffsetResponse.from_dict(timezone_offset_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


