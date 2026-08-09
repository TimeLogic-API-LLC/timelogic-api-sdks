# GetTimezone200Response

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

### NewGetTimezone200Response

`func NewGetTimezone200Response(unix int64, unixMs int64, utc time.Time, isoLocal NullableString, rfc2822 string, human string, dayNumber int32, dayShort string, dayFull string, timezone NullableString, offset int32, dst bool, matchingZones []TimezoneMatch, ) *GetTimezone200Response`

NewGetTimezone200Response instantiates a new GetTimezone200Response object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewGetTimezone200ResponseWithDefaults

`func NewGetTimezone200ResponseWithDefaults() *GetTimezone200Response`

NewGetTimezone200ResponseWithDefaults instantiates a new GetTimezone200Response object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetUnix

`func (o *GetTimezone200Response) GetUnix() int64`

GetUnix returns the Unix field if non-nil, zero value otherwise.

### GetUnixOk

`func (o *GetTimezone200Response) GetUnixOk() (*int64, bool)`

GetUnixOk returns a tuple with the Unix field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUnix

`func (o *GetTimezone200Response) SetUnix(v int64)`

SetUnix sets Unix field to given value.


### GetUnixMs

`func (o *GetTimezone200Response) GetUnixMs() int64`

GetUnixMs returns the UnixMs field if non-nil, zero value otherwise.

### GetUnixMsOk

`func (o *GetTimezone200Response) GetUnixMsOk() (*int64, bool)`

GetUnixMsOk returns a tuple with the UnixMs field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUnixMs

`func (o *GetTimezone200Response) SetUnixMs(v int64)`

SetUnixMs sets UnixMs field to given value.


### GetUtc

`func (o *GetTimezone200Response) GetUtc() time.Time`

GetUtc returns the Utc field if non-nil, zero value otherwise.

### GetUtcOk

`func (o *GetTimezone200Response) GetUtcOk() (*time.Time, bool)`

GetUtcOk returns a tuple with the Utc field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUtc

`func (o *GetTimezone200Response) SetUtc(v time.Time)`

SetUtc sets Utc field to given value.


### GetIsoLocal

`func (o *GetTimezone200Response) GetIsoLocal() string`

GetIsoLocal returns the IsoLocal field if non-nil, zero value otherwise.

### GetIsoLocalOk

`func (o *GetTimezone200Response) GetIsoLocalOk() (*string, bool)`

GetIsoLocalOk returns a tuple with the IsoLocal field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsoLocal

`func (o *GetTimezone200Response) SetIsoLocal(v string)`

SetIsoLocal sets IsoLocal field to given value.


### SetIsoLocalNil

`func (o *GetTimezone200Response) SetIsoLocalNil(b bool)`

 SetIsoLocalNil sets the value for IsoLocal to be an explicit nil

### UnsetIsoLocal
`func (o *GetTimezone200Response) UnsetIsoLocal()`

UnsetIsoLocal ensures that no value is present for IsoLocal, not even an explicit nil
### GetRfc2822

`func (o *GetTimezone200Response) GetRfc2822() string`

GetRfc2822 returns the Rfc2822 field if non-nil, zero value otherwise.

### GetRfc2822Ok

`func (o *GetTimezone200Response) GetRfc2822Ok() (*string, bool)`

GetRfc2822Ok returns a tuple with the Rfc2822 field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRfc2822

`func (o *GetTimezone200Response) SetRfc2822(v string)`

SetRfc2822 sets Rfc2822 field to given value.


### GetHuman

`func (o *GetTimezone200Response) GetHuman() string`

GetHuman returns the Human field if non-nil, zero value otherwise.

### GetHumanOk

`func (o *GetTimezone200Response) GetHumanOk() (*string, bool)`

GetHumanOk returns a tuple with the Human field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetHuman

`func (o *GetTimezone200Response) SetHuman(v string)`

SetHuman sets Human field to given value.


### GetDayNumber

`func (o *GetTimezone200Response) GetDayNumber() int32`

GetDayNumber returns the DayNumber field if non-nil, zero value otherwise.

