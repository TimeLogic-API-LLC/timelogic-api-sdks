package com.timelogic.direct.worldtimeapi;

/** The 404 {@code {"error":"unknown location"}} answer. */
public class WorldTimeApiUnknownLocationException extends WorldTimeApiException {
    private static final long serialVersionUID = 1L;

    public WorldTimeApiUnknownLocationException(int status, String error, String code, String body) {
        super(status, error, code, body);
    }
}
