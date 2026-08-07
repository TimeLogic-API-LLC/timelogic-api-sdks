# TimeLogic::Api::CalendarResponse

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
| **year** | **Integer** |  |  |
| **month** | **Integer** |  |  |
| **month_name** | **String** |  |  |
| **day** | **Integer** |  |  |
| **week_number** | **Integer** |  | [optional] |

## Example

```ruby
require 'timelogic-api'

instance = TimeLogic::Api::CalendarResponse.new(
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
  formatted: null,
  year: null,
  month: null,
  month_name: null,
  day: null,
  week_number: null
)
```

