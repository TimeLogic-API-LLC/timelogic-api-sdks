// WorldTimeAPI-compatible client for the TimeLogic API /api/* routes.
//
// Contract: openapi/openapi-worldtimeapi.yaml. The routes answer the same paths, field
// names and plain-text variants as worldtimeapi.org; a TimeLogic API key is required and
// is sent as the X-API-Key header. This namespace does not use or change the generated
// /v1 ApiClient, Configuration or TransportConfiguration.

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace TimeLogic.Api.WorldTimeApi
{
    /// <summary>
    /// Time object returned by /api/timezone/{zone} and /api/ip, with the worldtimeapi.org
    /// field names (JSON) and types.
    /// </summary>
    public sealed class WorldTimeApiDateTime
    {
        [JsonProperty("abbreviation")] public string Abbreviation { get; set; }
        [JsonProperty("client_ip")] public string ClientIp { get; set; }
        [JsonProperty("datetime")] public string Datetime { get; set; }
        [JsonProperty("day_of_week")] public int DayOfWeek { get; set; }
        [JsonProperty("day_of_year")] public int DayOfYear { get; set; }
        [JsonProperty("dst")] public bool Dst { get; set; }
        [JsonProperty("dst_from")] public string DstFrom { get; set; }
        [JsonProperty("dst_offset")] public int DstOffset { get; set; }
        [JsonProperty("dst_until")] public string DstUntil { get; set; }
        [JsonProperty("raw_offset")] public int RawOffset { get; set; }
        [JsonProperty("timezone")] public string Timezone { get; set; }
        [JsonProperty("unixtime")] public long Unixtime { get; set; }
        [JsonProperty("utc_datetime")] public string UtcDatetime { get; set; }
        [JsonProperty("utc_offset")] public string UtcOffset { get; set; }
        [JsonProperty("week_number")] public int WeekNumber { get; set; }
    }

    /// <summary>HTTP answer, including the X-TimeLogic-Signature* headers when signing is enabled.</summary>
    public sealed class WorldTimeApiRawResponse
    {
        public WorldTimeApiRawResponse(int status, IReadOnlyDictionary<string, string> headers, string body)
        {
            Status = status;
            Headers = headers;
            Body = body;
        }

        public int Status { get; }

        /// <summary>Header names are lower-case; repeated values are joined with ", ".</summary>
        public IReadOnlyDictionary<string, string> Headers { get; }

        public string Body { get; }
    }

    /// <summary>
    /// Thrown for any non-2xx answer. <see cref="Error"/> is the worldtimeapi.org-style message
    /// (for example "unknown location") or the TimeLogic message for authentication and quota errors.
    /// </summary>
    public class WorldTimeApiException : Exception
    {
        public WorldTimeApiException(int status, string error, string code, string body)
            : base($"WorldTimeAPI-compatible request failed ({status}): {error}")
        {
            Status = status;
            Error = error;
            Code = code;
            Body = body;
        }

        public int Status { get; }
        public string Error { get; }

        /// <summary>TimeLogic error code (for example UNAUTHORIZED), or null.</summary>
        public string Code { get; }
        public string Body { get; }

        /// <summary>True for the 404 {"error":"unknown location"} answer.</summary>
        public bool IsUnknownLocation => Status == 404 && Error == "unknown location";

        /// <summary>True for the 404 {"error":"malformed ip"} answer.</summary>
        public bool IsMalformedIp => Status == 404 && Error == "malformed ip";
    }

    /// <summary>The 404 {"error":"unknown location"} answer.</summary>
    public sealed class WorldTimeApiUnknownLocationException : WorldTimeApiException
    {
        public WorldTimeApiUnknownLocationException(int status, string error, string code, string body)
            : base(status, error, code, body)
        {
        }
    }

    /// <summary>Client for the TimeLogic API WorldTimeAPI-compatible routes (/api/*).</summary>
    /// <example>
    /// <code>
    /// var wta = new WorldTimeApiClient(Environment.GetEnvironmentVariable("TIMELOGIC_API_KEY"));
    /// var now = await wta.GetTimezoneAsync("Europe/London");
    /// </code>
    /// </example>
    public sealed class WorldTimeApiClient
    {
        /// <summary>Default host for the WorldTimeAPI-compatible routes.</summary>
        public const string DefaultBaseUrl = "https://api.timelogicapi.com";

        private static readonly HttpClient SharedHttpClient = new HttpClient(new HttpClientHandler { AllowAutoRedirect = false })
        {
            Timeout = TimeSpan.FromSeconds(30)
        };

        private readonly string _apiKey;
        private readonly string _baseUrl;
        private readonly bool _sign;
        private readonly HttpClient _httpClient;

        /// <param name="apiKey">TimeLogic API key, sent as the X-API-Key header.</param>
        /// <param name="baseUrl">Host; defaults to https://api.timelogicapi.com.</param>
        /// <param name="sign">Adds sign=true so responses carry detached signature headers.</param>
        /// <param name="httpClient">HttpClient to use, or null for a shared one that does not follow redirects.</param>
        public WorldTimeApiClient(string apiKey, string baseUrl = DefaultBaseUrl, bool sign = false, HttpClient httpClient = null)
        {
            if (string.IsNullOrEmpty(apiKey)) throw new ArgumentException("apiKey is required", nameof(apiKey));
            _apiKey = apiKey;
            _baseUrl = (baseUrl ?? DefaultBaseUrl).TrimEnd('/');
            _sign = sign;
            _httpClient = httpClient ?? SharedHttpClient;
        }

        /// <summary>GET /api/timezone</summary>
        public async Task<List<string>> ListTimezonesAsync(CancellationToken cancellationToken = default)
            => JsonConvert.DeserializeObject<List<string>>(await GetTextAsync("/api/timezone", cancellationToken).ConfigureAwait(false));

        /// <summary>GET /api/timezone.txt</summary>
        public Task<string> ListTimezonesTextAsync(CancellationToken cancellationToken = default)
            => GetTextAsync("/api/timezone.txt", cancellationToken);

        /// <summary>GET /api/timezone/{area}</summary>
        public async Task<List<string>> ListTimezonesInAreaAsync(string area, CancellationToken cancellationToken = default)
        {
            var body = await GetTextAsync(ZonePath(area, false), cancellationToken).ConfigureAwait(false);
            var parsed = JToken.Parse(body);
            if (parsed.Type != JTokenType.Array)
            {
                throw new WorldTimeApiException(200, area + " is a timezone, not an area; use GetTimezoneAsync", null, body);
            }
            return parsed.ToObject<List<string>>();
        }

        /// <summary>GET /api/timezone/{area}.txt</summary>
        public Task<string> ListTimezonesInAreaTextAsync(string area, CancellationToken cancellationToken = default)
            => GetTextAsync(ZonePath(area, true), cancellationToken);

        /// <summary>GET /api/timezone/{area}/{location}[/{region}], or a one-word zone such as UTC.</summary>
        public async Task<WorldTimeApiDateTime> GetTimezoneAsync(string timezone, CancellationToken cancellationToken = default)
            => JsonConvert.DeserializeObject<WorldTimeApiDateTime>(await GetTextAsync(ZonePath(timezone, false), cancellationToken).ConfigureAwait(false));

        /// <summary>Plain-text variant of GetTimezoneAsync.</summary>
        public Task<string> GetTimezoneTextAsync(string timezone, CancellationToken cancellationToken = default)
            => GetTextAsync(ZonePath(timezone, true), cancellationToken);

        /// <summary>GET /api/ip (the caller's address) when ip is null, else /api/ip/{ip}.</summary>
        public async Task<WorldTimeApiDateTime> GetIpAsync(string ip = null, CancellationToken cancellationToken = default)
            => JsonConvert.DeserializeObject<WorldTimeApiDateTime>(await GetTextAsync(IpPath(ip, false), cancellationToken).ConfigureAwait(false));

        /// <summary>Plain-text variant of GetIpAsync.</summary>
        public Task<string> GetIpTextAsync(string ip = null, CancellationToken cancellationToken = default)
            => GetTextAsync(IpPath(ip, true), cancellationToken);

        /// <summary>GET any /api/* path and return status, headers and body without throwing for non-2xx answers.</summary>
        public async Task<WorldTimeApiRawResponse> RequestRawAsync(string path, CancellationToken cancellationToken = default)
        {
            var url = _baseUrl + path + (_sign ? "?sign=true" : string.Empty);
            using (var request = new HttpRequestMessage(HttpMethod.Get, url))
            {
                request.Headers.TryAddWithoutValidation("X-API-Key", _apiKey);
                request.Headers.TryAddWithoutValidation("Accept", path.EndsWith(".txt", StringComparison.Ordinal) ? "text/plain" : "application/json");
                using (var response = await _httpClient.SendAsync(request, cancellationToken).ConfigureAwait(false))
                {
                    var headers = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
                    foreach (var header in response.Headers.Concat(response.Content.Headers))
                    {
                        headers[header.Key.ToLowerInvariant()] = string.Join(", ", header.Value);
                    }
                    var body = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                    return new WorldTimeApiRawResponse((int)response.StatusCode, headers, body);
                }
            }
        }

        /// <summary>Path for "Europe/London", "America/Argentina/Salta" or a one-word zone such as "UTC".</summary>
        public static string ZonePath(string timezone, bool text)
        {
            var segments = (timezone ?? string.Empty).Split('/').Where(s => s.Length > 0).ToArray();
            if (segments.Length < 1 || segments.Length > 3)
            {
                throw new ArgumentException("timezone must have one to three segments, for example \"Europe/London\"", nameof(timezone));
            }
            return "/api/timezone/" + string.Join("/", segments.Select(Uri.EscapeDataString)) + (text ? ".txt" : string.Empty);
        }

        /// <summary>/api/ip or /api/ip/{ip}.</summary>
        public static string IpPath(string ip, bool text)
            => (string.IsNullOrEmpty(ip) ? "/api/ip" : "/api/ip/" + Uri.EscapeDataString(ip)) + (text ? ".txt" : string.Empty);

        /// <summary>Parses a non-2xx answer.</summary>
        public static WorldTimeApiException ErrorFromResponse(int status, string body)
        {
            var message = (body ?? string.Empty).Trim();
            string code = null;
            if (message.StartsWith("Error:", StringComparison.Ordinal))
            {
                message = message.Substring("Error:".Length).Trim();
            }
            else
            {
                try
                {
                    var parsed = JToken.Parse(body);
                    var error = parsed.Type == JTokenType.Object ? parsed["error"] : null;
                    if (error != null && error.Type == JTokenType.String)
                    {
                        message = error.Value<string>();
                    }
                    else if (error != null && error.Type == JTokenType.Object)
                    {
                        message = error["message"]?.ToString() ?? string.Empty;
                        code = error["code"]?.ToString();
                    }
                }
                catch (JsonException)
                {
                    // keep the raw body as the message
                }
            }
            if (status == 404 && message == "unknown location")
            {
                return new WorldTimeApiUnknownLocationException(status, message, code, body);
            }
            return new WorldTimeApiException(status, message, code, body);
        }

        private async Task<string> GetTextAsync(string path, CancellationToken cancellationToken)
        {
            var raw = await RequestRawAsync(path, cancellationToken).ConfigureAwait(false);
            if (raw.Status < 200 || raw.Status > 299) throw ErrorFromResponse(raw.Status, raw.Body);
            return raw.Body;
        }
    }
}
