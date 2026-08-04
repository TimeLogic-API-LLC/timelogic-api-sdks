# timelogic_direct_api.TimeApi

All URIs are relative to *https://api.timelogicapi.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**add_time**](TimeApi.md#add_time) | **GET** /v1/time/add | Add modifiers to a timestamp
[**convert_time**](TimeApi.md#convert_time) | **GET** /v1/time/convert | Convert a timestamp into a target timezone or offset
[**diff_time**](TimeApi.md#diff_time) | **GET** /v1/time/diff | Difference between two instants
[**get_calendar**](TimeApi.md#get_calendar) | **GET** /v1/time/calendar | Calendar projection for a target instant
[**get_clock**](TimeApi.md#get_clock) | **GET** /v1/time/clock | Render a live HTML clock
[**get_current_time**](TimeApi.md#get_current_time) | **GET** /v1/time/current | Get the current time for a target
[**get_dst**](TimeApi.md#get_dst) | **GET** /v1/time/dst | Daylight-saving status for a target
[**get_elapsed**](TimeApi.md#get_elapsed) | **GET** /v1/time/elapsed | Time elapsed since or remaining until a reference instant
[**get_timezone**](TimeApi.md#get_timezone) | **GET** /v1/timezone | Resolve timezone information for a target


# **add_time**
> TimePayload add_time(unix=unix, unix_ms=unix_ms, iso=iso, source_tz=source_tz, source_ip=source_ip, source_lat=source_lat, source_lon=source_lon, source_offset=source_offset, seconds=seconds, minutes=minutes, hours=hours, days=days, tz=tz, ip=ip, lat=lat, lon=lon, offset=offset, auto_tz=auto_tz, utc=utc, format=format, sign=sign)

Add modifiers to a timestamp

Adds `seconds`, `minutes`, `hours`, and `days` to an optional base timestamp.  Input timestamp forms: - `unix=1711300000` - `unix_ms=1711300000000` - `iso=2026-04-16T09:00:00Z` - `iso=2026-04-16T09:00:00&source_tz=America/New_York` - `iso=2026-04-16T09:00:00&source_ip=8.8.8.8` - `iso=2026-04-16T09:00:00&source_lat=40.7128&source_lon=-74.0060` - `iso=2026-04-16T09:00:00&source_offset=-05:00` - if no input timestamp is provided, the base timestamp defaults to the request time  Modifiers: - `seconds=30` - `minutes=15` - `hours=2` - `days=7`  Target selector forms: - `tz=America/New_York` - `ip=8.8.8.8` - `lat=40.7128&lon=-74.0060` - `offset=-04:00` - `auto_tz=true` - `utc=true`  Incompatible combinations: - at most one input timestamp form - at most one target selector family - use at most one of `source_tz`, `source_ip`, `source_lat`/`source_lon`, or `source_offset` - local-ISO companion selectors are valid only with `iso=...` that has no explicit offset - bulk is not supported on this route  Examples: - `/v1/time/add?iso=2026-04-16T09:00:00&source_tz=America/New_York&days=1&tz=Europe/London` - `/v1/time/add?minutes=30&utc=true` 

### Example

* Api Key Authentication (directApiKeyHeader):
* Bearer (TimeLogic API key) Authentication (directBearerAuth):
* Api Key Authentication (directApiKeyQuery):
* Api Key Authentication (rapidApiKey):
* Api Key Authentication (rapidApiHost):

```python
import timelogic_direct_api
from timelogic_direct_api.models.time_payload import TimePayload
from timelogic_direct_api.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://api.timelogicapi.com
# See configuration.py for a list of all supported configuration parameters.
configuration = timelogic_direct_api.Configuration(
    host = "https://api.timelogicapi.com"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure API key authorization: directApiKeyHeader
configuration.api_key['directApiKeyHeader'] = os.environ["API_KEY"]

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['directApiKeyHeader'] = 'Bearer'

# Configure Bearer authorization (TimeLogic API key): directBearerAuth
configuration = timelogic_direct_api.Configuration(
    access_token = os.environ["BEARER_TOKEN"]
)

# Configure API key authorization: directApiKeyQuery
configuration.api_key['directApiKeyQuery'] = os.environ["API_KEY"]

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['directApiKeyQuery'] = 'Bearer'

# Configure API key authorization: rapidApiKey
configuration.api_key['rapidApiKey'] = os.environ["API_KEY"]

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['rapidApiKey'] = 'Bearer'

# Configure API key authorization: rapidApiHost
configuration.api_key['rapidApiHost'] = os.environ["API_KEY"]

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['rapidApiHost'] = 'Bearer'

# Enter a context with an instance of the API client
with timelogic_direct_api.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = timelogic_direct_api.TimeApi(api_client)
    unix = 1711300000 # int |  (optional)
    unix_ms = 1711300000000 # int |  (optional)
    iso = '2024-03-24T15:00:00' # str | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`. (optional)
    source_tz = 'America/New_York' # str | Used only with `iso=...` when the ISO value has no explicit offset. (optional)
    source_ip = '8.8.8.8' # str | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. (optional)
    source_lat = 40.7128 # float | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates. (optional)
    source_lon = -74.006 # float | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`. (optional)
    source_offset = '-05:00' # str | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. (optional)
    seconds = 30 # int |  (optional)
    minutes = 15 # int |  (optional)
    hours = 2 # int |  (optional)
    days = 7 # int |  (optional)
    tz = 'America/New_York' # str | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
    ip = '8.8.8.8' # str | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
    lat = 40.7128 # float | Latitude. Must be provided together with `lon`. (optional)
    lon = -74.006 # float | Longitude. Must be provided together with `lat`. (optional)
    offset = '-04:00' # str | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
    auto_tz = true # bool | Set to `true` to resolve using the caller IP from Cloudflare headers. (optional)
    utc = true # bool | Set to `true` to force UTC on routes that support it. (optional)
    format = '%Y-%m-%d %H:%M:%S' # str | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/). (optional)
    sign = true # bool | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. (optional)

    try:
        # Add modifiers to a timestamp
        api_response = api_instance.add_time(unix=unix, unix_ms=unix_ms, iso=iso, source_tz=source_tz, source_ip=source_ip, source_lat=source_lat, source_lon=source_lon, source_offset=source_offset, seconds=seconds, minutes=minutes, hours=hours, days=days, tz=tz, ip=ip, lat=lat, lon=lon, offset=offset, auto_tz=auto_tz, utc=utc, format=format, sign=sign)
        print("The response of TimeApi->add_time:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling TimeApi->add_time: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **unix** | **int**|  | [optional] 
 **unix_ms** | **int**|  | [optional] 
 **iso** | **str**| ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;source_tz&#x3D;Area/City&#x60;, &#x60;source_ip&#x3D;...&#x60;, &#x60;source_lat&#x3D;...&amp;source_lon&#x3D;...&#x60;, or &#x60;source_offset&#x3D;±HH:MM&#x60;. | [optional] 
 **source_tz** | **str**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional] 
 **source_ip** | **str**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional] 
 **source_lat** | **float**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional] 
 **source_lon** | **float**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lat&#x60;. | [optional] 
 **source_offset** | **str**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional] 
 **seconds** | **int**|  | [optional] 
 **minutes** | **int**|  | [optional] 
 **hours** | **int**|  | [optional] 
 **days** | **int**|  | [optional] 
 **tz** | **str**| IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] 
 **ip** | **str**| IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] 
 **lat** | **float**| Latitude. Must be provided together with &#x60;lon&#x60;. | [optional] 
 **lon** | **float**| Longitude. Must be provided together with &#x60;lat&#x60;. | [optional] 
 **offset** | **str**| Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] 
 **auto_tz** | **bool**| Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | [optional] 
 **utc** | **bool**| Set to &#x60;true&#x60; to force UTC on routes that support it. | [optional] 
 **format** | **str**| Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Reference: [strftime](https://strftime.net/). | [optional] 
 **sign** | **bool**| Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional] 

### Return type

[**TimePayload**](TimePayload.md)

### Authorization

[directApiKeyHeader](../README.md#directApiKeyHeader), [directBearerAuth](../README.md#directBearerAuth), [directApiKeyQuery](../README.md#directApiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Adjusted timestamp payload. |  * X-Request-Id -  <br>  * X-TimeLogic-Signature -  <br>  * X-TimeLogic-Key-Id -  <br>  * X-TimeLogic-Signature-Alg -  <br>  * X-TimeLogic-Signature-Timestamp -  <br>  * X-TimeLogic-Content-SHA256 -  <br>  * X-TimeLogic-Signature-Input -  <br>  |
**400** | Invalid or ambiguous request parameters. |  * X-Request-Id -  <br>  |
**401** | Missing or invalid authentication. |  -  |
**403** | The key or customer subscription is not active. |  * X-Request-Id -  <br>  |
**429** | The cached monthly quota state is exceeded. |  * X-Request-Id -  <br>  * X-TimeLogic-Quota-State -  <br>  |
**405** | Only &#x60;GET&#x60; is supported. |  * X-Request-Id -  <br>  |
**500** | Internal server error, including signing failures. |  * X-Request-Id -  <br>  |
**501** | A required resolver or dependency is not configured or not ready. |  * X-Request-Id -  <br>  |
**502** | Gateway failed to forward the request to the core worker. |  * X-Request-Id -  <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **convert_time**
> GetCurrentTime200Response convert_time(unix=unix, unix_ms=unix_ms, iso=iso, source_tz=source_tz, source_ip=source_ip, source_lat=source_lat, source_lon=source_lon, source_offset=source_offset, tz=tz, ip=ip, lat=lat, lon=lon, offset=offset, auto_tz=auto_tz, utc=utc, format=format, sign=sign)

Convert a timestamp into a target timezone or offset

Converts one required input timestamp into a single target or a bulk array.  Input timestamp forms: - `unix=1711300000` - `unix_ms=1711300000000` - `iso=2026-04-16T09:00:00Z` - `iso=2026-04-16T09:00:00&source_tz=America/New_York` - `iso=2026-04-16T09:00:00&source_ip=8.8.8.8` - `iso=2026-04-16T09:00:00&source_lat=40.7128&source_lon=-74.0060` - `iso=2026-04-16T09:00:00&source_offset=-05:00`  Target selector forms: - `tz=America/New_York` - `ip=8.8.8.8` - `lat=40.7128&lon=-74.0060` - `offset=-04:00` - `auto_tz=true` - `utc=true`  Incompatible combinations: - exactly one input timestamp form - exactly one target selector family - use at most one of `source_tz`, `source_ip`, `source_lat`/`source_lon`, or `source_offset` - local-ISO companion selectors are valid only with `iso=...` that has no explicit offset - bulk is allowed only through one comma-separated `tz`, `ip`, or `offset` selector  Examples: - Single target: `/v1/time/convert?iso=2026-04-16T09:00:00&source_tz=America/New_York&tz=Europe/London` - Bulk target set: `/v1/time/convert?unix=1711300000&offset=-04:00,+00:00,+09:00` 

### Example

* Api Key Authentication (directApiKeyHeader):
* Bearer (TimeLogic API key) Authentication (directBearerAuth):
* Api Key Authentication (directApiKeyQuery):
* Api Key Authentication (rapidApiKey):
* Api Key Authentication (rapidApiHost):

```python
import timelogic_direct_api
from timelogic_direct_api.models.get_current_time200_response import GetCurrentTime200Response
from timelogic_direct_api.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://api.timelogicapi.com
# See configuration.py for a list of all supported configuration parameters.
configuration = timelogic_direct_api.Configuration(
    host = "https://api.timelogicapi.com"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure API key authorization: directApiKeyHeader
configuration.api_key['directApiKeyHeader'] = os.environ["API_KEY"]

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['directApiKeyHeader'] = 'Bearer'

# Configure Bearer authorization (TimeLogic API key): directBearerAuth
configuration = timelogic_direct_api.Configuration(
    access_token = os.environ["BEARER_TOKEN"]
)

# Configure API key authorization: directApiKeyQuery
configuration.api_key['directApiKeyQuery'] = os.environ["API_KEY"]

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['directApiKeyQuery'] = 'Bearer'

# Configure API key authorization: rapidApiKey
configuration.api_key['rapidApiKey'] = os.environ["API_KEY"]

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['rapidApiKey'] = 'Bearer'

# Configure API key authorization: rapidApiHost
configuration.api_key['rapidApiHost'] = os.environ["API_KEY"]

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['rapidApiHost'] = 'Bearer'

# Enter a context with an instance of the API client
with timelogic_direct_api.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = timelogic_direct_api.TimeApi(api_client)
    unix = 1711300000 # int |  (optional)
    unix_ms = 1711300000000 # int |  (optional)
    iso = '2024-03-24T15:00:00' # str | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`. (optional)
    source_tz = 'America/New_York' # str | Used only with `iso=...` when the ISO value has no explicit offset. (optional)
    source_ip = '8.8.8.8' # str | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. (optional)
    source_lat = 40.7128 # float | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates. (optional)
    source_lon = -74.006 # float | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`. (optional)
    source_offset = '-05:00' # str | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. (optional)
    tz = 'America/New_York' # str | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
    ip = '8.8.8.8' # str | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
    lat = 40.7128 # float | Latitude. Must be provided together with `lon`. (optional)
    lon = -74.006 # float | Longitude. Must be provided together with `lat`. (optional)
    offset = '-04:00' # str | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
    auto_tz = true # bool | Set to `true` to resolve using the caller IP from Cloudflare headers. (optional)
    utc = true # bool | Set to `true` to force UTC on routes that support it. (optional)
    format = '%Y-%m-%d %H:%M:%S' # str | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/). (optional)
    sign = true # bool | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. (optional)

    try:
        # Convert a timestamp into a target timezone or offset
        api_response = api_instance.convert_time(unix=unix, unix_ms=unix_ms, iso=iso, source_tz=source_tz, source_ip=source_ip, source_lat=source_lat, source_lon=source_lon, source_offset=source_offset, tz=tz, ip=ip, lat=lat, lon=lon, offset=offset, auto_tz=auto_tz, utc=utc, format=format, sign=sign)
        print("The response of TimeApi->convert_time:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling TimeApi->convert_time: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **unix** | **int**|  | [optional] 
 **unix_ms** | **int**|  | [optional] 
 **iso** | **str**| ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;source_tz&#x3D;Area/City&#x60;, &#x60;source_ip&#x3D;...&#x60;, &#x60;source_lat&#x3D;...&amp;source_lon&#x3D;...&#x60;, or &#x60;source_offset&#x3D;±HH:MM&#x60;. | [optional] 
 **source_tz** | **str**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional] 
 **source_ip** | **str**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional] 
 **source_lat** | **float**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional] 
 **source_lon** | **float**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lat&#x60;. | [optional] 
 **source_offset** | **str**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional] 
 **tz** | **str**| IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] 
 **ip** | **str**| IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] 
 **lat** | **float**| Latitude. Must be provided together with &#x60;lon&#x60;. | [optional] 
 **lon** | **float**| Longitude. Must be provided together with &#x60;lat&#x60;. | [optional] 
 **offset** | **str**| Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] 
 **auto_tz** | **bool**| Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | [optional] 
 **utc** | **bool**| Set to &#x60;true&#x60; to force UTC on routes that support it. | [optional] 
 **format** | **str**| Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Reference: [strftime](https://strftime.net/). | [optional] 
 **sign** | **bool**| Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional] 

