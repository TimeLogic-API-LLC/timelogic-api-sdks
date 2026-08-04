# UtilityApi

All URIs are relative to *https://api.timelogicapi.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getPublicSigningKey**](UtilityApi.md#getPublicSigningKey) | **GET** /.well-known/time-api-public-key | Public signing key set |


<a id="getPublicSigningKey"></a>
# **getPublicSigningKey**
> JwksResponse getPublicSigningKey(kid)

Public signing key set

Unauthenticated JWKS endpoint for verifying signed JSON responses.  The public gateway proxies this route to the dedicated &#x60;time-signing&#x60; worker. For compatibility with client tooling, the gateway serves the JWKS body as standard &#x60;application/json&#x60;.  Use this endpoint together with the detached signature headers returned on supported &#x60;sign&#x3D;true&#x60; JSON responses: - &#x60;X-TimeLogic-Key-Id&#x60; - &#x60;X-TimeLogic-Signature&#x60; - &#x60;X-TimeLogic-Signature-Alg&#x60; - &#x60;X-TimeLogic-Signature-Timestamp&#x60; - &#x60;X-TimeLogic-Content-SHA256&#x60; - &#x60;X-TimeLogic-Signature-Input&#x60; &#x60;X-TimeLogic-Signature-Input&#x60; is the exact Base64URL-encoded UTF-8 &#x60;v1&#x60; envelope. It signs the path and query (including &#x60;sign&#x3D;true&#x60;), but deliberately excludes the scheme, host, and &#x60;Content-Type&#x60; so proxy normalization cannot change the signed bytes.  Behavior: - without a query string, the response returns the full retained JWKS set - the active Ed25519 key is listed first - &#x60;kid&#x3D;&lt;key-id&gt;&#x60; returns only the matching retained public key - historical public keys may remain published after rotation so older signed responses can still be verified

### Example
```java
// Import classes:
import com.timelogic.direct.ApiClient;
import com.timelogic.direct.ApiException;
import com.timelogic.direct.Configuration;
import com.timelogic.direct.models.*;
import com.timelogic.direct.api.UtilityApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://api.timelogicapi.com");

    UtilityApi apiInstance = new UtilityApi(defaultClient);
    String kid = "kid_example"; // String | Optional signing key identifier filter, for example `ed25519-2026-07-19`. When present, the response returns only the matching retained public key.
    try {
      JwksResponse result = apiInstance.getPublicSigningKey(kid);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling UtilityApi#getPublicSigningKey");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters

| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **kid** | **String**| Optional signing key identifier filter, for example &#x60;ed25519-2026-07-19&#x60;. When present, the response returns only the matching retained public key. | [optional] |

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

