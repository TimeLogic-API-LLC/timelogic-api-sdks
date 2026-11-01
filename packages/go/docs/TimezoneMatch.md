# TimezoneMatch

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Timezone** | **string** | IANA timezone name. |
**Offset** | **int32** | Current UTC offset of the zone in minutes. |
**Dst** | **bool** | Whether daylight saving time is currently in effect in the zone. |

## Methods

### NewTimezoneMatch

`func NewTimezoneMatch(timezone string, offset int32, dst bool, ) *TimezoneMatch`

NewTimezoneMatch instantiates a new TimezoneMatch object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewTimezoneMatchWithDefaults

`func NewTimezoneMatchWithDefaults() *TimezoneMatch`

NewTimezoneMatchWithDefaults instantiates a new TimezoneMatch object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetTimezone

`func (o *TimezoneMatch) GetTimezone() string`

GetTimezone returns the Timezone field if non-nil, zero value otherwise.

### GetTimezoneOk

`func (o *TimezoneMatch) GetTimezoneOk() (*string, bool)`

GetTimezoneOk returns a tuple with the Timezone field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTimezone

`func (o *TimezoneMatch) SetTimezone(v string)`

SetTimezone sets Timezone field to given value.


### GetOffset

`func (o *TimezoneMatch) GetOffset() int32`

GetOffset returns the Offset field if non-nil, zero value otherwise.

### GetOffsetOk

`func (o *TimezoneMatch) GetOffsetOk() (*int32, bool)`

GetOffsetOk returns a tuple with the Offset field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOffset

`func (o *TimezoneMatch) SetOffset(v int32)`

SetOffset sets Offset field to given value.


### GetDst

`func (o *TimezoneMatch) GetDst() bool`

GetDst returns the Dst field if non-nil, zero value otherwise.

### GetDstOk

`func (o *TimezoneMatch) GetDstOk() (*bool, bool)`

GetDstOk returns a tuple with the Dst field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDst

`func (o *TimezoneMatch) SetDst(v bool)`

SetDst sets Dst field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


