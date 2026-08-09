# TimePayload

Canonical single-target time payload.

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

## Example

```python
from timelogic_direct_api.models.time_payload import TimePayload

# TODO update the JSON string below
json = "{}"
# create an instance of TimePayload from a JSON string
time_payload_instance = TimePayload.from_json(json)
# print the JSON string representation of the object
print(TimePayload.to_json())

# convert the object into a dict
time_payload_dict = time_payload_instance.to_dict()
# create an instance of TimePayload from a dict
time_payload_from_dict = TimePayload.from_dict(time_payload_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


