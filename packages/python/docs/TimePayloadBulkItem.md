# TimePayloadBulkItem

One bulk array item, either a successful time payload or a per-item bulk error.

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
**error** | [**ApiError**](ApiError.md) |  |
**request_id** | **str** |  |
**timestamp** | **datetime** | Intentionally omitted from public API error responses to avoid exposing request timing; use request_id for support correlation. | [optional]
**item** | **str** |  |

## Example

```python
from timelogic_direct_api.models.time_payload_bulk_item import TimePayloadBulkItem

# TODO update the JSON string below
json = "{}"
# create an instance of TimePayloadBulkItem from a JSON string
time_payload_bulk_item_instance = TimePayloadBulkItem.from_json(json)
# print the JSON string representation of the object
print(TimePayloadBulkItem.to_json())

# convert the object into a dict
time_payload_bulk_item_dict = time_payload_bulk_item_instance.to_dict()
# create an instance of TimePayloadBulkItem from a dict
time_payload_bulk_item_from_dict = TimePayloadBulkItem.from_dict(time_payload_bulk_item_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


