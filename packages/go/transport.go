package timelogicdirectapi

import (
    "context"
    "fmt"
    "strings"
)

const DefaultAPIBaseURL = "https://api.timelogicapi.com"
const DefaultRapidAPIHost = "timelogic-api-world-time-timezones-time-calculations.p.rapidapi.com"
const DefaultRapidAPIBaseURL = "https://" + DefaultRapidAPIHost

type TransportOptions struct {
    APIKey        string
    RapidAPI      bool
    BaseURL       string
    RapidAPIHost  string
}

type Transport struct {
    Configuration *Configuration
    apiKey       string
    rapidAPI     bool
    rapidAPIHost string
}

func NewTransport(options TransportOptions) (*Transport, error) {
    if strings.TrimSpace(options.APIKey) == "" {
        return nil, fmt.Errorf("APIKey is required")
    }
    configuration := NewConfiguration()
    transport := &Transport{Configuration: configuration, apiKey: strings.TrimSpace(options.APIKey), rapidAPI: options.RapidAPI}
    if options.RapidAPI {
        transport.rapidAPIHost = strings.TrimSpace(options.RapidAPIHost)
        if transport.rapidAPIHost == "" {
            transport.rapidAPIHost = DefaultRapidAPIHost
        }
        configuration.Servers[1].URL = strings.TrimRight(options.BaseURL, "/")
        if options.BaseURL == "" {
            configuration.Servers[1].URL = "https://{rapidapiHost}"
        }
    } else {
        configuration.Servers[0].URL = strings.TrimRight(options.BaseURL, "/")
        if options.BaseURL == "" {
            configuration.Servers[0].URL = "https://{host}"
        }
    }
    return transport, nil
}

func (t *Transport) Context(ctx context.Context) context.Context {
    if t.rapidAPI {
        ctx = context.WithValue(ctx, ContextServerIndex, 1)
        ctx = context.WithValue(ctx, ContextServerVariables, map[string]string{"rapidapiHost": t.rapidAPIHost})
        ctx = context.WithValue(ctx, ContextAPIKeys, map[string]APIKey{
            "rapidApiKey":  {Key: t.apiKey},
            "rapidApiHost": {Key: t.rapidAPIHost},
        })
        return ctx
    }
    ctx = context.WithValue(ctx, ContextServerIndex, 0)
    ctx = context.WithValue(ctx, ContextAccessToken, t.apiKey)
    return ctx
}
