package com.timelogic.direct;

import com.timelogic.direct.auth.ApiKeyAuth;
import com.timelogic.direct.auth.HttpBearerAuth;

public final class TransportConfiguration {
    public static final String DEFAULT_API_BASE_URL = "https://api.timelogicapi.com";
    public static final String DEFAULT_RAPID_API_HOST = "timelogic-api-world-time-timezones-time-calculations.p.rapidapi.com";
    public static final String DEFAULT_RAPID_API_BASE_URL = "https://" + DEFAULT_RAPID_API_HOST;

    private TransportConfiguration() {}

    public static ApiClient create(String apiKey, boolean rapidApi, String baseUrl, String rapidApiHost) {
        if (apiKey == null || apiKey.trim().isEmpty()) throw new IllegalArgumentException("apiKey is required");
        String host = rapidApiHost == null || rapidApiHost.trim().isEmpty() ? DEFAULT_RAPID_API_HOST : rapidApiHost.trim();
        ApiClient client = new ApiClient().setBasePath(baseUrl == null || baseUrl.trim().isEmpty()
                ? (rapidApi ? "https://" + host : DEFAULT_API_BASE_URL)
                : baseUrl.replaceAll("/+$", ""));
        if (rapidApi) {
            ((ApiKeyAuth) client.getAuthentication("rapidApiKey")).setApiKey(apiKey.trim());
            ((ApiKeyAuth) client.getAuthentication("rapidApiHost")).setApiKey(host);
        } else {
            ((HttpBearerAuth) client.getAuthentication("bearerAuth")).setBearerToken(apiKey.trim());
        }
        return client;
    }
}
