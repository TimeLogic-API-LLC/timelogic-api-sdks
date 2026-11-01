# # CalendarResponse

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
**year** | **int** |  |
**month** | **int** |  |
**monthName** | **string** |  |
**day** | **int** |  |
**weekNumber** | **int** | ISO 8601 week number (present with &#x60;week&#x3D;true&#x60;). It belongs to the ISO week-year, which is not returned and can differ from &#x60;year&#x60; near January 1 (2027-01-01 is week 53 of 2026). | [optional]

[[Back to Model list]](../../README.md#models) [[Back to API list]](../../README.md#endpoints) [[Back to README]](../../README.md)
