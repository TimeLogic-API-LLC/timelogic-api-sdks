# BulkError

Per-item error wrapper used inside bulk arrays returned by bulk-capable routes.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**error** | [**ApiError**](ApiError.md) |  |
**request_id** | **str** |  |
**timestamp** | **datetime** | Intentionally omitted from public API error responses to avoid exposing request timing; use request_id for support correlation. | [optional]
**item** | **str** |  |

## Example

```python
from timelogic_direct_api.models.bulk_error import BulkError

# TODO update the JSON string below
json = "{}"
# create an instance of BulkError from a JSON string
bulk_error_instance = BulkError.from_json(json)
# print the JSON string representation of the object
print(BulkError.to_json())

# convert the object into a dict
bulk_error_dict = bulk_error_instance.to_dict()
# create an instance of BulkError from a dict
bulk_error_from_dict = BulkError.from_dict(bulk_error_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


