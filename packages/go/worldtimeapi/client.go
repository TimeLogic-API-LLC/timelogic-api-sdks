// Package worldtimeapi is a WorldTimeAPI-compatible client for the TimeLogic API
// /api/* routes.
//
// Contract: openapi/openapi-worldtimeapi.yaml. The routes answer the same paths,
// field names and plain-text variants as worldtimeapi.org; a TimeLogic API key is
// required and is sent as the X-API-Key header.
//
// The package is self-contained inside the timelogicapi module: it does not import
// or change the generated /v1 client, its configuration or its transport.
//
//	client := worldtimeapi.NewClient(os.Getenv("TIMELOGIC_API_KEY"))
//	now, err := client.GetTimezone(ctx, "Europe/London")
package worldtimeapi

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strings"
	"time"
)

// DefaultBaseURL is the default host for the WorldTimeAPI-compatible routes.
const DefaultBaseURL = "https://api.timelogicapi.com"

// DateTime is the time object returned by /api/timezone/{zone} and /api/ip,
// with the worldtimeapi.org field names and types.
type DateTime struct {
	Abbreviation string  `json:"abbreviation"`
	ClientIP     string  `json:"client_ip"`
	Datetime     string  `json:"datetime"`
	DayOfWeek    int     `json:"day_of_week"`
	DayOfYear    int     `json:"day_of_year"`
	DST          bool    `json:"dst"`
	DSTFrom      *string `json:"dst_from"`
	DSTOffset    int     `json:"dst_offset"`
	DSTUntil     *string `json:"dst_until"`
	RawOffset    int     `json:"raw_offset"`
	Timezone     string  `json:"timezone"`
	Unixtime     int64   `json:"unixtime"`
	UTCDatetime  string  `json:"utc_datetime"`
	UTCOffset    string  `json:"utc_offset"`
	WeekNumber   int     `json:"week_number"`
}

// RawResponse is an HTTP answer, including the X-TimeLogic-Signature* headers
// when signing is enabled.
type RawResponse struct {
	Status int
	Header http.Header
	Body   []byte
}

// ErrUnknownLocation matches (with errors.Is) the 404 {"error":"unknown location"} answer.
var ErrUnknownLocation = errors.New("unknown location")

// ErrMalformedIP matches (with errors.Is) the 404 {"error":"malformed ip"} answer.
var ErrMalformedIP = errors.New("malformed ip")

// Error is returned for any non-2xx answer. Message is the worldtimeapi.org-style
// message (for example "unknown location") or the TimeLogic message for
// authentication and quota errors.
type Error struct {
	Status  int
	Message string
	Code    string
	Body    []byte
}

func (e *Error) Error() string {
	return fmt.Sprintf("WorldTimeAPI-compatible request failed (%d): %s", e.Status, e.Message)
}

// Is reports whether the error is ErrUnknownLocation or ErrMalformedIP.
func (e *Error) Is(target error) bool {
	switch target {
	case ErrUnknownLocation:
		return e.Status == http.StatusNotFound && e.Message == "unknown location"
	case ErrMalformedIP:
		return e.Status == http.StatusNotFound && e.Message == "malformed ip"
	}
	return false
}

// IsUnknownLocation reports whether err is the 404 "unknown location" answer.
func IsUnknownLocation(err error) bool { return errors.Is(err, ErrUnknownLocation) }

// ErrorFromResponse parses a non-2xx answer.
func ErrorFromResponse(status int, body []byte) *Error {
	message := strings.TrimSpace(string(body))
	code := ""
	if strings.HasPrefix(message, "Error:") {
		message = strings.TrimSpace(strings.TrimPrefix(message, "Error:"))
	} else {
		var parsed map[string]json.RawMessage
		if json.Unmarshal(body, &parsed) == nil {
			var text string
			var nested struct {
				Code    string `json:"code"`
				Message string `json:"message"`
			}
			if raw, ok := parsed["error"]; ok {
				if json.Unmarshal(raw, &text) == nil {
					message = text
				} else if json.Unmarshal(raw, &nested) == nil {
					message = nested.Message
					code = nested.Code
				}
			}
		}
	}
	return &Error{Status: status, Message: message, Code: code, Body: body}
}

// Client calls the WorldTimeAPI-compatible routes.
type Client struct {
	APIKey     string
	BaseURL    string
	Sign       bool
	HTTPClient *http.Client
}

// NewClient returns a client for the default host.
func NewClient(apiKey string) *Client {
	return &Client{
		APIKey:  apiKey,
		BaseURL: DefaultBaseURL,
		HTTPClient: &http.Client{
			Timeout: 30 * time.Second,
			CheckRedirect: func(*http.Request, []*http.Request) error {
				return http.ErrUseLastResponse
			},
		},
	}
}

