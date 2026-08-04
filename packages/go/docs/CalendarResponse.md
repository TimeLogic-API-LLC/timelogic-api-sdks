# CalendarResponse

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
**Year** | **int32** |  | 
**Month** | **int32** |  | 
**MonthName** | **string** |  | 
**Day** | **int32** |  | 
**WeekNumber** | Pointer to **int32** |  | [optional] 

## Methods

### NewCalendarResponse

`func NewCalendarResponse(unix int64, unixMs int64, utc time.Time, isoLocal NullableString, rfc2822 string, human string, dayNumber int32, dayShort string, dayFull string, timezone NullableString, year int32, month int32, monthName string, day int32, ) *CalendarResponse`

NewCalendarResponse instantiates a new CalendarResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewCalendarResponseWithDefaults

`func NewCalendarResponseWithDefaults() *CalendarResponse`

NewCalendarResponseWithDefaults instantiates a new CalendarResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetUnix

`func (o *CalendarResponse) GetUnix() int64`

GetUnix returns the Unix field if non-nil, zero value otherwise.

### GetUnixOk

`func (o *CalendarResponse) GetUnixOk() (*int64, bool)`

GetUnixOk returns a tuple with the Unix field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUnix

`func (o *CalendarResponse) SetUnix(v int64)`

SetUnix sets Unix field to given value.


### GetUnixMs

`func (o *CalendarResponse) GetUnixMs() int64`

GetUnixMs returns the UnixMs field if non-nil, zero value otherwise.

### GetUnixMsOk

`func (o *CalendarResponse) GetUnixMsOk() (*int64, bool)`

GetUnixMsOk returns a tuple with the UnixMs field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUnixMs

`func (o *CalendarResponse) SetUnixMs(v int64)`

SetUnixMs sets UnixMs field to given value.


### GetUtc

`func (o *CalendarResponse) GetUtc() time.Time`

GetUtc returns the Utc field if non-nil, zero value otherwise.

### GetUtcOk

`func (o *CalendarResponse) GetUtcOk() (*time.Time, bool)`

GetUtcOk returns a tuple with the Utc field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUtc

`func (o *CalendarResponse) SetUtc(v time.Time)`

SetUtc sets Utc field to given value.


### GetIsoLocal

`func (o *CalendarResponse) GetIsoLocal() string`

GetIsoLocal returns the IsoLocal field if non-nil, zero value otherwise.

### GetIsoLocalOk

`func (o *CalendarResponse) GetIsoLocalOk() (*string, bool)`

GetIsoLocalOk returns a tuple with the IsoLocal field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsoLocal

`func (o *CalendarResponse) SetIsoLocal(v string)`

SetIsoLocal sets IsoLocal field to given value.


### SetIsoLocalNil

`func (o *CalendarResponse) SetIsoLocalNil(b bool)`

 SetIsoLocalNil sets the value for IsoLocal to be an explicit nil

### UnsetIsoLocal
`func (o *CalendarResponse) UnsetIsoLocal()`

UnsetIsoLocal ensures that no value is present for IsoLocal, not even an explicit nil
### GetRfc2822

`func (o *CalendarResponse) GetRfc2822() string`

GetRfc2822 returns the Rfc2822 field if non-nil, zero value otherwise.

### GetRfc2822Ok

`func (o *CalendarResponse) GetRfc2822Ok() (*string, bool)`

GetRfc2822Ok returns a tuple with the Rfc2822 field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRfc2822

`func (o *CalendarResponse) SetRfc2822(v string)`

SetRfc2822 sets Rfc2822 field to given value.


### GetHuman

`func (o *CalendarResponse) GetHuman() string`

GetHuman returns the Human field if non-nil, zero value otherwise.

### GetHumanOk

`func (o *CalendarResponse) GetHumanOk() (*string, bool)`

GetHumanOk returns a tuple with the Human field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetHuman

`func (o *CalendarResponse) SetHuman(v string)`

SetHuman sets Human field to given value.


### GetDayNumber

`func (o *CalendarResponse) GetDayNumber() int32`

GetDayNumber returns the DayNumber field if non-nil, zero value otherwise.

### GetDayNumberOk

`func (o *CalendarResponse) GetDayNumberOk() (*int32, bool)`

GetDayNumberOk returns a tuple with the DayNumber field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDayNumber

`func (o *CalendarResponse) SetDayNumber(v int32)`

SetDayNumber sets DayNumber field to given value.


