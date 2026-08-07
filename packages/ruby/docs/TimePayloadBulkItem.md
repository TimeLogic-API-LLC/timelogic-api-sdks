# TimeLogic::Api::TimePayloadBulkItem

## Class instance methods

### `openapi_one_of`

Returns the list of classes defined in oneOf.

#### Example

```ruby
require 'timelogic-api'

TimeLogic::Api::TimePayloadBulkItem.openapi_one_of
# =>
# [
#   :'BulkError',
#   :'TimePayload'
# ]
```

### build

Find the appropriate object from the `openapi_one_of` list and casts the data into it.

#### Example

```ruby
require 'timelogic-api'

TimeLogic::Api::TimePayloadBulkItem.build(data)
# => #<BulkError:0x00007fdd4aab02a0>

TimeLogic::Api::TimePayloadBulkItem.build(data_that_doesnt_match)
# => nil
```

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| **data** | **Mixed** | data to be matched against the list of oneOf items |

#### Return type

- `BulkError`
- `TimePayload`
- `nil` (if no type matches)

