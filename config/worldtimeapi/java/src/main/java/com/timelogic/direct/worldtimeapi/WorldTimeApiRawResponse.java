package com.timelogic.direct.worldtimeapi;

import java.util.Collections;
import java.util.List;
import java.util.Map;

/** HTTP answer, including the X-TimeLogic-Signature* headers when signing is enabled. */
public class WorldTimeApiRawResponse {
    private final int status;
    private final Map<String, List<String>> headers;
    private final String body;

    public WorldTimeApiRawResponse(int status, Map<String, List<String>> headers, String body) {
        this.status = status;
        this.headers = Collections.unmodifiableMap(headers);
        this.body = body;
    }

    public int getStatus() { return status; }

    /** Header names are lower-case. */
    public Map<String, List<String>> getHeaders() { return headers; }

    /** First value of a header (case-insensitive), or null. */
    public String getHeader(String name) {
        List<String> values = headers.get(name.toLowerCase(java.util.Locale.ROOT));
        return values == null || values.isEmpty() ? null : values.get(0);
    }

    public String getBody() { return body; }
}
