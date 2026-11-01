

# TimezoneResponse

Timezone lookup result. It is the time payload for the resolved target plus `offset` (minutes east of UTC) and `dst`.  Every selector returns this one shape. `tz`, `ip`, `lat` + `lon` and `auto_tz` lookups resolve a named zone, so `timezone` is set and `matching_zones` is absent. `offset` lookups return `timezone=null` and add `matching_zones`, the geographic zones whose current offset equals the requested one.

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**unix** | **Long** |  |  |
|**unixMs** | **Long** |  |  |
|**utc** | **OffsetDateTime** |  |  |
|**isoLocal** | **String** |  |  |
|**rfc2822** | **String** |  |  |
|**human** | **String** |  |  |
|**dayNumber** | **Integer** | Day of the week counted from Sunday (1 &#x3D; Sunday, 2 &#x3D; Monday ... 7 &#x3D; Saturday). |  |
|**dayShort** | **String** |  |  |
|**dayFull** | **String** |  |  |
|**timezone** | **String** |  |  |
|**formatted** | **String** |  |  [optional] |
|**offset** | **Integer** | UTC offset of the resolved target in minutes, for example &#x60;-240&#x60; for UTC-04:00. |  |
|**dst** | **Boolean** | Whether daylight saving time is in effect for the resolved target. Always &#x60;false&#x60; for &#x60;offset&#x60; lookups. |  |
|**offsetSeconds** | **Integer** | Exact UTC offset in seconds. Present only when the resolved offset has a seconds part (historical local mean time); no zone has one at the current instant, so lookups today do not include it. |  [optional] |
|**matchingZones** | [**List&lt;TimezoneMatch&gt;**](TimezoneMatch.md) | Present only for &#x60;offset&#x3D;&#x60; lookups. The geographic zones whose current offset equals the requested one. &#x60;UTC&#x60; and &#x60;Etc/_*&#x60; zones are intentionally excluded; use &#x60;tz&#x3D;UTC&#x60; for UTC. |  [optional] |



