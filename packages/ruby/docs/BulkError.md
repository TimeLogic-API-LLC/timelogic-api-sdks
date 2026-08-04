# TimeLogic::DirectApi::BulkError

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **error** | [**ApiError**](ApiError.md) |  |  |
| **request_id** | **String** |  |  |
| **timestamp** | **Time** | Intentionally omitted from public API error responses to avoid exposing request timing; use request_id for support correlation. | [optional] |
| **item** | **String** |  |  |

## Example

```ruby
require 'timelogic-direct-api'

instance = TimeLogic::DirectApi::BulkError.new(
  error: null,
  request_id: null,
  timestamp: null,
  item: null
)
```

