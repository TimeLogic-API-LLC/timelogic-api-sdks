# TimeLogic::DirectApi::GetTimezone200Response

## Class instance methods

### `openapi_one_of`

Returns the list of classes defined in oneOf.

#### Example

```ruby
require 'timelogic-direct-api'

TimeLogic::DirectApi::GetTimezone200Response.openapi_one_of
# =>
# [
#   :'TimezoneOffsetResponse',
#   :'TimezoneResolvedResponse'
# ]
```

### build

Find the appropriate object from the `openapi_one_of` list and casts the data into it.

#### Example

```ruby
require 'timelogic-direct-api'

TimeLogic::DirectApi::GetTimezone200Response.build(data)
# => #<TimezoneOffsetResponse:0x00007fdd4aab02a0>

TimeLogic::DirectApi::GetTimezone200Response.build(data_that_doesnt_match)
# => nil
```

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| **data** | **Mixed** | data to be matched against the list of oneOf items |

#### Return type

- `TimezoneOffsetResponse`
- `TimezoneResolvedResponse`
- `nil` (if no type matches)

