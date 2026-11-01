package com.timelogic.direct.worldtimeapi;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assumptions.assumeTrue;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.sun.net.httpserver.HttpServer;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;

class WorldTimeApiClientTest {
    static final String LONDON = "{\"utc_offset\":\"+00:00\",\"timezone\":\"Europe/London\",\"day_of_week\":0,\"day_of_year\":305,"
            + "\"datetime\":\"2026-11-01T03:34:38.413000+00:00\",\"utc_datetime\":\"2026-11-01T03:34:38.413000+00:00\","
            + "\"unixtime\":1793504078,\"raw_offset\":0,\"week_number\":44,\"dst\":false,\"abbreviation\":\"GMT\","
            + "\"dst_offset\":0,\"dst_from\":null,\"dst_until\":null,\"client_ip\":\"203.0.113.7\"}";

    private HttpServer server;
    private final List<String> paths = new ArrayList<String>();
    private final List<String> keys = new ArrayList<String>();
    private final List<String> queries = new ArrayList<String>();

    private WorldTimeApiClient start(final Map<String, Object[]> routes, boolean sign) throws Exception {
        server = HttpServer.create(new InetSocketAddress("127.0.0.1", 0), 0);
        server.createContext("/", exchange -> {
            String path = exchange.getRequestURI().getRawPath();
            paths.add(path);
            keys.add(exchange.getRequestHeaders().getFirst("X-API-Key"));
            queries.add(exchange.getRequestURI().getRawQuery());
            Object[] route = routes.containsKey(path) ? routes.get(path) : new Object[] {404, "{\"error\":\"not found\"}"};
            byte[] body = ((String) route[1]).getBytes(StandardCharsets.UTF_8);
            exchange.getResponseHeaders().add("X-TimeLogic-Signature", "sig");
            exchange.sendResponseHeaders((Integer) route[0], body.length);
            try (OutputStream out = exchange.getResponseBody()) {
                out.write(body);
            }
        });
        server.start();
        return new WorldTimeApiClient("test-key", "http://127.0.0.1:" + server.getAddress().getPort() + "/", sign, null);
    }

    @AfterEach
    void stop() {
        if (server != null) {
            server.stop(0);
        }
    }

    private static Map<String, Object[]> routes(Object... pairs) {
        Map<String, Object[]> result = new HashMap<String, Object[]>();
        for (int i = 0; i < pairs.length; i += 3) {
            result.put((String) pairs[i], new Object[] {pairs[i + 1], pairs[i + 2]});
        }
        return result;
    }

    @Test
    void getTimezoneReturnsTheFifteenFields() throws Exception {
        WorldTimeApiClient client = start(routes("/api/timezone/Europe/London", 200, LONDON), false);
        WorldTimeApiDateTime value = client.getTimezone("Europe/London");
        assertEquals("Europe/London", value.getTimezone());
        assertEquals("GMT", value.getAbbreviation());
        assertEquals("203.0.113.7", value.getClientIp());
        assertEquals(1793504078L, value.getUnixtime());
        assertEquals(305, value.getDayOfYear());
        assertEquals(44, value.getWeekNumber());
        assertFalse(value.isDst());
        assertNull(value.getDstFrom());
        assertEquals("+00:00", value.getUtcOffset());
        assertEquals("test-key", keys.get(0));
        JsonObject json = JsonParser.parseString(LONDON).getAsJsonObject();
        assertEquals(15, json.size());
        assertEquals(15, WorldTimeApiDateTime.class.getDeclaredFields().length);
    }

