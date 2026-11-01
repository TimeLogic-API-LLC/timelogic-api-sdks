package com.timelogic.direct.worldtimeapi;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import okhttp3.HttpUrl;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.ResponseBody;

/**
 * Client for the TimeLogic API WorldTimeAPI-compatible routes ({@code /api/*}).
 *
 * <p>Contract: openapi/openapi-worldtimeapi.yaml. The routes answer the same paths, field
 * names and plain-text variants as worldtimeapi.org; a TimeLogic API key is required and is
 * sent as the {@code X-API-Key} header.
 *
 * <p>This class is self-contained: it does not use or change the generated {@code /v1}
 * {@code ApiClient}, {@code Configuration} or {@code TransportConfiguration}.
 *
 * <pre>{@code
 * WorldTimeApiClient wta = new WorldTimeApiClient(System.getenv("TIMELOGIC_API_KEY"));
 * WorldTimeApiDateTime now = wta.getTimezone("Europe/London");
 * }</pre>
 */
public class WorldTimeApiClient {
    /** Default host for the WorldTimeAPI-compatible routes. */
    public static final String DEFAULT_BASE_URL = "https://api.timelogicapi.com";

    private static final Gson GSON = new Gson();
    private static final Type STRING_LIST = new TypeToken<List<String>>() {}.getType();

    private final String apiKey;
    private final String baseUrl;
    private final boolean sign;
    private final OkHttpClient httpClient;

    public WorldTimeApiClient(String apiKey) {
        this(apiKey, DEFAULT_BASE_URL, false, null);
    }

    /**
     * @param apiKey TimeLogic API key, sent as the X-API-Key header
     * @param baseUrl host, defaults to https://api.timelogicapi.com when null
     * @param sign adds sign=true so responses carry detached signature headers
     * @param httpClient OkHttp client to use, or null for a default one
     */
    public WorldTimeApiClient(String apiKey, String baseUrl, boolean sign, OkHttpClient httpClient) {
        if (apiKey == null || apiKey.isEmpty()) {
            throw new IllegalArgumentException("apiKey is required");
        }
        this.apiKey = apiKey;
        String base = baseUrl == null ? DEFAULT_BASE_URL : baseUrl;
        while (base.endsWith("/")) {
            base = base.substring(0, base.length() - 1);
        }
        this.baseUrl = base;
        this.sign = sign;
        this.httpClient = httpClient != null ? httpClient : new OkHttpClient.Builder()
                .followRedirects(false)
                .followSslRedirects(false)
                .callTimeout(30, TimeUnit.SECONDS)
                .build();
    }

    /** GET /api/timezone */
    public List<String> listTimezones() throws WorldTimeApiException, IOException {
        return GSON.fromJson(getText(segments("timezone"), false), STRING_LIST);
    }

    /** GET /api/timezone.txt */
    public String listTimezonesText() throws WorldTimeApiException, IOException {
        return getText(segments("timezone"), true);
    }

    /** GET /api/timezone/{area} */
    public List<String> listTimezonesInArea(String area) throws WorldTimeApiException, IOException {
        String body = getText(zoneSegments(area), false);
        JsonElement parsed = JsonParser.parseString(body);
        if (!parsed.isJsonArray()) {
            throw new WorldTimeApiException(200, area + " is a timezone, not an area; use getTimezone", null, body);
        }
        return GSON.fromJson(parsed, STRING_LIST);
    }

    /** GET /api/timezone/{area}.txt */
    public String listTimezonesInAreaText(String area) throws WorldTimeApiException, IOException {
        return getText(zoneSegments(area), true);
    }

    /** GET /api/timezone/{area}/{location}[/{region}], or a one-word zone such as UTC. */
    public WorldTimeApiDateTime getTimezone(String timezone) throws WorldTimeApiException, IOException {
        return GSON.fromJson(getText(zoneSegments(timezone), false), WorldTimeApiDateTime.class);
    }

    /** Plain-text variant of {@link #getTimezone(String)}. */
    public String getTimezoneText(String timezone) throws WorldTimeApiException, IOException {
        return getText(zoneSegments(timezone), true);
    }

    /** GET /api/ip (the caller's address) when ip is null, else /api/ip/{ip}. */
    public WorldTimeApiDateTime getIp(String ip) throws WorldTimeApiException, IOException {
        return GSON.fromJson(getText(ipSegments(ip), false), WorldTimeApiDateTime.class);
    }

