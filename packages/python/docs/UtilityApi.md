# timelogic_direct_api.UtilityApi

All URIs are relative to *https://api.timelogicapi.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**get_public_signing_key**](UtilityApi.md#get_public_signing_key) | **GET** /.well-known/time-api-public-key | Public signing key set


# **get_public_signing_key**
> JwksResponse get_public_signing_key(kid=kid)

Public signing key set

Unauthenticated JWKS endpoint for verifying signed JSON responses.  The public gateway proxies this route to the dedicated `time-signing` worker. For compatibility with client tooling, the gateway serves the JWKS body as standard `application/json`.  Use this endpoint together with the detached signature headers returned on supported `sign=true` JSON responses: - `X-TimeLogic-Key-Id` - `X-TimeLogic-Signature` - `X-TimeLogic-Signature-Alg` - `X-TimeLogic-Signature-Timestamp` - `X-TimeLogic-Content-SHA256` - `X-TimeLogic-Signature-Input` `X-TimeLogic-Signature-Input` is the exact Base64URL-encoded UTF-8 `v1` envelope. It signs the path and query (including `sign=true`), but deliberately excludes the scheme, host, and `Content-Type` so proxy normalization cannot change the signed bytes.  Behavior: - without a query string, the response returns the full retained JWKS set - the active Ed25519 key is listed first - `kid=<key-id>` returns only the matching retained public key - historical public keys may remain published after rotation so older signed responses can still be verified

### Example


```python
import timelogic_direct_api
from timelogic_direct_api.models.jwks_response import JwksResponse
from timelogic_direct_api.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://api.timelogicapi.com
# See configuration.py for a list of all supported configuration parameters.
configuration = timelogic_direct_api.Configuration(
    host = "https://api.timelogicapi.com"
)


# Enter a context with an instance of the API client
with timelogic_direct_api.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = timelogic_direct_api.UtilityApi(api_client)
    kid = 'kid_example' # str | Optional signing key identifier filter, for example `ed25519-2026-07-19`. When present, the response returns only the matching retained public key. (optional)

    try:
        # Public signing key set
        api_response = api_instance.get_public_signing_key(kid=kid)
        print("The response of UtilityApi->get_public_signing_key:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling UtilityApi->get_public_signing_key: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **kid** | **str**| Optional signing key identifier filter, for example &#x60;ed25519-2026-07-19&#x60;. When present, the response returns only the matching retained public key. | [optional]

### Return type

[**JwksResponse**](JwksResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Ed25519 signing key set. The active key is listed first. |  -  |
**404** | No retained signing key exists for the requested &#x60;kid&#x60;. |  -  |
**500** | Signing public keys are not configured or could not be loaded. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

