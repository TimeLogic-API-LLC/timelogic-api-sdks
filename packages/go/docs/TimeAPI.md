# \TimeAPI

All URIs are relative to *https://api.timelogicapi.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**AddTime**](TimeAPI.md#AddTime) | **Get** /v1/time/add | Add modifiers to a timestamp
[**ConvertTime**](TimeAPI.md#ConvertTime) | **Get** /v1/time/convert | Convert a timestamp into a target timezone or offset
[**DiffTime**](TimeAPI.md#DiffTime) | **Get** /v1/time/diff | Difference between two instants
[**GetCalendar**](TimeAPI.md#GetCalendar) | **Get** /v1/time/calendar | Calendar projection for a target instant
[**GetClock**](TimeAPI.md#GetClock) | **Get** /v1/time/clock | Render a live HTML clock
[**GetCurrentTime**](TimeAPI.md#GetCurrentTime) | **Get** /v1/time/current | Get the current time for a target
[**GetDst**](TimeAPI.md#GetDst) | **Get** /v1/time/dst | Daylight-saving status for a target
[**GetElapsed**](TimeAPI.md#GetElapsed) | **Get** /v1/time/elapsed | Time elapsed since or remaining until a reference instant
[**GetTimezone**](TimeAPI.md#GetTimezone) | **Get** /v1/timezone | Resolve timezone information for a target



## AddTime

> TimePayload AddTime(ctx).Unix(unix).UnixMs(unixMs).Iso(iso).SourceTz(sourceTz).SourceIp(sourceIp).SourceLat(sourceLat).SourceLon(sourceLon).SourceOffset(sourceOffset).Seconds(seconds).Minutes(minutes).Hours(hours).Days(days).Tz(tz).Ip(ip).Lat(lat).Lon(lon).Offset(offset).AutoTz(autoTz).Utc(utc).Format(format).Sign(sign).Execute()

Add modifiers to a timestamp



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
	unix := int64(1711300000) // int64 |  (optional)
	unixMs := int64(1711300000000) // int64 |  (optional)
	iso := "2024-03-24T15:00:00" // string | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`. (optional)
	sourceTz := "America/New_York" // string | Used only with `iso=...` when the ISO value has no explicit offset. (optional)
	sourceIp := "8.8.8.8" // string | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. (optional)
	sourceLat := float64(40.7128) // float64 | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates. (optional)
	sourceLon := float64(-74.006) // float64 | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`. (optional)
	sourceOffset := "-05:00" // string | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. (optional)
	seconds := int32(30) // int32 |  (optional)
	minutes := int32(15) // int32 |  (optional)
	hours := int32(2) // int32 |  (optional)
	days := int32(7) // int32 |  (optional)
	tz := "America/New_York" // string | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
	ip := "8.8.8.8" // string | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
	lat := float64(40.7128) // float64 | Latitude. Must be provided together with `lon`. (optional)
	lon := float64(-74.006) // float64 | Longitude. Must be provided together with `lat`. (optional)
	offset := "-04:00" // string | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
	autoTz := true // bool | Set to `true` to resolve using the caller IP from Cloudflare headers. (optional)
	utc := true // bool | Set to `true` to force UTC on routes that support it. (optional)
	format := "%Y-%m-%d %H:%M:%S" // string | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/). (optional)
	sign := true // bool | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. (optional)

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.TimeAPI.AddTime(context.Background()).Unix(unix).UnixMs(unixMs).Iso(iso).SourceTz(sourceTz).SourceIp(sourceIp).SourceLat(sourceLat).SourceLon(sourceLon).SourceOffset(sourceOffset).Seconds(seconds).Minutes(minutes).Hours(hours).Days(days).Tz(tz).Ip(ip).Lat(lat).Lon(lon).Offset(offset).AutoTz(autoTz).Utc(utc).Format(format).Sign(sign).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TimeAPI.AddTime``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `AddTime`: TimePayload
	fmt.Fprintf(os.Stdout, "Response from `TimeAPI.AddTime`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiAddTimeRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **unix** | **int64** |  | 
 **unixMs** | **int64** |  | 
 **iso** | **string** | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;source_tz&#x3D;Area/City&#x60;, &#x60;source_ip&#x3D;...&#x60;, &#x60;source_lat&#x3D;...&amp;source_lon&#x3D;...&#x60;, or &#x60;source_offset&#x3D;±HH:MM&#x60;. | 
 **sourceTz** | **string** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | 
 **sourceIp** | **string** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | 
 **sourceLat** | **float64** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | 
 **sourceLon** | **float64** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lat&#x60;. | 
 **sourceOffset** | **string** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | 
 **seconds** | **int32** |  | 
 **minutes** | **int32** |  | 
 **hours** | **int32** |  | 
 **days** | **int32** |  | 
 **tz** | **string** | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | 
 **ip** | **string** | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | 
 **lat** | **float64** | Latitude. Must be provided together with &#x60;lon&#x60;. | 
 **lon** | **float64** | Longitude. Must be provided together with &#x60;lat&#x60;. | 
 **offset** | **string** | Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | 
 **autoTz** | **bool** | Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | 
 **utc** | **bool** | Set to &#x60;true&#x60; to force UTC on routes that support it. | 
 **format** | **string** | Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Reference: [strftime](https://strftime.net/). | 
 **sign** | **bool** | Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | 

### Return type

[**TimePayload**](TimePayload.md)

### Authorization

[apiKeyHeader](../README.md#apiKeyHeader), [bearerAuth](../README.md#bearerAuth), [apiKeyQuery](../README.md#apiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## ConvertTime

> GetCurrentTime200Response ConvertTime(ctx).Unix(unix).UnixMs(unixMs).Iso(iso).SourceTz(sourceTz).SourceIp(sourceIp).SourceLat(sourceLat).SourceLon(sourceLon).SourceOffset(sourceOffset).Tz(tz).Ip(ip).Lat(lat).Lon(lon).Offset(offset).AutoTz(autoTz).Utc(utc).Format(format).Sign(sign).Execute()

Convert a timestamp into a target timezone or offset



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
	unix := int64(1711300000) // int64 |  (optional)
	unixMs := int64(1711300000000) // int64 |  (optional)
	iso := "2024-03-24T15:00:00" // string | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`. (optional)
	sourceTz := "America/New_York" // string | Used only with `iso=...` when the ISO value has no explicit offset. (optional)
	sourceIp := "8.8.8.8" // string | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. (optional)
	sourceLat := float64(40.7128) // float64 | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates. (optional)
	sourceLon := float64(-74.006) // float64 | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`. (optional)
	sourceOffset := "-05:00" // string | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. (optional)
	tz := "America/New_York" // string | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
	ip := "8.8.8.8" // string | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
	lat := float64(40.7128) // float64 | Latitude. Must be provided together with `lon`. (optional)
	lon := float64(-74.006) // float64 | Longitude. Must be provided together with `lat`. (optional)
	offset := "-04:00" // string | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
	autoTz := true // bool | Set to `true` to resolve using the caller IP from Cloudflare headers. (optional)
	utc := true // bool | Set to `true` to force UTC on routes that support it. (optional)
	format := "%Y-%m-%d %H:%M:%S" // string | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/). (optional)
	sign := true // bool | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. (optional)

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.TimeAPI.ConvertTime(context.Background()).Unix(unix).UnixMs(unixMs).Iso(iso).SourceTz(sourceTz).SourceIp(sourceIp).SourceLat(sourceLat).SourceLon(sourceLon).SourceOffset(sourceOffset).Tz(tz).Ip(ip).Lat(lat).Lon(lon).Offset(offset).AutoTz(autoTz).Utc(utc).Format(format).Sign(sign).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TimeAPI.ConvertTime``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `ConvertTime`: GetCurrentTime200Response
	fmt.Fprintf(os.Stdout, "Response from `TimeAPI.ConvertTime`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiConvertTimeRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **unix** | **int64** |  | 
 **unixMs** | **int64** |  | 
 **iso** | **string** | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;source_tz&#x3D;Area/City&#x60;, &#x60;source_ip&#x3D;...&#x60;, &#x60;source_lat&#x3D;...&amp;source_lon&#x3D;...&#x60;, or &#x60;source_offset&#x3D;±HH:MM&#x60;. | 
 **sourceTz** | **string** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | 
 **sourceIp** | **string** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | 
 **sourceLat** | **float64** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | 
 **sourceLon** | **float64** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lat&#x60;. | 
 **sourceOffset** | **string** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | 
 **tz** | **string** | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | 
 **ip** | **string** | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | 
 **lat** | **float64** | Latitude. Must be provided together with &#x60;lon&#x60;. | 
 **lon** | **float64** | Longitude. Must be provided together with &#x60;lat&#x60;. | 
 **offset** | **string** | Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | 
 **autoTz** | **bool** | Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | 
 **utc** | **bool** | Set to &#x60;true&#x60; to force UTC on routes that support it. | 
 **format** | **string** | Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Reference: [strftime](https://strftime.net/). | 
 **sign** | **bool** | Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | 

### Return type

[**GetCurrentTime200Response**](GetCurrentTime200Response.md)

### Authorization

[apiKeyHeader](../README.md#apiKeyHeader), [bearerAuth](../README.md#bearerAuth), [apiKeyQuery](../README.md#apiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DiffTime

> DiffResponse DiffTime(ctx).From(from).To(to).FromTz(fromTz).FromIp(fromIp).FromLat(fromLat).FromLon(fromLon).FromOffset(fromOffset).ToTz(toTz).ToIp(toIp).ToLat(toLat).ToLon(toLon).ToOffset(toOffset).Format(format).BusinessDays(businessDays).HolidayCountry(holidayCountry).HolidaySubdivision(holidaySubdivision).Sign(sign).Execute()

Difference between two instants



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
	from := "from_example" // string | Time specifier. Supported forms are `now`, `unix=<seconds>`, `unix_ms=<milliseconds>`, `iso=<ISO-8601>`, `offset=±HH:MM`, `tz=<IANA timezone>`, and `ip=<IP address>`. For `tz=...`, `ip=...`, and `offset=...`, the specifier means the current request-time instant resolved through that selector. To express a local wall-clock time, use `from=iso=...` together with one of `from_tz`, `from_ip`, `from_lat`+`from_lon`, or `from_offset`.
	to := "to_example" // string | Time specifier. Supported forms are `now`, `unix=<seconds>`, `unix_ms=<milliseconds>`, `iso=<ISO-8601>`, `offset=±HH:MM`, `tz=<IANA timezone>`, and `ip=<IP address>`. For `tz=...`, `ip=...`, and `offset=...`, the specifier means the current request-time instant resolved through that selector. To express a local wall-clock time, use `to=iso=...` together with one of `to_tz`, `to_ip`, `to_lat`+`to_lon`, or `to_offset`.
	fromTz := "fromTz_example" // string | Used only with `from=iso=...` when the ISO value has no explicit offset. (optional)
	fromIp := "8.8.8.8" // string | Used only with `from=iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. (optional)
	fromLat := float64(40.7128) // float64 | Used only with `from=iso=...` when the ISO value has no explicit offset. Provide together with `from_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates. (optional)
	fromLon := float64(-74.006) // float64 | Used only with `from=iso=...` when the ISO value has no explicit offset. Provide together with `from_lat`. (optional)
	fromOffset := "-05:00" // string | Used only with `from=iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. (optional)
	toTz := "toTz_example" // string | Used only with `to=iso=...` when the ISO value has no explicit offset. (optional)
	toIp := "8.8.8.8" // string | Used only with `to=iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. (optional)
	toLat := float64(40.7128) // float64 | Used only with `to=iso=...` when the ISO value has no explicit offset. Provide together with `to_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates. (optional)
	toLon := float64(-74.006) // float64 | Used only with `to=iso=...` when the ISO value has no explicit offset. Provide together with `to_lat`. (optional)
	toOffset := "-05:00" // string | Used only with `to=iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. (optional)
	format := "%daysd %hoursh %minutesm %secondss" // string | Custom duration format template using `%days`, `%hours`, `%minutes`, and `%seconds`. (optional)
	businessDays := true // bool | Set to `true` to enable weekday/business-day counting. (optional)
	holidayCountry := "US" // string | ISO 3166-1 alpha-2 holiday calendar country code. Requires `business_days=true`. (optional)
	holidaySubdivision := "CA" // string | Holiday calendar subdivision code from the upstream `python-holidays` calendar, for example `CA` or `ENG`. Requires `holiday_country` and `business_days=true`. (optional)
	sign := true // bool | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. (optional)

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.TimeAPI.DiffTime(context.Background()).From(from).To(to).FromTz(fromTz).FromIp(fromIp).FromLat(fromLat).FromLon(fromLon).FromOffset(fromOffset).ToTz(toTz).ToIp(toIp).ToLat(toLat).ToLon(toLon).ToOffset(toOffset).Format(format).BusinessDays(businessDays).HolidayCountry(holidayCountry).HolidaySubdivision(holidaySubdivision).Sign(sign).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TimeAPI.DiffTime``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `DiffTime`: DiffResponse
	fmt.Fprintf(os.Stdout, "Response from `TimeAPI.DiffTime`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiDiffTimeRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **from** | **string** | Time specifier. Supported forms are &#x60;now&#x60;, &#x60;unix&#x3D;&lt;seconds&gt;&#x60;, &#x60;unix_ms&#x3D;&lt;milliseconds&gt;&#x60;, &#x60;iso&#x3D;&lt;ISO-8601&gt;&#x60;, &#x60;offset&#x3D;±HH:MM&#x60;, &#x60;tz&#x3D;&lt;IANA timezone&gt;&#x60;, and &#x60;ip&#x3D;&lt;IP address&gt;&#x60;. For &#x60;tz&#x3D;...&#x60;, &#x60;ip&#x3D;...&#x60;, and &#x60;offset&#x3D;...&#x60;, the specifier means the current request-time instant resolved through that selector. To express a local wall-clock time, use &#x60;from&#x3D;iso&#x3D;...&#x60; together with one of &#x60;from_tz&#x60;, &#x60;from_ip&#x60;, &#x60;from_lat&#x60;+&#x60;from_lon&#x60;, or &#x60;from_offset&#x60;. | 
 **to** | **string** | Time specifier. Supported forms are &#x60;now&#x60;, &#x60;unix&#x3D;&lt;seconds&gt;&#x60;, &#x60;unix_ms&#x3D;&lt;milliseconds&gt;&#x60;, &#x60;iso&#x3D;&lt;ISO-8601&gt;&#x60;, &#x60;offset&#x3D;±HH:MM&#x60;, &#x60;tz&#x3D;&lt;IANA timezone&gt;&#x60;, and &#x60;ip&#x3D;&lt;IP address&gt;&#x60;. For &#x60;tz&#x3D;...&#x60;, &#x60;ip&#x3D;...&#x60;, and &#x60;offset&#x3D;...&#x60;, the specifier means the current request-time instant resolved through that selector. To express a local wall-clock time, use &#x60;to&#x3D;iso&#x3D;...&#x60; together with one of &#x60;to_tz&#x60;, &#x60;to_ip&#x60;, &#x60;to_lat&#x60;+&#x60;to_lon&#x60;, or &#x60;to_offset&#x60;. | 
 **fromTz** | **string** | Used only with &#x60;from&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | 
 **fromIp** | **string** | Used only with &#x60;from&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | 
 **fromLat** | **float64** | Used only with &#x60;from&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;from_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | 
 **fromLon** | **float64** | Used only with &#x60;from&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;from_lat&#x60;. | 
 **fromOffset** | **string** | Used only with &#x60;from&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | 
 **toTz** | **string** | Used only with &#x60;to&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | 
 **toIp** | **string** | Used only with &#x60;to&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | 
 **toLat** | **float64** | Used only with &#x60;to&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;to_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | 
 **toLon** | **float64** | Used only with &#x60;to&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;to_lat&#x60;. | 
 **toOffset** | **string** | Used only with &#x60;to&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | 
 **format** | **string** | Custom duration format template using &#x60;%days&#x60;, &#x60;%hours&#x60;, &#x60;%minutes&#x60;, and &#x60;%seconds&#x60;. | 
 **businessDays** | **bool** | Set to &#x60;true&#x60; to enable weekday/business-day counting. | 
 **holidayCountry** | **string** | ISO 3166-1 alpha-2 holiday calendar country code. Requires &#x60;business_days&#x3D;true&#x60;. | 
 **holidaySubdivision** | **string** | Holiday calendar subdivision code from the upstream &#x60;python-holidays&#x60; calendar, for example &#x60;CA&#x60; or &#x60;ENG&#x60;. Requires &#x60;holiday_country&#x60; and &#x60;business_days&#x3D;true&#x60;. | 
 **sign** | **bool** | Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | 

### Return type

[**DiffResponse**](DiffResponse.md)

### Authorization

[apiKeyHeader](../README.md#apiKeyHeader), [bearerAuth](../README.md#bearerAuth), [apiKeyQuery](../README.md#apiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetCalendar

> CalendarResponse GetCalendar(ctx).Unix(unix).UnixMs(unixMs).Iso(iso).SourceTz(sourceTz).SourceIp(sourceIp).SourceLat(sourceLat).SourceLon(sourceLon).SourceOffset(sourceOffset).Tz(tz).Ip(ip).Lat(lat).Lon(lon).Offset(offset).AutoTz(autoTz).Format(format).Week(week).Sign(sign).Execute()

Calendar projection for a target instant



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
	unix := int64(1711300000) // int64 |  (optional)
	unixMs := int64(1711300000000) // int64 |  (optional)
	iso := "2024-03-24T15:00:00" // string | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`. (optional)
	sourceTz := "America/New_York" // string | Used only with `iso=...` when the ISO value has no explicit offset. (optional)
	sourceIp := "8.8.8.8" // string | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. (optional)
	sourceLat := float64(40.7128) // float64 | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates. (optional)
	sourceLon := float64(-74.006) // float64 | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`. (optional)
	sourceOffset := "-05:00" // string | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. (optional)
	tz := "America/New_York" // string | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
	ip := "8.8.8.8" // string | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
	lat := float64(40.7128) // float64 | Latitude. Must be provided together with `lon`. (optional)
	lon := float64(-74.006) // float64 | Longitude. Must be provided together with `lat`. (optional)
	offset := "-04:00" // string | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
	autoTz := true // bool | Set to `true` to resolve using the caller IP from Cloudflare headers. (optional)
	format := "%Y-%m-%d %H:%M:%S" // string | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/). (optional)
	week := true // bool |  (optional)
	sign := true // bool | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. (optional)

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.TimeAPI.GetCalendar(context.Background()).Unix(unix).UnixMs(unixMs).Iso(iso).SourceTz(sourceTz).SourceIp(sourceIp).SourceLat(sourceLat).SourceLon(sourceLon).SourceOffset(sourceOffset).Tz(tz).Ip(ip).Lat(lat).Lon(lon).Offset(offset).AutoTz(autoTz).Format(format).Week(week).Sign(sign).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TimeAPI.GetCalendar``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetCalendar`: CalendarResponse
	fmt.Fprintf(os.Stdout, "Response from `TimeAPI.GetCalendar`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiGetCalendarRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **unix** | **int64** |  | 
 **unixMs** | **int64** |  | 
 **iso** | **string** | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;source_tz&#x3D;Area/City&#x60;, &#x60;source_ip&#x3D;...&#x60;, &#x60;source_lat&#x3D;...&amp;source_lon&#x3D;...&#x60;, or &#x60;source_offset&#x3D;±HH:MM&#x60;. | 
 **sourceTz** | **string** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | 
 **sourceIp** | **string** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | 
 **sourceLat** | **float64** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | 
 **sourceLon** | **float64** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lat&#x60;. | 
 **sourceOffset** | **string** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | 
 **tz** | **string** | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | 
 **ip** | **string** | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | 
 **lat** | **float64** | Latitude. Must be provided together with &#x60;lon&#x60;. | 
 **lon** | **float64** | Longitude. Must be provided together with &#x60;lat&#x60;. | 
 **offset** | **string** | Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | 
 **autoTz** | **bool** | Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | 
 **format** | **string** | Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Reference: [strftime](https://strftime.net/). | 
 **week** | **bool** |  | 
 **sign** | **bool** | Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | 

### Return type

[**CalendarResponse**](CalendarResponse.md)

### Authorization

[apiKeyHeader](../README.md#apiKeyHeader), [bearerAuth](../README.md#bearerAuth), [apiKeyQuery](../README.md#apiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetClock

> string GetClock(ctx).Style(style).Unix(unix).UnixMs(unixMs).Iso(iso).SourceTz(sourceTz).SourceIp(sourceIp).SourceLat(sourceLat).SourceLon(sourceLon).SourceOffset(sourceOffset).Tz(tz).Ip(ip).Lat(lat).Lon(lon).Offset(offset).Format(format).Execute()

Render a live HTML clock



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
	style := "style_example" // string | Clock style name. Valid values are enumerated here; there is no separate style discovery endpoint.
	unix := int64(1711300000) // int64 |  (optional)
	unixMs := int64(1711300000000) // int64 |  (optional)
	iso := "2024-03-24T15:00:00" // string | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`. (optional)
	sourceTz := "America/New_York" // string | Used only with `iso=...` when the ISO value has no explicit offset. (optional)
	sourceIp := "8.8.8.8" // string | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. (optional)
	sourceLat := float64(40.7128) // float64 | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates. (optional)
	sourceLon := float64(-74.006) // float64 | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`. (optional)
	sourceOffset := "-05:00" // string | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. (optional)
	tz := "America/New_York" // string | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
	ip := "8.8.8.8" // string | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
	lat := float64(40.7128) // float64 | Latitude. Must be provided together with `lon`. (optional)
	lon := float64(-74.006) // float64 | Longitude. Must be provided together with `lat`. (optional)
	offset := "-04:00" // string | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
	format := "%Y-%m-%d %H:%M:%S" // string | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/). (optional)

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.TimeAPI.GetClock(context.Background()).Style(style).Unix(unix).UnixMs(unixMs).Iso(iso).SourceTz(sourceTz).SourceIp(sourceIp).SourceLat(sourceLat).SourceLon(sourceLon).SourceOffset(sourceOffset).Tz(tz).Ip(ip).Lat(lat).Lon(lon).Offset(offset).Format(format).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TimeAPI.GetClock``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetClock`: string
	fmt.Fprintf(os.Stdout, "Response from `TimeAPI.GetClock`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiGetClockRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **style** | **string** | Clock style name. Valid values are enumerated here; there is no separate style discovery endpoint. | 
 **unix** | **int64** |  | 
 **unixMs** | **int64** |  | 
 **iso** | **string** | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;source_tz&#x3D;Area/City&#x60;, &#x60;source_ip&#x3D;...&#x60;, &#x60;source_lat&#x3D;...&amp;source_lon&#x3D;...&#x60;, or &#x60;source_offset&#x3D;±HH:MM&#x60;. | 
 **sourceTz** | **string** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | 
 **sourceIp** | **string** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | 
 **sourceLat** | **float64** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | 
 **sourceLon** | **float64** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lat&#x60;. | 
 **sourceOffset** | **string** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | 
 **tz** | **string** | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | 
 **ip** | **string** | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | 
 **lat** | **float64** | Latitude. Must be provided together with &#x60;lon&#x60;. | 
 **lon** | **float64** | Longitude. Must be provided together with &#x60;lat&#x60;. | 
 **offset** | **string** | Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | 
 **format** | **string** | Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Reference: [strftime](https://strftime.net/). | 

### Return type

**string**

### Authorization

[apiKeyHeader](../README.md#apiKeyHeader), [bearerAuth](../README.md#bearerAuth), [apiKeyQuery](../README.md#apiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html, application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetCurrentTime

> GetCurrentTime200Response GetCurrentTime(ctx).Tz(tz).Ip(ip).Lat(lat).Lon(lon).Offset(offset).AutoTz(autoTz).Format(format).Sign(sign).Execute()

Get the current time for a target



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
	tz := "America/New_York" // string | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
	ip := "8.8.8.8" // string | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
	lat := float64(40.7128) // float64 | Latitude. Must be provided together with `lon`. (optional)
	lon := float64(-74.006) // float64 | Longitude. Must be provided together with `lat`. (optional)
	offset := "-04:00" // string | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
	autoTz := true // bool | Set to `true` to resolve using the caller IP from Cloudflare headers. (optional)
	format := "%Y-%m-%d %H:%M:%S" // string | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/). (optional)
	sign := true // bool | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. (optional)

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.TimeAPI.GetCurrentTime(context.Background()).Tz(tz).Ip(ip).Lat(lat).Lon(lon).Offset(offset).AutoTz(autoTz).Format(format).Sign(sign).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TimeAPI.GetCurrentTime``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetCurrentTime`: GetCurrentTime200Response
	fmt.Fprintf(os.Stdout, "Response from `TimeAPI.GetCurrentTime`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiGetCurrentTimeRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tz** | **string** | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | 
 **ip** | **string** | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | 
 **lat** | **float64** | Latitude. Must be provided together with &#x60;lon&#x60;. | 
 **lon** | **float64** | Longitude. Must be provided together with &#x60;lat&#x60;. | 
 **offset** | **string** | Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | 
 **autoTz** | **bool** | Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | 
 **format** | **string** | Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Reference: [strftime](https://strftime.net/). | 
 **sign** | **bool** | Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | 

### Return type

[**GetCurrentTime200Response**](GetCurrentTime200Response.md)

### Authorization

[apiKeyHeader](../README.md#apiKeyHeader), [bearerAuth](../README.md#bearerAuth), [apiKeyQuery](../README.md#apiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetDst

> DstResponse GetDst(ctx).Tz(tz).Ip(ip).Lat(lat).Lon(lon).Offset(offset).AutoTz(autoTz).Format(format).Next(next).Sign(sign).Execute()

Daylight-saving status for a target



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
	tz := "America/New_York" // string | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
	ip := "8.8.8.8" // string | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
	lat := float64(40.7128) // float64 | Latitude. Must be provided together with `lon`. (optional)
	lon := float64(-74.006) // float64 | Longitude. Must be provided together with `lat`. (optional)
	offset := "-04:00" // string | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
	autoTz := true // bool | Set to `true` to resolve using the caller IP from Cloudflare headers. (optional)
	format := "%Y-%m-%d %H:%M:%S" // string | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/). (optional)
	next := true // bool |  (optional)
	sign := true // bool | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. (optional)

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.TimeAPI.GetDst(context.Background()).Tz(tz).Ip(ip).Lat(lat).Lon(lon).Offset(offset).AutoTz(autoTz).Format(format).Next(next).Sign(sign).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TimeAPI.GetDst``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetDst`: DstResponse
	fmt.Fprintf(os.Stdout, "Response from `TimeAPI.GetDst`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiGetDstRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tz** | **string** | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | 
 **ip** | **string** | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | 
 **lat** | **float64** | Latitude. Must be provided together with &#x60;lon&#x60;. | 
 **lon** | **float64** | Longitude. Must be provided together with &#x60;lat&#x60;. | 
 **offset** | **string** | Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | 
 **autoTz** | **bool** | Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | 
 **format** | **string** | Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Reference: [strftime](https://strftime.net/). | 
 **next** | **bool** |  | 
 **sign** | **bool** | Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | 

### Return type

[**DstResponse**](DstResponse.md)

### Authorization

[apiKeyHeader](../README.md#apiKeyHeader), [bearerAuth](../README.md#bearerAuth), [apiKeyQuery](../README.md#apiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetElapsed

> ElapsedResponse GetElapsed(ctx).Unix(unix).UnixMs(unixMs).Iso(iso).SourceTz(sourceTz).SourceIp(sourceIp).SourceLat(sourceLat).SourceLon(sourceLon).SourceOffset(sourceOffset).CompareUnix(compareUnix).CompareUnixMs(compareUnixMs).CompareIso(compareIso).CompareSourceTz(compareSourceTz).CompareSourceIp(compareSourceIp).CompareSourceLat(compareSourceLat).CompareSourceLon(compareSourceLon).CompareSourceOffset(compareSourceOffset).Tz(tz).Ip(ip).Lat(lat).Lon(lon).Offset(offset).AutoTz(autoTz).Format(format).BusinessDays(businessDays).HolidayCountry(holidayCountry).HolidaySubdivision(holidaySubdivision).Sign(sign).Execute()

Time elapsed since or remaining until a reference instant



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
	unix := int64(1711300000) // int64 |  (optional)
	unixMs := int64(1711300000000) // int64 |  (optional)
	iso := "2024-03-24T15:00:00" // string | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`. (optional)
	sourceTz := "America/New_York" // string | Used only with `iso=...` when the ISO value has no explicit offset. (optional)
	sourceIp := "8.8.8.8" // string | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. (optional)
	sourceLat := float64(40.7128) // float64 | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates. (optional)
	sourceLon := float64(-74.006) // float64 | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`. (optional)
	sourceOffset := "-05:00" // string | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. (optional)
	compareUnix := int64(1711213600) // int64 |  (optional)
	compareUnixMs := int64(1711213600000) // int64 |  (optional)
	compareIso := "2024-03-23T15:00:00" // string | ISO-8601 comparison timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `compare_source_tz=Area/City`, `compare_source_ip=...`, `compare_source_lat=...&compare_source_lon=...`, or `compare_source_offset=±HH:MM`. (optional)
	compareSourceTz := "America/New_York" // string | Used only with `compare_iso=...` when the ISO value has no explicit offset. (optional)
	compareSourceIp := "8.8.8.8" // string | Used only with `compare_iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. (optional)
	compareSourceLat := float64(40.7128) // float64 | Used only with `compare_iso=...` when the ISO value has no explicit offset. Provide together with `compare_source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates. (optional)
	compareSourceLon := float64(-74.006) // float64 | Used only with `compare_iso=...` when the ISO value has no explicit offset. Provide together with `compare_source_lat`. (optional)
	compareSourceOffset := "-05:00" // string | Used only with `compare_iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. (optional)
	tz := "America/New_York" // string | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
	ip := "8.8.8.8" // string | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
	lat := float64(40.7128) // float64 | Latitude. Must be provided together with `lon`. (optional)
	lon := float64(-74.006) // float64 | Longitude. Must be provided together with `lat`. (optional)
	offset := "-04:00" // string | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
	autoTz := true // bool | Set to `true` to resolve using the caller IP from Cloudflare headers. (optional)
	format := "%daysd %hoursh %minutesm %secondss" // string | Custom duration format template using `%days`, `%hours`, `%minutes`, and `%seconds`. (optional)
	businessDays := true // bool | Set to `true` to enable weekday/business-day counting. (optional)
	holidayCountry := "US" // string | ISO 3166-1 alpha-2 holiday calendar country code. Requires `business_days=true`. (optional)
	holidaySubdivision := "CA" // string | Holiday calendar subdivision code from the upstream `python-holidays` calendar, for example `CA` or `ENG`. Requires `holiday_country` and `business_days=true`. (optional)
	sign := true // bool | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. (optional)

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.TimeAPI.GetElapsed(context.Background()).Unix(unix).UnixMs(unixMs).Iso(iso).SourceTz(sourceTz).SourceIp(sourceIp).SourceLat(sourceLat).SourceLon(sourceLon).SourceOffset(sourceOffset).CompareUnix(compareUnix).CompareUnixMs(compareUnixMs).CompareIso(compareIso).CompareSourceTz(compareSourceTz).CompareSourceIp(compareSourceIp).CompareSourceLat(compareSourceLat).CompareSourceLon(compareSourceLon).CompareSourceOffset(compareSourceOffset).Tz(tz).Ip(ip).Lat(lat).Lon(lon).Offset(offset).AutoTz(autoTz).Format(format).BusinessDays(businessDays).HolidayCountry(holidayCountry).HolidaySubdivision(holidaySubdivision).Sign(sign).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TimeAPI.GetElapsed``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetElapsed`: ElapsedResponse
	fmt.Fprintf(os.Stdout, "Response from `TimeAPI.GetElapsed`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiGetElapsedRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **unix** | **int64** |  | 
 **unixMs** | **int64** |  | 
 **iso** | **string** | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;source_tz&#x3D;Area/City&#x60;, &#x60;source_ip&#x3D;...&#x60;, &#x60;source_lat&#x3D;...&amp;source_lon&#x3D;...&#x60;, or &#x60;source_offset&#x3D;±HH:MM&#x60;. | 
 **sourceTz** | **string** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | 
 **sourceIp** | **string** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | 
 **sourceLat** | **float64** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | 
 **sourceLon** | **float64** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lat&#x60;. | 
 **sourceOffset** | **string** | Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | 
 **compareUnix** | **int64** |  | 
 **compareUnixMs** | **int64** |  | 
 **compareIso** | **string** | ISO-8601 comparison timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;compare_source_tz&#x3D;Area/City&#x60;, &#x60;compare_source_ip&#x3D;...&#x60;, &#x60;compare_source_lat&#x3D;...&amp;compare_source_lon&#x3D;...&#x60;, or &#x60;compare_source_offset&#x3D;±HH:MM&#x60;. | 
 **compareSourceTz** | **string** | Used only with &#x60;compare_iso&#x3D;...&#x60; when the ISO value has no explicit offset. | 
 **compareSourceIp** | **string** | Used only with &#x60;compare_iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | 
 **compareSourceLat** | **float64** | Used only with &#x60;compare_iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;compare_source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | 
 **compareSourceLon** | **float64** | Used only with &#x60;compare_iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;compare_source_lat&#x60;. | 
 **compareSourceOffset** | **string** | Used only with &#x60;compare_iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | 
 **tz** | **string** | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | 
 **ip** | **string** | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | 
 **lat** | **float64** | Latitude. Must be provided together with &#x60;lon&#x60;. | 
 **lon** | **float64** | Longitude. Must be provided together with &#x60;lat&#x60;. | 
 **offset** | **string** | Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | 
 **autoTz** | **bool** | Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | 
 **format** | **string** | Custom duration format template using &#x60;%days&#x60;, &#x60;%hours&#x60;, &#x60;%minutes&#x60;, and &#x60;%seconds&#x60;. | 
 **businessDays** | **bool** | Set to &#x60;true&#x60; to enable weekday/business-day counting. | 
 **holidayCountry** | **string** | ISO 3166-1 alpha-2 holiday calendar country code. Requires &#x60;business_days&#x3D;true&#x60;. | 
 **holidaySubdivision** | **string** | Holiday calendar subdivision code from the upstream &#x60;python-holidays&#x60; calendar, for example &#x60;CA&#x60; or &#x60;ENG&#x60;. Requires &#x60;holiday_country&#x60; and &#x60;business_days&#x3D;true&#x60;. | 
 **sign** | **bool** | Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | 

### Return type

[**ElapsedResponse**](ElapsedResponse.md)

### Authorization

[apiKeyHeader](../README.md#apiKeyHeader), [bearerAuth](../README.md#bearerAuth), [apiKeyQuery](../README.md#apiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetTimezone

> GetTimezone200Response GetTimezone(ctx).Tz(tz).Ip(ip).Lat(lat).Lon(lon).Offset(offset).AutoTz(autoTz).Sign(sign).Execute()

Resolve timezone information for a target



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
	tz := "America/New_York" // string | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
	ip := "8.8.8.8" // string | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
	lat := float64(40.7128) // float64 | Latitude. Must be provided together with `lon`. (optional)
	lon := float64(-74.006) // float64 | Longitude. Must be provided together with `lat`. (optional)
	offset := "-04:00" // string | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
	autoTz := true // bool | Set to `true` to resolve using the caller IP from Cloudflare headers. (optional)
	sign := true // bool | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. (optional)

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.TimeAPI.GetTimezone(context.Background()).Tz(tz).Ip(ip).Lat(lat).Lon(lon).Offset(offset).AutoTz(autoTz).Sign(sign).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TimeAPI.GetTimezone``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetTimezone`: GetTimezone200Response
	fmt.Fprintf(os.Stdout, "Response from `TimeAPI.GetTimezone`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiGetTimezoneRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tz** | **string** | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | 
 **ip** | **string** | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | 
 **lat** | **float64** | Latitude. Must be provided together with &#x60;lon&#x60;. | 
 **lon** | **float64** | Longitude. Must be provided together with &#x60;lat&#x60;. | 
 **offset** | **string** | Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | 
 **autoTz** | **bool** | Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | 
 **sign** | **bool** | Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | 

### Return type

[**GetTimezone200Response**](GetTimezone200Response.md)

### Authorization

[apiKeyHeader](../README.md#apiKeyHeader), [bearerAuth](../README.md#bearerAuth), [apiKeyQuery](../README.md#apiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