### Return type

[**GetCurrentTime200Response**](GetCurrentTime200Response.md)

### Authorization

[directApiKeyHeader](../README.md#directApiKeyHeader), [directBearerAuth](../README.md#directBearerAuth), [directApiKeyQuery](../README.md#directApiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Converted time payload or bulk array. |  * X-Request-Id -  <br>  * X-TimeLogic-Signature -  <br>  * X-TimeLogic-Key-Id -  <br>  * X-TimeLogic-Signature-Alg -  <br>  * X-TimeLogic-Signature-Timestamp -  <br>  * X-TimeLogic-Content-SHA256 -  <br>  * X-TimeLogic-Signature-Input -  <br>  |
**400** | Invalid or ambiguous request parameters. |  * X-Request-Id -  <br>  |
**401** | Missing or invalid authentication. |  -  |
**403** | The key or customer subscription is not active. |  * X-Request-Id -  <br>  |
**429** | The cached monthly quota state is exceeded. |  * X-Request-Id -  <br>  * X-TimeLogic-Quota-State -  <br>  |
**405** | Only &#x60;GET&#x60; is supported. |  * X-Request-Id -  <br>  |
**500** | Internal server error, including signing failures. |  * X-Request-Id -  <br>  |
**501** | A required resolver or dependency is not configured or not ready. |  * X-Request-Id -  <br>  |
**502** | Gateway failed to forward the request to the core worker. |  * X-Request-Id -  <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **diff_time**
> DiffResponse diff_time(var_from, to, from_tz=from_tz, from_ip=from_ip, from_lat=from_lat, from_lon=from_lon, from_offset=from_offset, to_tz=to_tz, to_ip=to_ip, to_lat=to_lat, to_lon=to_lon, to_offset=to_offset, format=format, business_days=business_days, holiday_country=holiday_country, holiday_subdivision=holiday_subdivision, sign=sign)

Difference between two instants

Computes the duration between `from` and `to`.  Required query fields: `from` and `to` only. Do not send every optional companion field. For each side, choose one supported specifier form. A `from_*` or `to_*` companion is allowed only when that side uses `iso=...` with no explicit offset; use at most one companion selector, except that coordinate input requires its paired latitude and longitude.  `from` and `to` are embedded specifier strings.  Accepted specifier forms: - `from=now` - `from=unix=1711300000` - `from=unix_ms=1711300000000` - `from=iso=2026-04-16T09:00:00` - `from=tz=America/New_York` - `from=ip=8.8.8.8` - `from=offset=-05:00` - the same forms are accepted for `to`  Timezone hint pairings: - `from_tz` only with `from=iso=...` that has no explicit offset - `from_ip`, `from_lat`/`from_lon`, and `from_offset` only with `from=iso=...` that has no explicit offset - `to_tz` only with `to=iso=...` that has no explicit offset - `to_ip`, `to_lat`/`to_lon`, and `to_offset` only with `to=iso=...` that has no explicit offset  Selector semantics: - `tz=...`, `ip=...`, and `offset=...` inside `from` or `to` mean the current request-time instant resolved through that selector - those selector forms do not represent an arbitrary local wall-clock time - returned duration magnitudes are absolute; use `direction` to see whether `to` is after, before, or the same instant as `from`  Business-day rules: - `holiday_country` and `holiday_subdivision` require `business_days=true` - `holiday_subdivision` also requires `holiday_country`  Examples: - Selector-current instant: `/v1/time/diff?from=unix=1711300000&to=tz=America/New_York` - Wall-clock pairing: `/v1/time/diff?from=iso=2026-04-16T09:00:00&from_tz=America/New_York&to=iso=2026-04-16T09:00:00&to_tz=Europe/London` - Wall-clock via selector: `/v1/time/diff?from=iso=2026-01-01T12:00:00&from_ip=8.8.8.8&to=iso=2026-01-01T12:00:00&to_offset=-05:00` 

### Example

* Api Key Authentication (directApiKeyHeader):
* Bearer (TimeLogic API key) Authentication (directBearerAuth):
* Api Key Authentication (directApiKeyQuery):
* Api Key Authentication (rapidApiKey):
* Api Key Authentication (rapidApiHost):

```python
import timelogic_direct_api
from timelogic_direct_api.models.diff_response import DiffResponse
from timelogic_direct_api.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://api.timelogicapi.com
# See configuration.py for a list of all supported configuration parameters.
configuration = timelogic_direct_api.Configuration(
    host = "https://api.timelogicapi.com"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure API key authorization: directApiKeyHeader
configuration.api_key['directApiKeyHeader'] = os.environ["API_KEY"]

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['directApiKeyHeader'] = 'Bearer'

# Configure Bearer authorization (TimeLogic API key): directBearerAuth
configuration = timelogic_direct_api.Configuration(
    access_token = os.environ["BEARER_TOKEN"]
)

# Configure API key authorization: directApiKeyQuery
configuration.api_key['directApiKeyQuery'] = os.environ["API_KEY"]

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['directApiKeyQuery'] = 'Bearer'

# Configure API key authorization: rapidApiKey
configuration.api_key['rapidApiKey'] = os.environ["API_KEY"]

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['rapidApiKey'] = 'Bearer'

# Configure API key authorization: rapidApiHost
configuration.api_key['rapidApiHost'] = os.environ["API_KEY"]

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['rapidApiHost'] = 'Bearer'

# Enter a context with an instance of the API client
with timelogic_direct_api.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = timelogic_direct_api.TimeApi(api_client)
    var_from = 'var_from_example' # str | Time specifier. Supported forms are `now`, `unix=<seconds>`, `unix_ms=<milliseconds>`, `iso=<ISO-8601>`, `offset=±HH:MM`, `tz=<IANA timezone>`, and `ip=<IP address>`. For `tz=...`, `ip=...`, and `offset=...`, the specifier means the current request-time instant resolved through that selector. To express a local wall-clock time, use `from=iso=...` together with one of `from_tz`, `from_ip`, `from_lat`+`from_lon`, or `from_offset`.
    to = 'to_example' # str | Time specifier. Supported forms are `now`, `unix=<seconds>`, `unix_ms=<milliseconds>`, `iso=<ISO-8601>`, `offset=±HH:MM`, `tz=<IANA timezone>`, and `ip=<IP address>`. For `tz=...`, `ip=...`, and `offset=...`, the specifier means the current request-time instant resolved through that selector. To express a local wall-clock time, use `to=iso=...` together with one of `to_tz`, `to_ip`, `to_lat`+`to_lon`, or `to_offset`.
    from_tz = 'from_tz_example' # str | Used only with `from=iso=...` when the ISO value has no explicit offset. (optional)
    from_ip = '8.8.8.8' # str | Used only with `from=iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. (optional)
    from_lat = 40.7128 # float | Used only with `from=iso=...` when the ISO value has no explicit offset. Provide together with `from_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates. (optional)
    from_lon = -74.006 # float | Used only with `from=iso=...` when the ISO value has no explicit offset. Provide together with `from_lat`. (optional)
    from_offset = '-05:00' # str | Used only with `from=iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. (optional)
    to_tz = 'to_tz_example' # str | Used only with `to=iso=...` when the ISO value has no explicit offset. (optional)
    to_ip = '8.8.8.8' # str | Used only with `to=iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. (optional)
    to_lat = 40.7128 # float | Used only with `to=iso=...` when the ISO value has no explicit offset. Provide together with `to_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates. (optional)
    to_lon = -74.006 # float | Used only with `to=iso=...` when the ISO value has no explicit offset. Provide together with `to_lat`. (optional)
    to_offset = '-05:00' # str | Used only with `to=iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. (optional)
    format = '%daysd %hoursh %minutesm %secondss' # str | Custom duration format template using `%days`, `%hours`, `%minutes`, and `%seconds`. (optional)
    business_days = true # bool | Set to `true` to enable weekday/business-day counting. (optional)
    holiday_country = 'US' # str | ISO 3166-1 alpha-2 holiday calendar country code. Requires `business_days=true`. (optional)
    holiday_subdivision = 'CA' # str | Holiday calendar subdivision code from the upstream `python-holidays` calendar, for example `CA` or `ENG`. Requires `holiday_country` and `business_days=true`. (optional)
    sign = true # bool | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. (optional)

    try:
        # Difference between two instants
        api_response = api_instance.diff_time(var_from, to, from_tz=from_tz, from_ip=from_ip, from_lat=from_lat, from_lon=from_lon, from_offset=from_offset, to_tz=to_tz, to_ip=to_ip, to_lat=to_lat, to_lon=to_lon, to_offset=to_offset, format=format, business_days=business_days, holiday_country=holiday_country, holiday_subdivision=holiday_subdivision, sign=sign)
        print("The response of TimeApi->diff_time:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling TimeApi->diff_time: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **var_from** | **str**| Time specifier. Supported forms are &#x60;now&#x60;, &#x60;unix&#x3D;&lt;seconds&gt;&#x60;, &#x60;unix_ms&#x3D;&lt;milliseconds&gt;&#x60;, &#x60;iso&#x3D;&lt;ISO-8601&gt;&#x60;, &#x60;offset&#x3D;±HH:MM&#x60;, &#x60;tz&#x3D;&lt;IANA timezone&gt;&#x60;, and &#x60;ip&#x3D;&lt;IP address&gt;&#x60;. For &#x60;tz&#x3D;...&#x60;, &#x60;ip&#x3D;...&#x60;, and &#x60;offset&#x3D;...&#x60;, the specifier means the current request-time instant resolved through that selector. To express a local wall-clock time, use &#x60;from&#x3D;iso&#x3D;...&#x60; together with one of &#x60;from_tz&#x60;, &#x60;from_ip&#x60;, &#x60;from_lat&#x60;+&#x60;from_lon&#x60;, or &#x60;from_offset&#x60;. | 
 **to** | **str**| Time specifier. Supported forms are &#x60;now&#x60;, &#x60;unix&#x3D;&lt;seconds&gt;&#x60;, &#x60;unix_ms&#x3D;&lt;milliseconds&gt;&#x60;, &#x60;iso&#x3D;&lt;ISO-8601&gt;&#x60;, &#x60;offset&#x3D;±HH:MM&#x60;, &#x60;tz&#x3D;&lt;IANA timezone&gt;&#x60;, and &#x60;ip&#x3D;&lt;IP address&gt;&#x60;. For &#x60;tz&#x3D;...&#x60;, &#x60;ip&#x3D;...&#x60;, and &#x60;offset&#x3D;...&#x60;, the specifier means the current request-time instant resolved through that selector. To express a local wall-clock time, use &#x60;to&#x3D;iso&#x3D;...&#x60; together with one of &#x60;to_tz&#x60;, &#x60;to_ip&#x60;, &#x60;to_lat&#x60;+&#x60;to_lon&#x60;, or &#x60;to_offset&#x60;. | 
 **from_tz** | **str**| Used only with &#x60;from&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional] 
 **from_ip** | **str**| Used only with &#x60;from&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional] 
 **from_lat** | **float**| Used only with &#x60;from&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;from_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional] 
 **from_lon** | **float**| Used only with &#x60;from&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;from_lat&#x60;. | [optional] 
 **from_offset** | **str**| Used only with &#x60;from&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional] 
 **to_tz** | **str**| Used only with &#x60;to&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional] 
 **to_ip** | **str**| Used only with &#x60;to&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional] 
 **to_lat** | **float**| Used only with &#x60;to&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;to_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional] 
 **to_lon** | **float**| Used only with &#x60;to&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;to_lat&#x60;. | [optional] 
 **to_offset** | **str**| Used only with &#x60;to&#x3D;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional] 
 **format** | **str**| Custom duration format template using &#x60;%days&#x60;, &#x60;%hours&#x60;, &#x60;%minutes&#x60;, and &#x60;%seconds&#x60;. | [optional] 
 **business_days** | **bool**| Set to &#x60;true&#x60; to enable weekday/business-day counting. | [optional] 
 **holiday_country** | **str**| ISO 3166-1 alpha-2 holiday calendar country code. Requires &#x60;business_days&#x3D;true&#x60;. | [optional] 
 **holiday_subdivision** | **str**| Holiday calendar subdivision code from the upstream &#x60;python-holidays&#x60; calendar, for example &#x60;CA&#x60; or &#x60;ENG&#x60;. Requires &#x60;holiday_country&#x60; and &#x60;business_days&#x3D;true&#x60;. | [optional] 
 **sign** | **bool**| Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional] 

### Return type

[**DiffResponse**](DiffResponse.md)

### Authorization

[directApiKeyHeader](../README.md#directApiKeyHeader), [directBearerAuth](../README.md#directBearerAuth), [directApiKeyQuery](../README.md#directApiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Duration result. |  * X-Request-Id -  <br>  * X-TimeLogic-Signature -  <br>  * X-TimeLogic-Key-Id -  <br>  * X-TimeLogic-Signature-Alg -  <br>  * X-TimeLogic-Signature-Timestamp -  <br>  * X-TimeLogic-Content-SHA256 -  <br>  * X-TimeLogic-Signature-Input -  <br>  |
**400** | Invalid or ambiguous request parameters. |  * X-Request-Id -  <br>  |
**401** | Missing or invalid authentication. |  -  |
**403** | The key or customer subscription is not active. |  * X-Request-Id -  <br>  |
**429** | The cached monthly quota state is exceeded. |  * X-Request-Id -  <br>  * X-TimeLogic-Quota-State -  <br>  |
**405** | Only &#x60;GET&#x60; is supported. |  * X-Request-Id -  <br>  |
**500** | Internal server error, including signing failures. |  * X-Request-Id -  <br>  |
**501** | A required resolver or dependency is not configured or not ready. |  * X-Request-Id -  <br>  |
**502** | Gateway failed to forward the request to the core worker. |  * X-Request-Id -  <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_calendar**
> CalendarResponse get_calendar(unix=unix, unix_ms=unix_ms, iso=iso, source_tz=source_tz, source_ip=source_ip, source_lat=source_lat, source_lon=source_lon, source_offset=source_offset, tz=tz, ip=ip, lat=lat, lon=lon, offset=offset, auto_tz=auto_tz, format=format, week=week, sign=sign)

Calendar projection for a target instant

Returns calendar fields for an optional timestamp and target.  Input timestamp forms: - `unix=1711300000` - `unix_ms=1711300000000` - `iso=2026-04-16T09:00:00Z` - `iso=2026-04-16T09:00:00&source_tz=America/New_York` - `iso=2026-04-16T09:00:00&source_ip=8.8.8.8` - `iso=2026-04-16T09:00:00&source_lat=40.7128&source_lon=-74.0060` - `iso=2026-04-16T09:00:00&source_offset=-05:00` - if no input timestamp is provided, the request time is used  Target selector forms: - `tz=America/New_York` - `ip=8.8.8.8` - `lat=40.7128&lon=-74.0060` - `offset=-04:00` - `auto_tz=true`  Additional flags: - `week=true` adds `week_number`  Incompatible combinations: - at most one input timestamp form - at most one target selector family - use at most one of `source_tz`, `source_ip`, `source_lat`/`source_lon`, or `source_offset` - local-ISO companion selectors are valid only with `iso=...` that has no explicit offset - bulk is not supported on this route  Examples: - `/v1/time/calendar?iso=2026-04-16T09:00:00&source_tz=America/New_York&tz=Europe/London&week=true` - `/v1/time/calendar?unix=1711300000&auto_tz=true` 

### Example

* Api Key Authentication (directApiKeyHeader):
* Bearer (TimeLogic API key) Authentication (directBearerAuth):
* Api Key Authentication (directApiKeyQuery):
* Api Key Authentication (rapidApiKey):
* Api Key Authentication (rapidApiHost):

```python
import timelogic_direct_api
from timelogic_direct_api.models.calendar_response import CalendarResponse
from timelogic_direct_api.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://api.timelogicapi.com
# See configuration.py for a list of all supported configuration parameters.
configuration = timelogic_direct_api.Configuration(
    host = "https://api.timelogicapi.com"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure API key authorization: directApiKeyHeader
configuration.api_key['directApiKeyHeader'] = os.environ["API_KEY"]

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['directApiKeyHeader'] = 'Bearer'

# Configure Bearer authorization (TimeLogic API key): directBearerAuth
configuration = timelogic_direct_api.Configuration(
    access_token = os.environ["BEARER_TOKEN"]
)

# Configure API key authorization: directApiKeyQuery
configuration.api_key['directApiKeyQuery'] = os.environ["API_KEY"]

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['directApiKeyQuery'] = 'Bearer'

# Configure API key authorization: rapidApiKey
configuration.api_key['rapidApiKey'] = os.environ["API_KEY"]

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['rapidApiKey'] = 'Bearer'

# Configure API key authorization: rapidApiHost
configuration.api_key['rapidApiHost'] = os.environ["API_KEY"]

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['rapidApiHost'] = 'Bearer'

# Enter a context with an instance of the API client
with timelogic_direct_api.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = timelogic_direct_api.TimeApi(api_client)
    unix = 1711300000 # int |  (optional)
    unix_ms = 1711300000000 # int |  (optional)
    iso = '2024-03-24T15:00:00' # str | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`. (optional)
    source_tz = 'America/New_York' # str | Used only with `iso=...` when the ISO value has no explicit offset. (optional)
    source_ip = '8.8.8.8' # str | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. (optional)
    source_lat = 40.7128 # float | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates. (optional)
    source_lon = -74.006 # float | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`. (optional)
    source_offset = '-05:00' # str | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. (optional)
    tz = 'America/New_York' # str | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
    ip = '8.8.8.8' # str | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
    lat = 40.7128 # float | Latitude. Must be provided together with `lon`. (optional)
    lon = -74.006 # float | Longitude. Must be provided together with `lat`. (optional)
    offset = '-04:00' # str | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
    auto_tz = true # bool | Set to `true` to resolve using the caller IP from Cloudflare headers. (optional)
    format = '%Y-%m-%d %H:%M:%S' # str | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/). (optional)
    week = true # bool |  (optional)
    sign = true # bool | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. (optional)

    try:
        # Calendar projection for a target instant
        api_response = api_instance.get_calendar(unix=unix, unix_ms=unix_ms, iso=iso, source_tz=source_tz, source_ip=source_ip, source_lat=source_lat, source_lon=source_lon, source_offset=source_offset, tz=tz, ip=ip, lat=lat, lon=lon, offset=offset, auto_tz=auto_tz, format=format, week=week, sign=sign)
        print("The response of TimeApi->get_calendar:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling TimeApi->get_calendar: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **unix** | **int**|  | [optional] 
 **unix_ms** | **int**|  | [optional] 
 **iso** | **str**| ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;source_tz&#x3D;Area/City&#x60;, &#x60;source_ip&#x3D;...&#x60;, &#x60;source_lat&#x3D;...&amp;source_lon&#x3D;...&#x60;, or &#x60;source_offset&#x3D;±HH:MM&#x60;. | [optional] 
 **source_tz** | **str**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional] 
 **source_ip** | **str**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional] 
 **source_lat** | **float**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional] 
 **source_lon** | **float**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lat&#x60;. | [optional] 
 **source_offset** | **str**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional] 
 **tz** | **str**| IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] 
 **ip** | **str**| IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] 
 **lat** | **float**| Latitude. Must be provided together with &#x60;lon&#x60;. | [optional] 
 **lon** | **float**| Longitude. Must be provided together with &#x60;lat&#x60;. | [optional] 
 **offset** | **str**| Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] 
 **auto_tz** | **bool**| Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | [optional] 
 **format** | **str**| Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Reference: [strftime](https://strftime.net/). | [optional] 
 **week** | **bool**|  | [optional] 
 **sign** | **bool**| Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional] 

