using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using TimeLogic.Api.WorldTimeApi;
using Xunit;

namespace TimeLogic.Api.Test.WorldTimeApi
{
    public class WorldTimeApiClientTests
    {
        private const string London = "{\"utc_offset\":\"+00:00\",\"timezone\":\"Europe/London\",\"day_of_week\":0,\"day_of_year\":305,\"datetime\":\"2026-11-01T03:34:38.413000+00:00\",\"utc_datetime\":\"2026-11-01T03:34:38.413000+00:00\",\"unixtime\":1793504078,\"raw_offset\":0,\"week_number\":44,\"dst\":false,\"abbreviation\":\"GMT\",\"dst_offset\":0,\"dst_from\":null,\"dst_until\":null,\"client_ip\":\"203.0.113.7\"}";

        private sealed class MockHandler : HttpMessageHandler
        {
            private readonly Dictionary<string, (int, string)> _routes;
            public readonly List<HttpRequestMessage> Requests = new List<HttpRequestMessage>();

            public MockHandler(Dictionary<string, (int, string)> routes) { _routes = routes; }

            protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
            {
                Requests.Add(request);
                var route = _routes.TryGetValue(request.RequestUri.AbsolutePath, out var found) ? found : (404, "{\"error\":\"not found\"}");
                var response = new HttpResponseMessage((HttpStatusCode)route.Item1) { Content = new StringContent(route.Item2, Encoding.UTF8) };
                response.Headers.TryAddWithoutValidation("X-TimeLogic-Signature", "sig");
                return Task.FromResult(response);
            }
        }

        private static (WorldTimeApiClient, MockHandler) Client(Dictionary<string, (int, string)> routes, bool sign = false)
        {
            var handler = new MockHandler(routes);
            return (new WorldTimeApiClient("test-key", "https://example.test/", sign, new HttpClient(handler)), handler);
        }

        [Fact]
        public async Task GetTimezoneReturnsTheFifteenFields()
        {
            var (client, handler) = Client(new Dictionary<string, (int, string)> { ["/api/timezone/Europe/London"] = (200, London) });
            var value = await client.GetTimezoneAsync("Europe/London");
            Assert.Equal("Europe/London", value.Timezone);
            Assert.Equal("GMT", value.Abbreviation);
            Assert.Equal(1793504078L, value.Unixtime);
            Assert.Null(value.DstFrom);
            Assert.Equal("test-key", handler.Requests[0].Headers.GetValues("X-API-Key").Single());
            Assert.Equal(15, typeof(WorldTimeApiDateTime).GetProperties().Length);
        }

        [Fact]
        public async Task UsesTheWorldTimeApiPaths()
        {
            var (client, handler) = Client(new Dictionary<string, (int, string)>
            {
                ["/api/timezone"] = (200, "[\"Europe/London\",\"UTC\"]"),
                ["/api/timezone.txt"] = (200, "Europe/London\nUTC"),
                ["/api/timezone/Europe"] = (200, "[\"Europe/London\"]"),
                ["/api/timezone/Europe.txt"] = (200, "Europe/London"),
                ["/api/timezone/America/Argentina/Salta"] = (200, London),
                ["/api/timezone/Europe/London.txt"] = (200, "abbreviation: GMT"),
                ["/api/ip"] = (200, London),
                ["/api/ip/8.8.8.8"] = (200, London),
                ["/api/ip.txt"] = (200, "abbreviation: GMT"),
                ["/api/ip/8.8.8.8.txt"] = (200, "abbreviation: GMT"),
            });
            Assert.Equal(new[] { "Europe/London", "UTC" }, await client.ListTimezonesAsync());
            Assert.Equal("Europe/London\nUTC", await client.ListTimezonesTextAsync());
            Assert.Equal(new[] { "Europe/London" }, await client.ListTimezonesInAreaAsync("Europe"));
            Assert.Equal("Europe/London", await client.ListTimezonesInAreaTextAsync("Europe"));
            Assert.Equal("Europe/London", (await client.GetTimezoneAsync("America/Argentina/Salta")).Timezone);
            Assert.Equal("abbreviation: GMT", await client.GetTimezoneTextAsync("Europe/London"));
            Assert.Equal("Europe/London", (await client.GetIpAsync()).Timezone);
            Assert.Equal("Europe/London", (await client.GetIpAsync("8.8.8.8")).Timezone);
            Assert.Equal("abbreviation: GMT", await client.GetIpTextAsync());
            Assert.Equal("abbreviation: GMT", await client.GetIpTextAsync("8.8.8.8"));
            Assert.Equal(10, handler.Requests.Count);
        }

        [Fact]
        public async Task UnknownLocationIsItsOwnException()
        {
            var (client, _) = Client(new Dictionary<string, (int, string)>
            {
                ["/api/timezone/Nowhere/Land"] = (404, "{\"error\":\"unknown location\"}"),
                ["/api/timezone/Nowhere/Land.txt"] = (404, "Error: unknown location"),
                ["/api/ip/999.1.1.1"] = (404, "{\"error\":\"malformed ip\"}"),
            });
            var e = await Assert.ThrowsAsync<WorldTimeApiUnknownLocationException>(() => client.GetTimezoneAsync("Nowhere/Land"));
            Assert.True(e.IsUnknownLocation);
            Assert.Equal(404, e.Status);
            await Assert.ThrowsAsync<WorldTimeApiUnknownLocationException>(() => client.GetTimezoneTextAsync("Nowhere/Land"));
            var ip = await Assert.ThrowsAsync<WorldTimeApiException>(() => client.GetIpAsync("999.1.1.1"));
            Assert.True(ip.IsMalformedIp);
        }

        [Fact]
        public async Task AuthErrorsKeepTheTimeLogicCode()
        {
            var (client, _) = Client(new Dictionary<string, (int, string)>
            {
                ["/api/timezone/UTC"] = (401, "{\"error\":{\"code\":\"UNAUTHORIZED\",\"message\":\"Missing API key credentials.\"}}"),
            });
            var e = await Assert.ThrowsAsync<WorldTimeApiException>(() => client.GetTimezoneAsync("UTC"));
            Assert.Equal(401, e.Status);
            Assert.Equal("UNAUTHORIZED", e.Code);
            Assert.False(e.IsUnknownLocation);
        }

        [Fact]
        public async Task SignAddsTheQueryAndRawExposesHeaders()
        {
            var (client, handler) = Client(new Dictionary<string, (int, string)> { ["/api/timezone/Europe/London"] = (200, London) }, sign: true);
            var raw = await client.RequestRawAsync("/api/timezone/Europe/London");
            Assert.Equal("?sign=true", handler.Requests[0].RequestUri.Query);
            Assert.Equal("sig", raw.Headers["x-timelogic-signature"]);
        }

        [Fact]
        public async Task LiveSmokeTest()
        {
            var key = Environment.GetEnvironmentVariable("TIMELOGIC_API_KEY");
            if (string.IsNullOrEmpty(key)) return; // skipped without TIMELOGIC_API_KEY
            var client = new WorldTimeApiClient(key);
            Assert.Equal("Europe/London", (await client.GetTimezoneAsync("Europe/London")).Timezone);
            await Assert.ThrowsAsync<WorldTimeApiUnknownLocationException>(() => client.GetTimezoneAsync("Nowhere/Land"));
        }
    }
}
