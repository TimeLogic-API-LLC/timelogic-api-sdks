
# TimePayloadBulkItem

## Properties
| Name | Type | Description | Notes |
| ------------ | ------------- | ------------- | ------------- |
| **unix** | **kotlin.Long** |  |  |
| **unixMs** | **kotlin.Long** |  |  |
| **utc** | [**java.time.OffsetDateTime**](java.time.OffsetDateTime.md) |  |  |
| **isoLocal** | **kotlin.String** |  |  |
| **rfc2822** | **kotlin.String** |  |  |
| **human** | **kotlin.String** |  |  |
| **dayNumber** | **kotlin.Int** | Day of the week counted from Sunday (1 &#x3D; Sunday, 2 &#x3D; Monday ... 7 &#x3D; Saturday). |  |
| **dayShort** | **kotlin.String** |  |  |
| **dayFull** | **kotlin.String** |  |  |
| **timezone** | **kotlin.String** |  |  |
| **error** | [**ApiError**](ApiError.md) |  |  |
| **requestId** | **kotlin.String** |  |  |
| **item** | **kotlin.String** |  |  |
| **formatted** | **kotlin.String** |  |  [optional] |
| **timestamp** | [**java.time.OffsetDateTime**](java.time.OffsetDateTime.md) | Intentionally omitted from public API error responses, including per-item errors inside bulk arrays, to avoid exposing request timing; use request_id for support correlation. |  [optional] |