### GetDayNumberOk

`func (o *GetTimezone200Response) GetDayNumberOk() (*int32, bool)`

GetDayNumberOk returns a tuple with the DayNumber field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDayNumber

`func (o *GetTimezone200Response) SetDayNumber(v int32)`

SetDayNumber sets DayNumber field to given value.


### GetDayShort

`func (o *GetTimezone200Response) GetDayShort() string`

GetDayShort returns the DayShort field if non-nil, zero value otherwise.

### GetDayShortOk

`func (o *GetTimezone200Response) GetDayShortOk() (*string, bool)`

GetDayShortOk returns a tuple with the DayShort field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDayShort

`func (o *GetTimezone200Response) SetDayShort(v string)`

SetDayShort sets DayShort field to given value.


### GetDayFull

`func (o *GetTimezone200Response) GetDayFull() string`

GetDayFull returns the DayFull field if non-nil, zero value otherwise.

### GetDayFullOk

`func (o *GetTimezone200Response) GetDayFullOk() (*string, bool)`

GetDayFullOk returns a tuple with the DayFull field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDayFull

`func (o *GetTimezone200Response) SetDayFull(v string)`

SetDayFull sets DayFull field to given value.


### GetTimezone

`func (o *GetTimezone200Response) GetTimezone() string`

GetTimezone returns the Timezone field if non-nil, zero value otherwise.

### GetTimezoneOk

`func (o *GetTimezone200Response) GetTimezoneOk() (*string, bool)`

GetTimezoneOk returns a tuple with the Timezone field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTimezone

`func (o *GetTimezone200Response) SetTimezone(v string)`

SetTimezone sets Timezone field to given value.


### SetTimezoneNil

`func (o *GetTimezone200Response) SetTimezoneNil(b bool)`

 SetTimezoneNil sets the value for Timezone to be an explicit nil

### UnsetTimezone
`func (o *GetTimezone200Response) UnsetTimezone()`

UnsetTimezone ensures that no value is present for Timezone, not even an explicit nil
### GetFormatted

`func (o *GetTimezone200Response) GetFormatted() string`

GetFormatted returns the Formatted field if non-nil, zero value otherwise.

### GetFormattedOk

`func (o *GetTimezone200Response) GetFormattedOk() (*string, bool)`

GetFormattedOk returns a tuple with the Formatted field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFormatted

`func (o *GetTimezone200Response) SetFormatted(v string)`

SetFormatted sets Formatted field to given value.

### HasFormatted

`func (o *GetTimezone200Response) HasFormatted() bool`

HasFormatted returns a boolean if a field has been set.

### GetOffset

`func (o *GetTimezone200Response) GetOffset() int32`

GetOffset returns the Offset field if non-nil, zero value otherwise.

### GetOffsetOk

`func (o *GetTimezone200Response) GetOffsetOk() (*int32, bool)`

GetOffsetOk returns a tuple with the Offset field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOffset

`func (o *GetTimezone200Response) SetOffset(v int32)`

SetOffset sets Offset field to given value.


### GetDst

`func (o *GetTimezone200Response) GetDst() bool`

GetDst returns the Dst field if non-nil, zero value otherwise.

### GetDstOk

`func (o *GetTimezone200Response) GetDstOk() (*bool, bool)`

GetDstOk returns a tuple with the Dst field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDst

`func (o *GetTimezone200Response) SetDst(v bool)`

SetDst sets Dst field to given value.


### GetMatchingZones

`func (o *GetTimezone200Response) GetMatchingZones() []TimezoneMatch`

GetMatchingZones returns the MatchingZones field if non-nil, zero value otherwise.

### GetMatchingZonesOk

`func (o *GetTimezone200Response) GetMatchingZonesOk() (*[]TimezoneMatch, bool)`

GetMatchingZonesOk returns a tuple with the MatchingZones field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMatchingZones

`func (o *GetTimezone200Response) SetMatchingZones(v []TimezoneMatch)`

SetMatchingZones sets MatchingZones field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


