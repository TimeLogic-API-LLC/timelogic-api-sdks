

# ErrorResponse


## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**error** | [**ApiError**](ApiError.md) |  |  |
|**requestId** | **String** |  |  |
|**timestamp** | **OffsetDateTime** | Intentionally omitted from public API error responses, including per-item errors inside bulk arrays, to avoid exposing request timing; use request_id for support correlation. |  [optional] |



