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
| **day_number** | **Integer** | Day of the week counted from Sunday (1 &#x3D; Sunday, 2 &#x3D; Monday ... 7 &#x3D; Saturday). |  |
| **day_short** | **String** |  |  |
| **day_full** | **String** |  |  |
| **timezone** | **String** |  |  |
| **formatted** | **String** |  | [optional] |
| **year** | **Integer** |  |  |
| **month** | **Integer** |  |  |
| **month_name** | **String** |  |  |
| **day** | **Integer** |  |  |
| **week_number** | **Integer** | ISO 8601 week number (present with &#x60;week&#x3D;true&#x60;). It belongs to the ISO week-year, which is not returned and can differ from &#x60;year&#x60; near January 1 (2027-01-01 is week 53 of 2026). | [optional] |

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

