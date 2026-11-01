# TimeLogic::Api::ElapsedResponse

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **seconds** | **Integer** |  |  |
| **minutes** | **Integer** |  |  |
| **hours** | **Integer** |  |  |
| **days** | **Integer** |  |  |
| **human** | **String** |  |  |
| **direction** | **String** | &#x60;left&#x60; means the reference instant is after the compared instant (now, or &#x60;compare_*&#x60;). &#x60;passed&#x60; means it is before it, or equal to it. |  |
| **formatted** | **String** |  | [optional] |
| **business_days** | **Integer** |  | [optional] |

## Example

```ruby
require 'timelogic-api'

instance = TimeLogic::Api::ElapsedResponse.new(
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

