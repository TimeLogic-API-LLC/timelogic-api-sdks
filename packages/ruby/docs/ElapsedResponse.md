# TimeLogic::DirectApi::ElapsedResponse

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **seconds** | **Integer** |  |  |
| **minutes** | **Integer** |  |  |
| **hours** | **Integer** |  |  |
| **days** | **Integer** |  |  |
| **human** | **String** |  |  |
| **direction** | **String** | &#x60;left&#x60; means the target instant is still in the future. &#x60;passed&#x60; means the target instant is already in the past. |  |
| **formatted** | **String** |  | [optional] |
| **business_days** | **Integer** |  | [optional] |

## Example

```ruby
require 'timelogic-direct-api'

instance = TimeLogic::DirectApi::ElapsedResponse.new(
  seconds: null,
  minutes: null,
  hours: null,
  days: null,
  human: null,
  direction: null,
  formatted: null,
  business_days: null
)
```