    /** GET /api/ip for the caller's address. */
    public WorldTimeApiDateTime getIp() throws WorldTimeApiException, IOException {
        return getIp(null);
    }

    /** Plain-text variant of {@link #getIp(String)}. */
    public String getIpText(String ip) throws WorldTimeApiException, IOException {
        return getText(ipSegments(ip), true);
    }

    /** Plain-text variant of {@link #getIp()}. */
    public String getIpText() throws WorldTimeApiException, IOException {
        return getIpText(null);
    }

    /**
     * GET any /api/* path given as segments after "api" (the last one may end in .txt) and
     * return status, headers and body without throwing for non-2xx answers.
     */
    public WorldTimeApiRawResponse requestRaw(List<String> pathSegments, boolean text) throws IOException {
        HttpUrl base = HttpUrl.parse(baseUrl);
        if (base == null) {
            throw new IllegalArgumentException("invalid baseUrl: " + baseUrl);
        }
        HttpUrl.Builder url = base.newBuilder().addPathSegment("api");
        for (int i = 0; i < pathSegments.size(); i++) {
            String segment = pathSegments.get(i);
            url.addPathSegment(text && i == pathSegments.size() - 1 ? segment + ".txt" : segment);
        }
        if (sign) {
            url.addQueryParameter("sign", "true");
        }
        Request request = new Request.Builder()
                .url(url.build())
                .get()
                .header("X-API-Key", apiKey)
                .header("Accept", text ? "text/plain" : "application/json")
                .build();
        try (Response response = httpClient.newCall(request).execute()) {
            ResponseBody body = response.body();
            Map<String, List<String>> headers = new LinkedHashMap<String, List<String>>();
            for (String name : response.headers().names()) {
                headers.put(name.toLowerCase(Locale.ROOT), response.headers(name));
            }
            return new WorldTimeApiRawResponse(response.code(), headers, body == null ? "" : body.string());
        }
    }

    /** Parses a non-2xx answer. */
    public static WorldTimeApiException errorFromResponse(int status, String body) {
        String message = body == null ? "" : body.trim();
        String code = null;
        if (message.startsWith("Error:")) {
            message = message.substring("Error:".length()).trim();
        } else {
            try {
                JsonElement parsed = JsonParser.parseString(body);
                if (parsed.isJsonObject() && parsed.getAsJsonObject().has("error")) {
                    JsonElement error = parsed.getAsJsonObject().get("error");
                    if (error.isJsonPrimitive()) {
                        message = error.getAsString();
                    } else if (error.isJsonObject()) {
                        JsonObject nested = error.getAsJsonObject();
                        message = nested.has("message") ? nested.get("message").getAsString() : "";
                        code = nested.has("code") ? nested.get("code").getAsString() : null;
                    }
                }
            } catch (RuntimeException ignored) {
                // keep the raw body as the message
            }
        }
        if (status == 404 && "unknown location".equals(message)) {
            return new WorldTimeApiUnknownLocationException(status, message, code, body);
        }
        return new WorldTimeApiException(status, message, code, body);
    }

    private String getText(List<String> pathSegments, boolean text) throws WorldTimeApiException, IOException {
        WorldTimeApiRawResponse raw = requestRaw(pathSegments, text);
        if (raw.getStatus() < 200 || raw.getStatus() > 299) {
            throw errorFromResponse(raw.getStatus(), raw.getBody());
        }
        return raw.getBody();
    }

    private static List<String> segments(String... values) {
        List<String> result = new ArrayList<String>();
        for (String value : values) {
            result.add(value);
        }
        return result;
    }

    private static List<String> zoneSegments(String timezone) {
        List<String> result = segments("timezone");
        int count = 0;
        for (String part : String.valueOf(timezone).split("/")) {
            if (!part.isEmpty()) {
                result.add(part);
                count++;
            }
        }
        if (count < 1 || count > 3) {
            throw new IllegalArgumentException("timezone must have one to three segments, for example \"Europe/London\"");
        }
        return result;
    }

    private static List<String> ipSegments(String ip) {
        List<String> result = segments("ip");
        if (ip != null && !ip.isEmpty()) {
            result.add(ip);
        }
        return result;
    }
}
