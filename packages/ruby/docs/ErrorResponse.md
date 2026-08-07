# TimeLogic::Api::ErrorResponse

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **error** | [**ApiError**](ApiError.md) |  |  |
| **request_id** | **String** |  |  |
| **timestamp** | **Time** | Intentionally omitted from public API error responses to avoid exposing request timing; use request_id for support correlation. | [optional] |

## Example

```ruby
require 'timelogic-api'

instance = TimeLogic::Api::ErrorResponse.new(
  error: null,
  request_id: null,
  timestamp: null
)
```

