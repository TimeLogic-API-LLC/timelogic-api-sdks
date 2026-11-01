package worldtimeapi

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"
	"net/http/httptest"
	"os"
	"sort"
	"testing"
)

const london = `{"utc_offset":"+00:00","timezone":"Europe/London","day_of_week":0,"day_of_year":305,"datetime":"2026-11-01T03:34:38.413000+00:00","utc_datetime":"2026-11-01T03:34:38.413000+00:00","unixtime":1793504078,"raw_offset":0,"week_number":44,"dst":false,"abbreviation":"GMT","dst_offset":0,"dst_from":null,"dst_until":null,"client_ip":"203.0.113.7"}`

type route struct {
	status int
	body   string
}

func server(t *testing.T, routes map[string]route, seen *[]*http.Request) *Client {
	t.Helper()
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		*seen = append(*seen, r)
		rt, ok := routes[r.URL.EscapedPath()]
		if !ok {
			rt = route{404, `{"error":"not found"}`}
		}
		w.WriteHeader(rt.status)
		_, _ = w.Write([]byte(rt.body))
	}))
	t.Cleanup(srv.Close)
	c := NewClient("test-key")
	c.BaseURL = srv.URL
	return c
}

func TestGetTimezoneFieldsAndHeader(t *testing.T) {
	var seen []*http.Request
	c := server(t, map[string]route{"/api/timezone/Europe/London": {200, london}}, &seen)
	v, err := c.GetTimezone(context.Background(), "Europe/London")
	if err != nil {
		t.Fatal(err)
	}
	if v.Timezone != "Europe/London" || v.Abbreviation != "GMT" || v.DSTFrom != nil || v.Unixtime != 1793504078 {
		t.Fatalf("unexpected value %+v", v)
	}
	if got := seen[0].Header.Get("X-API-Key"); got != "test-key" {
		t.Fatalf("X-API-Key = %q", got)
	}
	encoded, _ := json.Marshal(v)
	var keys map[string]interface{}
	_ = json.Unmarshal(encoded, &keys)
	var want map[string]interface{}
	_ = json.Unmarshal([]byte(london), &want)
	if len(keys) != 15 || len(want) != 15 {
		t.Fatalf("expected 15 fields, got %d", len(keys))
	}
	for k := range want {
		if _, ok := keys[k]; !ok {
			t.Fatalf("missing field %s", k)
		}
	}
}

func TestPaths(t *testing.T) {
	var seen []*http.Request
	c := server(t, map[string]route{
		"/api/timezone":                         {200, `["Europe/London","UTC"]`},
		"/api/timezone.txt":                     {200, "Europe/London\nUTC"},
		"/api/timezone/Europe":                  {200, `["Europe/London"]`},
		"/api/timezone/Europe.txt":              {200, "Europe/London"},
		"/api/timezone/America/Argentina/Salta": {200, london},
		"/api/timezone/Europe/London.txt":       {200, "abbreviation: GMT"},
		"/api/ip":                               {200, london},
		"/api/ip/8.8.8.8":                       {200, london},
		"/api/ip.txt":                           {200, "abbreviation: GMT"},
		"/api/ip/8.8.8.8.txt":                   {200, "abbreviation: GMT"},
	}, &seen)
	ctx := context.Background()
	all, err := c.ListTimezones(ctx)
	if err != nil || len(all) != 2 {
		t.Fatalf("ListTimezones %v %v", all, err)
	}
	if s, err := c.ListTimezonesText(ctx); err != nil || s != "Europe/London\nUTC" {
		t.Fatalf("ListTimezonesText %q %v", s, err)
	}
	if area, err := c.ListTimezonesInArea(ctx, "Europe"); err != nil || len(area) != 1 {
		t.Fatalf("ListTimezonesInArea %v %v", area, err)
	}
	if s, err := c.ListTimezonesInAreaText(ctx, "Europe"); err != nil || s != "Europe/London" {
		t.Fatalf("ListTimezonesInAreaText %q %v", s, err)
	}
	if _, err := c.GetTimezone(ctx, "America/Argentina/Salta"); err != nil {
		t.Fatal(err)
	}
	if s, err := c.GetTimezoneText(ctx, "Europe/London"); err != nil || s != "abbreviation: GMT" {
		t.Fatalf("GetTimezoneText %q %v", s, err)
	}
	for _, ip := range []string{"", "8.8.8.8"} {
		if _, err := c.GetIP(ctx, ip); err != nil {
			t.Fatal(err)
		}
		if s, err := c.GetIPText(ctx, ip); err != nil || s != "abbreviation: GMT" {
			t.Fatalf("GetIPText %q %v", s, err)
		}
	}
	paths := []string{}
	for _, r := range seen {
		paths = append(paths, r.URL.Path)
	}
	sort.Strings(paths)
	if len(paths) != 10 {
		t.Fatalf("expected 10 calls, got %v", paths)
	}
}

