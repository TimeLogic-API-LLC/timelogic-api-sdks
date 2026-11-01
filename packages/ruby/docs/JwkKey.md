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
| **key_ops** | **Array&lt;String&gt;** | Permitted key operations; published keys allow only &#x60;verify&#x60;. | [optional] |
| **ext** | **Boolean** | JWK extractable flag as exported by the signing worker; always &#x60;true&#x60;. | [optional] |

## Example

```ruby
require 'timelogic-api'

instance = TimeLogic::Api::JwkKey.new(
  kty: null,
  crv: null,
  alg: null,
  use: null,
  kid: ed25519-2026-07-19,
  x: null,
  key_ops: null,
  ext: null
)
```

