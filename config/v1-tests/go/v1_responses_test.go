package timelogicapi

// Typed /v1 response decoding. The offline tests decode recorded API responses
// with the generated models. The live tests run only when
// TIMELOGIC_SDK_TEST_API_KEY (or TIMELOGIC_API_KEY) is set:
//   go test -run TestV1 .

import (
	"context"
	"encoding/json"
	"os"
	"strings"
	"testing"
)

const v1Single = `{"unix":1772366400,"unix_ms":1772366400000,"utc":"2026-03-01T12:00:00Z","iso_local":"2026-03-01T21:00:00+09:00","rfc2822":"Sun, 01 Mar 2026 21:00:00 +0900","human":"March 1, 2026, 9:00 PM Asia/Tokyo","day_number":1,"day_short":"Sun","day_full":"Sunday","timezone":"Asia/Tokyo"}`
const v1Bulk = `[{"unix":1772366400,"unix_ms":1772366400000,"utc":"2026-03-01T12:00:00Z","iso_local":"2026-03-01T21:00:00+09:00","rfc2822":"Sun, 01 Mar 2026 21:00:00 +0900","human":"March 1, 2026, 9:00 PM Asia/Tokyo","day_number":1,"day_short":"Sun","day_full":"Sunday","timezone":"Asia/Tokyo"},{"item":"Bad/Zone","error":{"code":"INVALID_PARAMETER","message":"Invalid timezone.","details":{"tz":"Bad/Zone"}},"request_id":"a6116a2e-8809-46e9-99c5-765cf0d50fcb"}]`
const v1Timezone = `{"unix":1772366400,"unix_ms":1772366400000,"utc":"2026-03-01T12:00:00Z","iso_local":"2026-03-01T21:00:00+09:00","rfc2822":"Sun, 01 Mar 2026 21:00:00 +0900","human":"March 1, 2026, 9:00 PM Asia/Tokyo","day_number":1,"day_short":"Sun","day_full":"Sunday","timezone":"Asia/Tokyo","offset":540,"dst":false}`
const v1Offset = `{"unix":1772366400,"unix_ms":1772366400000,"utc":"2026-03-01T12:00:00Z","iso_local":"2026-03-01T17:30:00+05:30","rfc2822":"Sun, 01 Mar 2026 21:00:00 +0900","human":"March 1, 2026, 5:30 PM UTC+05:30","day_number":1,"day_short":"Sun","day_full":"Sunday","timezone":null,"offset":330,"dst":false,"matching_zones":[{"timezone":"Asia/Colombo","offset":330,"dst":false},{"timezone":"Asia/Kolkata","offset":330,"dst":false}]}`

func TestV1SingleResultIsTimePayload(t *testing.T) {
	var value GetCurrentTime200Response
	if err := json.Unmarshal([]byte(v1Single), &value); err != nil {
		t.Fatal(err)
	}
	if value.TimePayload == nil || value.TimePayloadBulkResponse != nil {
		t.Fatalf("expected a TimePayload, got %+v", value)
	}
	if value.TimePayload.UnixMs != 1772366400000 || value.TimePayload.GetIsoLocal() != "2026-03-01T21:00:00+09:00" {
		t.Fatalf("unexpected payload %+v", value.TimePayload)
	}
}

func TestV1BulkResultItems(t *testing.T) {
	var value GetCurrentTime200Response
	if err := json.Unmarshal([]byte(v1Bulk), &value); err != nil {
		t.Fatal(err)
	}
	if value.TimePayloadBulkResponse == nil {
		t.Fatalf("expected a bulk response, got %+v", value)
	}
	items := *value.TimePayloadBulkResponse
	if len(items) != 2 || items[0].TimePayload == nil || items[0].TimePayload.GetTimezone() != "Asia/Tokyo" {
		t.Fatalf("unexpected first item %+v", items)
	}
	if items[1].BulkError == nil || items[1].BulkError.Item != "Bad/Zone" || items[1].BulkError.Error.Code != "INVALID_PARAMETER" || items[1].BulkError.RequestId == "" {
		t.Fatalf("unexpected bulk error %+v", items[1])
	}
}

func TestV1TimezoneLookups(t *testing.T) {
	var zone TimezoneResponse
	if err := json.Unmarshal([]byte(v1Timezone), &zone); err != nil {
		t.Fatal(err)
	}
	if zone.GetTimezone() != "Asia/Tokyo" || zone.Offset != 540 || zone.HasMatchingZones() {
		t.Fatalf("unexpected timezone response %+v", zone)
	}
	var offset TimezoneResponse
	if err := json.Unmarshal([]byte(v1Offset), &offset); err != nil {
		t.Fatal(err)
	}
	zones := offset.GetMatchingZones()
	if offset.Timezone.Get() != nil || offset.Offset != 330 || len(zones) != 2 || zones[1].Timezone != "Asia/Kolkata" || zones[1].Offset != 330 {
		t.Fatalf("unexpected offset response %+v", offset)
	}
}