func TestUnknownLocation(t *testing.T) {
	var seen []*http.Request
	c := server(t, map[string]route{
		"/api/timezone/Nowhere/Land":     {404, `{"error":"unknown location"}`},
		"/api/timezone/Nowhere/Land.txt": {404, "Error: unknown location"},
		"/api/ip/999.1.1.1":              {404, `{"error":"malformed ip"}`},
	}, &seen)
	ctx := context.Background()
	_, err := c.GetTimezone(ctx, "Nowhere/Land")
	if !errors.Is(err, ErrUnknownLocation) || !IsUnknownLocation(err) {
		t.Fatalf("expected ErrUnknownLocation, got %v", err)
	}
	var apiErr *Error
	if !errors.As(err, &apiErr) || apiErr.Status != 404 {
		t.Fatalf("expected *Error with 404, got %v", err)
	}
	if _, err := c.GetTimezoneText(ctx, "Nowhere/Land"); !IsUnknownLocation(err) {
		t.Fatalf("text: expected unknown location, got %v", err)
	}
	if _, err := c.GetIP(ctx, "999.1.1.1"); !errors.Is(err, ErrMalformedIP) {
		t.Fatalf("expected ErrMalformedIP, got %v", err)
	}
}

func TestAuthErrorAndSign(t *testing.T) {
	var seen []*http.Request
	c := server(t, map[string]route{
		"/api/timezone/UTC":           {401, `{"error":{"code":"UNAUTHORIZED","message":"Missing API key credentials."}}`},
		"/api/timezone/Europe/London": {200, london},
	}, &seen)
	ctx := context.Background()
	_, err := c.GetTimezone(ctx, "UTC")
	var apiErr *Error
	if !errors.As(err, &apiErr) || apiErr.Status != 401 || apiErr.Code != "UNAUTHORIZED" || IsUnknownLocation(err) {
		t.Fatalf("unexpected %v", err)
	}
	c.Sign = true
	if _, err := c.RequestRaw(ctx, "/api/timezone/Europe/London"); err != nil {
		t.Fatal(err)
	}
	if q := seen[len(seen)-1].URL.RawQuery; q != "sign=true" {
		t.Fatalf("query = %q", q)
	}
}

func TestLiveSmoke(t *testing.T) {
	key := os.Getenv("TIMELOGIC_API_KEY")
	if key == "" {
		t.Skip("TIMELOGIC_API_KEY is not set")
	}
	c := NewClient(key)
	ctx := context.Background()
	v, err := c.GetTimezone(ctx, "Europe/London")
	if err != nil || v.Timezone != "Europe/London" {
		t.Fatalf("live GetTimezone %v %v", v, err)
	}
	if _, err := c.GetTimezone(ctx, "Nowhere/Land"); !IsUnknownLocation(err) {
		t.Fatalf("live unknown location: %v", err)
	}
}
