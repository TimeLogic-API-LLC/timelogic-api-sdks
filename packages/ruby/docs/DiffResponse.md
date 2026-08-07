# TimeLogic::Api::DiffResponse

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **seconds** | **Integer** |  |  |
| **minutes** | **Integer** |  |  |
| **hours** | **Integer** |  |  |
| **days** | **Integer** |  |  |
| **direction** | **String** | &#x60;forward&#x60; means &#x60;to&#x60; is after &#x60;from&#x60;. &#x60;backward&#x60; means &#x60;to&#x60; is before &#x60;from&#x60;. &#x60;same&#x60; means both sides resolve to the same instant. |  |
| **human** | **String** |  |  |
| **formatted** | **String** |  | [optional] |
| **business_days** | **Integer** |  | [optional] |
| **from** | [**DiffEndpointRef**](DiffEndpointRef.md) |  |  |
| **to** | [**DiffEndpointRef**](DiffEndpointRef.md) |  |  |

## Example

```ruby
require 'timelogic-api'

instance = TimeLogic::Api::DiffResponse.new(
  seconds: null,
  minutes: null,
  hours: null,
  days: null,
  direction: null,
  human: null,
  formatted: null,
  business_days: null,
  from: null,
  to: null
)
```