### Return type

[**CalendarResponse**](CalendarResponse.md)

### Authorization

[directApiKeyHeader](../README.md#directApiKeyHeader), [directBearerAuth](../README.md#directBearerAuth), [directApiKeyQuery](../README.md#directApiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Calendar payload. |  * X-Request-Id -  <br>  * X-TimeLogic-Signature -  <br>  * X-TimeLogic-Key-Id -  <br>  * X-TimeLogic-Signature-Alg -  <br>  * X-TimeLogic-Signature-Timestamp -  <br>  * X-TimeLogic-Content-SHA256 -  <br>  * X-TimeLogic-Signature-Input -  <br>  |
**400** | Invalid or ambiguous request parameters. |  * X-Request-Id -  <br>  |
**401** | Missing or invalid authentication. |  -  |
**403** | The key or customer subscription is not active. |  * X-Request-Id -  <br>  |
**429** | The cached monthly quota state is exceeded. |  * X-Request-Id -  <br>  * X-TimeLogic-Quota-State -  <br>  |
**405** | Only &#x60;GET&#x60; is supported. |  * X-Request-Id -  <br>  |
**500** | Internal server error, including signing failures. |  * X-Request-Id -  <br>  |
**501** | A required resolver or dependency is not configured or not ready. |  * X-Request-Id -  <br>  |
**502** | Gateway failed to forward the request to the core worker. |  * X-Request-Id -  <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_clock**
> str get_clock(style, unix=unix, unix_ms=unix_ms, iso=iso, source_tz=source_tz, source_ip=source_ip, source_lat=source_lat, source_lon=source_lon, source_offset=source_offset, tz=tz, ip=ip, lat=lat, lon=lon, offset=offset, format=format)

Render a live HTML clock

Returns an embeddable HTML clock fragment.  Input timestamp forms: - `unix=1711300000` - `unix_ms=1711300000000` - `iso=2026-04-16T09:00:00Z` - `iso=2026-04-16T09:00:00&source_tz=America/New_York`  Target selector forms: - `tz=America/New_York` - `ip=8.8.8.8` - `lat=40.7128&lon=-74.0060` - `offset=-04:00`  Incompatible combinations: - `style` is required and must be one of the 30 names in the `style` enum - at most one input timestamp form - at most one target selector family - use at most one of `source_tz`, `source_ip`, `source_lat`/`source_lon`, or `source_offset` - local-ISO companion selectors are valid only with `iso=...` that has no explicit offset - this route is single-target only; comma-separated `tz`, `ip`, and `offset` values are rejected - `auto_tz` is not supported on this route - `sign` is not supported on this route  Examples: - Digital: `/v1/time/clock?style=digital-dashboard&iso=2026-04-16T09:00:00&source_tz=America/New_York&tz=Europe/London` - Analog: `/v1/time/clock?style=analog-station&offset=-04:00` 

### Example

* Api Key Authentication (directApiKeyHeader):
* Bearer (TimeLogic API key) Authentication (directBearerAuth):
* Api Key Authentication (directApiKeyQuery):
* Api Key Authentication (rapidApiKey):
* Api Key Authentication (rapidApiHost):

```python
import timelogic_direct_api
from timelogic_direct_api.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://api.timelogicapi.com
# See configuration.py for a list of all supported configuration parameters.
configuration = timelogic_direct_api.Configuration(
    host = "https://api.timelogicapi.com"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure API key authorization: directApiKeyHeader
configuration.api_key['directApiKeyHeader'] = os.environ["API_KEY"]

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['directApiKeyHeader'] = 'Bearer'

# Configure Bearer authorization (TimeLogic API key): directBearerAuth
configuration = timelogic_direct_api.Configuration(
    access_token = os.environ["BEARER_TOKEN"]
)

# Configure API key authorization: directApiKeyQuery
configuration.api_key['directApiKeyQuery'] = os.environ["API_KEY"]

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['directApiKeyQuery'] = 'Bearer'

# Configure API key authorization: rapidApiKey
configuration.api_key['rapidApiKey'] = os.environ["API_KEY"]

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['rapidApiKey'] = 'Bearer'

# Configure API key authorization: rapidApiHost
configuration.api_key['rapidApiHost'] = os.environ["API_KEY"]

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['rapidApiHost'] = 'Bearer'

# Enter a context with an instance of the API client
with timelogic_direct_api.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = timelogic_direct_api.TimeApi(api_client)
    style = 'style_example' # str | Clock style name. Valid values are enumerated here; there is no separate style discovery endpoint.
    unix = 1711300000 # int |  (optional)
    unix_ms = 1711300000000 # int |  (optional)
    iso = '2024-03-24T15:00:00' # str | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`. (optional)
    source_tz = 'America/New_York' # str | Used only with `iso=...` when the ISO value has no explicit offset. (optional)
    source_ip = '8.8.8.8' # str | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. (optional)
    source_lat = 40.7128 # float | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates. (optional)
    source_lon = -74.006 # float | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`. (optional)
    source_offset = '-05:00' # str | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. (optional)
    tz = 'America/New_York' # str | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
    ip = '8.8.8.8' # str | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
    lat = 40.7128 # float | Latitude. Must be provided together with `lon`. (optional)
    lon = -74.006 # float | Longitude. Must be provided together with `lat`. (optional)
    offset = '-04:00' # str | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
    format = '%Y-%m-%d %H:%M:%S' # str | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/). (optional)

    try:
        # Render a live HTML clock
        api_response = api_instance.get_clock(style, unix=unix, unix_ms=unix_ms, iso=iso, source_tz=source_tz, source_ip=source_ip, source_lat=source_lat, source_lon=source_lon, source_offset=source_offset, tz=tz, ip=ip, lat=lat, lon=lon, offset=offset, format=format)
        print("The response of TimeApi->get_clock:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling TimeApi->get_clock: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **style** | **str**| Clock style name. Valid values are enumerated here; there is no separate style discovery endpoint. | 
 **unix** | **int**|  | [optional] 
 **unix_ms** | **int**|  | [optional] 
 **iso** | **str**| ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;source_tz&#x3D;Area/City&#x60;, &#x60;source_ip&#x3D;...&#x60;, &#x60;source_lat&#x3D;...&amp;source_lon&#x3D;...&#x60;, or &#x60;source_offset&#x3D;±HH:MM&#x60;. | [optional] 
 **source_tz** | **str**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional] 
 **source_ip** | **str**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional] 
 **source_lat** | **float**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional] 
 **source_lon** | **float**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lat&#x60;. | [optional] 
 **source_offset** | **str**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional] 
 **tz** | **str**| IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] 
 **ip** | **str**| IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] 
 **lat** | **float**| Latitude. Must be provided together with &#x60;lon&#x60;. | [optional] 
 **lon** | **float**| Longitude. Must be provided together with &#x60;lat&#x60;. | [optional] 
 **offset** | **str**| Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] 
 **format** | **str**| Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Reference: [strftime](https://strftime.net/). | [optional] 

### Return type

**str**

### Authorization

[directApiKeyHeader](../README.md#directApiKeyHeader), [directBearerAuth](../README.md#directBearerAuth), [directApiKeyQuery](../README.md#directApiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/html, application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Embeddable HTML clock fragment. |  * X-Request-Id -  <br>  * Cache-Control - Clock HTML is uncached so the bootstrap always reflects the current request. <br>  |
**400** | Invalid clock style or unsupported selector combination. |  * X-Request-Id -  <br>  |
**401** | Missing or invalid authentication. |  -  |
**403** | The key or customer subscription is not active. |  * X-Request-Id -  <br>  |
**429** | The cached monthly quota state is exceeded. |  * X-Request-Id -  <br>  * X-TimeLogic-Quota-State -  <br>  |
**405** | Only &#x60;GET&#x60; is supported. |  * X-Request-Id -  <br>  |
**500** | Internal server error, including signing failures. |  * X-Request-Id -  <br>  |
**501** | A required resolver or dependency is not configured or not ready. |  * X-Request-Id -  <br>  |
**502** | Gateway failed to forward the request to the core worker. |  * X-Request-Id -  <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_current_time**
> GetCurrentTime200Response get_current_time(tz=tz, ip=ip, lat=lat, lon=lon, offset=offset, auto_tz=auto_tz, format=format, sign=sign)

Get the current time for a target

Returns current time data for a single target, or a bulk array when exactly one of `tz`, `ip`, or `offset` is supplied as a comma-separated list.  Target selector rules: - Use at most one selector family per request: `tz`, `ip`, `lat` + `lon`, `offset`, or `auto_tz=true`. - If no selector is provided, the response defaults to UTC with `timezone=null` and `iso_local=null`. - Bulk mode is available only through one comma-separated `tz`, `ip`, or `offset` selector and cannot be combined with any other selector.  Example: - Single target: `/v1/time/current?tz=America/New_York` - For bulk, provide one comma-separated `tz`, `ip`, or `offset` value, for example `/v1/time/current?tz=America/New_York,Europe/London,Asia/Tokyo`.

### Example

* Api Key Authentication (directApiKeyHeader):
* Bearer (TimeLogic API key) Authentication (directBearerAuth):
* Api Key Authentication (directApiKeyQuery):
* Api Key Authentication (rapidApiKey):
* Api Key Authentication (rapidApiHost):

```python
import timelogic_direct_api
from timelogic_direct_api.models.get_current_time200_response import GetCurrentTime200Response
from timelogic_direct_api.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://api.timelogicapi.com
# See configuration.py for a list of all supported configuration parameters.
configuration = timelogic_direct_api.Configuration(
    host = "https://api.timelogicapi.com"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure API key authorization: directApiKeyHeader
configuration.api_key['directApiKeyHeader'] = os.environ["API_KEY"]

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['directApiKeyHeader'] = 'Bearer'

# Configure Bearer authorization (TimeLogic API key): directBearerAuth
configuration = timelogic_direct_api.Configuration(
    access_token = os.environ["BEARER_TOKEN"]
)

# Configure API key authorization: directApiKeyQuery
configuration.api_key['directApiKeyQuery'] = os.environ["API_KEY"]

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['directApiKeyQuery'] = 'Bearer'

# Configure API key authorization: rapidApiKey
configuration.api_key['rapidApiKey'] = os.environ["API_KEY"]

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['rapidApiKey'] = 'Bearer'

# Configure API key authorization: rapidApiHost
configuration.api_key['rapidApiHost'] = os.environ["API_KEY"]

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['rapidApiHost'] = 'Bearer'

# Enter a context with an instance of the API client
with timelogic_direct_api.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = timelogic_direct_api.TimeApi(api_client)
    tz = 'America/New_York' # str | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
    ip = '8.8.8.8' # str | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
    lat = 40.7128 # float | Latitude. Must be provided together with `lon`. (optional)
    lon = -74.006 # float | Longitude. Must be provided together with `lat`. (optional)
    offset = '-04:00' # str | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
    auto_tz = true # bool | Set to `true` to resolve using the caller IP from Cloudflare headers. (optional)
    format = '%Y-%m-%d %H:%M:%S' # str | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/). (optional)
    sign = true # bool | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. (optional)

    try:
        # Get the current time for a target
        api_response = api_instance.get_current_time(tz=tz, ip=ip, lat=lat, lon=lon, offset=offset, auto_tz=auto_tz, format=format, sign=sign)
        print("The response of TimeApi->get_current_time:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling TimeApi->get_current_time: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tz** | **str**| IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] 
 **ip** | **str**| IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] 
 **lat** | **float**| Latitude. Must be provided together with &#x60;lon&#x60;. | [optional] 
 **lon** | **float**| Longitude. Must be provided together with &#x60;lat&#x60;. | [optional] 
 **offset** | **str**| Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] 
 **auto_tz** | **bool**| Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | [optional] 
 **format** | **str**| Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Reference: [strftime](https://strftime.net/). | [optional] 
 **sign** | **bool**| Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional] 

### Return type

[**GetCurrentTime200Response**](GetCurrentTime200Response.md)

### Authorization

[directApiKeyHeader](../README.md#directApiKeyHeader), [directBearerAuth](../README.md#directBearerAuth), [directApiKeyQuery](../README.md#directApiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Current time payload or bulk array. |  * X-Request-Id -  <br>  * X-TimeLogic-Signature -  <br>  * X-TimeLogic-Key-Id -  <br>  * X-TimeLogic-Signature-Alg -  <br>  * X-TimeLogic-Signature-Timestamp -  <br>  * X-TimeLogic-Content-SHA256 -  <br>  * X-TimeLogic-Signature-Input -  <br>  |
**400** | Invalid or ambiguous request parameters. |  * X-Request-Id -  <br>  |
**401** | Missing or invalid authentication. |  -  |
**403** | The key or customer subscription is not active. |  * X-Request-Id -  <br>  |
**429** | The cached monthly quota state is exceeded. |  * X-Request-Id -  <br>  * X-TimeLogic-Quota-State -  <br>  |
**405** | Only &#x60;GET&#x60; is supported. |  * X-Request-Id -  <br>  |
**500** | Internal server error, including signing failures. |  * X-Request-Id -  <br>  |
**501** | A required resolver or dependency is not configured or not ready. |  * X-Request-Id -  <br>  |
**502** | Gateway failed to forward the request to the core worker. |  * X-Request-Id -  <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_dst**
> DstResponse get_dst(tz=tz, ip=ip, lat=lat, lon=lon, offset=offset, auto_tz=auto_tz, format=format, next=next, sign=sign)

Daylight-saving status for a target

Returns daylight-saving status for the selected target.  Target selector rules: - Use at most one selector family: `tz`, `ip`, `lat` + `lon`, `offset`, or `auto_tz=true`. - If no selector is provided, the response defaults to UTC. - Bulk is not supported on this route. - `next=true` adds `next_transition` when the resolver provides a transition timestamp.  Example: - `/v1/time/dst?tz=America/New_York&next=true`

### Example

* Api Key Authentication (directApiKeyHeader):
* Bearer (TimeLogic API key) Authentication (directBearerAuth):
* Api Key Authentication (directApiKeyQuery):
* Api Key Authentication (rapidApiKey):
* Api Key Authentication (rapidApiHost):

```python
import timelogic_direct_api
from timelogic_direct_api.models.dst_response import DstResponse
from timelogic_direct_api.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://api.timelogicapi.com
# See configuration.py for a list of all supported configuration parameters.
configuration = timelogic_direct_api.Configuration(
    host = "https://api.timelogicapi.com"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure API key authorization: directApiKeyHeader
configuration.api_key['directApiKeyHeader'] = os.environ["API_KEY"]

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['directApiKeyHeader'] = 'Bearer'

# Configure Bearer authorization (TimeLogic API key): directBearerAuth
configuration = timelogic_direct_api.Configuration(
    access_token = os.environ["BEARER_TOKEN"]
)

# Configure API key authorization: directApiKeyQuery
configuration.api_key['directApiKeyQuery'] = os.environ["API_KEY"]

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['directApiKeyQuery'] = 'Bearer'

# Configure API key authorization: rapidApiKey
configuration.api_key['rapidApiKey'] = os.environ["API_KEY"]

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['rapidApiKey'] = 'Bearer'

# Configure API key authorization: rapidApiHost
configuration.api_key['rapidApiHost'] = os.environ["API_KEY"]

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['rapidApiHost'] = 'Bearer'

# Enter a context with an instance of the API client
with timelogic_direct_api.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = timelogic_direct_api.TimeApi(api_client)
    tz = 'America/New_York' # str | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
    ip = '8.8.8.8' # str | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
    lat = 40.7128 # float | Latitude. Must be provided together with `lon`. (optional)
    lon = -74.006 # float | Longitude. Must be provided together with `lat`. (optional)
    offset = '-04:00' # str | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
    auto_tz = true # bool | Set to `true` to resolve using the caller IP from Cloudflare headers. (optional)
    format = '%Y-%m-%d %H:%M:%S' # str | Custom date/time format template using supported `strftime`-style directives such as `%Y-%m-%d %H:%M:%S`. Reference: [strftime](https://strftime.net/). (optional)
    next = true # bool |  (optional)
    sign = true # bool | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. (optional)

    try:
        # Daylight-saving status for a target
        api_response = api_instance.get_dst(tz=tz, ip=ip, lat=lat, lon=lon, offset=offset, auto_tz=auto_tz, format=format, next=next, sign=sign)
        print("The response of TimeApi->get_dst:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling TimeApi->get_dst: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tz** | **str**| IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] 
 **ip** | **str**| IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] 
 **lat** | **float**| Latitude. Must be provided together with &#x60;lon&#x60;. | [optional] 
 **lon** | **float**| Longitude. Must be provided together with &#x60;lat&#x60;. | [optional] 
 **offset** | **str**| Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] 
 **auto_tz** | **bool**| Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | [optional] 
 **format** | **str**| Custom date/time format template using supported &#x60;strftime&#x60;-style directives such as &#x60;%Y-%m-%d %H:%M:%S&#x60;. Reference: [strftime](https://strftime.net/). | [optional] 
 **next** | **bool**|  | [optional] 
 **sign** | **bool**| Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional] 

### Return type

[**DstResponse**](DstResponse.md)

### Authorization

[directApiKeyHeader](../README.md#directApiKeyHeader), [directBearerAuth](../README.md#directBearerAuth), [directApiKeyQuery](../README.md#directApiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | DST payload. |  * X-Request-Id -  <br>  * X-TimeLogic-Signature -  <br>  * X-TimeLogic-Key-Id -  <br>  * X-TimeLogic-Signature-Alg -  <br>  * X-TimeLogic-Signature-Timestamp -  <br>  * X-TimeLogic-Content-SHA256 -  <br>  * X-TimeLogic-Signature-Input -  <br>  |
**400** | Invalid or ambiguous request parameters. |  * X-Request-Id -  <br>  |
**401** | Missing or invalid authentication. |  -  |
**403** | The key or customer subscription is not active. |  * X-Request-Id -  <br>  |
**429** | The cached monthly quota state is exceeded. |  * X-Request-Id -  <br>  * X-TimeLogic-Quota-State -  <br>  |
**405** | Only &#x60;GET&#x60; is supported. |  * X-Request-Id -  <br>  |
**500** | Internal server error, including signing failures. |  * X-Request-Id -  <br>  |
**501** | A required resolver or dependency is not configured or not ready. |  * X-Request-Id -  <br>  |
**502** | Gateway failed to forward the request to the core worker. |  * X-Request-Id -  <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_elapsed**
> ElapsedResponse get_elapsed(unix=unix, unix_ms=unix_ms, iso=iso, source_tz=source_tz, source_ip=source_ip, source_lat=source_lat, source_lon=source_lon, source_offset=source_offset, compare_unix=compare_unix, compare_unix_ms=compare_unix_ms, compare_iso=compare_iso, compare_source_tz=compare_source_tz, compare_source_ip=compare_source_ip, compare_source_lat=compare_source_lat, compare_source_lon=compare_source_lon, compare_source_offset=compare_source_offset, tz=tz, ip=ip, lat=lat, lon=lon, offset=offset, auto_tz=auto_tz, format=format, business_days=business_days, holiday_country=holiday_country, holiday_subdivision=holiday_subdivision, sign=sign)

Time elapsed since or remaining until a reference instant

Computes elapsed or remaining duration relative to one required reference timestamp.  Reference timestamp forms: - `unix=1711300000` - `unix_ms=1711300000000` - `iso=2026-04-16T09:00:00Z` - `iso=2026-04-16T09:00:00&source_tz=America/New_York` - `iso=2026-04-16T09:00:00&source_ip=8.8.8.8` - `iso=2026-04-16T09:00:00&source_lat=40.7128&source_lon=-74.0060` - `iso=2026-04-16T09:00:00&source_offset=-05:00`  Compare timestamp forms: - `compare_unix=1711213600` - `compare_unix_ms=1711213600000` - `compare_iso=2026-04-16T09:00:00Z` - `compare_iso=2026-04-16T09:00:00&compare_source_tz=Europe/London` - `compare_iso=2026-04-16T09:00:00&compare_source_ip=8.8.8.8` - `compare_iso=2026-04-16T09:00:00&compare_source_lat=40.7128&compare_source_lon=-74.0060` - `compare_iso=2026-04-16T09:00:00&compare_source_offset=-05:00`  Compare selector forms: - `tz=America/New_York` - `ip=8.8.8.8` - `lat=40.7128&lon=-74.0060` - `offset=-04:00` - `auto_tz=true`  Incompatible combinations: - exactly one reference timestamp form - use either one compare timestamp form or one compare selector family, not both - use at most one of `source_tz`, `source_ip`, `source_lat`/`source_lon`, or `source_offset` - use at most one of `compare_source_tz`, `compare_source_ip`, `compare_source_lat`/`compare_source_lon`, or `compare_source_offset` - local-ISO companion selectors are valid only with `iso=...` that has no explicit offset - compare local-ISO companion selectors are valid only with `compare_iso=...` that has no explicit offset - if no compare input is provided, the comparison defaults to the request time  Business-day rules: - `holiday_country` and `holiday_subdivision` require `business_days=true` - `holiday_subdivision` also requires `holiday_country`  Examples: - Timestamp-to-timestamp: `/v1/time/elapsed?iso=2026-04-16T09:00:00&source_tz=America/New_York&compare_iso=2026-04-16T09:00:00&compare_source_tz=Europe/London` - Timestamp-to-selector: `/v1/time/elapsed?unix=1711300000&tz=America/New_York&business_days=true` 

### Example

* Api Key Authentication (directApiKeyHeader):
* Bearer (TimeLogic API key) Authentication (directBearerAuth):
* Api Key Authentication (directApiKeyQuery):
* Api Key Authentication (rapidApiKey):
* Api Key Authentication (rapidApiHost):

```python
import timelogic_direct_api
from timelogic_direct_api.models.elapsed_response import ElapsedResponse
from timelogic_direct_api.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://api.timelogicapi.com
# See configuration.py for a list of all supported configuration parameters.
configuration = timelogic_direct_api.Configuration(
    host = "https://api.timelogicapi.com"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure API key authorization: directApiKeyHeader
configuration.api_key['directApiKeyHeader'] = os.environ["API_KEY"]

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['directApiKeyHeader'] = 'Bearer'

# Configure Bearer authorization (TimeLogic API key): directBearerAuth
configuration = timelogic_direct_api.Configuration(
    access_token = os.environ["BEARER_TOKEN"]
)

# Configure API key authorization: directApiKeyQuery
configuration.api_key['directApiKeyQuery'] = os.environ["API_KEY"]

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['directApiKeyQuery'] = 'Bearer'

# Configure API key authorization: rapidApiKey
configuration.api_key['rapidApiKey'] = os.environ["API_KEY"]

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['rapidApiKey'] = 'Bearer'

# Configure API key authorization: rapidApiHost
configuration.api_key['rapidApiHost'] = os.environ["API_KEY"]

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['rapidApiHost'] = 'Bearer'

# Enter a context with an instance of the API client
with timelogic_direct_api.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = timelogic_direct_api.TimeApi(api_client)
    unix = 1711300000 # int |  (optional)
    unix_ms = 1711300000000 # int |  (optional)
    iso = '2024-03-24T15:00:00' # str | ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `source_tz=Area/City`, `source_ip=...`, `source_lat=...&source_lon=...`, or `source_offset=±HH:MM`. (optional)
    source_tz = 'America/New_York' # str | Used only with `iso=...` when the ISO value has no explicit offset. (optional)
    source_ip = '8.8.8.8' # str | Used only with `iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. (optional)
    source_lat = 40.7128 # float | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates. (optional)
    source_lon = -74.006 # float | Used only with `iso=...` when the ISO value has no explicit offset. Provide together with `source_lat`. (optional)
    source_offset = '-05:00' # str | Used only with `iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. (optional)
    compare_unix = 1711213600 # int |  (optional)
    compare_unix_ms = 1711213600000 # int |  (optional)
    compare_iso = '2024-03-23T15:00:00' # str | ISO-8601 comparison timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of `compare_source_tz=Area/City`, `compare_source_ip=...`, `compare_source_lat=...&compare_source_lon=...`, or `compare_source_offset=±HH:MM`. (optional)
    compare_source_tz = 'America/New_York' # str | Used only with `compare_iso=...` when the ISO value has no explicit offset. (optional)
    compare_source_ip = '8.8.8.8' # str | Used only with `compare_iso=...` when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. (optional)
    compare_source_lat = 40.7128 # float | Used only with `compare_iso=...` when the ISO value has no explicit offset. Provide together with `compare_source_lon` to resolve that local wall-clock time through the timezone mapped from these coordinates. (optional)
    compare_source_lon = -74.006 # float | Used only with `compare_iso=...` when the ISO value has no explicit offset. Provide together with `compare_source_lat`. (optional)
    compare_source_offset = '-05:00' # str | Used only with `compare_iso=...` when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. (optional)
    tz = 'America/New_York' # str | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
    ip = '8.8.8.8' # str | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
    lat = 40.7128 # float | Latitude. Must be provided together with `lon`. (optional)
    lon = -74.006 # float | Longitude. Must be provided together with `lat`. (optional)
    offset = '-04:00' # str | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
    auto_tz = true # bool | Set to `true` to resolve using the caller IP from Cloudflare headers. (optional)
    format = '%daysd %hoursh %minutesm %secondss' # str | Custom duration format template using `%days`, `%hours`, `%minutes`, and `%seconds`. (optional)
    business_days = true # bool | Set to `true` to enable weekday/business-day counting. (optional)
    holiday_country = 'US' # str | ISO 3166-1 alpha-2 holiday calendar country code. Requires `business_days=true`. (optional)
    holiday_subdivision = 'CA' # str | Holiday calendar subdivision code from the upstream `python-holidays` calendar, for example `CA` or `ENG`. Requires `holiday_country` and `business_days=true`. (optional)
    sign = true # bool | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. (optional)

    try:
        # Time elapsed since or remaining until a reference instant
        api_response = api_instance.get_elapsed(unix=unix, unix_ms=unix_ms, iso=iso, source_tz=source_tz, source_ip=source_ip, source_lat=source_lat, source_lon=source_lon, source_offset=source_offset, compare_unix=compare_unix, compare_unix_ms=compare_unix_ms, compare_iso=compare_iso, compare_source_tz=compare_source_tz, compare_source_ip=compare_source_ip, compare_source_lat=compare_source_lat, compare_source_lon=compare_source_lon, compare_source_offset=compare_source_offset, tz=tz, ip=ip, lat=lat, lon=lon, offset=offset, auto_tz=auto_tz, format=format, business_days=business_days, holiday_country=holiday_country, holiday_subdivision=holiday_subdivision, sign=sign)
        print("The response of TimeApi->get_elapsed:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling TimeApi->get_elapsed: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **unix** | **int**|  | [optional] 
 **unix_ms** | **int**|  | [optional] 
 **iso** | **str**| ISO-8601 timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;source_tz&#x3D;Area/City&#x60;, &#x60;source_ip&#x3D;...&#x60;, &#x60;source_lat&#x3D;...&amp;source_lon&#x3D;...&#x60;, or &#x60;source_offset&#x3D;±HH:MM&#x60;. | [optional] 
 **source_tz** | **str**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional] 
 **source_ip** | **str**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional] 
 **source_lat** | **float**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional] 
 **source_lon** | **float**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;source_lat&#x60;. | [optional] 
 **source_offset** | **str**| Used only with &#x60;iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional] 
 **compare_unix** | **int**|  | [optional] 
 **compare_unix_ms** | **int**|  | [optional] 
 **compare_iso** | **str**| ISO-8601 comparison timestamp. To supply a local wall-clock time without an explicit offset, pair it with one of &#x60;compare_source_tz&#x3D;Area/City&#x60;, &#x60;compare_source_ip&#x3D;...&#x60;, &#x60;compare_source_lat&#x3D;...&amp;compare_source_lon&#x3D;...&#x60;, or &#x60;compare_source_offset&#x3D;±HH:MM&#x60;. | [optional] 
 **compare_source_tz** | **str**| Used only with &#x60;compare_iso&#x3D;...&#x60; when the ISO value has no explicit offset. | [optional] 
 **compare_source_ip** | **str**| Used only with &#x60;compare_iso&#x3D;...&#x60; when the ISO value has no explicit offset. Resolves that local wall-clock time through the timezone mapped from this IP address. | [optional] 
 **compare_source_lat** | **float**| Used only with &#x60;compare_iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;compare_source_lon&#x60; to resolve that local wall-clock time through the timezone mapped from these coordinates. | [optional] 
 **compare_source_lon** | **float**| Used only with &#x60;compare_iso&#x3D;...&#x60; when the ISO value has no explicit offset. Provide together with &#x60;compare_source_lat&#x60;. | [optional] 
 **compare_source_offset** | **str**| Used only with &#x60;compare_iso&#x3D;...&#x60; when the ISO value has no explicit offset. Interprets that local wall-clock time at this fixed UTC offset. | [optional] 
 **tz** | **str**| IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] 
 **ip** | **str**| IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] 
 **lat** | **float**| Latitude. Must be provided together with &#x60;lon&#x60;. | [optional] 
 **lon** | **float**| Longitude. Must be provided together with &#x60;lat&#x60;. | [optional] 
 **offset** | **str**| Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] 
 **auto_tz** | **bool**| Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | [optional] 
 **format** | **str**| Custom duration format template using &#x60;%days&#x60;, &#x60;%hours&#x60;, &#x60;%minutes&#x60;, and &#x60;%seconds&#x60;. | [optional] 
 **business_days** | **bool**| Set to &#x60;true&#x60; to enable weekday/business-day counting. | [optional] 
 **holiday_country** | **str**| ISO 3166-1 alpha-2 holiday calendar country code. Requires &#x60;business_days&#x3D;true&#x60;. | [optional] 
 **holiday_subdivision** | **str**| Holiday calendar subdivision code from the upstream &#x60;python-holidays&#x60; calendar, for example &#x60;CA&#x60; or &#x60;ENG&#x60;. Requires &#x60;holiday_country&#x60; and &#x60;business_days&#x3D;true&#x60;. | [optional] 
 **sign** | **bool**| Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional] 

