# TimezoneResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Unix** | **int64** |  |
**UnixMs** | **int64** |  |
**Utc** | **time.Time** |  |
**IsoLocal** | **NullableString** |  |
**Rfc2822** | **string** |  |
**Human** | **string** |  |
**DayNumber** | **int32** | Day of the week counted from Sunday (1 &#x3D; Sunday, 2 &#x3D; Monday ... 7 &#x3D; Saturday). |
**DayShort** | **string** |  |
**DayFull** | **string** |  |
**Timezone** | **NullableString** |  |
**Formatted** | Pointer to **string** |  | [optional]
**Offset** | **int32** | UTC offset of the resolved target in minutes, for example &#x60;-240&#x60; for UTC-04:00. |
**Dst** | **bool** | Whether daylight saving time is in effect for the resolved target. Always &#x60;false&#x60; for &#x60;offset&#x60; lookups. |
**OffsetSeconds** | Pointer to **int32** | Exact UTC offset in seconds. Present only when the resolved offset has a seconds part (historical local mean time); no zone has one at the current instant, so lookups today do not include it. | [optional]
**MatchingZones** | Pointer to [**[]TimezoneMatch**](TimezoneMatch.md) | Present only for &#x60;offset&#x3D;&#x60; lookups. The geographic zones whose current offset equals the requested one. &#x60;UTC&#x60; and &#x60;Etc/_*&#x60; zones are intentionally excluded; use &#x60;tz&#x3D;UTC&#x60; for UTC. | [optional]

## Methods

### NewTimezoneResponse

`func NewTimezoneResponse(unix int64, unixMs int64, utc time.Time, isoLocal NullableString, rfc2822 string, human string, dayNumber int32, dayShort string, dayFull string, timezone NullableString, offset int32, dst bool, ) *TimezoneResponse`

NewTimezoneResponse instantiates a new TimezoneResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewTimezoneResponseWithDefaults

`func NewTimezoneResponseWithDefaults() *TimezoneResponse`

NewTimezoneResponseWithDefaults instantiates a new TimezoneResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetUnix

`func (o *TimezoneResponse) GetUnix() int64`

GetUnix returns the Unix field if non-nil, zero value otherwise.

### GetUnixOk

`func (o *TimezoneResponse) GetUnixOk() (*int64, bool)`

GetUnixOk returns a tuple with the Unix field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUnix

`func (o *TimezoneResponse) SetUnix(v int64)`

SetUnix sets Unix field to given value.


### GetUnixMs

`func (o *TimezoneResponse) GetUnixMs() int64`

GetUnixMs returns the UnixMs field if non-nil, zero value otherwise.

### GetUnixMsOk

`func (o *TimezoneResponse) GetUnixMsOk() (*int64, bool)`

GetUnixMsOk returns a tuple with the UnixMs field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUnixMs

`func (o *TimezoneResponse) SetUnixMs(v int64)`

SetUnixMs sets UnixMs field to given value.


### GetUtc

`func (o *TimezoneResponse) GetUtc() time.Time`

GetUtc returns the Utc field if non-nil, zero value otherwise.

### GetUtcOk

`func (o *TimezoneResponse) GetUtcOk() (*time.Time, bool)`

GetUtcOk returns a tuple with the Utc field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUtc

`func (o *TimezoneResponse) SetUtc(v time.Time)`

SetUtc sets Utc field to given value.


### GetIsoLocal

`func (o *TimezoneResponse) GetIsoLocal() string`

GetIsoLocal returns the IsoLocal field if non-nil, zero value otherwise.

### GetIsoLocalOk

`func (o *TimezoneResponse) GetIsoLocalOk() (*string, bool)`

GetIsoLocalOk returns a tuple with the IsoLocal field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsoLocal

`func (o *TimezoneResponse) SetIsoLocal(v string)`

SetIsoLocal sets IsoLocal field to given value.


### SetIsoLocalNil

`func (o *TimezoneResponse) SetIsoLocalNil(b bool)`

 SetIsoLocalNil sets the value for IsoLocal to be an explicit nil

### UnsetIsoLocal
`func (o *TimezoneResponse) UnsetIsoLocal()`

UnsetIsoLocal ensures that no value is present for IsoLocal, not even an explicit nil
### GetRfc2822

`func (o *TimezoneResponse) GetRfc2822() string`

GetRfc2822 returns the Rfc2822 field if non-nil, zero value otherwise.

### GetRfc2822Ok

`func (o *TimezoneResponse) GetRfc2822Ok() (*string, bool)`

GetRfc2822Ok returns a tuple with the Rfc2822 field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRfc2822

`func (o *TimezoneResponse) SetRfc2822(v string)`

SetRfc2822 sets Rfc2822 field to given value.


### GetHuman

`func (o *TimezoneResponse) GetHuman() string`

GetHuman returns the Human field if non-nil, zero value otherwise.

### GetHumanOk

`func (o *TimezoneResponse) GetHumanOk() (*string, bool)`

GetHumanOk returns a tuple with the Human field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetHuman

`func (o *TimezoneResponse) SetHuman(v string)`

SetHuman sets Human field to given value.


### GetDayNumber

`func (o *TimezoneResponse) GetDayNumber() int32`

GetDayNumber returns the DayNumber field if non-nil, zero value otherwise.

### GetDayNumberOk

`func (o *TimezoneResponse) GetDayNumberOk() (*int32, bool)`

GetDayNumberOk returns a tuple with the DayNumber field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDayNumber

`func (o *TimezoneResponse) SetDayNumber(v int32)`

SetDayNumber sets DayNumber field to given value.


### GetDayShort

`func (o *TimezoneResponse) GetDayShort() string`

GetDayShort returns the DayShort field if non-nil, zero value otherwise.

### GetDayShortOk

`func (o *TimezoneResponse) GetDayShortOk() (*string, bool)`

GetDayShortOk returns a tuple with the DayShort field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDayShort

`func (o *TimezoneResponse) SetDayShort(v string)`

SetDayShort sets DayShort field to given value.


### GetDayFull

`func (o *TimezoneResponse) GetDayFull() string`

GetDayFull returns the DayFull field if non-nil, zero value otherwise.

### GetDayFullOk

`func (o *TimezoneResponse) GetDayFullOk() (*string, bool)`

GetDayFullOk returns a tuple with the DayFull field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDayFull

`func (o *TimezoneResponse) SetDayFull(v string)`

SetDayFull sets DayFull field to given value.


### GetTimezone

`func (o *TimezoneResponse) GetTimezone() string`

GetTimezone returns the Timezone field if non-nil, zero value otherwise.

### GetTimezoneOk

`func (o *TimezoneResponse) GetTimezoneOk() (*string, bool)`

GetTimezoneOk returns a tuple with the Timezone field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTimezone

`func (o *TimezoneResponse) SetTimezone(v string)`

SetTimezone sets Timezone field to given value.


### SetTimezoneNil

`func (o *TimezoneResponse) SetTimezoneNil(b bool)`

 SetTimezoneNil sets the value for Timezone to be an explicit nil

### UnsetTimezone
`func (o *TimezoneResponse) UnsetTimezone()`

UnsetTimezone ensures that no value is present for Timezone, not even an explicit nil
### GetFormatted

`func (o *TimezoneResponse) GetFormatted() string`

GetFormatted returns the Formatted field if non-nil, zero value otherwise.

### GetFormattedOk

`func (o *TimezoneResponse) GetFormattedOk() (*string, bool)`

GetFormattedOk returns a tuple with the Formatted field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFormatted

`func (o *TimezoneResponse) SetFormatted(v string)`

SetFormatted sets Formatted field to given value.

### HasFormatted

`func (o *TimezoneResponse) HasFormatted() bool`

HasFormatted returns a boolean if a field has been set.

### GetOffset

`func (o *TimezoneResponse) GetOffset() int32`

GetOffset returns the Offset field if non-nil, zero value otherwise.

### GetOffsetOk

`func (o *TimezoneResponse) GetOffsetOk() (*int32, bool)`

GetOffsetOk returns a tuple with the Offset field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOffset

`func (o *TimezoneResponse) SetOffset(v int32)`

SetOffset sets Offset field to given value.


### GetDst

`func (o *TimezoneResponse) GetDst() bool`

GetDst returns the Dst field if non-nil, zero value otherwise.

### GetDstOk

`func (o *TimezoneResponse) GetDstOk() (*bool, bool)`

GetDstOk returns a tuple with the Dst field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDst

`func (o *TimezoneResponse) SetDst(v bool)`

SetDst sets Dst field to given value.


### GetOffsetSeconds

`func (o *TimezoneResponse) GetOffsetSeconds() int32`

GetOffsetSeconds returns the OffsetSeconds field if non-nil, zero value otherwise.

### GetOffsetSecondsOk

`func (o *TimezoneResponse) GetOffsetSecondsOk() (*int32, bool)`

GetOffsetSecondsOk returns a tuple with the OffsetSeconds field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOffsetSeconds

`func (o *TimezoneResponse) SetOffsetSeconds(v int32)`

SetOffsetSeconds sets OffsetSeconds field to given value.

### HasOffsetSeconds

`func (o *TimezoneResponse) HasOffsetSeconds() bool`

HasOffsetSeconds returns a boolean if a field has been set.

### GetMatchingZones

`func (o *TimezoneResponse) GetMatchingZones() []TimezoneMatch`

GetMatchingZones returns the MatchingZones field if non-nil, zero value otherwise.

### GetMatchingZonesOk

`func (o *TimezoneResponse) GetMatchingZonesOk() (*[]TimezoneMatch, bool)`

GetMatchingZonesOk returns a tuple with the MatchingZones field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMatchingZones

`func (o *TimezoneResponse) SetMatchingZones(v []TimezoneMatch)`

SetMatchingZones sets MatchingZones field to given value.

### HasMatchingZones

`func (o *TimezoneResponse) HasMatchingZones() bool`

HasMatchingZones returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


