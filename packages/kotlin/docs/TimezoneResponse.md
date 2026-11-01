
# TimezoneResponse

## Properties
| Name | Type | Description | Notes |
| ------------ | ------------- | ------------- | ------------- |
| **unix** | **kotlin.Long** |  |  |
| **unixMs** | **kotlin.Long** |  |  |
| **utc** | [**java.time.OffsetDateTime**](java.time.OffsetDateTime.md) |  |  |
| **isoLocal** | **kotlin.String** |  |  |
| **rfc2822** | **kotlin.String** |  |  |
| **human** | **kotlin.String** |  |  |
| **dayNumber** | **kotlin.Int** | Day of the week counted from Sunday (1 &#x3D; Sunday, 2 &#x3D; Monday ... 7 &#x3D; Saturday). |  |
| **dayShort** | **kotlin.String** |  |  |
| **dayFull** | **kotlin.String** |  |  |
| **timezone** | **kotlin.String** |  |  |
| **offset** | **kotlin.Int** | UTC offset of the resolved target in minutes, for example &#x60;-240&#x60; for UTC-04:00. |  |
| **dst** | **kotlin.Boolean** | Whether daylight saving time is in effect for the resolved target. Always &#x60;false&#x60; for &#x60;offset&#x60; lookups. |  |
| **formatted** | **kotlin.String** |  |  [optional] |
| **offsetSeconds** | **kotlin.Int** | Exact UTC offset in seconds. Present only when the resolved offset has a seconds part (historical local mean time); no zone has one at the current instant, so lookups today do not include it. |  [optional] |
| **matchingZones** | [**kotlin.collections.List&lt;TimezoneMatch&gt;**](TimezoneMatch.md) | Present only for &#x60;offset&#x3D;&#x60; lookups. The geographic zones whose current offset equals the requested one. &#x60;UTC&#x60; and &#x60;Etc/_*&#x60; zones are intentionally excluded; use &#x60;tz&#x3D;UTC&#x60; for UTC. |  [optional] |



