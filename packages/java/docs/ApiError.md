

# ApiError


## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**code** | [**CodeEnum**](#CodeEnum) |  |  |
|**message** | **String** |  |  |
|**details** | **Object** | Optional implementation-specific detail payload. |  [optional] |



## Enum: CodeEnum

| Name | Value |
|---- | -----|
| AMBIGUOUS_TARGET | &quot;AMBIGUOUS_TARGET&quot; |
| MISSING_TARGET | &quot;MISSING_TARGET&quot; |
| INVALID_PARAMETER | &quot;INVALID_PARAMETER&quot; |
| INVALID_TIMESTAMP | &quot;INVALID_TIMESTAMP&quot; |
| DEPENDENCY_NOT_READY | &quot;DEPENDENCY_NOT_READY&quot; |
| SIGNING_NOT_READY | &quot;SIGNING_NOT_READY&quot; |
| UNAUTHORIZED | &quot;UNAUTHORIZED&quot; |
| INVALID_AUTH | &quot;INVALID_AUTH&quot; |
| METHOD_NOT_ALLOWED | &quot;METHOD_NOT_ALLOWED&quot; |
| NOT_FOUND | &quot;NOT_FOUND&quot; |
| INTERNAL_ERROR | &quot;INTERNAL_ERROR&quot; |
| SUBSCRIPTION_INACTIVE | &quot;SUBSCRIPTION_INACTIVE&quot; |
| QUOTA_EXCEEDED | &quot;QUOTA_EXCEEDED&quot; |



