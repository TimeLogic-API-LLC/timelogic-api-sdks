# TimePayloadBulkItem

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
**Error** | [**ApiError**](ApiError.md) |  |
**RequestId** | **string** |  |
**Timestamp** | Pointer to **time.Time** | Intentionally omitted from public API error responses to avoid exposing request timing; use request_id for support correlation. | [optional]
**Item** | **string** |  |

## Methods

### NewTimePayloadBulkItem

`func NewTimePayloadBulkItem(unix int64, unixMs int64, utc time.Time, isoLocal NullableString, rfc2822 string, human string, dayNumber int32, dayShort string, dayFull string, timezone NullableString, error_ ApiError, requestId string, item string, ) *TimePayloadBulkItem`

NewTimePayloadBulkItem instantiates a new TimePayloadBulkItem object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewTimePayloadBulkItemWithDefaults

`func NewTimePayloadBulkItemWithDefaults() *TimePayloadBulkItem`

NewTimePayloadBulkItemWithDefaults instantiates a new TimePayloadBulkItem object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetUnix

`func (o *TimePayloadBulkItem) GetUnix() int64`

GetUnix returns the Unix field if non-nil, zero value otherwise.

### GetUnixOk

`func (o *TimePayloadBulkItem) GetUnixOk() (*int64, bool)`

GetUnixOk returns a tuple with the Unix field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUnix

`func (o *TimePayloadBulkItem) SetUnix(v int64)`

SetUnix sets Unix field to given value.


### GetUnixMs

`func (o *TimePayloadBulkItem) GetUnixMs() int64`

GetUnixMs returns the UnixMs field if non-nil, zero value otherwise.

### GetUnixMsOk

`func (o *TimePayloadBulkItem) GetUnixMsOk() (*int64, bool)`

GetUnixMsOk returns a tuple with the UnixMs field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUnixMs

`func (o *TimePayloadBulkItem) SetUnixMs(v int64)`

SetUnixMs sets UnixMs field to given value.


### GetUtc

`func (o *TimePayloadBulkItem) GetUtc() time.Time`

GetUtc returns the Utc field if non-nil, zero value otherwise.

### GetUtcOk

`func (o *TimePayloadBulkItem) GetUtcOk() (*time.Time, bool)`

GetUtcOk returns a tuple with the Utc field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUtc

`func (o *TimePayloadBulkItem) SetUtc(v time.Time)`

SetUtc sets Utc field to given value.


### GetIsoLocal

`func (o *TimePayloadBulkItem) GetIsoLocal() string`

GetIsoLocal returns the IsoLocal field if non-nil, zero value otherwise.

### GetIsoLocalOk

`func (o *TimePayloadBulkItem) GetIsoLocalOk() (*string, bool)`

GetIsoLocalOk returns a tuple with the IsoLocal field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsoLocal

`func (o *TimePayloadBulkItem) SetIsoLocal(v string)`

SetIsoLocal sets IsoLocal field to given value.


### SetIsoLocalNil

`func (o *TimePayloadBulkItem) SetIsoLocalNil(b bool)`

 SetIsoLocalNil sets the value for IsoLocal to be an explicit nil

### UnsetIsoLocal
`func (o *TimePayloadBulkItem) UnsetIsoLocal()`

UnsetIsoLocal ensures that no value is present for IsoLocal, not even an explicit nil
### GetRfc2822

`func (o *TimePayloadBulkItem) GetRfc2822() string`

GetRfc2822 returns the Rfc2822 field if non-nil, zero value otherwise.

### GetRfc2822Ok

`func (o *TimePayloadBulkItem) GetRfc2822Ok() (*string, bool)`

GetRfc2822Ok returns a tuple with the Rfc2822 field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRfc2822

`func (o *TimePayloadBulkItem) SetRfc2822(v string)`

SetRfc2822 sets Rfc2822 field to given value.


### GetHuman

`func (o *TimePayloadBulkItem) GetHuman() string`

GetHuman returns the Human field if non-nil, zero value otherwise.

### GetHumanOk

`func (o *TimePayloadBulkItem) GetHumanOk() (*string, bool)`

GetHumanOk returns a tuple with the Human field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetHuman

`func (o *TimePayloadBulkItem) SetHuman(v string)`

SetHuman sets Human field to given value.


### GetDayNumber

`func (o *TimePayloadBulkItem) GetDayNumber() int32`

GetDayNumber returns the DayNumber field if non-nil, zero value otherwise.

### GetDayNumberOk

`func (o *TimePayloadBulkItem) GetDayNumberOk() (*int32, bool)`

