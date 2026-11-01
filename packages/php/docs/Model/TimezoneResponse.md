# # TimezoneResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**unix** | **int** |  |
**unixMs** | **int** |  |
**utc** | **\DateTime** |  |
**isoLocal** | **string** |  |
**rfc2822** | **string** |  |
**human** | **string** |  |
**dayNumber** | **int** | Day of the week counted from Sunday (1 &#x3D; Sunday, 2 &#x3D; Monday ... 7 &#x3D; Saturday). |
**dayShort** | **string** |  |
**dayFull** | **string** |  |
**timezone** | **string** |  |
**formatted** | **string** |  | [optional]
**offset** | **int** | UTC offset of the resolved target in minutes, for example &#x60;-240&#x60; for UTC-04:00. |
**dst** | **bool** | Whether daylight saving time is in effect for the resolved target. Always &#x60;false&#x60; for &#x60;offset&#x60; lookups. |
**offsetSeconds** | **int** | Exact UTC offset in seconds. Present only when the resolved offset has a seconds part (historical local mean time); no zone has one at the current instant, so lookups today do not include it. | [optional]
**matchingZones** | [**\TimeLogic\Api\Model\TimezoneMatch[]**](TimezoneMatch.md) | Present only for &#x60;offset&#x3D;&#x60; lookups. The geographic zones whose current offset equals the requested one. &#x60;UTC&#x60; and &#x60;Etc/_*&#x60; zones are intentionally excluded; use &#x60;tz&#x3D;UTC&#x60; for UTC. | [optional]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)
