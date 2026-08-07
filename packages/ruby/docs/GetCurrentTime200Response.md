# TimeLogic::Api::GetCurrentTime200Response

## Class instance methods

### `openapi_one_of`

Returns the list of classes defined in oneOf.

#### Example

```ruby
require 'timelogic-api'

TimeLogic::Api::GetCurrentTime200Response.openapi_one_of
# =>
# [
#   :'TimePayload',
#   :'TimePayloadBulkResponse'
# ]
```

### build

Find the appropriate object from the `openapi_one_of` list and casts the data into it.

#### Example

```ruby
require 'timelogic-api'

TimeLogic::Api::GetCurrentTime200Response.build(data)
# => #<TimePayload:0x00007fdd4aab02a0>

TimeLogic::Api::GetCurrentTime200Response.build(data_that_doesnt_match)
# => nil
```

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| **data** | **Mixed** | data to be matched against the list of oneOf items |

#### Return type

- `TimePayload`
- `TimePayloadBulkResponse`
- `nil` (if no type matches)

