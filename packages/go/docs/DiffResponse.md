# DiffResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Seconds** | **int32** |  | 
**Minutes** | **int32** |  | 
**Hours** | **int32** |  | 
**Days** | **int32** |  | 
**Direction** | **string** | &#x60;forward&#x60; means &#x60;to&#x60; is after &#x60;from&#x60;. &#x60;backward&#x60; means &#x60;to&#x60; is before &#x60;from&#x60;. &#x60;same&#x60; means both sides resolve to the same instant. | 
**Human** | **string** |  | 
**Formatted** | Pointer to **string** |  | [optional] 
**BusinessDays** | Pointer to **int32** |  | [optional] 
**From** | [**DiffEndpointRef**](DiffEndpointRef.md) |  | 
**To** | [**DiffEndpointRef**](DiffEndpointRef.md) |  | 

## Methods

### NewDiffResponse

`func NewDiffResponse(seconds int32, minutes int32, hours int32, days int32, direction string, human string, from DiffEndpointRef, to DiffEndpointRef, ) *DiffResponse`

NewDiffResponse instantiates a new DiffResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewDiffResponseWithDefaults

`func NewDiffResponseWithDefaults() *DiffResponse`

NewDiffResponseWithDefaults instantiates a new DiffResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetSeconds

`func (o *DiffResponse) GetSeconds() int32`

GetSeconds returns the Seconds field if non-nil, zero value otherwise.

### GetSecondsOk

`func (o *DiffResponse) GetSecondsOk() (*int32, bool)`

GetSecondsOk returns a tuple with the Seconds field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSeconds

`func (o *DiffResponse) SetSeconds(v int32)`

SetSeconds sets Seconds field to given value.


### GetMinutes

`func (o *DiffResponse) GetMinutes() int32`

GetMinutes returns the Minutes field if non-nil, zero value otherwise.

### GetMinutesOk

`func (o *DiffResponse) GetMinutesOk() (*int32, bool)`

GetMinutesOk returns a tuple with the Minutes field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMinutes

`func (o *DiffResponse) SetMinutes(v int32)`

SetMinutes sets Minutes field to given value.


### GetHours

`func (o *DiffResponse) GetHours() int32`

GetHours returns the Hours field if non-nil, zero value otherwise.

### GetHoursOk

`func (o *DiffResponse) GetHoursOk() (*int32, bool)`

GetHoursOk returns a tuple with the Hours field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetHours

`func (o *DiffResponse) SetHours(v int32)`

SetHours sets Hours field to given value.


### GetDays

`func (o *DiffResponse) GetDays() int32`

GetDays returns the Days field if non-nil, zero value otherwise.

### GetDaysOk

`func (o *DiffResponse) GetDaysOk() (*int32, bool)`

GetDaysOk returns a tuple with the Days field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDays

`func (o *DiffResponse) SetDays(v int32)`

SetDays sets Days field to given value.


### GetDirection

`func (o *DiffResponse) GetDirection() string`

GetDirection returns the Direction field if non-nil, zero value otherwise.

### GetDirectionOk

`func (o *DiffResponse) GetDirectionOk() (*string, bool)`

GetDirectionOk returns a tuple with the Direction field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDirection

`func (o *DiffResponse) SetDirection(v string)`

SetDirection sets Direction field to given value.


### GetHuman

`func (o *DiffResponse) GetHuman() string`

GetHuman returns the Human field if non-nil, zero value otherwise.

### GetHumanOk

`func (o *DiffResponse) GetHumanOk() (*string, bool)`

GetHumanOk returns a tuple with the Human field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetHuman

`func (o *DiffResponse) SetHuman(v string)`

SetHuman sets Human field to given value.


### GetFormatted

`func (o *DiffResponse) GetFormatted() string`

GetFormatted returns the Formatted field if non-nil, zero value otherwise.

### GetFormattedOk

`func (o *DiffResponse) GetFormattedOk() (*string, bool)`

GetFormattedOk returns a tuple with the Formatted field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFormatted

`func (o *DiffResponse) SetFormatted(v string)`

SetFormatted sets Formatted field to given value.

### HasFormatted

`func (o *DiffResponse) HasFormatted() bool`

HasFormatted returns a boolean if a field has been set.

### GetBusinessDays

`func (o *DiffResponse) GetBusinessDays() int32`

GetBusinessDays returns the BusinessDays field if non-nil, zero value otherwise.

### GetBusinessDaysOk

`func (o *DiffResponse) GetBusinessDaysOk() (*int32, bool)`

GetBusinessDaysOk returns a tuple with the BusinessDays field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetBusinessDays

`func (o *DiffResponse) SetBusinessDays(v int32)`

SetBusinessDays sets BusinessDays field to given value.

### HasBusinessDays

`func (o *DiffResponse) HasBusinessDays() bool`

HasBusinessDays returns a boolean if a field has been set.

### GetFrom

`func (o *DiffResponse) GetFrom() DiffEndpointRef`

GetFrom returns the From field if non-nil, zero value otherwise.

### GetFromOk

`func (o *DiffResponse) GetFromOk() (*DiffEndpointRef, bool)`

GetFromOk returns a tuple with the From field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFrom

`func (o *DiffResponse) SetFrom(v DiffEndpointRef)`

SetFrom sets From field to given value.


### GetTo

`func (o *DiffResponse) GetTo() DiffEndpointRef`

GetTo returns the To field if non-nil, zero value otherwise.

### GetToOk

`func (o *DiffResponse) GetToOk() (*DiffEndpointRef, bool)`

GetToOk returns a tuple with the To field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTo

`func (o *DiffResponse) SetTo(v DiffEndpointRef)`

SetTo sets To field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


