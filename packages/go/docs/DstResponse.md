# DstResponse

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
**DstActive** | **bool** |  |
**NextTransition** | Pointer to **NullableTime** |  | [optional]

## Methods

### NewDstResponse

`func NewDstResponse(unix int64, unixMs int64, utc time.Time, isoLocal NullableString, rfc2822 string, human string, dayNumber int32, dayShort string, dayFull string, timezone NullableString, dstActive bool, ) *DstResponse`

NewDstResponse instantiates a new DstResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewDstResponseWithDefaults

`func NewDstResponseWithDefaults() *DstResponse`

NewDstResponseWithDefaults instantiates a new DstResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetUnix

`func (o *DstResponse) GetUnix() int64`

GetUnix returns the Unix field if non-nil, zero value otherwise.

### GetUnixOk

`func (o *DstResponse) GetUnixOk() (*int64, bool)`

GetUnixOk returns a tuple with the Unix field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUnix

`func (o *DstResponse) SetUnix(v int64)`

SetUnix sets Unix field to given value.


### GetUnixMs

`func (o *DstResponse) GetUnixMs() int64`

GetUnixMs returns the UnixMs field if non-nil, zero value otherwise.

### GetUnixMsOk

`func (o *DstResponse) GetUnixMsOk() (*int64, bool)`

GetUnixMsOk returns a tuple with the UnixMs field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUnixMs

`func (o *DstResponse) SetUnixMs(v int64)`

SetUnixMs sets UnixMs field to given value.


### GetUtc

`func (o *DstResponse) GetUtc() time.Time`

GetUtc returns the Utc field if non-nil, zero value otherwise.

### GetUtcOk

`func (o *DstResponse) GetUtcOk() (*time.Time, bool)`

GetUtcOk returns a tuple with the Utc field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUtc

`func (o *DstResponse) SetUtc(v time.Time)`

SetUtc sets Utc field to given value.


### GetIsoLocal

`func (o *DstResponse) GetIsoLocal() string`

GetIsoLocal returns the IsoLocal field if non-nil, zero value otherwise.

### GetIsoLocalOk

`func (o *DstResponse) GetIsoLocalOk() (*string, bool)`

GetIsoLocalOk returns a tuple with the IsoLocal field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsoLocal

`func (o *DstResponse) SetIsoLocal(v string)`

SetIsoLocal sets IsoLocal field to given value.


### SetIsoLocalNil

`func (o *DstResponse) SetIsoLocalNil(b bool)`

 SetIsoLocalNil sets the value for IsoLocal to be an explicit nil

### UnsetIsoLocal
`func (o *DstResponse) UnsetIsoLocal()`

UnsetIsoLocal ensures that no value is present for IsoLocal, not even an explicit nil
### GetRfc2822

`func (o *DstResponse) GetRfc2822() string`

GetRfc2822 returns the Rfc2822 field if non-nil, zero value otherwise.

### GetRfc2822Ok

`func (o *DstResponse) GetRfc2822Ok() (*string, bool)`

GetRfc2822Ok returns a tuple with the Rfc2822 field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRfc2822

`func (o *DstResponse) SetRfc2822(v string)`

SetRfc2822 sets Rfc2822 field to given value.


### GetHuman

`func (o *DstResponse) GetHuman() string`

GetHuman returns the Human field if non-nil, zero value otherwise.

### GetHumanOk

`func (o *DstResponse) GetHumanOk() (*string, bool)`

GetHumanOk returns a tuple with the Human field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetHuman

`func (o *DstResponse) SetHuman(v string)`

SetHuman sets Human field to given value.


### GetDayNumber

`func (o *DstResponse) GetDayNumber() int32`

GetDayNumber returns the DayNumber field if non-nil, zero value otherwise.

### GetDayNumberOk

`func (o *DstResponse) GetDayNumberOk() (*int32, bool)`

GetDayNumberOk returns a tuple with the DayNumber field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDayNumber

`func (o *DstResponse) SetDayNumber(v int32)`

SetDayNumber sets DayNumber field to given value.


### GetDayShort

`func (o *DstResponse) GetDayShort() string`

GetDayShort returns the DayShort field if non-nil, zero value otherwise.

### GetDayShortOk

`func (o *DstResponse) GetDayShortOk() (*string, bool)`

GetDayShortOk returns a tuple with the DayShort field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDayShort

`func (o *DstResponse) SetDayShort(v string)`

SetDayShort sets DayShort field to given value.


### GetDayFull

`func (o *DstResponse) GetDayFull() string`

GetDayFull returns the DayFull field if non-nil, zero value otherwise.

### GetDayFullOk

`func (o *DstResponse) GetDayFullOk() (*string, bool)`

GetDayFullOk returns a tuple with the DayFull field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDayFull

`func (o *DstResponse) SetDayFull(v string)`

SetDayFull sets DayFull field to given value.


### GetTimezone

`func (o *DstResponse) GetTimezone() string`

GetTimezone returns the Timezone field if non-nil, zero value otherwise.

### GetTimezoneOk

`func (o *DstResponse) GetTimezoneOk() (*string, bool)`

GetTimezoneOk returns a tuple with the Timezone field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTimezone

`func (o *DstResponse) SetTimezone(v string)`

SetTimezone sets Timezone field to given value.


### SetTimezoneNil

`func (o *DstResponse) SetTimezoneNil(b bool)`

 SetTimezoneNil sets the value for Timezone to be an explicit nil

### UnsetTimezone
`func (o *DstResponse) UnsetTimezone()`

UnsetTimezone ensures that no value is present for Timezone, not even an explicit nil
### GetFormatted

`func (o *DstResponse) GetFormatted() string`

GetFormatted returns the Formatted field if non-nil, zero value otherwise.

### GetFormattedOk

`func (o *DstResponse) GetFormattedOk() (*string, bool)`

GetFormattedOk returns a tuple with the Formatted field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFormatted

`func (o *DstResponse) SetFormatted(v string)`

SetFormatted sets Formatted field to given value.

### HasFormatted

`func (o *DstResponse) HasFormatted() bool`

HasFormatted returns a boolean if a field has been set.

### GetDstActive

`func (o *DstResponse) GetDstActive() bool`

GetDstActive returns the DstActive field if non-nil, zero value otherwise.

### GetDstActiveOk

`func (o *DstResponse) GetDstActiveOk() (*bool, bool)`

GetDstActiveOk returns a tuple with the DstActive field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDstActive

`func (o *DstResponse) SetDstActive(v bool)`

SetDstActive sets DstActive field to given value.


### GetNextTransition

`func (o *DstResponse) GetNextTransition() time.Time`

GetNextTransition returns the NextTransition field if non-nil, zero value otherwise.

### GetNextTransitionOk

`func (o *DstResponse) GetNextTransitionOk() (*time.Time, bool)`

GetNextTransitionOk returns a tuple with the NextTransition field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetNextTransition

`func (o *DstResponse) SetNextTransition(v time.Time)`

SetNextTransition sets NextTransition field to given value.

### HasNextTransition

`func (o *DstResponse) HasNextTransition() bool`

HasNextTransition returns a boolean if a field has been set.

### SetNextTransitionNil

`func (o *DstResponse) SetNextTransitionNil(b bool)`

 SetNextTransitionNil sets the value for NextTransition to be an explicit nil

### UnsetNextTransition
`func (o *DstResponse) UnsetNextTransition()`

UnsetNextTransition ensures that no value is present for NextTransition, not even an explicit nil

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


