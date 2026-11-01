# TimeLogic.Api.Model.TimezoneOffsetResponse
Offset-based timezone lookup result with `matching_zones` for the current request-time offset match.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Unix** | **long** |  |
**UnixMs** | **long** |  |
**Utc** | **DateTime** |  |
**IsoLocal** | **string** |  |
**Rfc2822** | **string** |  |
**Human** | **string** |  |
**DayNumber** | **int** | Day of the week counted from Sunday (1 &#x3D; Sunday, 2 &#x3D; Monday ... 7 &#x3D; Saturday). |
**DayShort** | **string** |  |
**DayFull** | **string** |  |
**Timezone** | **string** |  |
**Formatted** | **string** |  | [optional]
**Offset** | **int** |  |
**Dst** | **bool** |  |
**MatchingZones** | [**List&lt;TimezoneMatch&gt;**](TimezoneMatch.md) | For &#x60;offset&#x3D;&#x60; lookups, the geographic zones whose current offset equals the requested one. &#x60;UTC&#x60; and &#x60;Etc/_*&#x60; zones are intentionally excluded; use &#x60;tz&#x3D;UTC&#x60; for UTC. |

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

