# TimePayloadBulkResponse

Bulk response array returned when `/v1/time/current` or `/v1/time/convert` receives one comma-separated `tz`, `ip`, or `offset` selector.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------

## Example

```python
from timelogic_direct_api.models.time_payload_bulk_response import TimePayloadBulkResponse

# TODO update the JSON string below
json = "{}"
# create an instance of TimePayloadBulkResponse from a JSON string
time_payload_bulk_response_instance = TimePayloadBulkResponse.from_json(json)
# print the JSON string representation of the object
print(TimePayloadBulkResponse.to_json())

# convert the object into a dict
time_payload_bulk_response_dict = time_payload_bulk_response_instance.to_dict()
# create an instance of TimePayloadBulkResponse from a dict
time_payload_bulk_response_from_dict = TimePayloadBulkResponse.from_dict(time_payload_bulk_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


