# TimeLogic::Api::TimezoneResponse

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
| **offset** | **Integer** | UTC offset of the resolved target in minutes, for example &#x60;-240&#x60; for UTC-04:00. |  |
| **dst** | **Boolean** | Whether daylight saving time is in effect for the resolved target. Always &#x60;false&#x60; for &#x60;offset&#x60; lookups. |  |
| **offset_seconds** | **Integer** | Exact UTC offset in seconds. Present only when the resolved offset has a seconds part (historical local mean time); no zone has one at the current instant, so lookups today do not include it. | [optional] |
| **matching_zones** | [**Array&lt;TimezoneMatch&gt;**](TimezoneMatch.md) | Present only for &#x60;offset&#x3D;&#x60; lookups. The geographic zones whose current offset equals the requested one. &#x60;UTC&#x60; and &#x60;Etc/*&#x60; zones are intentionally excluded; use &#x60;tz&#x3D;UTC&#x60; for UTC. | [optional] |

## Example

```ruby
require 'timelogic-api'

instance = TimeLogic::Api::TimezoneResponse.new(
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
  offset: null,
  dst: null,
  offset_seconds: null,
  matching_zones: null
)
```

