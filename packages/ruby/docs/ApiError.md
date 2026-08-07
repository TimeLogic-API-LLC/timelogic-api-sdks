# TimeLogic::Api::ApiError

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **code** | **String** |  |  |
| **message** | **String** |  |  |
| **details** | **Object** | Optional implementation-specific detail payload. | [optional] |

## Example

```ruby
require 'timelogic-api'

instance = TimeLogic::Api::ApiError.new(
  code: null,
  message: null,
  details: null
)
```

