package com.timelogic.direct;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assumptions.assumeTrue;

import com.google.gson.JsonParser;
import com.timelogic.direct.api.TimeApi;
import com.timelogic.direct.api.UtilityApi;
import com.timelogic.direct.model.BulkError;
import com.timelogic.direct.model.GetCurrentTime200Response;
import com.timelogic.direct.model.TimePayload;
import com.timelogic.direct.model.TimePayloadBulkItem;
import com.timelogic.direct.model.TimePayloadBulkResponse;
import com.timelogic.direct.model.TimezoneResponse;
import org.junit.jupiter.api.Test;

/**
 * Typed /v1 response decoding. The offline tests decode recorded API responses
 * with the client's own JSON setup. The live tests run only when
 * TIMELOGIC_SDK_TEST_API_KEY (or TIMELOGIC_API_KEY) is set.
 */
class V1ResponsesTest {
    static final String SINGLE = "{\"unix\":1772366400,\"unix_ms\":1772366400000,\"utc\":\"2026-03-01T12:00:00Z\",\"iso_local\":\"2026-03-01T21:00:00+09:00\",\"rfc2822\":\"Sun, 01 Mar 2026 21:00:00 +0900\",\"human\":\"March 1, 2026, 9:00 PM Asia/Tokyo\",\"day_number\":1,\"day_short\":\"Sun\",\"day_full\":\"Sunday\",\"timezone\":\"Asia/Tokyo\"}";
    static final String BULK = "[{\"unix\":1772366400,\"unix_ms\":1772366400000,\"utc\":\"2026-03-01T12:00:00Z\",\"iso_local\":\"2026-03-01T21:00:00+09:00\",\"rfc2822\":\"Sun, 01 Mar 2026 21:00:00 +0900\",\"human\":\"March 1, 2026, 9:00 PM Asia/Tokyo\",\"day_number\":1,\"day_short\":\"Sun\",\"day_full\":\"Sunday\",\"timezone\":\"Asia/Tokyo\"},{\"item\":\"Bad/Zone\",\"error\":{\"code\":\"INVALID_PARAMETER\",\"message\":\"Invalid timezone.\",\"details\":{\"tz\":\"Bad/Zone\"}},\"request_id\":\"a6116a2e-8809-46e9-99c5-765cf0d50fcb\"}]";
    static final String TIMEZONE = "{\"unix\":1772366400,\"unix_ms\":1772366400000,\"utc\":\"2026-03-01T12:00:00Z\",\"iso_local\":\"2026-03-01T21:00:00+09:00\",\"rfc2822\":\"Sun, 01 Mar 2026 21:00:00 +0900\",\"human\":\"March 1, 2026, 9:00 PM Asia/Tokyo\",\"day_number\":1,\"day_short\":\"Sun\",\"day_full\":\"Sunday\",\"timezone\":\"Asia/Tokyo\",\"offset\":540,\"dst\":false}";
    static final String OFFSET = "{\"unix\":1772366400,\"unix_ms\":1772366400000,\"utc\":\"2026-03-01T12:00:00Z\",\"iso_local\":\"2026-03-01T17:30:00+05:30\",\"rfc2822\":\"Sun, 01 Mar 2026 21:00:00 +0900\",\"human\":\"March 1, 2026, 5:30 PM UTC+05:30\",\"day_number\":1,\"day_short\":\"Sun\",\"day_full\":\"Sunday\",\"timezone\":null,\"offset\":330,\"dst\":false,\"matching_zones\":[{\"timezone\":\"Asia/Colombo\",\"offset\":330,\"dst\":false},{\"timezone\":\"Asia/Kolkata\",\"offset\":330,\"dst\":false}]}";

    static {
        new JSON();
    }

    @Test
    void singleResultIsTimePayload() throws Exception {
        GetCurrentTime200Response value = GetCurrentTime200Response.fromJson(SINGLE);
        assertTrue(value.getActualInstance() instanceof TimePayload);
        assertEquals(1772366400000L, value.getTimePayload().getUnixMs());
        assertEquals("2026-03-01T21:00:00+09:00", value.getTimePayload().getIsoLocal());
        assertEquals(JsonParser.parseString(SINGLE), JsonParser.parseString(value.toJson()));
    }

    @Test
    void bulkResultItemsAreTimePayloadOrBulkError() throws Exception {
        GetCurrentTime200Response value = GetCurrentTime200Response.fromJson(BULK);
        assertTrue(value.getActualInstance() instanceof TimePayloadBulkResponse);
        TimePayloadBulkResponse items = value.getTimePayloadBulkResponse();
        assertEquals(2, items.size());
        assertEquals("Asia/Tokyo", items.get(0).getTimePayload().getTimezone());
        BulkError error = items.get(1).getBulkError();
        assertEquals("Bad/Zone", error.getItem());
        assertEquals("INVALID_PARAMETER", error.getError().getCode().getValue());
        assertEquals("a6116a2e-8809-46e9-99c5-765cf0d50fcb", error.getRequestId());
        assertEquals(JsonParser.parseString(BULK), JsonParser.parseString(value.toJson()));
    }