func v1LiveClient(t *testing.T) (*APIClient, context.Context) {
	key := os.Getenv("TIMELOGIC_SDK_TEST_API_KEY")
	if key == "" {
		key = os.Getenv("TIMELOGIC_API_KEY")
	}
	if key == "" {
		t.Skip("set TIMELOGIC_SDK_TEST_API_KEY to run live calls")
	}
	transport, err := NewTransport(TransportOptions{APIKey: key, BaseURL: os.Getenv("TIMELOGIC_SDK_TEST_BASE_URL")})
	if err != nil {
		t.Fatal(err)
	}
	return NewAPIClient(transport.Configuration), transport.Context(context.Background())
}

func TestV1LiveEveryOperation(t *testing.T) {
	client, ctx := v1LiveClient(t)
	api := client.TimeAPI
	check := func(name string, err error, ok bool) {
		t.Helper()
		if err != nil {
			t.Fatalf("%s: %v", name, err)
		}
		if !ok {
			t.Fatalf("%s: unexpected value", name)
		}
	}
	single, _, err := api.GetCurrentTime(ctx).Tz("America/New_York").Execute()
	check("current", err, err == nil && single.TimePayload != nil && single.TimePayload.GetTimezone() == "America/New_York")
	bulk, _, err := api.GetCurrentTime(ctx).Tz("America/New_York,Europe/London,Bad/Zone").Execute()
	check("current bulk", err, err == nil && bulk.TimePayloadBulkResponse != nil && len(*bulk.TimePayloadBulkResponse) == 3 && (*bulk.TimePayloadBulkResponse)[2].BulkError != nil)
	converted, _, err := api.ConvertTime(ctx).Tz("Asia/Tokyo").Unix(1772366400).Execute()
	check("convert", err, err == nil && converted.TimePayload.GetIsoLocal() == "2026-03-01T21:00:00+09:00")
	convertedBulk, _, err := api.ConvertTime(ctx).Offset("+01:00,+02:00").Unix(1772366400).Execute()
	check("convert bulk", err, err == nil && (*convertedBulk.TimePayloadBulkResponse)[1].TimePayload.GetIsoLocal() == "2026-03-01T14:00:00+02:00")
	zone, _, err := api.GetTimezone(ctx).Tz("Europe/London").Execute()
	check("timezone", err, err == nil && zone.GetTimezone() == "Europe/London" && !zone.HasMatchingZones())
	offset, _, err := api.GetTimezone(ctx).Offset("+05:30").Execute()
	check("timezone offset", err, err == nil && len(offset.GetMatchingZones()) > 0 && offset.GetMatchingZones()[0].Offset == 330)
	diff, _, err := api.DiffTime(ctx).From("iso=2026-01-01T00:00:00Z").To("iso=2026-03-01T12:00:00Z").Execute()
	check("diff", err, err == nil && diff.Days == 59 && diff.From.UnixMs == 1767225600000)
	added, _, err := api.AddTime(ctx).Unix(0).Seconds(60).Utc(true).Execute()
	check("add", err, err == nil && added.Unix == 60)
	calendar, _, err := api.GetCalendar(ctx).Tz("America/New_York").Week(true).Execute()
	check("calendar", err, err == nil && calendar.GetWeekNumber() > 0)
	dst, _, err := api.GetDst(ctx).Tz("America/New_York").Next(true).Execute()
	check("dst", err, err == nil && !dst.GetNextTransition().IsZero())
	elapsed, _, err := api.GetElapsed(ctx).Iso("2026-01-01T00:00:00Z").CompareIso("2026-02-01T00:00:00Z").Execute()
	check("elapsed", err, err == nil && elapsed.Days == 31)
	clock, _, err := api.GetClock(ctx).Style("digital-broadcast").Tz("UTC").Execute()
	check("clock", err, err == nil && strings.Contains(clock, "timelogic-clock"))
	keys, _, err := client.UtilityAPI.GetPublicSigningKey(ctx).Execute()
	check("jwks", err, err == nil && keys.Keys[0].Kty == "OKP")
}

func TestV1LiveAPIError(t *testing.T) {
	client, ctx := v1LiveClient(t)
	_, response, err := client.TimeAPI.GetCurrentTime(ctx).Tz("Bad/Zone").Execute()
	if err == nil || response == nil || response.StatusCode != 400 {
		t.Fatalf("expected a 400 error, got %v", err)
	}
	apiErr, ok := err.(*GenericOpenAPIError)
	if !ok {
		t.Fatalf("unexpected error type %T", err)
	}
	model, ok := apiErr.Model().(ErrorResponse)
	if !ok || model.Error.Code != "INVALID_PARAMETER" || model.RequestId == "" {
		t.Fatalf("unexpected error model %+v", apiErr.Model())
	}
}
