
# GetTimezone200Response

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
| **offset** | **kotlin.Int** |  |  |
| **dst** | **kotlin.Boolean** |  |  |
| **matchingZones** | [**kotlin.collections.List&lt;TimezoneMatch&gt;**](TimezoneMatch.md) | For &#x60;offset&#x3D;&#x60; lookups, the geographic zones whose current offset equals the requested one. &#x60;UTC&#x60; and &#x60;Etc/_*&#x60; zones are intentionally excluded; use &#x60;tz&#x3D;UTC&#x60; for UTC. |  |
| **formatted** | **kotlin.String** |  |  [optional] |