// ZonePath builds the path for "Europe/London", "America/Argentina/Salta" or a
// one-word zone such as "UTC".
func ZonePath(timezone string, text bool) (string, error) {
	var segments []string
	for _, s := range strings.Split(timezone, "/") {
		if s != "" {
			segments = append(segments, url.PathEscape(s))
		}
	}
	if len(segments) < 1 || len(segments) > 3 {
		return "", fmt.Errorf("timezone must have one to three segments, for example \"Europe/London\"")
	}
	return "/api/timezone/" + strings.Join(segments, "/") + suffix(text), nil
}

// IPPath builds /api/ip or /api/ip/{ip}.
func IPPath(ip string, text bool) string {
	if ip == "" {
		return "/api/ip" + suffix(text)
	}
	return "/api/ip/" + url.PathEscape(ip) + suffix(text)
}

func suffix(text bool) string {
	if text {
		return ".txt"
	}
	return ""
}

// ListTimezones calls GET /api/timezone.
func (c *Client) ListTimezones(ctx context.Context) ([]string, error) {
	var out []string
	if err := c.getJSON(ctx, "/api/timezone", &out); err != nil {
		return nil, err
	}
	return out, nil
}

// ListTimezonesText calls GET /api/timezone.txt.
func (c *Client) ListTimezonesText(ctx context.Context) (string, error) {
	return c.getText(ctx, "/api/timezone.txt")
}

// ListTimezonesInArea calls GET /api/timezone/{area}.
func (c *Client) ListTimezonesInArea(ctx context.Context, area string) ([]string, error) {
	path, err := ZonePath(area, false)
	if err != nil {
		return nil, err
	}
	var raw json.RawMessage
	if err := c.getJSON(ctx, path, &raw); err != nil {
		return nil, err
	}
	var out []string
	if err := json.Unmarshal(raw, &out); err != nil {
		return nil, &Error{Status: http.StatusOK, Message: area + " is a timezone, not an area; use GetTimezone", Body: raw}
	}
	return out, nil
}

// ListTimezonesInAreaText calls GET /api/timezone/{area}.txt.
func (c *Client) ListTimezonesInAreaText(ctx context.Context, area string) (string, error) {
	path, err := ZonePath(area, true)
	if err != nil {
		return "", err
	}
	return c.getText(ctx, path)
}

// GetTimezone calls GET /api/timezone/{area}/{location}[/{region}] (or a one-word zone such as "UTC").
func (c *Client) GetTimezone(ctx context.Context, timezone string) (*DateTime, error) {
	path, err := ZonePath(timezone, false)
	if err != nil {
		return nil, err
	}
	out := &DateTime{}
	if err := c.getJSON(ctx, path, out); err != nil {
		return nil, err
	}
	return out, nil
}

// GetTimezoneText is the plain-text variant of GetTimezone.
func (c *Client) GetTimezoneText(ctx context.Context, timezone string) (string, error) {
	path, err := ZonePath(timezone, true)
	if err != nil {
		return "", err
	}
	return c.getText(ctx, path)
}

// GetIP calls GET /api/ip (the caller's address, when ip is "") or /api/ip/{ip}.
func (c *Client) GetIP(ctx context.Context, ip string) (*DateTime, error) {
	out := &DateTime{}
	if err := c.getJSON(ctx, IPPath(ip, false), out); err != nil {
		return nil, err
	}
	return out, nil
}

// GetIPText is the plain-text variant of GetIP.
func (c *Client) GetIPText(ctx context.Context, ip string) (string, error) {
	return c.getText(ctx, IPPath(ip, true))
}

// RequestRaw sends a GET to any /api/* path and returns status, headers and body
// without turning a non-2xx status into an error.
func (c *Client) RequestRaw(ctx context.Context, path string) (*RawResponse, error) {
	if c.APIKey == "" {
		return nil, errors.New("worldtimeapi: APIKey is required")
	}
	base := c.BaseURL
	if base == "" {
		base = DefaultBaseURL
	}
	target := strings.TrimRight(base, "/") + path
	if c.Sign {
		target += "?sign=true"
	}
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, target, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("X-API-Key", c.APIKey)
	if strings.HasSuffix(path, ".txt") {
		req.Header.Set("Accept", "text/plain")
	} else {
		req.Header.Set("Accept", "application/json")
	}
	httpClient := c.HTTPClient
	if httpClient == nil {
		httpClient = NewClient(c.APIKey).HTTPClient
	}
	resp, err := httpClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}
	return &RawResponse{Status: resp.StatusCode, Header: resp.Header, Body: body}, nil
}

func (c *Client) getText(ctx context.Context, path string) (string, error) {
	raw, err := c.RequestRaw(ctx, path)
	if err != nil {
		return "", err
	}
	if raw.Status < 200 || raw.Status > 299 {
		return "", ErrorFromResponse(raw.Status, raw.Body)
	}
	return string(raw.Body), nil
}

func (c *Client) getJSON(ctx context.Context, path string, out interface{}) error {
	raw, err := c.RequestRaw(ctx, path)
	if err != nil {
		return err
	}
	if raw.Status < 200 || raw.Status > 299 {
		return ErrorFromResponse(raw.Status, raw.Body)
	}
	return json.Unmarshal(raw.Body, out)
}
