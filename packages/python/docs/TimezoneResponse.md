# TimezoneResponse

Timezone lookup result. It is the time payload for the resolved target plus `offset` (minutes east of UTC) and `dst`.  Every selector returns this one shape. `tz`, `ip`, `lat` + `lon` and `auto_tz` lookups resolve a named zone, so `timezone` is set and `matching_zones` is absent. `offset` lookups return `timezone=null` and add `matching_zones`, the geographic zones whose current offset equals the requested one.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**unix** | **int** |  |
**unix_ms** | **int** |  |
**utc** | **datetime** |  |
**iso_local** | **str** |  |
**rfc2822** | **str** |  |
**human** | **str** |  |
**day_number** | **int** | Day of the week counted from Sunday (1 &#x3D; Sunday, 2 &#x3D; Monday ... 7 &#x3D; Saturday). |
**day_short** | **str** |  |
**day_full** | **str** |  |
**timezone** | **str** |  |
**formatted** | **str** |  | [optional]
**offset** | **int** | UTC offset of the resolved target in minutes, for example &#x60;-240&#x60; for UTC-04:00. |
**dst** | **bool** | Whether daylight saving time is in effect for the resolved target. Always &#x60;false&#x60; for &#x60;offset&#x60; lookups. |
**offset_seconds** | **int** | Exact UTC offset in seconds. Present only when the resolved offset has a seconds part (historical local mean time); no zone has one at the current instant, so lookups today do not include it. | [optional]
**matching_zones** | [**List[TimezoneMatch]**](TimezoneMatch.md) | Present only for &#x60;offset&#x3D;&#x60; lookups. The geographic zones whose current offset equals the requested one. &#x60;UTC&#x60; and &#x60;Etc/*&#x60; zones are intentionally excluded; use &#x60;tz&#x3D;UTC&#x60; for UTC. | [optional]

## Example

```python
from timelogic_direct_api.models.timezone_response import TimezoneResponse

# TODO update the JSON string below
json = "{}"
# create an instance of TimezoneResponse from a JSON string
timezone_response_instance = TimezoneResponse.from_json(json)
# print the JSON string representation of the object
print(TimezoneResponse.to_json())

# convert the object into a dict
timezone_response_dict = timezone_response_instance.to_dict()
# create an instance of TimezoneResponse from a dict
timezone_response_from_dict = TimezoneResponse.from_dict(timezone_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


