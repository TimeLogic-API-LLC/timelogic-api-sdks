# TimePayload

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

## Methods

### NewTimePayload

`func NewTimePayload(unix int64, unixMs int64, utc time.Time, isoLocal NullableString, rfc2822 string, human string, dayNumber int32, dayShort string, dayFull string, timezone NullableString, ) *TimePayload`

NewTimePayload instantiates a new TimePayload object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewTimePayloadWithDefaults

`func NewTimePayloadWithDefaults() *TimePayload`

NewTimePayloadWithDefaults instantiates a new TimePayload object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetUnix

`func (o *TimePayload) GetUnix() int64`

GetUnix returns the Unix field if non-nil, zero value otherwise.

### GetUnixOk

`func (o *TimePayload) GetUnixOk() (*int64, bool)`

GetUnixOk returns a tuple with the Unix field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUnix

`func (o *TimePayload) SetUnix(v int64)`

SetUnix sets Unix field to given value.


### GetUnixMs

`func (o *TimePayload) GetUnixMs() int64`

GetUnixMs returns the UnixMs field if non-nil, zero value otherwise.

### GetUnixMsOk

`func (o *TimePayload) GetUnixMsOk() (*int64, bool)`

GetUnixMsOk returns a tuple with the UnixMs field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUnixMs

`func (o *TimePayload) SetUnixMs(v int64)`

SetUnixMs sets UnixMs field to given value.


### GetUtc

`func (o *TimePayload) GetUtc() time.Time`

GetUtc returns the Utc field if non-nil, zero value otherwise.

### GetUtcOk

`func (o *TimePayload) GetUtcOk() (*time.Time, bool)`

GetUtcOk returns a tuple with the Utc field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUtc

`func (o *TimePayload) SetUtc(v time.Time)`

SetUtc sets Utc field to given value.


### GetIsoLocal

`func (o *TimePayload) GetIsoLocal() string`

GetIsoLocal returns the IsoLocal field if non-nil, zero value otherwise.

### GetIsoLocalOk

`func (o *TimePayload) GetIsoLocalOk() (*string, bool)`

GetIsoLocalOk returns a tuple with the IsoLocal field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsoLocal

`func (o *TimePayload) SetIsoLocal(v string)`

SetIsoLocal sets IsoLocal field to given value.


### SetIsoLocalNil

`func (o *TimePayload) SetIsoLocalNil(b bool)`

 SetIsoLocalNil sets the value for IsoLocal to be an explicit nil

### UnsetIsoLocal
`func (o *TimePayload) UnsetIsoLocal()`

UnsetIsoLocal ensures that no value is present for IsoLocal, not even an explicit nil
### GetRfc2822

`func (o *TimePayload) GetRfc2822() string`

GetRfc2822 returns the Rfc2822 field if non-nil, zero value otherwise.

### GetRfc2822Ok

`func (o *TimePayload) GetRfc2822Ok() (*string, bool)`

GetRfc2822Ok returns a tuple with the Rfc2822 field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRfc2822

`func (o *TimePayload) SetRfc2822(v string)`

SetRfc2822 sets Rfc2822 field to given value.


### GetHuman

`func (o *TimePayload) GetHuman() string`

GetHuman returns the Human field if non-nil, zero value otherwise.

### GetHumanOk

`func (o *TimePayload) GetHumanOk() (*string, bool)`

GetHumanOk returns a tuple with the Human field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetHuman

`func (o *TimePayload) SetHuman(v string)`

SetHuman sets Human field to given value.


### GetDayNumber

`func (o *TimePayload) GetDayNumber() int32`

GetDayNumber returns the DayNumber field if non-nil, zero value otherwise.

### GetDayNumberOk

`func (o *TimePayload) GetDayNumberOk() (*int32, bool)`

GetDayNumberOk returns a tuple with the DayNumber field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDayNumber

`func (o *TimePayload) SetDayNumber(v int32)`

SetDayNumber sets DayNumber field to given value.


### GetDayShort

`func (o *TimePayload) GetDayShort() string`

GetDayShort returns the DayShort field if non-nil, zero value otherwise.

### GetDayShortOk

`func (o *TimePayload) GetDayShortOk() (*string, bool)`

GetDayShortOk returns a tuple with the DayShort field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDayShort

`func (o *TimePayload) SetDayShort(v string)`

SetDayShort sets DayShort field to given value.


### GetDayFull

`func (o *TimePayload) GetDayFull() string`

GetDayFull returns the DayFull field if non-nil, zero value otherwise.

### GetDayFullOk

`func (o *TimePayload) GetDayFullOk() (*string, bool)`

GetDayFullOk returns a tuple with the DayFull field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDayFull

`func (o *TimePayload) SetDayFull(v string)`

SetDayFull sets DayFull field to given value.


### GetTimezone

`func (o *TimePayload) GetTimezone() string`

GetTimezone returns the Timezone field if non-nil, zero value otherwise.

### GetTimezoneOk

`func (o *TimePayload) GetTimezoneOk() (*string, bool)`

GetTimezoneOk returns a tuple with the Timezone field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTimezone

`func (o *TimePayload) SetTimezone(v string)`

SetTimezone sets Timezone field to given value.


### SetTimezoneNil

`func (o *TimePayload) SetTimezoneNil(b bool)`

 SetTimezoneNil sets the value for Timezone to be an explicit nil

### UnsetTimezone
`func (o *TimePayload) UnsetTimezone()`

UnsetTimezone ensures that no value is present for Timezone, not even an explicit nil
### GetFormatted

`func (o *TimePayload) GetFormatted() string`

GetFormatted returns the Formatted field if non-nil, zero value otherwise.

### GetFormattedOk

`func (o *TimePayload) GetFormattedOk() (*string, bool)`

GetFormattedOk returns a tuple with the Formatted field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFormatted

`func (o *TimePayload) SetFormatted(v string)`

SetFormatted sets Formatted field to given value.

### HasFormatted

`func (o *TimePayload) HasFormatted() bool`

HasFormatted returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


