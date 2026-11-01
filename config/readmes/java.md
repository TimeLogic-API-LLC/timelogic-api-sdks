# TimeLogic API SDK for Java

Official Java client for [TimeLogic API](https://api.timelogicapi.com): current time, time zone lookups, conversions, date arithmetic, business-day counts, DST status, calendars, embeddable clocks and signed responses. The package contains two clients:

- the `/v1` client, generated from the [TimeLogic API contract](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/openapi/openapi.yaml), with direct and RapidAPI transports;
- a [WorldTimeAPI-compatible client](#worldtimeapi-compatible-client) for the `/api/timezone` and `/api/ip` routes, which use worldtimeapi.org's paths, fields and plain-text format.

Package: [`com.timelogicapi:timelogic-api`](https://central.sonatype.com/artifact/com.timelogicapi/timelogic-api), version __VERSION__. Changes are listed in the [changelog](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/CHANGELOG.md).

## Install

Maven:

```xml
<dependency>
  <groupId>com.timelogicapi</groupId>
  <artifactId>timelogic-api</artifactId>
  <version>__VERSION__</version>
</dependency>
```

Gradle: `implementation("com.timelogicapi:timelogic-api:__VERSION__")`. Requires Java 8+ (OkHttp and Gson).

## Quick start

Get an API key, export it as `TIMELOGIC_API_KEY`, and run:

```java
import com.timelogic.direct.ApiClient;
import com.timelogic.direct.TransportConfiguration;
import com.timelogic.direct.api.TimeApi;
import com.timelogic.direct.model.GetCurrentTime200Response;
import com.timelogic.direct.model.TimePayload;

public class QuickStart {
  public static void main(String[] args) throws Exception {
    ApiClient client = TransportConfiguration.create(System.getenv("TIMELOGIC_API_KEY"), false, null, null);
    TimeApi time = new TimeApi(client);

    // Arguments follow the endpoint's query parameters: tz, ip, lat, lon, offset, autoTz, format, sign
    GetCurrentTime200Response now = time.getCurrentTime("America/New_York", null, null, null, null, null, null, null);
    TimePayload payload = now.getTimePayload();
    System.out.println(payload.getIsoLocal() + " " + payload.getTimezone());
  }
}
```

## Configuration

The transport helper sets the host and credentials for the `/v1` client. Pass a TimeLogic key for the direct API, or a RapidAPI key with the RapidAPI option; the SDK then sends `X-RapidAPI-Key` and `X-RapidAPI-Host` (default host `timelogic-api-world-time-timezones-time-calculations.p.rapidapi.com`, overridable). Keep keys in environment variables or a secret store, not in source control.

```java
import com.timelogic.direct.ApiClient;
import com.timelogic.direct.TransportConfiguration;

public class Configure {
  public static void main(String[] args) {
    // Direct API (default host https://api.timelogicapi.com, sends Authorization: Bearer <key>)
    ApiClient direct = TransportConfiguration.create(System.getenv("TIMELOGIC_API_KEY"), false, null, null);

    // RapidAPI: pass only your RapidAPI key; the SDK sets X-RapidAPI-Key and X-RapidAPI-Host
    ApiClient rapid = TransportConfiguration.create(System.getenv("RAPIDAPI_KEY"), true, null, null);

    // A different host (for example a compatible gateway or a test server)
    ApiClient custom = TransportConfiguration.create(System.getenv("TIMELOGIC_API_KEY"), false, "https://your-compatible-gateway.example", null);

    // Timeouts in milliseconds (OkHttp defaults: 10 s connect, 10 s read, 10 s write). The SDK does not retry.
    direct.setConnectTimeout(5_000);
    direct.setReadTimeout(15_000);
  }
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

Operations take every query parameter positionally, in the order the endpoint defines them; pass `null` for the ones you do not use (see the [generated docs](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/packages/java/docs/TimeApi.md) for each signature). Each operation also has `…WithHttpInfo` (status code, headers and data), `…Async` (callback) and `…Call` (a prepared OkHttp `Call`) variants. Parameters, response fields and errors for every operation: [How the API works](#how-the-api-works). Generated reference: [TimeApi](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/packages/java/docs/TimeApi.md), [UtilityApi](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/packages/java/docs/UtilityApi.md) and the models in the same folder.

### Examples

```java
import com.timelogic.direct.ApiClient;
import com.timelogic.direct.TransportConfiguration;
import com.timelogic.direct.api.TimeApi;
import com.timelogic.direct.api.UtilityApi;
import com.timelogic.direct.model.*;

public class Operations {
  public static void main(String[] args) throws Exception {
    ApiClient client = TransportConfiguration.create(System.getenv("TIMELOGIC_API_KEY"), false, null, null);
    TimeApi time = new TimeApi(client);

    // Convert a New York wall-clock time to Tokyo
    TimePayload tokyo = time.convertTime(null, null, "2026-03-01T09:00:00", "America/New_York", null, null, null, null, "Asia/Tokyo", null, null, null, null, null, null, null, null).getTimePayload();

    // Add 1 day and 2 hours, shown in New York time
    TimePayload later = time.addTime(null, null, "2026-03-07T12:00:00Z", null, null, null, null, null, null, null, 2, 1, "America/New_York", null, null, null, null, null, null, null, null);

    // Duration and business days between two instants (Zurich holiday calendar)
    DiffResponse diff = time.diffTime("iso=2026-01-02T00:00:00Z", "iso=2026-04-30T00:00:00Z", null, null, null, null, null, null, null, null, null, null, null, true, "CH-ZH", null, null);
    System.out.println(diff.getDays() + " " + diff.getDirection() + " " + diff.getBusinessDays()); // 118 forward 82

    // Time left until a deadline
    ElapsedResponse left = time.getElapsed(null, null, "2027-01-01T00:00:00Z", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);

    // Zone details, DST status with the next transition, ISO week number
    TimezoneResolvedResponse berlin = time.getTimezone("Europe/Berlin", null, null, null, null, null, null).getTimezoneResolvedResponse();
    DstResponse dst = time.getDst("America/New_York", null, null, null, null, null, null, true, null);
    CalendarResponse calendar = time.getCalendar(null, null, null, null, null, null, null, null, "Europe/London", null, null, null, null, null, null, true, null);

    // Embeddable HTML clock
    String html = time.getClock("digital-dashboard", null, null, null, null, null, null, null, null, "Europe/London", null, null, null, null, null);

    // Public signing keys (no API key needed)
    JwksResponse keys = new UtilityApi(client).getPublicSigningKey(null);
  }
}
```

## Errors, headers and signed responses

```java
import com.timelogic.direct.ApiException;
import com.timelogic.direct.ApiResponse;
import com.timelogic.direct.TransportConfiguration;
import com.timelogic.direct.api.TimeApi;
import com.timelogic.direct.model.DstResponse;

public class Errors {
  public static void main(String[] args) throws Exception {
    TimeApi time = new TimeApi(TransportConfiguration.create(System.getenv("TIMELOGIC_API_KEY"), false, null, null));

    try {
      time.getDst("Bad/Zone", null, null, null, null, null, null, null, null);
    } catch (ApiException e) {
      System.out.println(e.getCode() + " " + e.getResponseBody());
      // 400 {"error":{"code":"INVALID_PARAMETER","message":"Invalid timezone.",...},"request_id":"..."}
    }

    // *WithHttpInfo returns the status code and headers (lower-case names) too
    ApiResponse<DstResponse> response = time.getDstWithHttpInfo("Asia/Kolkata", null, null, null, null, null, null, null, true);
    System.out.println(response.getStatusCode() + " " + response.getHeaders().get("x-timelogic-quota-limit") + " " + response.getHeaders().get("x-timelogic-signature"));
  }
}
```

The SDK does not retry. A `429 QUOTA_EXCEEDED` carries no `Retry-After` header; quotas reset at 00:00 UTC on the 1st of each month. Status codes and error codes: [Errors](#errors).

## WorldTimeAPI-compatible client

A separate client for the WorldTimeAPI-compatible routes. Code written for worldtimeapi.org needs only the new host and an API key: paths, field names, types and the `.txt` format are the same. The client sends the key as `X-API-Key`, has a 30-second timeout, does not retry, and does not use or change the `/v1` configuration.

```java
import com.timelogic.direct.worldtimeapi.WorldTimeApiClient;
import com.timelogic.direct.worldtimeapi.WorldTimeApiDateTime;
import com.timelogic.direct.worldtimeapi.WorldTimeApiException;
import com.timelogic.direct.worldtimeapi.WorldTimeApiRawResponse;
import com.timelogic.direct.worldtimeapi.WorldTimeApiUnknownLocationException;
import java.util.Arrays;
import java.util.List;

public class WorldTime {
  public static void main(String[] args) throws Exception {
    WorldTimeApiClient wta = new WorldTimeApiClient(System.getenv("TIMELOGIC_API_KEY")); // 30-second call timeout

    List<String> zones = wta.listTimezones();                  // [Africa/Abidjan, ...]
    List<String> europe = wta.listTimezonesInArea("Europe");    // [Europe/Amsterdam, ...]
    WorldTimeApiDateTime london = wta.getTimezone("Europe/London");
    System.out.println(london.getDatetime() + " " + london.getUtcOffset() + " " + london.isDst());
    String text = wta.getTimezoneText("Europe/London");         // "abbreviation: GMT\nclient_ip: ..."
    WorldTimeApiDateTime mine = wta.getIp();                     // the caller's address
    WorldTimeApiDateTime google = wta.getIp("8.8.8.8");

    try {
      wta.getTimezone("Nope/Zone");
    } catch (WorldTimeApiUnknownLocationException e) {
      System.out.println("unknown location"); // 404 {"error":"unknown location"}
    } catch (WorldTimeApiException e) {
      System.out.println(e.getStatus() + " " + e.getError());
    }

    // Signed responses: read the headers through requestRaw (path segments after /api, plus .txt flag)
    WorldTimeApiClient signed = new WorldTimeApiClient(System.getenv("TIMELOGIC_API_KEY"), WorldTimeApiClient.DEFAULT_BASE_URL, true, null);
    WorldTimeApiRawResponse raw = signed.requestRaw(Arrays.asList("timezone", "Europe", "London"), false);
    System.out.println(raw.getStatus() + " " + raw.getHeader("X-TimeLogic-Signature") + " " + raw.getBody());
  }
}
```

Routes, fields and errors: [WorldTimeAPI-compatible routes](#worldtimeapi-compatible-routes).

## Known issues

Checked against the live API for this release. All other operations, including single-target `current`, `convert` and `timezone` calls, decode normally.

- Bulk `getCurrentTime` / `convertTime` calls (comma-separated selectors) and `offset` lookups with `getTimezone` throw while decoding the response. Run the prepared `…Call` and read the JSON:

```java
import com.google.gson.JsonParser;
import com.timelogic.direct.ApiClient;
import com.timelogic.direct.TransportConfiguration;
import com.timelogic.direct.api.TimeApi;
import okhttp3.Response;

public class RawCalls {
  public static void main(String[] args) throws Exception {
    ApiClient client = TransportConfiguration.create(System.getenv("TIMELOGIC_API_KEY"), false, null, null);
    TimeApi time = new TimeApi(client);

    // Bulk current/convert and offset timezone lookups: run the prepared call and read the JSON
    try (Response response = time.getCurrentTimeCall("Europe/London,Asia/Tokyo", null, null, null, null, null, null, null, null).execute()) {
      System.out.println(JsonParser.parseString(response.body().string()).getAsJsonArray().size()); // 2
    }
    try (Response response = time.getTimezoneCall(null, null, null, null, "+05:30", null, null, null).execute()) {
      System.out.println(JsonParser.parseString(response.body().string()).getAsJsonObject().get("matching_zones"));
    }
  }
}
```

<!-- include: shared/v1-api.md -->

<!-- include: shared/worldtimeapi.md -->

## Support

Questions and problem reports: [issue tracker](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/issues). Security issues: see [SECURITY.md](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/SECURITY.md). Service status: [status.timelogicapi.com](https://status.timelogicapi.com).

## License

[Unlicense](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/LICENSE).
