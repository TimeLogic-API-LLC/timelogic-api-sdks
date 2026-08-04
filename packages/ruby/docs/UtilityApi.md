# TimeLogic::DirectApi::UtilityApi

All URIs are relative to *https://api.timelogicapi.com*

| Method | HTTP request | Description |
| ------ | ------------ | ----------- |
| [**get_public_signing_key**](UtilityApi.md#get_public_signing_key) | **GET** /.well-known/time-api-public-key | Public signing key set |


## get_public_signing_key

> <JwksResponse> get_public_signing_key(opts)

Public signing key set

Unauthenticated JWKS endpoint for verifying signed JSON responses.  The public gateway proxies this route to the dedicated `time-signing` worker. For compatibility with client tooling, the gateway serves the JWKS body as standard `application/json`.  Use this endpoint together with the detached signature headers returned on supported `sign=true` JSON responses: - `X-TimeLogic-Key-Id` - `X-TimeLogic-Signature` - `X-TimeLogic-Signature-Alg` - `X-TimeLogic-Signature-Timestamp` - `X-TimeLogic-Content-SHA256` - `X-TimeLogic-Signature-Input` `X-TimeLogic-Signature-Input` is the exact Base64URL-encoded UTF-8 `v1` envelope. It signs the path and query (including `sign=true`), but deliberately excludes the scheme, host, and `Content-Type` so proxy normalization cannot change the signed bytes.  Behavior: - without a query string, the response returns the full retained JWKS set - the active Ed25519 key is listed first - `kid=<key-id>` returns only the matching retained public key - historical public keys may remain published after rotation so older signed responses can still be verified

### Examples

```ruby
require 'time'
require 'timelogic-direct-api'

api_instance = TimeLogic::DirectApi::UtilityApi.new
opts = {
  kid: 'kid_example' # String | Optional signing key identifier filter, for example `ed25519-2026-07-19`. When present, the response returns only the matching retained public key.
}

begin
  # Public signing key set
  result = api_instance.get_public_signing_key(opts)
  p result
rescue TimeLogic::DirectApi::ApiError => e
  puts "Error when calling UtilityApi->get_public_signing_key: #{e}"
end
```

#### Using the get_public_signing_key_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<JwksResponse>, Integer, Hash)> get_public_signing_key_with_http_info(opts)

```ruby
begin
  # Public signing key set
  data, status_code, headers = api_instance.get_public_signing_key_with_http_info(opts)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <JwksResponse>
rescue TimeLogic::DirectApi::ApiError => e
  puts "Error when calling UtilityApi->get_public_signing_key_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **kid** | **String** | Optional signing key identifier filter, for example &#x60;ed25519-2026-07-19&#x60;. When present, the response returns only the matching retained public key. | [optional] |

### Return type

[**JwksResponse**](JwksResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

