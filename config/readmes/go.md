# TimeLogic API SDK for Go

Official Go client for [TimeLogic API](https://api.timelogicapi.com): current time, time zone lookups, conversions, date arithmetic, business-day counts, DST status, calendars, embeddable clocks and signed responses. The package contains two clients:

- the `/v1` client, generated from the [TimeLogic API contract](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/openapi/openapi.yaml), with direct and RapidAPI transports;
- a [WorldTimeAPI-compatible client](#worldtimeapi-compatible-client) for the `/api/timezone` and `/api/ip` routes, which use worldtimeapi.org's paths, fields and plain-text format.

Package: [`github.com/TimeLogic-API-LLC/timelogic-api-sdks/packages/go`](https://pkg.go.dev/github.com/TimeLogic-API-LLC/timelogic-api-sdks/packages/go), version __VERSION__. Changes are listed in the [changelog](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/CHANGELOG.md).

## Install

```bash
go get github.com/TimeLogic-API-LLC/timelogic-api-sdks/packages/go@v__VERSION__
```

Requires Go 1.18+. The package name is `timelogicapi`.

## Quick start

Get an API key, export it as `TIMELOGIC_API_KEY`, and run:

```go
package main

import (
	"context"
	"fmt"
	"log"
	"os"

	timelogicapi "github.com/TimeLogic-API-LLC/timelogic-api-sdks/packages/go"
)

func main() {
	transport, err := timelogicapi.NewTransport(timelogicapi.TransportOptions{APIKey: os.Getenv("TIMELOGIC_API_KEY")})
	if err != nil {
		log.Fatal(err)
	}
	client := timelogicapi.NewAPIClient(transport.Configuration)
	ctx := transport.Context(context.Background()) // carries the server and credentials

	now, _, err := client.TimeAPI.GetCurrentTime(ctx).Tz("America/New_York").Execute()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(now.TimePayload.GetIsoLocal(), now.TimePayload.GetTimezone())
}
```

## Configuration

The transport helper sets the host and credentials for the `/v1` client. Pass a TimeLogic key for the direct API, or a RapidAPI key with the RapidAPI option; the SDK then sends `X-RapidAPI-Key` and `X-RapidAPI-Host` (default host `timelogic-api-world-time-timezones-time-calculations.p.rapidapi.com`, overridable). Keep keys in environment variables or a secret store, not in source control.

```go
package main

import (
	"log"
	"net/http"
	"os"
	"time"

	timelogicapi "github.com/TimeLogic-API-LLC/timelogic-api-sdks/packages/go"
)

func main() {
	// Direct API (default host https://api.timelogicapi.com, sends Authorization: Bearer <key>)
	direct, err := timelogicapi.NewTransport(timelogicapi.TransportOptions{APIKey: os.Getenv("TIMELOGIC_API_KEY")})
	if err != nil {
		log.Fatal(err)
	}

	// RapidAPI: pass only your RapidAPI key; the SDK sets X-RapidAPI-Key and X-RapidAPI-Host
	rapid, err := timelogicapi.NewTransport(timelogicapi.TransportOptions{APIKey: os.Getenv("RAPIDAPI_KEY"), RapidAPI: true})
	if err != nil {
		log.Fatal(err)
	}

	// A different host (for example a compatible gateway or a test server)
	custom, err := timelogicapi.NewTransport(timelogicapi.TransportOptions{
		APIKey:  os.Getenv("TIMELOGIC_API_KEY"),
		BaseURL: "https://your-compatible-gateway.example",
	})
	if err != nil {
		log.Fatal(err)
	}

	// The SDK uses http.DefaultClient, which has no timeout. Set your own:
	direct.Configuration.HTTPClient = &http.Client{Timeout: 10 * time.Second}

	_, _, _ = direct, rapid, custom
}
```

## Operations

| Operation | Endpoint | Method |
| --- | --- | --- |
| Current time | `GET /v1/time/current` | `client.TimeAPI.GetCurrentTime(ctx)…Execute()` |
| Convert | `GET /v1/time/convert` | `client.TimeAPI.ConvertTime(ctx)…Execute()` |
| Add | `GET /v1/time/add` | `client.TimeAPI.AddTime(ctx)…Execute()` |
| Difference | `GET /v1/time/diff` | `client.TimeAPI.DiffTime(ctx)…Execute()` |
| Elapsed | `GET /v1/time/elapsed` | `client.TimeAPI.GetElapsed(ctx)…Execute()` |
| Timezone | `GET /v1/timezone` | `client.TimeAPI.GetTimezone(ctx)…Execute()` |
| Daylight saving | `GET /v1/time/dst` | `client.TimeAPI.GetDst(ctx)…Execute()` |
| Calendar | `GET /v1/time/calendar` | `client.TimeAPI.GetCalendar(ctx)…Execute()` |
| Clock | `GET /v1/time/clock` | `client.TimeAPI.GetClock(ctx)…Execute()` |
| Signing keys | `GET /.well-known/time-api-public-key` | `client.UtilityAPI.GetPublicSigningKey(ctx)…Execute()` |

Each operation returns a request builder: set parameters with methods named after them (`.Tz()`, `.SourceTz()`, `.BusinessDays()`), then call `.Execute()`, which returns the decoded value, the `*http.Response` and an error. Always pass the context from `transport.Context(ctx)`: it carries the server URL and the credentials. Parameters, response fields and errors for every operation: [How the API works](#how-the-api-works). Generated reference: [TimeApi](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/packages/go/docs/TimeAPI.md), [UtilityApi](https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/blob/main/packages/go/docs/UtilityAPI.md) and the models in the same folder.

### Examples

```go
package main

import (
	"context"
	"fmt"
	"log"
	"os"

	timelogicapi "github.com/TimeLogic-API-LLC/timelogic-api-sdks/packages/go"
)

func main() {
	transport, err := timelogicapi.NewTransport(timelogicapi.TransportOptions{APIKey: os.Getenv("TIMELOGIC_API_KEY")})
	if err != nil {
		log.Fatal(err)
	}
	client := timelogicapi.NewAPIClient(transport.Configuration)
	ctx := transport.Context(context.Background())

	// Bulk: up to 10 comma-separated values; each item is a TimePayload or a BulkError
	many, _, err := client.TimeAPI.GetCurrentTime(ctx).Tz("Europe/London,Asia/Tokyo,Nope/Zone").Execute()
	if err != nil {
		log.Fatal(err)
	}
	for _, item := range *many.TimePayloadBulkResponse {
		if item.BulkError != nil {
			fmt.Println(item.BulkError.GetItem(), item.BulkError.Error.GetCode())
		} else {
			fmt.Println(item.TimePayload.GetTimezone(), item.TimePayload.GetIsoLocal())
		}
	}

	// Convert a New York wall-clock time to Tokyo
	tokyo, _, err := client.TimeAPI.ConvertTime(ctx).Iso("2026-03-01T09:00:00").SourceTz("America/New_York").Tz("Asia/Tokyo").Execute()

	// Add 1 day and 2 hours, shown in New York time
	later, _, err := client.TimeAPI.AddTime(ctx).Iso("2026-03-07T12:00:00Z").Days(1).Hours(2).Tz("America/New_York").Execute()

	// Duration and business days between two instants (Zurich holiday calendar)
	diff, _, err := client.TimeAPI.DiffTime(ctx).
		From("iso=2026-01-02T00:00:00Z").
		To("iso=2026-04-30T00:00:00Z").
		BusinessDays(true).
		HolidayCountry("CH-ZH").
		Execute()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(diff.GetDays(), diff.GetDirection(), diff.GetBusinessDays()) // 118 forward 82

	// Time left until a deadline
	left, _, err := client.TimeAPI.GetElapsed(ctx).Iso("2027-01-01T00:00:00Z").Execute()

	// Zone details, DST status with the next transition, ISO week number
	berlin, _, err := client.TimeAPI.GetTimezone(ctx).Tz("Europe/Berlin").Execute()
	dst, _, err := client.TimeAPI.GetDst(ctx).Tz("America/New_York").Next(true).Execute()
	calendar, _, err := client.TimeAPI.GetCalendar(ctx).Tz("Europe/London").Week(true).Execute()

	// Embeddable HTML clock
	html, _, err := client.TimeAPI.GetClock(ctx).Style("digital-dashboard").Tz("Europe/London").Execute()

	// Public signing keys (no API key needed)
	keys, _, err := client.UtilityAPI.GetPublicSigningKey(ctx).Execute()

	_, _, _, _, _, _, _, _ = tokyo, later, left, berlin, dst, calendar, html, keys
}
```

## Errors, headers and signed responses

```go
package main

import (
	"context"
	"errors"
	"fmt"
	"log"
	"os"

	timelogicapi "github.com/TimeLogic-API-LLC/timelogic-api-sdks/packages/go"
)

func main() {
	transport, err := timelogicapi.NewTransport(timelogicapi.TransportOptions{APIKey: os.Getenv("TIMELOGIC_API_KEY")})
	if err != nil {
		log.Fatal(err)
	}
	client := timelogicapi.NewAPIClient(transport.Configuration)
	ctx := transport.Context(context.Background())

	_, httpResponse, err := client.TimeAPI.GetCurrentTime(ctx).Tz("Bad/Zone").Execute()
	var apiErr *timelogicapi.GenericOpenAPIError
	if errors.As(err, &apiErr) {
		if body, ok := apiErr.Model().(timelogicapi.ErrorResponse); ok {
			fmt.Println(httpResponse.StatusCode, body.Error.GetCode(), body.Error.GetMessage(), body.GetRequestId())
			// 400 INVALID_PARAMETER Invalid timezone. 547f27d2-...
		}
	}

	// The *http.Response is returned on success too: read quota and signature headers
	_, httpResponse, err = client.TimeAPI.GetCurrentTime(ctx).Tz("Asia/Kolkata").Sign(true).Execute()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(httpResponse.Header.Get("X-TimeLogic-Quota-Limit"), httpResponse.Header.Get("X-TimeLogic-Signature"))
}
```

The SDK does not retry. A `429 QUOTA_EXCEEDED` carries no `Retry-After` header; quotas reset at 00:00 UTC on the 1st of each month. Status codes and error codes: [Errors](#errors).

## WorldTimeAPI-compatible client

A separate client for the WorldTimeAPI-compatible routes. Code written for worldtimeapi.org needs only the new host and an API key: paths, field names, types and the `.txt` format are the same. The client sends the key as `X-API-Key`, has a 30-second timeout, does not retry, and does not use or change the `/v1` configuration.

```go
package main

import (
	"context"
	"errors"
	"fmt"
	"log"
	"os"

	"github.com/TimeLogic-API-LLC/timelogic-api-sdks/packages/go/worldtimeapi"
)

func main() {
	ctx := context.Background()
	wta := worldtimeapi.NewClient(os.Getenv("TIMELOGIC_API_KEY")) // 30-second HTTP timeout by default

	zones, err := wta.ListTimezones(ctx)                 // ["Africa/Abidjan", ...]
	europe, err := wta.ListTimezonesInArea(ctx, "Europe") // ["Europe/Amsterdam", ...]
	london, err := wta.GetTimezone(ctx, "Europe/London")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(london.Datetime, london.UTCOffset, london.DST)
	text, err := wta.GetTimezoneText(ctx, "Europe/London") // "abbreviation: GMT\nclient_ip: ..."
	mine, err := wta.GetIP(ctx, "")                         // "" means the caller's address
	google, err := wta.GetIP(ctx, "8.8.8.8")

	if _, err := wta.GetTimezone(ctx, "Nope/Zone"); errors.Is(err, worldtimeapi.ErrUnknownLocation) {
		fmt.Println("unknown location") // 404 {"error":"unknown location"}
	}

	// Signed responses: read the headers through RequestRaw
	wta.Sign = true
	raw, err := wta.RequestRaw(ctx, "/api/timezone/Europe/London")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(raw.Status, raw.Header.Get("X-TimeLogic-Signature"), string(raw.Body))

	_, _, _, _, _ = zones, europe, text, mine, google
}
```

Routes, fields and errors: [WorldTimeAPI-compatible routes](#worldtimeapi-compatible-routes).

## Known issues

Checked against the live API for this release. All other operations, including single-target `current`, `convert` and `timezone` calls, decode normally.

- An `offset` lookup with `GetTimezone` returns a decoding error. The raw body is kept on the error:

```go
package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"os"

	timelogicapi "github.com/TimeLogic-API-LLC/timelogic-api-sdks/packages/go"
)

func main() {
	transport, err := timelogicapi.NewTransport(timelogicapi.TransportOptions{APIKey: os.Getenv("TIMELOGIC_API_KEY")})
	if err != nil {
		log.Fatal(err)
	}
	client := timelogicapi.NewAPIClient(transport.Configuration)
	ctx := transport.Context(context.Background())

	// Offset lookups: the typed decoder rejects the answer, but the error keeps the raw body
	_, _, err = client.TimeAPI.GetTimezone(ctx).Offset("+05:30").Execute()
	var apiErr *timelogicapi.GenericOpenAPIError
	if errors.As(err, &apiErr) {
		var body struct {
			Offset        int `json:"offset"`
			MatchingZones []struct {
				Timezone string `json:"timezone"`
				Offset   int    `json:"offset"`
				DST      bool   `json:"dst"`
			} `json:"matching_zones"`
		}
		if json.Unmarshal(apiErr.Body(), &body) == nil {
			for _, zone := range body.MatchingZones {
				fmt.Println(zone.Timezone) // Asia/Colombo, Asia/Kolkata
			}
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
