

# JwkKey


## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**kty** | [**KtyEnum**](#KtyEnum) |  |  |
|**crv** | [**CrvEnum**](#CrvEnum) |  |  |
|**alg** | [**AlgEnum**](#AlgEnum) |  |  |
|**use** | [**UseEnum**](#UseEnum) |  |  |
|**kid** | **String** |  |  |
|**x** | **String** |  |  |
|**keyOps** | [**List&lt;KeyOpsEnum&gt;**](#List&lt;KeyOpsEnum&gt;) | Permitted key operations; published keys allow only &#x60;verify&#x60;. |  [optional] |
|**ext** | **Boolean** | JWK extractable flag as exported by the signing worker; always &#x60;true&#x60;. |  [optional] |



## Enum: KtyEnum

| Name | Value |
|---- | -----|
| OKP | &quot;OKP&quot; |



## Enum: CrvEnum

| Name | Value |
|---- | -----|
| ED25519 | &quot;Ed25519&quot; |



## Enum: AlgEnum

| Name | Value |
|---- | -----|
| ED_DSA | &quot;EdDSA&quot; |



## Enum: UseEnum

| Name | Value |
|---- | -----|
| SIG | &quot;sig&quot; |



## Enum: List&lt;KeyOpsEnum&gt;

| Name | Value |
|---- | -----|
| VERIFY | &quot;verify&quot; |