    @Test
    void timezoneLookupsDecode() throws Exception {
        TimezoneResponse zone = TimezoneResponse.fromJson(TIMEZONE);
        assertEquals("Asia/Tokyo", zone.getTimezone());
        assertEquals(540, zone.getOffset());
        assertTrue(zone.getMatchingZones().isEmpty(), "matchingZones is empty unless the lookup used offset");
        TimezoneResponse offset = TimezoneResponse.fromJson(OFFSET);
        assertNull(offset.getTimezone());
        assertEquals(2, offset.getMatchingZones().size());
        assertEquals("Asia/Kolkata", offset.getMatchingZones().get(1).getTimezone());
        assertEquals(330, offset.getMatchingZones().get(1).getOffset());
        assertFalse(offset.getMatchingZones().get(1).getDst());
    }

    static ApiClient liveClient() {
        String key = System.getenv("TIMELOGIC_SDK_TEST_API_KEY");
        if (key == null || key.isEmpty()) key = System.getenv("TIMELOGIC_API_KEY");
        assumeTrue(key != null && !key.isEmpty(), "set TIMELOGIC_SDK_TEST_API_KEY to run live calls");
        return TransportConfiguration.create(key, false, System.getenv("TIMELOGIC_SDK_TEST_BASE_URL"), null);
    }

    @Test
    void liveEveryOperationDecodes() throws Exception {
        ApiClient client = liveClient();
        TimeApi api = new TimeApi(client);
        assertEquals("America/New_York", api.getCurrentTime("America/New_York", null, null, null, null, null, null, null).getTimePayload().getTimezone());
        TimePayloadBulkResponse bulk = api.getCurrentTime("America/New_York,Europe/London,Bad/Zone", null, null, null, null, null, null, null).getTimePayloadBulkResponse();
        assertEquals(3, bulk.size());
        assertEquals("Europe/London", bulk.get(1).getTimePayload().getTimezone());
        assertEquals("Bad/Zone", bulk.get(2).getBulkError().getItem());
        assertEquals("2026-03-01T21:00:00+09:00", api.convertTime(1772366400L, null, null, null, null, null, null, null, "Asia/Tokyo", null, null, null, null, null, null, null, null).getTimePayload().getIsoLocal());
        TimePayloadBulkResponse converted = api.convertTime(1772366400L, null, null, null, null, null, null, null, null, null, null, null, "+01:00,+02:00", null, null, null, null).getTimePayloadBulkResponse();
        assertEquals("2026-03-01T14:00:00+02:00", converted.get(1).getTimePayload().getIsoLocal());
        TimezoneResponse zone = api.getTimezone("Europe/London", null, null, null, null, null, null, null);
        assertEquals("Europe/London", zone.getTimezone());
        assertTrue(zone.getMatchingZones().isEmpty());
        TimezoneResponse offset = api.getTimezone(null, null, null, null, "+05:30", null, null, null);
        assertNull(offset.getTimezone());
        assertEquals(330, offset.getMatchingZones().get(0).getOffset());
        assertEquals(59, api.diffTime("iso=2026-01-01T00:00:00Z", "iso=2026-03-01T12:00:00Z", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null).getDays());
        assertEquals(60L, api.addTime(0L, null, null, null, null, null, null, null, 60, null, null, null, null, null, null, null, null, null, true, null, null).getUnix());
        assertTrue(api.getCalendar(null, null, null, null, null, null, null, null, "America/New_York", null, null, null, null, null, null, true, null).getWeekNumber() > 0);
        assertTrue(api.getDst("America/New_York", null, null, null, null, null, null, true, null).getNextTransition() != null);
        assertEquals(31, api.getElapsed(null, null, "2026-01-01T00:00:00Z", null, null, null, null, null, null, null, "2026-02-01T00:00:00Z", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null).getDays());
        assertTrue(api.getClock("digital-broadcast", null, null, null, null, null, null, null, null, "UTC", null, null, null, null, null).contains("timelogic-clock"));
        assertEquals("OKP", new UtilityApi(client).getPublicSigningKey(null).getKeys().get(0).getKty().getValue());
    }

    @Test
    void liveApiErrorKeepsCodeAndRequestId() throws Exception {
        TimeApi api = new TimeApi(liveClient());
        ApiException error = assertThrows(ApiException.class, () -> api.getCurrentTime("Bad/Zone", null, null, null, null, null, null, null));
        assertEquals(400, error.getCode());
        com.timelogic.direct.model.ErrorResponse body = com.timelogic.direct.model.ErrorResponse.fromJson(error.getResponseBody());
        assertEquals("INVALID_PARAMETER", body.getError().getCode().getValue());
        assertFalse(body.getRequestId().isEmpty());
    }
}
