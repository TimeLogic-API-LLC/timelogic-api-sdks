# \UtilityAPI

All URIs are relative to *https://api.timelogicapi.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**GetPublicSigningKey**](UtilityAPI.md#GetPublicSigningKey) | **Get** /.well-known/time-api-public-key | Public signing key set



## GetPublicSigningKey

> JwksResponse GetPublicSigningKey(ctx).Kid(kid).Execute()

Public signing key set



### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/TimeLogic-API-LLC/timelogic-api-sdks/packages/go"
)

func main() {
	kid := "kid_example" // string | Optional signing key identifier filter, for example `ed25519-2026-07-19`. When present, the response returns only the matching retained public key. (optional)

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.UtilityAPI.GetPublicSigningKey(context.Background()).Kid(kid).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `UtilityAPI.GetPublicSigningKey``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetPublicSigningKey`: JwksResponse
	fmt.Fprintf(os.Stdout, "Response from `UtilityAPI.GetPublicSigningKey`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiGetPublicSigningKeyRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **kid** | **string** | Optional signing key identifier filter, for example &#x60;ed25519-2026-07-19&#x60;. When present, the response returns only the matching retained public key. | 

### Return type

[**JwksResponse**](JwksResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

