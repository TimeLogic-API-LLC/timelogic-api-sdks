# TimeLogic API SDK for Python

Official Python client for [TimeLogic API](https://api.timelogicapi.com): current time, time zone lookups, conversions, date arithmetic, business-day counts, DST status, calendars, embeddable clocks and signed responses. The package contains two clients:

- the `/v1` client, generated from the [TimeLogic API contract](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/openapi/openapi.yaml), with direct and RapidAPI transports;
- a [WorldTimeAPI-compatible client](#worldtimeapi-compatible-client) for the `/api/timezone` and `/api/ip` routes, which use worldtimeapi.org's paths, fields and plain-text format.

Package: [`timelogic-api`](https://pypi.org/project/timelogic-api/), version __VERSION__. Changes are listed in the [changelog](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/CHANGELOG.md).

## Install

```bash
python -m pip install timelogic-api==__VERSION__
```

Requires Python 3.9+. The import name is `timelogic_direct_api`.

## Quick start

Get an API key, export it as `TIMELOGIC_API_KEY`, and run:

```python
import os

import timelogic_direct_api
from timelogic_direct_api.transport import create_configuration

configuration = create_configuration(os.environ["TIMELOGIC_API_KEY"])

with timelogic_direct_api.ApiClient(configuration) as api_client:
    time_api = timelogic_direct_api.TimeApi(api_client)
    now = time_api.get_current_time(tz="America/New_York").actual_instance
    print(now.iso_local, now.timezone)  # 2026-11-01T08:16:03-05:00 America/New_York
```

## Configuration

The transport helper sets the host and credentials for the `/v1` client. Pass a TimeLogic key for the direct API, or a RapidAPI key with the RapidAPI option; the SDK then sends `X-RapidAPI-Key` and `X-RapidAPI-Host` (default host `timelogic-api-world-time-timezones-time-calculations.p.rapidapi.com`, overridable). Keep keys in environment variables or a secret store, not in source control.

```python
import os

from timelogic_direct_api.transport import create_configuration

# Direct API (default host https://api.timelogicapi.com, sends Authorization: Bearer <key>)
direct = create_configuration(os.environ["TIMELOGIC_API_KEY"])

# RapidAPI: pass only your RapidAPI key; the SDK sets X-RapidAPI-Key and X-RapidAPI-Host
rapid = create_configuration(os.environ["RAPIDAPI_KEY"], rapid_api=True)

# A different host (for example a compatible gateway or a test server)
custom = create_configuration(os.environ["TIMELOGIC_API_KEY"], base_url="https://your-compatible-gateway.example")
```

## Operations

| Operation | Endpoint | Method |
| --- | --- | --- |
| Current time | `GET /v1/time/current` | `TimeApi.get_current_time()` |
| Convert | `GET /v1/time/convert` | `TimeApi.convert_time()` |
| Add | `GET /v1/time/add` | `TimeApi.add_time()` |
| Difference | `GET /v1/time/diff` | `TimeApi.diff_time()` |
| Elapsed | `GET /v1/time/elapsed` | `TimeApi.get_elapsed()` |
| Timezone | `GET /v1/timezone` | `TimeApi.get_timezone()` |
| Daylight saving | `GET /v1/time/dst` | `TimeApi.get_dst()` |
| Calendar | `GET /v1/time/calendar` | `TimeApi.get_calendar()` |
| Clock | `GET /v1/time/clock` | `TimeApi.get_clock()` |
| Signing keys | `GET /.well-known/time-api-public-key` | `UtilityApi.get_public_signing_key()` |

Operations take keyword arguments named after the query parameters in snake_case. `from` is a Python keyword, so `diff_time` takes it as `var_from`. `current` and `convert` return a wrapper whose `.actual_instance` is a `TimePayload`, or a `TimePayloadBulkResponse` for a bulk selector; `timezone` returns a `TimezoneResponse`. Every operation has `…_with_http_info` (status, headers and data) and `…_without_preload_content` (the raw `urllib3` response) variants. Parameters, response fields and errors for every operation: [How the API works](#how-the-api-works). Generated reference: [TimeApi](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/packages/python/docs/TimeApi.md), [UtilityApi](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/packages/python/docs/UtilityApi.md) and the models in the same folder.

### Examples

```python
import os

import timelogic_direct_api
from timelogic_direct_api.transport import create_configuration

api_client = timelogic_direct_api.ApiClient(create_configuration(os.environ["TIMELOGIC_API_KEY"]))
time_api = timelogic_direct_api.TimeApi(api_client)

# Bulk: up to 10 comma-separated values; each item is a TimePayload or a BulkError
for item in time_api.get_current_time(tz="Europe/London,Asia/Tokyo,Nope/Zone").actual_instance.root:
    value = item.actual_instance
    if isinstance(value, timelogic_direct_api.BulkError):
        print(value.item, value.error.code)  # Nope/Zone INVALID_PARAMETER
    else:
        print(value.timezone, value.iso_local)

# Convert a New York wall-clock time to Tokyo
tokyo = time_api.convert_time(iso="2026-03-01T09:00:00", source_tz="America/New_York", tz="Asia/Tokyo").actual_instance

# Add 1 day and 2 hours, shown in New York time
later = time_api.add_time(iso="2026-03-07T12:00:00Z", days=1, hours=2, tz="America/New_York")

# Duration and business days (`from` is a Python keyword, so the argument is var_from)
diff = time_api.diff_time(
    var_from="iso=2026-01-02T00:00:00Z",
    to="iso=2026-04-30T00:00:00Z",
    business_days=True,
    holiday_country="CH-ZH",
)
print(diff.days, diff.direction, diff.business_days)  # 118 forward 82

# Time left until a deadline
left = time_api.get_elapsed(iso="2027-01-01T00:00:00Z")

# Zone details, DST status with the next transition, ISO week number
berlin = time_api.get_timezone(tz="Europe/Berlin")
dst = time_api.get_dst(tz="America/New_York", next=True)
calendar = time_api.get_calendar(tz="Europe/London", week=True)

# Embeddable HTML clock
html = time_api.get_clock(style="digital-dashboard", tz="Europe/London")

# Public signing keys (no API key needed)
keys = timelogic_direct_api.UtilityApi(api_client).get_public_signing_key()
```

## Errors, headers and signed responses

```python
import os

import timelogic_direct_api
from timelogic_direct_api.rest import ApiException
from timelogic_direct_api.transport import create_configuration

time_api = timelogic_direct_api.TimeApi(timelogic_direct_api.ApiClient(create_configuration(os.environ["TIMELOGIC_API_KEY"])))

try:
    time_api.get_current_time(tz="Bad/Zone")
except ApiException as error:
    print(error.status, error.body)  # 400 {"error":{"code":"INVALID_PARAMETER",...},"request_id":"..."}
    print(error.headers.get("X-Request-Id"))

# *_with_http_info returns the status code and headers too. The headers are a plain
# dict that keeps the server's spelling, so compare names in lower case.
response = time_api.get_current_time_with_http_info(tz="Asia/Kolkata")
headers = {name.lower(): value for name, value in response.headers.items()}
print(response.status_code, headers["x-timelogic-plan"], headers["x-timelogic-quota-limit"])
payload = response.data.actual_instance

# Signed response: the detached signature arrives in the headers
signed = time_api.get_current_time_with_http_info(tz="Asia/Kolkata", sign=True)
signed_headers = {name.lower(): value for name, value in signed.headers.items()}
print(signed_headers["x-timelogic-signature"], signed_headers["x-timelogic-signature-input"])

# Timeouts: per call, in seconds (total, or a (connect, read) tuple). The SDK does not retry.
time_api.get_current_time(tz="UTC", _request_timeout=(3, 10))
```

The SDK does not retry. A `429 QUOTA_EXCEEDED` carries no `Retry-After` header; quotas reset at 00:00 UTC on the 1st of each month. Status codes and error codes: [Errors](#errors).

## WorldTimeAPI-compatible client

A separate client for the WorldTimeAPI-compatible routes. Code written for worldtimeapi.org needs only the new host and an API key: paths, field names, types and the `.txt` format are the same. The client sends the key as `X-API-Key`, has a 30-second timeout, does not retry, and does not use or change the `/v1` configuration.

```python
import os

from timelogic_direct_api.worldtimeapi import (
    WorldTimeApiClient,
    WorldTimeApiError,
    WorldTimeApiUnknownLocationError,
)

wta = WorldTimeApiClient(api_key=os.environ["TIMELOGIC_API_KEY"])  # timeout=30.0 seconds by default

zones = wta.list_timezones()                  # ["Africa/Abidjan", ...]
europe = wta.list_timezones_in_area("Europe")  # ["Europe/Amsterdam", ...]
london = wta.get_timezone("Europe/London")
print(london.datetime, london.utc_offset, london.dst)
salta = wta.get_timezone("America/Argentina/Salta")
text = wta.get_timezone_text("Europe/London")  # "abbreviation: GMT\nclient_ip: ..."
mine = wta.get_ip()                            # the caller's address
google = wta.get_ip("8.8.8.8")

try:
    wta.get_timezone("Nope/Zone")
except WorldTimeApiUnknownLocationError:
    print("unknown location")  # 404 {"error":"unknown location"}
except WorldTimeApiError as error:
    print(error.status, error.error)

# Signed responses: read the headers through request_raw
signed = WorldTimeApiClient(api_key=os.environ["TIMELOGIC_API_KEY"], sign=True)
raw = signed.request_raw("/api/timezone/Europe/London")
print(raw.status, raw.headers.get("x-timelogic-signature"), raw.body)
```

Routes, fields and errors: [WorldTimeAPI-compatible routes](#worldtimeapi-compatible-routes).

## Migrating from 1.x to 2.0

2.0 changes the `/v1` response types so that every response decodes into a typed model. The API itself is unchanged. What changed in the contract, for every language:

- `timezone` returns one model, `TimezoneResponse`: the time payload plus `offset`, `dst`, and `matching_zones` (present only for `offset` lookups). The `oneOf` wrapper `GetTimezone200Response` and its members `TimezoneResolvedResponse` and `TimezoneOffsetResponse` are removed.
- `TimezoneMatch` (the `matching_zones` item) is `timezone`, `offset` and `dst`, as the API returns it. It previously described a full time payload.
- `timezone` takes the `format` parameter, after `sign`.
- `JwkKey` lists the optional `key_ops` and `ext` members.
- `current` and `convert` no longer reject a comma-separated `tz` list longer than 64 characters or an `offset` list before sending it; an invalid value in a list comes back as a `BulkError` item.

In this package:

- `get_timezone` returns `TimezoneResponse` directly; 1.x returned a `GetTimezone200Response` wrapper and dropped `matching_zones` for `offset` lookups. `matching_zones` items are `TimezoneMatch`.
- Bulk `get_current_time` / `convert_time` results (`TimePayloadBulkResponse`) can be iterated, indexed and measured with `len()`; each item's `actual_instance` is a `TimePayload` or a `BulkError`.

Before (1.x):

```python
berlin = time_api.get_timezone(tz="Europe/Berlin")  # TimezoneResolvedResponse
ist = time_api.get_timezone_without_preload_content(offset="+05:30")
zones = [zone["timezone"] for zone in json.loads(ist.data)["matching_zones"]]
```

After (2.0):

```python
berlin = time_api.get_timezone(tz="Europe/Berlin")  # TimezoneResponse
ist = time_api.get_timezone(offset="+05:30")
zones = [zone.timezone for zone in ist.matching_zones]  # ['Asia/Colombo', 'Asia/Kolkata']

for item in time_api.get_current_time(tz="Europe/London,Nope/Zone").actual_instance:
    value = item.actual_instance  # TimePayload or BulkError
```

## Known issues

Checked against the live API for this release: every `/v1` operation, including bulk `current` / `convert` calls and `offset` lookups with `timezone`, decodes into the typed models. There are no known issues.

<!-- include: shared/v1-api.md -->

<!-- include: shared/worldtimeapi.md -->

## Support

Questions and problem reports: [issue tracker](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/issues). Security issues: see [SECURITY.md](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/SECURITY.md). Service status: [status.timelogicapi.com](https://status.timelogicapi.com).

## License

[Unlicense](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/LICENSE).
