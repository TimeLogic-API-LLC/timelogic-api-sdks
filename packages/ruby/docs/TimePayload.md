# TimeLogic::Api::TimePayload

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **unix** | **Integer** |  |  |
| **unix_ms** | **Integer** |  |  |
| **utc** | **Time** |  |  |
| **iso_local** | **String** |  |  |
| **rfc2822** | **String** |  |  |
| **human** | **String** |  |  |
| **day_number** | **Integer** |  |  |
| **day_short** | **String** |  |  |
| **day_full** | **String** |  |  |
| **timezone** | **String** |  |  |
| **formatted** | **String** |  | [optional] |

## Example

```ruby
require 'timelogic-api'

instance = TimeLogic::Api::TimePayload.new(
  unix: null,
  unix_ms: null,
  utc: null,
  iso_local: null,
  rfc2822: null,
  human: null,
  day_number: null,
  day_short: null,
  day_full: null,
  timezone: null,
  formatted: null
)
```

