# TimeLogic::Api::TimezoneOffsetResponse

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
| **offset** | **Integer** |  |  |
| **dst** | **Boolean** |  |  |
| **matching_zones** | [**Array&lt;TimezoneMatch&gt;**](TimezoneMatch.md) | For &#x60;offset&#x3D;&#x60; lookups, the geographic zones whose current offset equals the requested one. &#x60;UTC&#x60; and &#x60;Etc/*&#x60; zones are intentionally excluded; use &#x60;tz&#x3D;UTC&#x60; for UTC. |  |

## Example

```ruby
require 'timelogic-api'

instance = TimeLogic::Api::TimezoneOffsetResponse.new(
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
  matching_zones: null
)
```

