# TimeLogic::Api::TimezoneMatch

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **timezone** | **String** | IANA timezone name. |  |
| **offset** | **Integer** | Current UTC offset of the zone in minutes. |  |
| **dst** | **Boolean** | Whether daylight saving time is currently in effect in the zone. |  |

## Example

```ruby
require 'timelogic-api'

instance = TimeLogic::Api::TimezoneMatch.new(
  timezone: null,
  offset: null,
  dst: null
)
```