GetDayNumberOk returns a tuple with the DayNumber field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDayNumber

`func (o *TimePayloadBulkItem) SetDayNumber(v int32)`

SetDayNumber sets DayNumber field to given value.


### GetDayShort

`func (o *TimePayloadBulkItem) GetDayShort() string`

GetDayShort returns the DayShort field if non-nil, zero value otherwise.

### GetDayShortOk

`func (o *TimePayloadBulkItem) GetDayShortOk() (*string, bool)`

GetDayShortOk returns a tuple with the DayShort field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDayShort

`func (o *TimePayloadBulkItem) SetDayShort(v string)`

SetDayShort sets DayShort field to given value.


### GetDayFull

`func (o *TimePayloadBulkItem) GetDayFull() string`

GetDayFull returns the DayFull field if non-nil, zero value otherwise.

### GetDayFullOk

`func (o *TimePayloadBulkItem) GetDayFullOk() (*string, bool)`

GetDayFullOk returns a tuple with the DayFull field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDayFull

`func (o *TimePayloadBulkItem) SetDayFull(v string)`

SetDayFull sets DayFull field to given value.


### GetTimezone

`func (o *TimePayloadBulkItem) GetTimezone() string`

GetTimezone returns the Timezone field if non-nil, zero value otherwise.

### GetTimezoneOk

`func (o *TimePayloadBulkItem) GetTimezoneOk() (*string, bool)`

GetTimezoneOk returns a tuple with the Timezone field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTimezone

`func (o *TimePayloadBulkItem) SetTimezone(v string)`

SetTimezone sets Timezone field to given value.


### SetTimezoneNil

`func (o *TimePayloadBulkItem) SetTimezoneNil(b bool)`

 SetTimezoneNil sets the value for Timezone to be an explicit nil

### UnsetTimezone
`func (o *TimePayloadBulkItem) UnsetTimezone()`

UnsetTimezone ensures that no value is present for Timezone, not even an explicit nil
### GetFormatted

`func (o *TimePayloadBulkItem) GetFormatted() string`

GetFormatted returns the Formatted field if non-nil, zero value otherwise.

### GetFormattedOk

`func (o *TimePayloadBulkItem) GetFormattedOk() (*string, bool)`

GetFormattedOk returns a tuple with the Formatted field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFormatted

`func (o *TimePayloadBulkItem) SetFormatted(v string)`

SetFormatted sets Formatted field to given value.

### HasFormatted

`func (o *TimePayloadBulkItem) HasFormatted() bool`

HasFormatted returns a boolean if a field has been set.

### GetError

`func (o *TimePayloadBulkItem) GetError() ApiError`

GetError returns the Error field if non-nil, zero value otherwise.

### GetErrorOk

`func (o *TimePayloadBulkItem) GetErrorOk() (*ApiError, bool)`

GetErrorOk returns a tuple with the Error field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetError

`func (o *TimePayloadBulkItem) SetError(v ApiError)`

SetError sets Error field to given value.


### GetRequestId

`func (o *TimePayloadBulkItem) GetRequestId() string`

GetRequestId returns the RequestId field if non-nil, zero value otherwise.

### GetRequestIdOk

`func (o *TimePayloadBulkItem) GetRequestIdOk() (*string, bool)`

GetRequestIdOk returns a tuple with the RequestId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRequestId

`func (o *TimePayloadBulkItem) SetRequestId(v string)`

SetRequestId sets RequestId field to given value.


### GetTimestamp

`func (o *TimePayloadBulkItem) GetTimestamp() time.Time`

GetTimestamp returns the Timestamp field if non-nil, zero value otherwise.

### GetTimestampOk

`func (o *TimePayloadBulkItem) GetTimestampOk() (*time.Time, bool)`

GetTimestampOk returns a tuple with the Timestamp field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTimestamp

`func (o *TimePayloadBulkItem) SetTimestamp(v time.Time)`

SetTimestamp sets Timestamp field to given value.

### HasTimestamp

`func (o *TimePayloadBulkItem) HasTimestamp() bool`

HasTimestamp returns a boolean if a field has been set.

### GetItem

`func (o *TimePayloadBulkItem) GetItem() string`

GetItem returns the Item field if non-nil, zero value otherwise.

### GetItemOk

`func (o *TimePayloadBulkItem) GetItemOk() (*string, bool)`

GetItemOk returns a tuple with the Item field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetItem

`func (o *TimePayloadBulkItem) SetItem(v string)`

SetItem sets Item field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


