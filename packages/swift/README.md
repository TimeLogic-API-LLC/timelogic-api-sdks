# TimeLogic API Swift SDK | A World Time API

Official Swift SDK for TimeLogic API, a world time API.

## Overview
- API version: 1.0.0
- Package version: 1.0.1
- Swift module: `TimeLogicAPI`
- License: Unlicense

## Installation

### Carthage

Run `carthage update`

### CocoaPods

Run `pod install`

## Documentation for API Endpoints

All URIs are relative to *https://api.timelogicapi.com*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*TimeAPI* | [**addTime**](docs/TimeAPI.md#addtime) | **GET** /v1/time/add | Add modifiers to a timestamp
*TimeAPI* | [**convertTime**](docs/TimeAPI.md#converttime) | **GET** /v1/time/convert | Convert a timestamp into a target timezone or offset
*TimeAPI* | [**diffTime**](docs/TimeAPI.md#difftime) | **GET** /v1/time/diff | Difference between two instants
*TimeAPI* | [**getCalendar**](docs/TimeAPI.md#getcalendar) | **GET** /v1/time/calendar | Calendar projection for a target instant
*TimeAPI* | [**getClock**](docs/TimeAPI.md#getclock) | **GET** /v1/time/clock | Render a live HTML clock
*TimeAPI* | [**getCurrentTime**](docs/TimeAPI.md#getcurrenttime) | **GET** /v1/time/current | Get the current time for a target
*TimeAPI* | [**getDst**](docs/TimeAPI.md#getdst) | **GET** /v1/time/dst | Daylight-saving status for a target
*TimeAPI* | [**getElapsed**](docs/TimeAPI.md#getelapsed) | **GET** /v1/time/elapsed | Time elapsed since or remaining until a reference instant
*TimeAPI* | [**getTimezone**](docs/TimeAPI.md#gettimezone) | **GET** /v1/timezone | Resolve timezone information for a target
*UtilityAPI* | [**getPublicSigningKey**](docs/UtilityAPI.md#getpublicsigningkey) | **GET** /.well-known/time-api-public-key | Public signing key set


## Documentation For Models

 - [ApiError](docs/ApiError.md)
 - [BulkError](docs/BulkError.md)
 - [CalendarResponse](docs/CalendarResponse.md)
 - [DiffEndpointRef](docs/DiffEndpointRef.md)
 - [DiffResponse](docs/DiffResponse.md)
 - [DstResponse](docs/DstResponse.md)
 - [ElapsedResponse](docs/ElapsedResponse.md)
 - [GetCurrentTime200Response](docs/GetCurrentTime200Response.md)
 - [GetTimezone200Response](docs/GetTimezone200Response.md)
 - [JwkKey](docs/JwkKey.md)
 - [JwksResponse](docs/JwksResponse.md)
 - [ModelErrorResponse](docs/ModelErrorResponse.md)
 - [TimePayload](docs/TimePayload.md)
 - [TimePayloadBulkItem](docs/TimePayloadBulkItem.md)
 - [TimePayloadBulkResponse](docs/TimePayloadBulkResponse.md)
 - [TimezoneMatch](docs/TimezoneMatch.md)
 - [TimezoneOffsetResponse](docs/TimezoneOffsetResponse.md)
 - [TimezoneResolvedResponse](docs/TimezoneResolvedResponse.md)


<a id="documentation-for-authorization"></a>
## Documentation For Authorization


Authentication schemes defined for the API:
<a id="bearerAuth"></a>
### bearerAuth

- **Type**: HTTP Bearer Token authentication (TimeLogic API key)

<a id="apiKeyHeader"></a>
### apiKeyHeader

- **Type**: API key
- **API key parameter name**: X-API-Key
- **Location**: HTTP header

<a id="apiKeyQuery"></a>
### apiKeyQuery

- **Type**: API key
- **API key parameter name**: api_key
- **Location**: URL query string

<a id="rapidApiKey"></a>
### rapidApiKey

- **Type**: API key
- **API key parameter name**: X-RapidAPI-Key
- **Location**: HTTP header

<a id="rapidApiHost"></a>
### rapidApiHost

- **Type**: API key
- **API key parameter name**: X-RapidAPI-Host
- **Location**: HTTP header


## Author

TimeLogic API LLC
