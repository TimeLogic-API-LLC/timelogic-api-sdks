# TimeLogic.DirectApi.Api.UtilityApi

All URIs are relative to *https://api.timelogicapi.com*

| Method | HTTP request | Description |
|--------|--------------|-------------|
| [**GetPublicSigningKey**](UtilityApi.md#getpublicsigningkey) | **GET** /.well-known/time-api-public-key | Public signing key set |

<a id="getpublicsigningkey"></a>
# **GetPublicSigningKey**
> JwksResponse GetPublicSigningKey (string? kid = null)

Public signing key set

Unauthenticated JWKS endpoint for verifying signed JSON responses.  The public gateway proxies this route to the dedicated `time-signing` worker. For compatibility with client tooling, the gateway serves the JWKS body as standard `application/json`.  Use this endpoint together with the detached signature headers returned on supported `sign=true` JSON responses: - `X-TimeLogic-Key-Id` - `X-TimeLogic-Signature` - `X-TimeLogic-Signature-Alg` - `X-TimeLogic-Signature-Timestamp` - `X-TimeLogic-Content-SHA256` - `X-TimeLogic-Signature-Input` `X-TimeLogic-Signature-Input` is the exact Base64URL-encoded UTF-8 `v1` envelope. It signs the path and query (including `sign=true`), but deliberately excludes the scheme, host, and `Content-Type` so proxy normalization cannot change the signed bytes.  Behavior: - without a query string, the response returns the full retained JWKS set - the active Ed25519 key is listed first - `kid=<key-id>` returns only the matching retained public key - historical public keys may remain published after rotation so older signed responses can still be verified

### Example
```csharp
using System.Collections.Generic;
using System.Diagnostics;
using TimeLogic.DirectApi.Api;
using TimeLogic.DirectApi.Client;
using TimeLogic.DirectApi.Model;

namespace Example
{
    public class GetPublicSigningKeyExample
    {
        public static void Main()
        {
            Configuration config = new Configuration();
            config.BasePath = "https://api.timelogicapi.com";
            var apiInstance = new UtilityApi(config);
            var kid = "kid_example";  // string? | Optional signing key identifier filter, for example `ed25519-2026-07-19`. When present, the response returns only the matching retained public key. (optional) 

            try
            {
                // Public signing key set
                JwksResponse result = apiInstance.GetPublicSigningKey(kid);
                Debug.WriteLine(result);
            }
            catch (ApiException  e)
            {
                Debug.Print("Exception when calling UtilityApi.GetPublicSigningKey: " + e.Message);
                Debug.Print("Status Code: " + e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

#### Using the GetPublicSigningKeyWithHttpInfo variant
This returns an ApiResponse object which contains the response data, status code and headers.

```csharp
try
{
    // Public signing key set
    ApiResponse<JwksResponse> response = apiInstance.GetPublicSigningKeyWithHttpInfo(kid);
    Debug.Write("Status Code: " + response.StatusCode);
    Debug.Write("Response Headers: " + response.Headers);
    Debug.Write("Response Body: " + response.Data);
}
catch (ApiException e)
{
    Debug.Print("Exception when calling UtilityApi.GetPublicSigningKeyWithHttpInfo: " + e.Message);
    Debug.Print("Status Code: " + e.ErrorCode);
    Debug.Print(e.StackTrace);
}
```

### Parameters

| Name | Type | Description | Notes |
|------|------|-------------|-------|
| **kid** | **string?** | Optional signing key identifier filter, for example &#x60;ed25519-2026-07-19&#x60;. When present, the response returns only the matching retained public key. | [optional]  |

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
| **200** | Ed25519 signing key set. The active key is listed first. |  -  |
| **404** | No retained signing key exists for the requested &#x60;kid&#x60;. |  -  |
| **500** | Signing public keys are not configured or could not be loaded. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

