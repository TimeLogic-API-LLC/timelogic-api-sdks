# JwkKey

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Kty** | **string** |  |
**Crv** | **string** |  |
**Alg** | **string** |  |
**Use** | **string** |  |
**Kid** | **string** |  |
**X** | **string** |  |
**KeyOps** | Pointer to **[]string** | Permitted key operations; published keys allow only &#x60;verify&#x60;. | [optional]
**Ext** | Pointer to **bool** | JWK extractable flag as exported by the signing worker; always &#x60;true&#x60;. | [optional]

## Methods

### NewJwkKey

`func NewJwkKey(kty string, crv string, alg string, use string, kid string, x string, ) *JwkKey`

NewJwkKey instantiates a new JwkKey object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewJwkKeyWithDefaults

`func NewJwkKeyWithDefaults() *JwkKey`

NewJwkKeyWithDefaults instantiates a new JwkKey object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetKty

`func (o *JwkKey) GetKty() string`

GetKty returns the Kty field if non-nil, zero value otherwise.

### GetKtyOk

`func (o *JwkKey) GetKtyOk() (*string, bool)`

GetKtyOk returns a tuple with the Kty field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetKty

`func (o *JwkKey) SetKty(v string)`

SetKty sets Kty field to given value.


### GetCrv

`func (o *JwkKey) GetCrv() string`

GetCrv returns the Crv field if non-nil, zero value otherwise.

### GetCrvOk

`func (o *JwkKey) GetCrvOk() (*string, bool)`

GetCrvOk returns a tuple with the Crv field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCrv

`func (o *JwkKey) SetCrv(v string)`

SetCrv sets Crv field to given value.


### GetAlg

`func (o *JwkKey) GetAlg() string`

GetAlg returns the Alg field if non-nil, zero value otherwise.

### GetAlgOk

`func (o *JwkKey) GetAlgOk() (*string, bool)`

GetAlgOk returns a tuple with the Alg field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAlg

`func (o *JwkKey) SetAlg(v string)`

SetAlg sets Alg field to given value.


### GetUse

`func (o *JwkKey) GetUse() string`

GetUse returns the Use field if non-nil, zero value otherwise.

### GetUseOk

`func (o *JwkKey) GetUseOk() (*string, bool)`

GetUseOk returns a tuple with the Use field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUse

`func (o *JwkKey) SetUse(v string)`

SetUse sets Use field to given value.


### GetKid

`func (o *JwkKey) GetKid() string`

GetKid returns the Kid field if non-nil, zero value otherwise.

### GetKidOk

`func (o *JwkKey) GetKidOk() (*string, bool)`

GetKidOk returns a tuple with the Kid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetKid

`func (o *JwkKey) SetKid(v string)`

SetKid sets Kid field to given value.


### GetX

`func (o *JwkKey) GetX() string`

GetX returns the X field if non-nil, zero value otherwise.

### GetXOk

`func (o *JwkKey) GetXOk() (*string, bool)`

GetXOk returns a tuple with the X field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetX

`func (o *JwkKey) SetX(v string)`

SetX sets X field to given value.


### GetKeyOps

`func (o *JwkKey) GetKeyOps() []string`

GetKeyOps returns the KeyOps field if non-nil, zero value otherwise.

### GetKeyOpsOk

`func (o *JwkKey) GetKeyOpsOk() (*[]string, bool)`

GetKeyOpsOk returns a tuple with the KeyOps field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetKeyOps

`func (o *JwkKey) SetKeyOps(v []string)`

SetKeyOps sets KeyOps field to given value.

### HasKeyOps

`func (o *JwkKey) HasKeyOps() bool`

HasKeyOps returns a boolean if a field has been set.

### GetExt

`func (o *JwkKey) GetExt() bool`

GetExt returns the Ext field if non-nil, zero value otherwise.

### GetExtOk

`func (o *JwkKey) GetExtOk() (*bool, bool)`

GetExtOk returns a tuple with the Ext field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetExt

`func (o *JwkKey) SetExt(v bool)`

SetExt sets Ext field to given value.

### HasExt

`func (o *JwkKey) HasExt() bool`

HasExt returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


