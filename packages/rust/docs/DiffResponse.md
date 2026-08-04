# DiffResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**seconds** | **i32** |  | 
**minutes** | **i32** |  | 
**hours** | **i32** |  | 
**days** | **i32** |  | 
**direction** | **String** | `forward` means `to` is after `from`. `backward` means `to` is before `from`. `same` means both sides resolve to the same instant. | 
**human** | **String** |  | 
**formatted** | Option<**String**> |  | [optional]
**business_days** | Option<**i32**> |  | [optional]
**from** | [**models::DiffEndpointRef**](DiffEndpointRef.md) |  | 
**to** | [**models::DiffEndpointRef**](DiffEndpointRef.md) |  | 

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


