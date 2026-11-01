# DstResponse


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
**dst_active** | **bool** |  |
**next_transition** | **datetime** | Present only with &#x60;next&#x3D;true&#x60;. The instant of the next UTC offset change, written in the offset in force before it (e.g. &#x60;2026-11-01T02:00:00-04:00&#x60;); the new offset is not returned. &#x60;null&#x60; when no change is scheduled, for offset targets and with no selector. Tracks offset changes only, so &#x60;dst_active&#x60; can change without one. | [optional]

## Example

```python
from timelogic_direct_api.models.dst_response import DstResponse

# TODO update the JSON string below
json = "{}"
# create an instance of DstResponse from a JSON string
dst_response_instance = DstResponse.from_json(json)
# print the JSON string representation of the object
print(DstResponse.to_json())

# convert the object into a dict
dst_response_dict = dst_response_instance.to_dict()
# create an instance of DstResponse from a dict
dst_response_from_dict = DstResponse.from_dict(dst_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


