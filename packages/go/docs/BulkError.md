# BulkError

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Error** | [**ApiError**](ApiError.md) |  |
**RequestId** | **string** |  |
**Timestamp** | Pointer to **time.Time** | Intentionally omitted from public API error responses to avoid exposing request timing; use request_id for support correlation. | [optional]
**Item** | **string** |  |

## Methods

### NewBulkError

`func NewBulkError(error_ ApiError, requestId string, item string, ) *BulkError`

NewBulkError instantiates a new BulkError object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewBulkErrorWithDefaults

`func NewBulkErrorWithDefaults() *BulkError`

NewBulkErrorWithDefaults instantiates a new BulkError object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetError

`func (o *BulkError) GetError() ApiError`

GetError returns the Error field if non-nil, zero value otherwise.

### GetErrorOk

`func (o *BulkError) GetErrorOk() (*ApiError, bool)`

GetErrorOk returns a tuple with the Error field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetError

`func (o *BulkError) SetError(v ApiError)`

SetError sets Error field to given value.


### GetRequestId

`func (o *BulkError) GetRequestId() string`

GetRequestId returns the RequestId field if non-nil, zero value otherwise.

### GetRequestIdOk

`func (o *BulkError) GetRequestIdOk() (*string, bool)`

GetRequestIdOk returns a tuple with the RequestId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRequestId

`func (o *BulkError) SetRequestId(v string)`

SetRequestId sets RequestId field to given value.


### GetTimestamp

`func (o *BulkError) GetTimestamp() time.Time`

GetTimestamp returns the Timestamp field if non-nil, zero value otherwise.

### GetTimestampOk

`func (o *BulkError) GetTimestampOk() (*time.Time, bool)`

GetTimestampOk returns a tuple with the Timestamp field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTimestamp

`func (o *BulkError) SetTimestamp(v time.Time)`

SetTimestamp sets Timestamp field to given value.

### HasTimestamp

`func (o *BulkError) HasTimestamp() bool`

HasTimestamp returns a boolean if a field has been set.

### GetItem

`func (o *BulkError) GetItem() string`

GetItem returns the Item field if non-nil, zero value otherwise.

### GetItemOk

`func (o *BulkError) GetItemOk() (*string, bool)`

GetItemOk returns a tuple with the Item field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetItem

`func (o *BulkError) SetItem(v string)`

SetItem sets Item field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


