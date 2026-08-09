# TimeLogic\Api\UtilityApi

All URIs are relative to https://api.timelogicapi.com, except if the operation defines another base path.

| Method | HTTP request | Description |
| ------------- | ------------- | ------------- |
| [**getPublicSigningKey()**](UtilityApi.md#getPublicSigningKey) | **GET** /.well-known/time-api-public-key | Public signing key set |


## `getPublicSigningKey()`

```php
getPublicSigningKey($kid): \TimeLogic\Api\Model\JwksResponse
```

Public signing key set

Unauthenticated JWKS endpoint for verifying signed JSON responses.  The public gateway proxies this route to the dedicated `time-signing` worker. For compatibility with client tooling, the gateway serves the JWKS body as standard `application/json`.  Use this endpoint together with the detached signature headers returned on supported `sign=true` JSON responses: - `X-TimeLogic-Key-Id` - `X-TimeLogic-Signature` - `X-TimeLogic-Signature-Alg` - `X-TimeLogic-Signature-Timestamp` - `X-TimeLogic-Content-SHA256` - `X-TimeLogic-Signature-Input` `X-TimeLogic-Signature-Input` is the exact Base64URL-encoded UTF-8 `v1` envelope. It signs the path and query (including `sign=true`), but deliberately excludes the scheme, host, and `Content-Type` so proxy normalization cannot change the signed bytes.  Behavior: - without a query string, the response returns the full retained JWKS set - the active Ed25519 key is listed first - `kid=<key-id>` returns only the matching retained public key - historical public keys may remain published after rotation so older signed responses can still be verified

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');



$apiInstance = new TimeLogic\Api\Api\UtilityApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client()
);
$kid = 'kid_example'; // string | Optional signing key identifier filter, for example `ed25519-2026-07-19`. When present, the response returns only the matching retained public key.

try {
    $result = $apiInstance->getPublicSigningKey($kid);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling UtilityApi->getPublicSigningKey: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

| Name | Type | Description  | Notes |
| ------------- | ------------- | ------------- | ------------- |
| **kid** | **string**| Optional signing key identifier filter, for example &#x60;ed25519-2026-07-19&#x60;. When present, the response returns only the matching retained public key. | [optional] |

### Return type

[**\TimeLogic\Api\Model\JwksResponse**](../Model/JwksResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)