    @Test
    void usesTheWorldTimeApiPaths() throws Exception {
        WorldTimeApiClient client = start(routes(
                "/api/timezone", 200, "[\"Europe/London\",\"UTC\"]",
                "/api/timezone.txt", 200, "Europe/London\nUTC",
                "/api/timezone/Europe", 200, "[\"Europe/London\"]",
                "/api/timezone/Europe.txt", 200, "Europe/London",
                "/api/timezone/America/Argentina/Salta", 200, LONDON,
                "/api/timezone/Europe/London.txt", 200, "abbreviation: GMT",
                "/api/ip", 200, LONDON,
                "/api/ip/8.8.8.8", 200, LONDON,
                "/api/ip.txt", 200, "abbreviation: GMT",
                "/api/ip/8.8.8.8.txt", 200, "abbreviation: GMT"), false);
        assertEquals(Arrays.asList("Europe/London", "UTC"), client.listTimezones());
        assertEquals("Europe/London\nUTC", client.listTimezonesText());
        assertEquals(Arrays.asList("Europe/London"), client.listTimezonesInArea("Europe"));
        assertEquals("Europe/London", client.listTimezonesInAreaText("Europe"));
        assertEquals("Europe/London", client.getTimezone("America/Argentina/Salta").getTimezone());
        assertEquals("abbreviation: GMT", client.getTimezoneText("Europe/London"));
        assertEquals("Europe/London", client.getIp().getTimezone());
        assertEquals("Europe/London", client.getIp("8.8.8.8").getTimezone());
        assertEquals("abbreviation: GMT", client.getIpText());
        assertEquals("abbreviation: GMT", client.getIpText("8.8.8.8"));
        assertEquals(10, paths.size());
    }

    @Test
    void unknownLocationIsItsOwnException() throws Exception {
        WorldTimeApiClient client = start(routes(
                "/api/timezone/Nowhere/Land", 404, "{\"error\":\"unknown location\"}",
                "/api/timezone/Nowhere/Land.txt", 404, "Error: unknown location",
                "/api/ip/999.1.1.1", 404, "{\"error\":\"malformed ip\"}"), false);
        WorldTimeApiUnknownLocationException e = assertThrows(WorldTimeApiUnknownLocationException.class,
                () -> client.getTimezone("Nowhere/Land"));
        assertTrue(e.isUnknownLocation());
        assertEquals(404, e.getStatus());
        assertThrows(WorldTimeApiUnknownLocationException.class, () -> client.getTimezoneText("Nowhere/Land"));
        WorldTimeApiException ip = assertThrows(WorldTimeApiException.class, () -> client.getIp("999.1.1.1"));
        assertTrue(ip.isMalformedIp());
    }

    @Test
    void authErrorsKeepTheTimeLogicCode() throws Exception {
        WorldTimeApiClient client = start(routes("/api/timezone/UTC", 401,
                "{\"error\":{\"code\":\"UNAUTHORIZED\",\"message\":\"Missing API key credentials.\"}}"), false);
        WorldTimeApiException e = assertThrows(WorldTimeApiException.class, () -> client.getTimezone("UTC"));
        assertEquals(401, e.getStatus());
        assertEquals("UNAUTHORIZED", e.getCode());
        assertFalse(e.isUnknownLocation());
    }

    @Test
    void signAddsTheQueryAndRawExposesHeaders() throws Exception {
        WorldTimeApiClient client = start(routes("/api/timezone/Europe/London", 200, LONDON), true);
        WorldTimeApiRawResponse raw = client.requestRaw(Arrays.asList("timezone", "Europe", "London"), false);
        assertEquals("sign=true", queries.get(0));
        assertEquals("sig", raw.getHeader("X-TimeLogic-Signature"));
    }

    @Test
    void liveSmokeTest() throws Exception {
        String key = System.getenv("TIMELOGIC_API_KEY");
        assumeTrue(key != null && !key.isEmpty(), "TIMELOGIC_API_KEY is not set");
        WorldTimeApiClient client = new WorldTimeApiClient(key);
        assertEquals("Europe/London", client.getTimezone("Europe/London").getTimezone());
        assertThrows(WorldTimeApiUnknownLocationException.class, () -> client.getTimezone("Nowhere/Land"));
    }
}
