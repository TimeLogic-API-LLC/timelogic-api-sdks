
# JwkKey

## Properties
| Name | Type | Description | Notes |
| ------------ | ------------- | ------------- | ------------- |
| **kty** | [**inline**](#Kty) |  |  |
| **crv** | [**inline**](#Crv) |  |  |
| **alg** | [**inline**](#Alg) |  |  |
| **use** | [**inline**](#Use) |  |  |
| **kid** | **kotlin.String** |  |  |
| **x** | **kotlin.String** |  |  |
| **keyOps** | [**inline**](#kotlin.collections.List&lt;KeyOps&gt;) | Permitted key operations; published keys allow only &#x60;verify&#x60;. |  [optional] |
| **ext** | **kotlin.Boolean** | JWK extractable flag as exported by the signing worker; always &#x60;true&#x60;. |  [optional] |


<a id="Kty"></a>
## Enum: kty
| Name | Value |
| ---- | ----- |
| kty | OKP |


<a id="Crv"></a>
## Enum: crv
| Name | Value |
| ---- | ----- |
| crv | Ed25519 |


<a id="Alg"></a>
## Enum: alg
| Name | Value |
| ---- | ----- |
| alg | EdDSA |


<a id="Use"></a>
## Enum: use
| Name | Value |
| ---- | ----- |
| use | sig |


<a id="kotlin.collections.List<KeyOps>"></a>
## Enum: key_ops
| Name | Value |
| ---- | ----- |
| keyOps | verify |



