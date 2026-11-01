# CalendarResponse


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
**year** | **int** |  |
**month** | **int** |  |
**month_name** | **str** |  |
**day** | **int** |  |
**week_number** | **int** | ISO 8601 week number (present with &#x60;week&#x3D;true&#x60;). It belongs to the ISO week-year, which is not returned and can differ from &#x60;year&#x60; near January 1 (2027-01-01 is week 53 of 2026). | [optional]

## Example

```python
from timelogic_direct_api.models.calendar_response import CalendarResponse

# TODO update the JSON string below
json = "{}"
# create an instance of CalendarResponse from a JSON string
calendar_response_instance = CalendarResponse.from_json(json)
# print the JSON string representation of the object
print(CalendarResponse.to_json())

# convert the object into a dict
calendar_response_dict = calendar_response_instance.to_dict()
# create an instance of CalendarResponse from a dict
calendar_response_from_dict = CalendarResponse.from_dict(calendar_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


