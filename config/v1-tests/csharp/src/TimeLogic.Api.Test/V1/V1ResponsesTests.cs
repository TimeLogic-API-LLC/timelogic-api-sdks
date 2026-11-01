using System;
using System.Linq;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using TimeLogic.Api.Api;
using TimeLogic.Api.Client;
using TimeLogic.Api.Model;
using Xunit;

namespace TimeLogic.Api.Test.V1
{
    /// <summary>
    /// Typed /v1 response decoding. The offline tests decode recorded API
    /// responses with the generated models. The live tests return early unless
    /// TIMELOGIC_SDK_TEST_API_KEY (or TIMELOGIC_API_KEY) is set.
    /// </summary>
    public class V1ResponsesTests
    {
        private const string Single = "{\"unix\":1772366400,\"unix_ms\":1772366400000,\"utc\":\"2026-03-01T12:00:00Z\",\"iso_local\":\"2026-03-01T21:00:00+09:00\",\"rfc2822\":\"Sun, 01 Mar 2026 21:00:00 +0900\",\"human\":\"March 1, 2026, 9:00 PM Asia/Tokyo\",\"day_number\":1,\"day_short\":\"Sun\",\"day_full\":\"Sunday\",\"timezone\":\"Asia/Tokyo\"}";
        private const string Bulk = "[{\"unix\":1772366400,\"unix_ms\":1772366400000,\"utc\":\"2026-03-01T12:00:00Z\",\"iso_local\":\"2026-03-01T21:00:00+09:00\",\"rfc2822\":\"Sun, 01 Mar 2026 21:00:00 +0900\",\"human\":\"March 1, 2026, 9:00 PM Asia/Tokyo\",\"day_number\":1,\"day_short\":\"Sun\",\"day_full\":\"Sunday\",\"timezone\":\"Asia/Tokyo\"},{\"item\":\"Bad/Zone\",\"error\":{\"code\":\"INVALID_PARAMETER\",\"message\":\"Invalid timezone.\",\"details\":{\"tz\":\"Bad/Zone\"}},\"request_id\":\"a6116a2e-8809-46e9-99c5-765cf0d50fcb\"}]";
        private const string Timezone = "{\"unix\":1772366400,\"unix_ms\":1772366400000,\"utc\":\"2026-03-01T12:00:00Z\",\"iso_local\":\"2026-03-01T21:00:00+09:00\",\"rfc2822\":\"Sun, 01 Mar 2026 21:00:00 +0900\",\"human\":\"March 1, 2026, 9:00 PM Asia/Tokyo\",\"day_number\":1,\"day_short\":\"Sun\",\"day_full\":\"Sunday\",\"timezone\":\"Asia/Tokyo\",\"offset\":540,\"dst\":false}";
        private const string Offset = "{\"unix\":1772366400,\"unix_ms\":1772366400000,\"utc\":\"2026-03-01T12:00:00Z\",\"iso_local\":\"2026-03-01T17:30:00+05:30\",\"rfc2822\":\"Sun, 01 Mar 2026 21:00:00 +0900\",\"human\":\"March 1, 2026, 5:30 PM UTC+05:30\",\"day_number\":1,\"day_short\":\"Sun\",\"day_full\":\"Sunday\",\"timezone\":null,\"offset\":330,\"dst\":false,\"matching_zones\":[{\"timezone\":\"Asia/Colombo\",\"offset\":330,\"dst\":false},{\"timezone\":\"Asia/Kolkata\",\"offset\":330,\"dst\":false}]}";

        [Fact]
        public void SingleResultIsTimePayload()
        {
            var value = GetCurrentTime200Response.FromJson(Single);
            Assert.IsType<TimePayload>(value.ActualInstance);
            Assert.Equal(1772366400000L, value.GetTimePayload().UnixMs);
            Assert.Equal("2026-03-01T21:00:00+09:00", value.GetTimePayload().IsoLocal);
        }

        [Fact]
        public void BulkResultItemsAreTimePayloadOrBulkError()
        {
            var value = GetCurrentTime200Response.FromJson(Bulk);
            Assert.IsType<TimePayloadBulkResponse>(value.ActualInstance);
            var items = value.GetTimePayloadBulkResponse();
            Assert.Equal(2, items.Count);
            Assert.Equal("Asia/Tokyo", items[0].GetTimePayload().Timezone);
            Assert.Equal("2026-03-01T21:00:00+09:00", items[0].GetTimePayload().IsoLocal);
            Assert.Equal(new DateTime(2026, 3, 1, 12, 0, 0, DateTimeKind.Utc), items[0].GetTimePayload().Utc.ToUniversalTime());
            var error = items[1].GetBulkError();
            Assert.Equal("Bad/Zone", error.Item);
            Assert.Equal(ApiError.CodeEnum.INVALIDPARAMETER, error.Error.Code);
            Assert.Equal("a6116a2e-8809-46e9-99c5-765cf0d50fcb", error.RequestId);
            Assert.True(JToken.DeepEquals(JToken.Parse(Bulk), JToken.Parse(value.ToJson())));
        }

