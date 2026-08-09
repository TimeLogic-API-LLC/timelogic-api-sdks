using System;

namespace TimeLogic.Api.Client
{
    /// <summary>Builds isolated direct or RapidAPI transport configurations.</summary>
    public static class TransportConfiguration
    {
        /// <summary>Default TimeLogic API base URL.</summary>
        public const string DefaultApiBaseUrl = "https://api.timelogicapi.com";
        /// <summary>Default RapidAPI host header value.</summary>
        public const string DefaultRapidApiHost = "timelogic-api-world-time-timezones-time-calculations.p.rapidapi.com";
        /// <summary>Default RapidAPI base URL.</summary>
        public const string DefaultRapidApiBaseUrl = "https://" + DefaultRapidApiHost;

        /// <summary>Creates an isolated configuration for the selected transport.</summary>
        public static Configuration Create(string apiKey, bool rapidApi = false, string baseUrl = null, string rapidApiHost = null)
        {
            if (string.IsNullOrWhiteSpace(apiKey)) throw new ArgumentException("apiKey is required", nameof(apiKey));
            var host = string.IsNullOrWhiteSpace(rapidApiHost) ? DefaultRapidApiHost : rapidApiHost.Trim();
            var configuration = new Configuration
            {
                BasePath = string.IsNullOrWhiteSpace(baseUrl) ? (rapidApi ? "https://" + host : DefaultApiBaseUrl) : baseUrl.TrimEnd('/')
            };
            if (rapidApi)
            {
                configuration.ApiKey["X-RapidAPI-Key"] = apiKey.Trim();
                configuration.ApiKey["X-RapidAPI-Host"] = host;
            }
            else
            {
                configuration.AccessToken = apiKey.Trim();
            }
            return configuration;
        }
    }
}
