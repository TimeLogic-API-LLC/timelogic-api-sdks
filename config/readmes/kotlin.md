# TimeLogic API SDK for Kotlin

Official Kotlin client for [TimeLogic API](https://api.timelogicapi.com): current time, time zone lookups, conversions, date arithmetic, business-day counts, DST status, calendars, embeddable clocks and signed responses. The package contains two clients:

- the `/v1` client, generated from the [TimeLogic API contract](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/openapi/openapi.yaml), with direct and RapidAPI transports;
- a [WorldTimeAPI-compatible client](#worldtimeapi-compatible-client) for the `/api/timezone` and `/api/ip` routes, which use worldtimeapi.org's paths, fields and plain-text format.

Package: [`com.timelogicapi:timelogic-api-kotlin`](https://central.sonatype.com/artifact/com.timelogicapi/timelogic-api-kotlin), version __VERSION__. Changes are listed in the [changelog](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/CHANGELOG.md).

## Install

Gradle:

```kotlin
implementation("com.timelogicapi:timelogic-api-kotlin:__VERSION__")
```

Requires JVM 8+ (OkHttp and Moshi).

## Quick start

Get an API key, export it as `TIMELOGIC_API_KEY`, and run:

```kotlin
import com.timelogic.direct.api.apis.TimeApi
import com.timelogic.direct.api.infrastructure.TransportConfiguration

fun main() {
    // Credentials are stored process-wide on ApiClient; the returned client carries the base URL
    val client = TransportConfiguration.create(System.getenv("TIMELOGIC_API_KEY"))
    val time = TimeApi(client.baseUrl)

    val now = time.getCurrentTime(tz = "America/New_York")
    println("${now.isoLocal} ${now.timezone}")
}
```

## Configuration

The transport helper sets the host and credentials for the `/v1` client. Pass a TimeLogic key for the direct API, or a RapidAPI key with the RapidAPI option; the SDK then sends `X-RapidAPI-Key` and `X-RapidAPI-Host` (default host `timelogic-api-world-time-timezones-time-calculations.p.rapidapi.com`, overridable). Keep keys in environment variables or a secret store, not in source control.

```kotlin
import com.timelogic.direct.api.apis.TimeApi
import com.timelogic.direct.api.infrastructure.ApiClient
import com.timelogic.direct.api.infrastructure.TransportConfiguration
import java.util.concurrent.TimeUnit

fun main() {
    // Direct API (default host https://api.timelogicapi.com, sends Authorization: Bearer <key>)
    val direct = TransportConfiguration.create(System.getenv("TIMELOGIC_API_KEY"))

    // RapidAPI: pass only your RapidAPI key; the SDK sets X-RapidAPI-Key and X-RapidAPI-Host
    val rapid = TransportConfiguration.create(System.getenv("RAPIDAPI_KEY"), rapidApi = true)

    // A different host (for example a compatible gateway or a test server)
    val custom = TransportConfiguration.create(System.getenv("TIMELOGIC_API_KEY"), baseUrl = "https://your-compatible-gateway.example")

    // create() replaces the process-wide credentials, so the last call wins.
    // Timeouts: pass your own OkHttp client (OkHttp defaults: 10 s connect/read/write). The SDK does not retry.
    val http = ApiClient.builder.callTimeout(15, TimeUnit.SECONDS).build()
    val time = TimeApi(custom.baseUrl, http)
}
```

## Operations

| Operation | Endpoint | Method |
| --- | --- | --- |
| Current time | `GET /v1/time/current` | `TimeApi.getCurrentTime()` |
| Convert | `GET /v1/time/convert` | `TimeApi.convertTime()` |
| Add | `GET /v1/time/add` | `TimeApi.addTime()` |
| Difference | `GET /v1/time/diff` | `TimeApi.diffTime()` |
| Elapsed | `GET /v1/time/elapsed` | `TimeApi.getElapsed()` |
| Timezone | `GET /v1/timezone` | `TimeApi.getTimezone()` |
| Daylight saving | `GET /v1/time/dst` | `TimeApi.getDst()` |
| Calendar | `GET /v1/time/calendar` | `TimeApi.getCalendar()` |
| Clock | `GET /v1/time/clock` | `TimeApi.getClock()` |
| Signing keys | `GET /.well-known/time-api-public-key` | `UtilityApi.getPublicSigningKey()` |

Operations take named arguments with defaults, so pass only what you need (`tz = "Europe/Berlin"`). Each operation also has a `…WithHttpInfo` variant that returns the `ApiResponse` with status code and headers. Errors throw `ClientException` (4xx) or `ServerException` (5xx). Parameters, response fields and errors for every operation: [How the API works](#how-the-api-works). Generated reference: [TimeApi](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/packages/kotlin/docs/TimeApi.md), [UtilityApi](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/packages/kotlin/docs/UtilityApi.md) and the models in the same folder.

### Examples

```kotlin
import com.timelogic.direct.api.apis.TimeApi
import com.timelogic.direct.api.apis.UtilityApi
import com.timelogic.direct.api.infrastructure.TransportConfiguration

fun main() {
    val client = TransportConfiguration.create(System.getenv("TIMELOGIC_API_KEY"))
    val time = TimeApi(client.baseUrl)

    // Convert a New York wall-clock time to Tokyo
    val tokyo = time.convertTime(iso = "2026-03-01T09:00:00", sourceTz = "America/New_York", tz = "Asia/Tokyo")

    // Add 1 day and 2 hours, shown in New York time
    val later = time.addTime(iso = "2026-03-07T12:00:00Z", days = 1, hours = 2, tz = "America/New_York")

    // Duration and business days between two instants (Zurich holiday calendar)
    val diff = time.diffTime("iso=2026-01-02T00:00:00Z", "iso=2026-04-30T00:00:00Z", businessDays = true, holidayCountry = "CH-ZH")
    println("${diff.days} ${diff.direction} ${diff.businessDays}") // 118 forward 82

    // Time left until a deadline
    val left = time.getElapsed(iso = "2027-01-01T00:00:00Z")

    // Zone details, DST status with the next transition, ISO week number
    val berlin = time.getTimezone(tz = "Europe/Berlin")
    val dst = time.getDst(tz = "America/New_York", next = true)
    val calendar = time.getCalendar(tz = "Europe/London", week = true)

    // Embeddable HTML clock
    val html = time.getClock(TimeApi.StyleGetClock.digitalMinusDashboard, tz = "Europe/London")

    // Public signing keys (no API key needed)
    val keys = UtilityApi(client.baseUrl).getPublicSigningKey()
}
```

## Errors, headers and signed responses

```kotlin
import com.timelogic.direct.api.apis.TimeApi
import com.timelogic.direct.api.infrastructure.ClientError
import com.timelogic.direct.api.infrastructure.ClientException
import com.timelogic.direct.api.infrastructure.TransportConfiguration

fun main() {
    val time = TimeApi(TransportConfiguration.create(System.getenv("TIMELOGIC_API_KEY")).baseUrl)

    try {
        time.getDst(tz = "Bad/Zone")
    } catch (e: ClientException) {
        val body = (e.response as? ClientError<*>)?.body
        println("${e.statusCode} $body")
        // 400 {"error":{"code":"INVALID_PARAMETER","message":"Invalid timezone.",...},"request_id":"..."}
    }

    // *WithHttpInfo returns the ApiResponse with the status code and headers
    val response = time.getDstWithHttpInfo(tz = "Asia/Kolkata", ip = null, lat = null, lon = null, offset = null, autoTz = null, format = null, next = null, sign = true)
    println("${response.statusCode} ${response.headers["x-timelogic-quota-limit"]} ${response.headers["X-TimeLogic-Signature"]}")
}
```

The SDK does not retry. A `429 QUOTA_EXCEEDED` carries no `Retry-After` header; quotas reset at 00:00 UTC on the 1st of each month. Status codes and error codes: [Errors](#errors).

## WorldTimeAPI-compatible client

A separate client for the WorldTimeAPI-compatible routes. Code written for worldtimeapi.org needs only the new host and an API key: paths, field names, types and the `.txt` format are the same. The client sends the key as `X-API-Key`, has a 30-second timeout, does not retry, and does not use or change the `/v1` configuration.

```kotlin
import com.timelogic.direct.api.worldtimeapi.WorldTimeApiClient
import com.timelogic.direct.api.worldtimeapi.WorldTimeApiException
import com.timelogic.direct.api.worldtimeapi.WorldTimeApiUnknownLocationException

fun main() {
    val wta = WorldTimeApiClient(System.getenv("TIMELOGIC_API_KEY")) // 30-second call timeout

    val zones = wta.listTimezones()                 // [Africa/Abidjan, ...]
    val europe = wta.listTimezonesInArea("Europe")  // [Europe/Amsterdam, ...]
    val london = wta.getTimezone("Europe/London")
    println("${london.datetime} ${london.utcOffset} ${london.dst}")
    val text = wta.getTimezoneText("Europe/London") // "abbreviation: GMT\nclient_ip: ..."
    val mine = wta.getIp()                          // the caller's address
    val google = wta.getIp("8.8.8.8")

    try {
        wta.getTimezone("Nope/Zone")
    } catch (e: WorldTimeApiUnknownLocationException) {
        println("unknown location") // 404 {"error":"unknown location"}
    } catch (e: WorldTimeApiException) {
        println("${e.status} ${e.error}")
    }

    // Signed responses: read the headers through requestRaw (path segments after /api, plus .txt flag)
    val signed = WorldTimeApiClient(System.getenv("TIMELOGIC_API_KEY"), sign = true)
    val raw = signed.requestRaw(listOf("timezone", "Europe", "London"), text = false)
    println("${raw.status} ${raw.header("X-TimeLogic-Signature")} ${raw.body}")
}
```

Routes, fields and errors: [WorldTimeAPI-compatible routes](#worldtimeapi-compatible-routes).

## Known issues

Checked against the live API for this release. All other operations, including single-target `current`, `convert` and `timezone` calls, decode normally.

- Bulk `getCurrentTime` / `convertTime` calls (comma-separated selectors) and `offset` lookups with `getTimezone` throw `JsonDataException`. Read those responses as JSON:

```kotlin
import com.timelogic.direct.api.infrastructure.ApiClient
import com.timelogic.direct.api.infrastructure.TransportConfiguration
import okhttp3.Request

fun main() {
    val key = System.getenv("TIMELOGIC_API_KEY")
    val client = TransportConfiguration.create(key)

    // Bulk current/convert and offset timezone lookups: read the JSON with the SDK's OkHttp client
    fun rawJson(pathAndQuery: String): String {
        val request = Request.Builder().url(client.baseUrl + pathAndQuery).header("Authorization", "Bearer $key").build()
        ApiClient.defaultClient.newCall(request).execute().use { return it.body!!.string() }
    }
    println(rawJson("/v1/time/current?tz=Europe/London,Asia/Tokyo"))
    println(rawJson("/v1/timezone?offset=%2B05:30")) // ..."matching_zones":[{"timezone":"Asia/Colombo",...
}
```

<!-- include: shared/v1-api.md -->

<!-- include: shared/worldtimeapi.md -->

## Support

Questions and problem reports: [issue tracker](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/issues). Security issues: see [SECURITY.md](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/SECURITY.md). Service status: [status.timelogicapi.com](https://status.timelogicapi.com).

## License

[Unlicense](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/LICENSE).
