

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
|**dayNumber** | **Integer** |  |  |
|**dayShort** | **String** |  |  |
|**dayFull** | **String** |  |  |
|**timezone** | **String** |  |  |
|**formatted** | **String** |  |  [optional] |
|**error** | [**ApiError**](ApiError.md) |  |  |
|**requestId** | **String** |  |  |
|**timestamp** | **OffsetDateTime** | Intentionally omitted from public API error responses to avoid exposing request timing; use request_id for support correlation. |  [optional] |
|**item** | **String** |  |  |



