# \UtilityApi

All URIs are relative to *https://api.timelogicapi.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**get_public_signing_key**](UtilityApi.md#get_public_signing_key) | **GET** /.well-known/time-api-public-key | Public signing key set



## get_public_signing_key

> models::JwksResponse get_public_signing_key(kid)
Public signing key set

Unauthenticated JWKS endpoint for verifying signed JSON responses.  The public gateway proxies this route to the dedicated `time-signing` worker. For compatibility with client tooling, the gateway serves the JWKS body as standard `application/json`.  Use this endpoint together with the detached signature headers returned on supported `sign=true` JSON responses: - `X-TimeLogic-Key-Id` - `X-TimeLogic-Signature` - `X-TimeLogic-Signature-Alg` - `X-TimeLogic-Signature-Timestamp` - `X-TimeLogic-Content-SHA256` - `X-TimeLogic-Signature-Input` `X-TimeLogic-Signature-Input` is the exact Base64URL-encoded UTF-8 `v1` envelope. It signs the path and query (including `sign=true`), but deliberately excludes the scheme, host, and `Content-Type` so proxy normalization cannot change the signed bytes.  Behavior: - without a query string, the response returns the full retained JWKS set - the active Ed25519 key is listed first - `kid=<key-id>` returns only the matching retained public key - historical public keys may remain published after rotation so older signed responses can still be verified

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**kid** | Option<**String**> | Optional signing key identifier filter, for example `ed25519-2026-07-19`. When present, the response returns only the matching retained public key. |  |

### Return type

[**models::JwksResponse**](JwksResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

