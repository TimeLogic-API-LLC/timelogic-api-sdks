

# TimePayloadBulkItem

One bulk array item, either a successful time payload or a per-item bulk error.

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**unix** | **Long** |  |  |
|**unixMs** | **Long** |  |  |
|**utc** | **OffsetDateTime** |  |  |
|**isoLocal** | **String** |  |  |
|**rfc2822** | **String** |  |  |
|**human** | **String** |  |  |
|**dayNumber** | **Integer** | Day of the week counted from Sunday (1 &#x3D; Sunday, 2 &#x3D; Monday ... 7 &#x3D; Saturday). |  |
|**dayShort** | **String** |  |  |
|**dayFull** | **String** |  |  |
|**timezone** | **String** |  |  |
|**formatted** | **String** |  |  [optional] |
|**error** | [**ApiError**](ApiError.md) |  |  |
|**requestId** | **String** |  |  |
|**timestamp** | **OffsetDateTime** | Intentionally omitted from public API error responses, including per-item errors inside bulk arrays, to avoid exposing request timing; use request_id for support correlation. |  [optional] |
|**item** | **String** |  |  |



