

# TimezoneOffsetResponse

Offset-based timezone lookup result with `matching_zones` for the current request-time offset match.

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**unix** | **Long** |  |  |
|**unixMs** | **Long** |  |  |
|**utc** | **OffsetDateTime** |  |  |
|**isoLocal** | **String** |  |  |
|**rfc2822** | **String** |  |  |
|**human** | **String** |  |  |
|**dayNumber** | **Integer** |  |  |
|**dayShort** | **String** |  |  |
|**dayFull** | **String** |  |  |
|**timezone** | **String** |  |  |
|**formatted** | **String** |  |  [optional] |
|**offset** | **Integer** |  |  |
|**dst** | **Boolean** |  |  |
|**matchingZones** | [**List&lt;TimezoneMatch&gt;**](TimezoneMatch.md) |  |  |



