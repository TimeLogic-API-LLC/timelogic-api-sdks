# TimezoneOffsetResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Unix** | **int64** |  |
**UnixMs** | **int64** |  |
**Utc** | **time.Time** |  |
**IsoLocal** | **NullableString** |  |
**Rfc2822** | **string** |  |
**Human** | **string** |  |
**DayNumber** | **int32** |  |
**DayShort** | **string** |  |
**DayFull** | **string** |  |
**Timezone** | **NullableString** |  |
**Formatted** | Pointer to **string** |  | [optional]
**Offset** | **int32** |  |
**Dst** | **bool** |  |
**MatchingZones** | [**[]TimezoneMatch**](TimezoneMatch.md) |  |

## Methods

### NewTimezoneOffsetResponse

`func NewTimezoneOffsetResponse(unix int64, unixMs int64, utc time.Time, isoLocal NullableString, rfc2822 string, human string, dayNumber int32, dayShort string, dayFull string, timezone NullableString, offset int32, dst bool, matchingZones []TimezoneMatch, ) *TimezoneOffsetResponse`

NewTimezoneOffsetResponse instantiates a new TimezoneOffsetResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewTimezoneOffsetResponseWithDefaults

`func NewTimezoneOffsetResponseWithDefaults() *TimezoneOffsetResponse`

NewTimezoneOffsetResponseWithDefaults instantiates a new TimezoneOffsetResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetUnix

`func (o *TimezoneOffsetResponse) GetUnix() int64`

GetUnix returns the Unix field if non-nil, zero value otherwise.

### GetUnixOk

`func (o *TimezoneOffsetResponse) GetUnixOk() (*int64, bool)`

GetUnixOk returns a tuple with the Unix field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUnix

`func (o *TimezoneOffsetResponse) SetUnix(v int64)`

SetUnix sets Unix field to given value.


### GetUnixMs

`func (o *TimezoneOffsetResponse) GetUnixMs() int64`

GetUnixMs returns the UnixMs field if non-nil, zero value otherwise.

### GetUnixMsOk

`func (o *TimezoneOffsetResponse) GetUnixMsOk() (*int64, bool)`

GetUnixMsOk returns a tuple with the UnixMs field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUnixMs

`func (o *TimezoneOffsetResponse) SetUnixMs(v int64)`

SetUnixMs sets UnixMs field to given value.


### GetUtc

`func (o *TimezoneOffsetResponse) GetUtc() time.Time`

GetUtc returns the Utc field if non-nil, zero value otherwise.

### GetUtcOk

`func (o *TimezoneOffsetResponse) GetUtcOk() (*time.Time, bool)`

GetUtcOk returns a tuple with the Utc field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUtc

`func (o *TimezoneOffsetResponse) SetUtc(v time.Time)`

SetUtc sets Utc field to given value.


### GetIsoLocal

`func (o *TimezoneOffsetResponse) GetIsoLocal() string`

GetIsoLocal returns the IsoLocal field if non-nil, zero value otherwise.

### GetIsoLocalOk

`func (o *TimezoneOffsetResponse) GetIsoLocalOk() (*string, bool)`

GetIsoLocalOk returns a tuple with the IsoLocal field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsoLocal

`func (o *TimezoneOffsetResponse) SetIsoLocal(v string)`

SetIsoLocal sets IsoLocal field to given value.


### SetIsoLocalNil

`func (o *TimezoneOffsetResponse) SetIsoLocalNil(b bool)`

 SetIsoLocalNil sets the value for IsoLocal to be an explicit nil

### UnsetIsoLocal
`func (o *TimezoneOffsetResponse) UnsetIsoLocal()`

UnsetIsoLocal ensures that no value is present for IsoLocal, not even an explicit nil
### GetRfc2822

`func (o *TimezoneOffsetResponse) GetRfc2822() string`

GetRfc2822 returns the Rfc2822 field if non-nil, zero value otherwise.

### GetRfc2822Ok

`func (o *TimezoneOffsetResponse) GetRfc2822Ok() (*string, bool)`

GetRfc2822Ok returns a tuple with the Rfc2822 field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRfc2822

`func (o *TimezoneOffsetResponse) SetRfc2822(v string)`

SetRfc2822 sets Rfc2822 field to given value.


### GetHuman

`func (o *TimezoneOffsetResponse) GetHuman() string`

GetHuman returns the Human field if non-nil, zero value otherwise.

### GetHumanOk

`func (o *TimezoneOffsetResponse) GetHumanOk() (*string, bool)`

