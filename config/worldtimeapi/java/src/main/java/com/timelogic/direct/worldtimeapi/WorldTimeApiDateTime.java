package com.timelogic.direct.worldtimeapi;

import com.google.gson.annotations.SerializedName;

/**
 * Time object returned by {@code /api/timezone/{zone}} and {@code /api/ip}, with the
 * worldtimeapi.org field names (JSON) and types.
 */
public class WorldTimeApiDateTime {
    @SerializedName("abbreviation") private String abbreviation;
    @SerializedName("client_ip") private String clientIp;
    @SerializedName("datetime") private String datetime;
    @SerializedName("day_of_week") private int dayOfWeek;
    @SerializedName("day_of_year") private int dayOfYear;
    @SerializedName("dst") private boolean dst;
    @SerializedName("dst_from") private String dstFrom;
    @SerializedName("dst_offset") private int dstOffset;
    @SerializedName("dst_until") private String dstUntil;
    @SerializedName("raw_offset") private int rawOffset;
    @SerializedName("timezone") private String timezone;
    @SerializedName("unixtime") private long unixtime;
    @SerializedName("utc_datetime") private String utcDatetime;
    @SerializedName("utc_offset") private String utcOffset;
    @SerializedName("week_number") private int weekNumber;

    /** {@code abbreviation} */
    public String getAbbreviation() { return abbreviation; }
    /** {@code client_ip} */
    public String getClientIp() { return clientIp; }
    /** {@code datetime} */
    public String getDatetime() { return datetime; }
    /** {@code day_of_week} */
    public int getDayOfWeek() { return dayOfWeek; }
    /** {@code day_of_year} */
    public int getDayOfYear() { return dayOfYear; }
    /** {@code dst} */
    public boolean isDst() { return dst; }
    /** {@code dst_from}, or null outside daylight-saving time. */
    public String getDstFrom() { return dstFrom; }
    /** {@code dst_offset} */
    public int getDstOffset() { return dstOffset; }
    /** {@code dst_until}, or null outside daylight-saving time. */
    public String getDstUntil() { return dstUntil; }
    /** {@code raw_offset} */
    public int getRawOffset() { return rawOffset; }
    /** {@code timezone} */
    public String getTimezone() { return timezone; }
    /** {@code unixtime} */
    public long getUnixtime() { return unixtime; }
    /** {@code utc_datetime} */
    public String getUtcDatetime() { return utcDatetime; }
    /** {@code utc_offset} */
    public String getUtcOffset() { return utcOffset; }
    /** {@code week_number} */
    public int getWeekNumber() { return weekNumber; }
}