        [Fact]
        public void TimezoneLookupsDecode()
        {
            var zone = JsonConvert.DeserializeObject<TimezoneResponse>(Timezone);
            Assert.Equal("Asia/Tokyo", zone.Timezone);
            Assert.Equal(540, zone.Offset);
            Assert.True(zone.MatchingZones == null || zone.MatchingZones.Count == 0);
            var offset = JsonConvert.DeserializeObject<TimezoneResponse>(Offset);
            Assert.Null(offset.Timezone);
            Assert.Equal(new[] { "Asia/Colombo", "Asia/Kolkata" }, offset.MatchingZones.Select(z => z.Timezone).ToArray());
            Assert.All(offset.MatchingZones, z => Assert.Equal(330, z.Offset));
        }

        private static Configuration LiveConfiguration()
        {
            var key = Environment.GetEnvironmentVariable("TIMELOGIC_SDK_TEST_API_KEY");
            if (string.IsNullOrEmpty(key)) key = Environment.GetEnvironmentVariable("TIMELOGIC_API_KEY");
            if (string.IsNullOrEmpty(key)) return null;
            return TransportConfiguration.Create(key, baseUrl: Environment.GetEnvironmentVariable("TIMELOGIC_SDK_TEST_BASE_URL"));
        }

        [Fact]
        public void LiveEveryOperationDecodes()
        {
            var configuration = LiveConfiguration();
            if (configuration == null) return;
            var api = new TimeApi(configuration);
            Assert.Equal("America/New_York", api.GetCurrentTime(tz: "America/New_York").GetTimePayload().Timezone);
            var bulk = api.GetCurrentTime(tz: "America/New_York,Europe/London,Bad/Zone").GetTimePayloadBulkResponse();
            Assert.Equal(3, bulk.Count);
            Assert.Equal("Europe/London", bulk[1].GetTimePayload().Timezone);
            Assert.Equal("Bad/Zone", bulk[2].GetBulkError().Item);
            Assert.Equal("2026-03-01T21:00:00+09:00", api.ConvertTime(unix: 1772366400, tz: "Asia/Tokyo").GetTimePayload().IsoLocal);
            var converted = api.ConvertTime(unix: 1772366400, offset: "+01:00,+02:00").GetTimePayloadBulkResponse();
            Assert.Equal("2026-03-01T14:00:00+02:00", converted[1].GetTimePayload().IsoLocal);
            var zone = api.GetTimezone(tz: "Europe/London");
            Assert.Equal("Europe/London", zone.Timezone);
            Assert.True(zone.MatchingZones == null || zone.MatchingZones.Count == 0);
            var offset = api.GetTimezone(offset: "+05:30");
            Assert.Null(offset.Timezone);
            Assert.Equal(330, offset.MatchingZones[0].Offset);
            var diff = api.DiffTime("iso=2026-01-01T00:00:00Z", "iso=2026-03-01T12:00:00Z");
            Assert.Equal(59, diff.Days);
            Assert.Equal(1767225600000L, diff.From.UnixMs);
            Assert.Equal(60L, api.AddTime(unix: 0, seconds: 60, utc: true).Unix);
            Assert.True(api.GetCalendar(tz: "America/New_York", week: true).WeekNumber > 0);
            Assert.NotNull(api.GetDst(tz: "America/New_York", next: true).NextTransition);
            Assert.Equal(31, api.GetElapsed(iso: "2026-01-01T00:00:00Z", compareIso: "2026-02-01T00:00:00Z").Days);
            Assert.Contains("timelogic-clock", api.GetClock("digital-broadcast", tz: "UTC"));
            Assert.Equal(JwkKey.KtyEnum.OKP, new UtilityApi(configuration).GetPublicSigningKey().Keys[0].Kty);
        }

        [Fact]
        public void LiveApiErrorKeepsCodeAndRequestId()
        {
            var configuration = LiveConfiguration();
            if (configuration == null) return;
            var api = new TimeApi(configuration);
            foreach (Action call in new Action[]
            {
                () => api.GetCurrentTime(tz: "Bad/Zone"),
                () => api.ConvertTime(unix: 0, tz: "Bad/Zone"),
                () => api.GetTimezone(tz: "Bad/Zone"),
            })
            {
                var error = Assert.Throws<ApiException>(call);
                Assert.Equal(400, error.ErrorCode);
                var body = JsonConvert.DeserializeObject<ErrorResponse>(error.ErrorContent.ToString());
                Assert.Equal(ApiError.CodeEnum.INVALIDPARAMETER, body.Error.Code);
                Assert.False(string.IsNullOrEmpty(body.RequestId));
            }
        }
    }
}