### GetDayShort

`func (o *CalendarResponse) GetDayShort() string`

GetDayShort returns the DayShort field if non-nil, zero value otherwise.

### GetDayShortOk

`func (o *CalendarResponse) GetDayShortOk() (*string, bool)`

GetDayShortOk returns a tuple with the DayShort field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDayShort

`func (o *CalendarResponse) SetDayShort(v string)`

SetDayShort sets DayShort field to given value.


### GetDayFull

`func (o *CalendarResponse) GetDayFull() string`

GetDayFull returns the DayFull field if non-nil, zero value otherwise.

### GetDayFullOk

`func (o *CalendarResponse) GetDayFullOk() (*string, bool)`

GetDayFullOk returns a tuple with the DayFull field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDayFull

`func (o *CalendarResponse) SetDayFull(v string)`

SetDayFull sets DayFull field to given value.


### GetTimezone

`func (o *CalendarResponse) GetTimezone() string`

GetTimezone returns the Timezone field if non-nil, zero value otherwise.

### GetTimezoneOk

`func (o *CalendarResponse) GetTimezoneOk() (*string, bool)`

GetTimezoneOk returns a tuple with the Timezone field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTimezone

`func (o *CalendarResponse) SetTimezone(v string)`

SetTimezone sets Timezone field to given value.


### SetTimezoneNil

`func (o *CalendarResponse) SetTimezoneNil(b bool)`

 SetTimezoneNil sets the value for Timezone to be an explicit nil

### UnsetTimezone
`func (o *CalendarResponse) UnsetTimezone()`

UnsetTimezone ensures that no value is present for Timezone, not even an explicit nil
### GetFormatted

`func (o *CalendarResponse) GetFormatted() string`

GetFormatted returns the Formatted field if non-nil, zero value otherwise.

### GetFormattedOk

`func (o *CalendarResponse) GetFormattedOk() (*string, bool)`

GetFormattedOk returns a tuple with the Formatted field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFormatted

`func (o *CalendarResponse) SetFormatted(v string)`

SetFormatted sets Formatted field to given value.

### HasFormatted

`func (o *CalendarResponse) HasFormatted() bool`

HasFormatted returns a boolean if a field has been set.

### GetYear

`func (o *CalendarResponse) GetYear() int32`

GetYear returns the Year field if non-nil, zero value otherwise.

### GetYearOk

`func (o *CalendarResponse) GetYearOk() (*int32, bool)`

GetYearOk returns a tuple with the Year field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetYear

`func (o *CalendarResponse) SetYear(v int32)`

SetYear sets Year field to given value.


### GetMonth

`func (o *CalendarResponse) GetMonth() int32`

GetMonth returns the Month field if non-nil, zero value otherwise.

### GetMonthOk

`func (o *CalendarResponse) GetMonthOk() (*int32, bool)`

GetMonthOk returns a tuple with the Month field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMonth

`func (o *CalendarResponse) SetMonth(v int32)`

SetMonth sets Month field to given value.


### GetMonthName

`func (o *CalendarResponse) GetMonthName() string`

GetMonthName returns the MonthName field if non-nil, zero value otherwise.

### GetMonthNameOk

`func (o *CalendarResponse) GetMonthNameOk() (*string, bool)`

GetMonthNameOk returns a tuple with the MonthName field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMonthName

`func (o *CalendarResponse) SetMonthName(v string)`

SetMonthName sets MonthName field to given value.


### GetDay

`func (o *CalendarResponse) GetDay() int32`

GetDay returns the Day field if non-nil, zero value otherwise.

### GetDayOk

`func (o *CalendarResponse) GetDayOk() (*int32, bool)`

GetDayOk returns a tuple with the Day field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDay

`func (o *CalendarResponse) SetDay(v int32)`

SetDay sets Day field to given value.


### GetWeekNumber

`func (o *CalendarResponse) GetWeekNumber() int32`

GetWeekNumber returns the WeekNumber field if non-nil, zero value otherwise.

### GetWeekNumberOk

`func (o *CalendarResponse) GetWeekNumberOk() (*int32, bool)`

GetWeekNumberOk returns a tuple with the WeekNumber field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetWeekNumber

`func (o *CalendarResponse) SetWeekNumber(v int32)`

SetWeekNumber sets WeekNumber field to given value.

### HasWeekNumber

`func (o *CalendarResponse) HasWeekNumber() bool`

HasWeekNumber returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