### Return type

[**ElapsedResponse**](ElapsedResponse.md)

### Authorization

[directApiKeyHeader](../README.md#directApiKeyHeader), [directBearerAuth](../README.md#directBearerAuth), [directApiKeyQuery](../README.md#directApiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Elapsed-duration result. |  * X-Request-Id -  <br>  * X-TimeLogic-Signature -  <br>  * X-TimeLogic-Key-Id -  <br>  * X-TimeLogic-Signature-Alg -  <br>  * X-TimeLogic-Signature-Timestamp -  <br>  * X-TimeLogic-Content-SHA256 -  <br>  * X-TimeLogic-Signature-Input -  <br>  |
**400** | Invalid or ambiguous request parameters. |  * X-Request-Id -  <br>  |
**401** | Missing or invalid authentication. |  -  |
**403** | The key or customer subscription is not active. |  * X-Request-Id -  <br>  |
**429** | The cached monthly quota state is exceeded. |  * X-Request-Id -  <br>  * X-TimeLogic-Quota-State -  <br>  |
**405** | Only &#x60;GET&#x60; is supported. |  * X-Request-Id -  <br>  |
**500** | Internal server error, including signing failures. |  * X-Request-Id -  <br>  |
**501** | A required resolver or dependency is not configured or not ready. |  * X-Request-Id -  <br>  |
**502** | Gateway failed to forward the request to the core worker. |  * X-Request-Id -  <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_timezone**
> GetTimezone200Response get_timezone(tz=tz, ip=ip, lat=lat, lon=lon, offset=offset, auto_tz=auto_tz, sign=sign)

Resolve timezone information for a target

Resolves timezone metadata for a single target.  Target selector rules: - Use exactly one selector family: `tz`, `ip`, `lat` + `lon`, `offset`, or `auto_tz=true`. - Bulk is not supported on this route. - `offset` queries return a specialized payload that includes `matching_zones` for the request-time offset match.  Examples: - Single target: `/v1/timezone?tz=America/New_York` - Offset match: `/v1/timezone?offset=-04:00`

### Example

* Api Key Authentication (directApiKeyHeader):
* Bearer (TimeLogic API key) Authentication (directBearerAuth):
* Api Key Authentication (directApiKeyQuery):
* Api Key Authentication (rapidApiKey):
* Api Key Authentication (rapidApiHost):

```python
import timelogic_direct_api
from timelogic_direct_api.models.get_timezone200_response import GetTimezone200Response
from timelogic_direct_api.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://api.timelogicapi.com
# See configuration.py for a list of all supported configuration parameters.
configuration = timelogic_direct_api.Configuration(
    host = "https://api.timelogicapi.com"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure API key authorization: directApiKeyHeader
configuration.api_key['directApiKeyHeader'] = os.environ["API_KEY"]

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['directApiKeyHeader'] = 'Bearer'

# Configure Bearer authorization (TimeLogic API key): directBearerAuth
configuration = timelogic_direct_api.Configuration(
    access_token = os.environ["BEARER_TOKEN"]
)

# Configure API key authorization: directApiKeyQuery
configuration.api_key['directApiKeyQuery'] = os.environ["API_KEY"]

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['directApiKeyQuery'] = 'Bearer'

# Configure API key authorization: rapidApiKey
configuration.api_key['rapidApiKey'] = os.environ["API_KEY"]

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['rapidApiKey'] = 'Bearer'

# Configure API key authorization: rapidApiHost
configuration.api_key['rapidApiHost'] = os.environ["API_KEY"]

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
# configuration.api_key_prefix['rapidApiHost'] = 'Bearer'

# Enter a context with an instance of the API client
with timelogic_direct_api.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = timelogic_direct_api.TimeApi(api_client)
    tz = 'America/New_York' # str | IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
    ip = '8.8.8.8' # str | IP address. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
    lat = 40.7128 # float | Latitude. Must be provided together with `lon`. (optional)
    lon = -74.006 # float | Longitude. Must be provided together with `lat`. (optional)
    offset = '-04:00' # str | Fixed UTC offset in `+HH:MM` or `-HH:MM` format. On bulk-capable routes, a comma-separated list enables bulk mode. (optional)
    auto_tz = true # bool | Set to `true` to resolve using the caller IP from Cloudflare headers. (optional)
    sign = true # bool | Set to exactly `true` to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on `/v1/time/clock`. (optional)

    try:
        # Resolve timezone information for a target
        api_response = api_instance.get_timezone(tz=tz, ip=ip, lat=lat, lon=lon, offset=offset, auto_tz=auto_tz, sign=sign)
        print("The response of TimeApi->get_timezone:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling TimeApi->get_timezone: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tz** | **str**| IANA timezone name. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] 
 **ip** | **str**| IP address. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] 
 **lat** | **float**| Latitude. Must be provided together with &#x60;lon&#x60;. | [optional] 
 **lon** | **float**| Longitude. Must be provided together with &#x60;lat&#x60;. | [optional] 
 **offset** | **str**| Fixed UTC offset in &#x60;+HH:MM&#x60; or &#x60;-HH:MM&#x60; format. On bulk-capable routes, a comma-separated list enables bulk mode. | [optional] 
 **auto_tz** | **bool**| Set to &#x60;true&#x60; to resolve using the caller IP from Cloudflare headers. | [optional] 
 **sign** | **bool**| Set to exactly &#x60;true&#x60; to ask the gateway to sign the final JSON response. Every authenticated JSON response, including errors, then includes signing headers. Not supported on &#x60;/v1/time/clock&#x60;. | [optional] 

### Return type

[**GetTimezone200Response**](GetTimezone200Response.md)

### Authorization

[directApiKeyHeader](../README.md#directApiKeyHeader), [directBearerAuth](../README.md#directBearerAuth), [directApiKeyQuery](../README.md#directApiKeyQuery), [rapidApiKey](../README.md#rapidApiKey), [rapidApiHost](../README.md#rapidApiHost)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Resolved timezone payload. |  * X-Request-Id -  <br>  * X-TimeLogic-Signature -  <br>  * X-TimeLogic-Key-Id -  <br>  * X-TimeLogic-Signature-Alg -  <br>  * X-TimeLogic-Signature-Timestamp -  <br>  * X-TimeLogic-Content-SHA256 -  <br>  * X-TimeLogic-Signature-Input -  <br>  |
**400** | Invalid or ambiguous request parameters. |  * X-Request-Id -  <br>  |
**401** | Missing or invalid authentication. |  -  |
**403** | The key or customer subscription is not active. |  * X-Request-Id -  <br>  |
**429** | The cached monthly quota state is exceeded. |  * X-Request-Id -  <br>  * X-TimeLogic-Quota-State -  <br>  |
**405** | Only &#x60;GET&#x60; is supported. |  * X-Request-Id -  <br>  |
**500** | Internal server error, including signing failures. |  * X-Request-Id -  <br>  |
**501** | A required resolver or dependency is not configured or not ready. |  * X-Request-Id -  <br>  |
**502** | Gateway failed to forward the request to the core worker. |  * X-Request-Id -  <br>  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

