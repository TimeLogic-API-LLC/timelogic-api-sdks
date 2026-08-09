# TimeLogic API | A World Time API

Official Rust SDK for world time, timezone conversion, and calendar information.

## Install

Add the crate to your `Cargo.toml`:

```toml
[dependencies]
timelogic-api = "1.0.1"
```

The crate is imported as `timelogic_api`.

## Documentation for API Endpoints

All URIs are relative to *https://api.timelogicapi.com*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*TimeApi* | [**add_time**](docs/TimeApi.md#add_time) | **GET** /v1/time/add | Add modifiers to a timestamp
*TimeApi* | [**convert_time**](docs/TimeApi.md#convert_time) | **GET** /v1/time/convert | Convert a timestamp into a target timezone or offset
*TimeApi* | [**diff_time**](docs/TimeApi.md#diff_time) | **GET** /v1/time/diff | Difference between two instants
*TimeApi* | [**get_calendar**](docs/TimeApi.md#get_calendar) | **GET** /v1/time/calendar | Calendar projection for a target instant
*TimeApi* | [**get_clock**](docs/TimeApi.md#get_clock) | **GET** /v1/time/clock | Render a live HTML clock
*TimeApi* | [**get_current_time**](docs/TimeApi.md#get_current_time) | **GET** /v1/time/current | Get the current time for a target
*TimeApi* | [**get_dst**](docs/TimeApi.md#get_dst) | **GET** /v1/time/dst | Daylight-saving status for a target
*TimeApi* | [**get_elapsed**](docs/TimeApi.md#get_elapsed) | **GET** /v1/time/elapsed | Time elapsed since or remaining until a reference instant
*TimeApi* | [**get_timezone**](docs/TimeApi.md#get_timezone) | **GET** /v1/timezone | Resolve timezone information for a target
*UtilityApi* | [**get_public_signing_key**](docs/UtilityApi.md#get_public_signing_key) | **GET** /.well-known/time-api-public-key | Public signing key set


## Documentation For Models

 - [ApiError](docs/ApiError.md)
 - [BulkError](docs/BulkError.md)
 - [CalendarResponse](docs/CalendarResponse.md)
 - [DiffEndpointRef](docs/DiffEndpointRef.md)
 - [DiffResponse](docs/DiffResponse.md)
 - [DstResponse](docs/DstResponse.md)
 - [ElapsedResponse](docs/ElapsedResponse.md)
 - [ErrorResponse](docs/ErrorResponse.md)
 - [GetCurrentTime200Response](docs/GetCurrentTime200Response.md)
 - [GetTimezone200Response](docs/GetTimezone200Response.md)
 - [JwkKey](docs/JwkKey.md)
 - [JwksResponse](docs/JwksResponse.md)
 - [TimePayload](docs/TimePayload.md)
 - [TimePayloadBulkItem](docs/TimePayloadBulkItem.md)
 - [TimePayloadBulkResponse](docs/TimePayloadBulkResponse.md)
 - [TimezoneMatch](docs/TimezoneMatch.md)
 - [TimezoneOffsetResponse](docs/TimezoneOffsetResponse.md)
 - [TimezoneResolvedResponse](docs/TimezoneResolvedResponse.md)


To get access to the crate's generated documentation, use:

```
cargo doc --open
```

## Author



