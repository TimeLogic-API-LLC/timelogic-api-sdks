# GetTimezone200Response

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**unix** | **Int64** |  |
**unixMs** | **Int64** |  |
**utc** | **Date** |  |
**isoLocal** | **String** |  |
**rfc2822** | **String** |  |
**human** | **String** |  |
**dayNumber** | **Int** | Day of the week counted from Sunday (1 &#x3D; Sunday, 2 &#x3D; Monday ... 7 &#x3D; Saturday). |
**dayShort** | **String** |  |
**dayFull** | **String** |  |
**timezone** | **String** |  |
**formatted** | **String** |  | [optional]
**offset** | **Int** |  |
**dst** | **Bool** |  |
**matchingZones** | [TimezoneMatch] | For &#x60;offset&#x3D;&#x60; lookups, the geographic zones whose current offset equals the requested one. &#x60;UTC&#x60; and &#x60;Etc/_*&#x60; zones are intentionally excluded; use &#x60;tz&#x3D;UTC&#x60; for UTC. |

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


