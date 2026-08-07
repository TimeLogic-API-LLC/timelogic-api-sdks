# TimeLogic::Api::JwkKey

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **kty** | **String** |  |  |
| **crv** | **String** |  |  |
| **alg** | **String** |  |  |
| **use** | **String** |  |  |
| **kid** | **String** |  |  |
| **x** | **String** |  |  |

## Example

```ruby
require 'timelogic-api'

instance = TimeLogic::Api::JwkKey.new(
  kty: null,
  crv: null,
  alg: null,
  use: null,
  kid: ed25519-2026-07-19,
  x: null
)
```