GetHumanOk returns a tuple with the Human field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetHuman

`func (o *TimezoneOffsetResponse) SetHuman(v string)`

SetHuman sets Human field to given value.


### GetDayNumber

`func (o *TimezoneOffsetResponse) GetDayNumber() int32`

GetDayNumber returns the DayNumber field if non-nil, zero value otherwise.

### GetDayNumberOk

`func (o *TimezoneOffsetResponse) GetDayNumberOk() (*int32, bool)`

GetDayNumberOk returns a tuple with the DayNumber field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDayNumber

`func (o *TimezoneOffsetResponse) SetDayNumber(v int32)`

SetDayNumber sets DayNumber field to given value.


### GetDayShort

`func (o *TimezoneOffsetResponse) GetDayShort() string`

GetDayShort returns the DayShort field if non-nil, zero value otherwise.

### GetDayShortOk

`func (o *TimezoneOffsetResponse) GetDayShortOk() (*string, bool)`

GetDayShortOk returns a tuple with the DayShort field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDayShort

`func (o *TimezoneOffsetResponse) SetDayShort(v string)`

SetDayShort sets DayShort field to given value.


### GetDayFull

`func (o *TimezoneOffsetResponse) GetDayFull() string`

GetDayFull returns the DayFull field if non-nil, zero value otherwise.

### GetDayFullOk

`func (o *TimezoneOffsetResponse) GetDayFullOk() (*string, bool)`

GetDayFullOk returns a tuple with the DayFull field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDayFull

`func (o *TimezoneOffsetResponse) SetDayFull(v string)`

SetDayFull sets DayFull field to given value.


### GetTimezone

`func (o *TimezoneOffsetResponse) GetTimezone() string`

GetTimezone returns the Timezone field if non-nil, zero value otherwise.

### GetTimezoneOk

`func (o *TimezoneOffsetResponse) GetTimezoneOk() (*string, bool)`

GetTimezoneOk returns a tuple with the Timezone field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTimezone

`func (o *TimezoneOffsetResponse) SetTimezone(v string)`

SetTimezone sets Timezone field to given value.


### SetTimezoneNil

`func (o *TimezoneOffsetResponse) SetTimezoneNil(b bool)`

 SetTimezoneNil sets the value for Timezone to be an explicit nil

### UnsetTimezone
`func (o *TimezoneOffsetResponse) UnsetTimezone()`

UnsetTimezone ensures that no value is present for Timezone, not even an explicit nil
### GetFormatted

`func (o *TimezoneOffsetResponse) GetFormatted() string`

GetFormatted returns the Formatted field if non-nil, zero value otherwise.

### GetFormattedOk

`func (o *TimezoneOffsetResponse) GetFormattedOk() (*string, bool)`

GetFormattedOk returns a tuple with the Formatted field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFormatted

`func (o *TimezoneOffsetResponse) SetFormatted(v string)`

SetFormatted sets Formatted field to given value.

### HasFormatted

`func (o *TimezoneOffsetResponse) HasFormatted() bool`

HasFormatted returns a boolean if a field has been set.

### GetOffset

`func (o *TimezoneOffsetResponse) GetOffset() int32`

GetOffset returns the Offset field if non-nil, zero value otherwise.

### GetOffsetOk

`func (o *TimezoneOffsetResponse) GetOffsetOk() (*int32, bool)`

GetOffsetOk returns a tuple with the Offset field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOffset

`func (o *TimezoneOffsetResponse) SetOffset(v int32)`

SetOffset sets Offset field to given value.


### GetDst

`func (o *TimezoneOffsetResponse) GetDst() bool`

GetDst returns the Dst field if non-nil, zero value otherwise.

### GetDstOk

`func (o *TimezoneOffsetResponse) GetDstOk() (*bool, bool)`

GetDstOk returns a tuple with the Dst field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDst

`func (o *TimezoneOffsetResponse) SetDst(v bool)`

SetDst sets Dst field to given value.


### GetMatchingZones

`func (o *TimezoneOffsetResponse) GetMatchingZones() []TimezoneMatch`

GetMatchingZones returns the MatchingZones field if non-nil, zero value otherwise.

### GetMatchingZonesOk

`func (o *TimezoneOffsetResponse) GetMatchingZonesOk() (*[]TimezoneMatch, bool)`

GetMatchingZonesOk returns a tuple with the MatchingZones field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMatchingZones

`func (o *TimezoneOffsetResponse) SetMatchingZones(v []TimezoneMatch)`

SetMatchingZones sets MatchingZones field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


