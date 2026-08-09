# ElapsedResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Seconds** | **int32** |  |
**Minutes** | **int32** |  |
**Hours** | **int32** |  |
**Days** | **int32** |  |
**Human** | **string** |  |
**Direction** | **string** | &#x60;left&#x60; means the target instant is still in the future. &#x60;passed&#x60; means the target instant is already in the past. |
**Formatted** | Pointer to **string** |  | [optional]
**BusinessDays** | Pointer to **int32** |  | [optional]

## Methods

### NewElapsedResponse

`func NewElapsedResponse(seconds int32, minutes int32, hours int32, days int32, human string, direction string, ) *ElapsedResponse`

NewElapsedResponse instantiates a new ElapsedResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewElapsedResponseWithDefaults

`func NewElapsedResponseWithDefaults() *ElapsedResponse`

NewElapsedResponseWithDefaults instantiates a new ElapsedResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetSeconds

`func (o *ElapsedResponse) GetSeconds() int32`

GetSeconds returns the Seconds field if non-nil, zero value otherwise.

### GetSecondsOk

`func (o *ElapsedResponse) GetSecondsOk() (*int32, bool)`

GetSecondsOk returns a tuple with the Seconds field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSeconds

`func (o *ElapsedResponse) SetSeconds(v int32)`

SetSeconds sets Seconds field to given value.


### GetMinutes

`func (o *ElapsedResponse) GetMinutes() int32`

GetMinutes returns the Minutes field if non-nil, zero value otherwise.

### GetMinutesOk

`func (o *ElapsedResponse) GetMinutesOk() (*int32, bool)`

GetMinutesOk returns a tuple with the Minutes field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMinutes

`func (o *ElapsedResponse) SetMinutes(v int32)`

SetMinutes sets Minutes field to given value.


### GetHours

`func (o *ElapsedResponse) GetHours() int32`

GetHours returns the Hours field if non-nil, zero value otherwise.

### GetHoursOk

`func (o *ElapsedResponse) GetHoursOk() (*int32, bool)`

GetHoursOk returns a tuple with the Hours field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetHours

`func (o *ElapsedResponse) SetHours(v int32)`

SetHours sets Hours field to given value.


### GetDays

`func (o *ElapsedResponse) GetDays() int32`

GetDays returns the Days field if non-nil, zero value otherwise.

### GetDaysOk

`func (o *ElapsedResponse) GetDaysOk() (*int32, bool)`

GetDaysOk returns a tuple with the Days field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDays

`func (o *ElapsedResponse) SetDays(v int32)`

SetDays sets Days field to given value.


### GetHuman

`func (o *ElapsedResponse) GetHuman() string`

GetHuman returns the Human field if non-nil, zero value otherwise.

### GetHumanOk

`func (o *ElapsedResponse) GetHumanOk() (*string, bool)`

GetHumanOk returns a tuple with the Human field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetHuman

`func (o *ElapsedResponse) SetHuman(v string)`

SetHuman sets Human field to given value.


### GetDirection

`func (o *ElapsedResponse) GetDirection() string`

GetDirection returns the Direction field if non-nil, zero value otherwise.

### GetDirectionOk

`func (o *ElapsedResponse) GetDirectionOk() (*string, bool)`

GetDirectionOk returns a tuple with the Direction field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDirection

`func (o *ElapsedResponse) SetDirection(v string)`

SetDirection sets Direction field to given value.


### GetFormatted

`func (o *ElapsedResponse) GetFormatted() string`

GetFormatted returns the Formatted field if non-nil, zero value otherwise.

### GetFormattedOk

`func (o *ElapsedResponse) GetFormattedOk() (*string, bool)`

GetFormattedOk returns a tuple with the Formatted field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFormatted

`func (o *ElapsedResponse) SetFormatted(v string)`

SetFormatted sets Formatted field to given value.

### HasFormatted

`func (o *ElapsedResponse) HasFormatted() bool`

HasFormatted returns a boolean if a field has been set.

### GetBusinessDays

`func (o *ElapsedResponse) GetBusinessDays() int32`

GetBusinessDays returns the BusinessDays field if non-nil, zero value otherwise.

### GetBusinessDaysOk

`func (o *ElapsedResponse) GetBusinessDaysOk() (*int32, bool)`

GetBusinessDaysOk returns a tuple with the BusinessDays field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetBusinessDays

`func (o *ElapsedResponse) SetBusinessDays(v int32)`

SetBusinessDays sets BusinessDays field to given value.

### HasBusinessDays

`func (o *ElapsedResponse) HasBusinessDays() bool`

HasBusinessDays returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


