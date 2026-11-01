package com.timelogic.direct.worldtimeapi;

/**
 * Thrown for any non-2xx answer from a WorldTimeAPI-compatible route. {@link #getError()}
 * is the worldtimeapi.org-style message (for example {@code unknown location}) or the
 * TimeLogic message for authentication and quota errors.
 */
public class WorldTimeApiException extends Exception {
    private static final long serialVersionUID = 1L;

    private final int status;
    private final String error;
    private final String code;
    private final String body;

    public WorldTimeApiException(int status, String error, String code, String body) {
        super("WorldTimeAPI-compatible request failed (" + status + "): " + error);
        this.status = status;
        this.error = error;
        this.code = code;
        this.body = body;
    }

    public int getStatus() { return status; }

    public String getError() { return error; }

    /** TimeLogic error code (for example {@code UNAUTHORIZED}), or null. */
    public String getCode() { return code; }

    public String getBody() { return body; }

    /** True for the 404 {@code {"error":"unknown location"}} answer. */
    public boolean isUnknownLocation() { return status == 404 && "unknown location".equals(error); }

    /** True for the 404 {@code {"error":"malformed ip"}} answer. */
    public boolean isMalformedIp() { return status == 404 && "malformed ip".equals(error); }
}
