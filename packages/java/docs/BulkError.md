

# BulkError

Per-item error wrapper used inside bulk arrays returned by bulk-capable routes.

## Properties

| Name | Type | Description | Notes |
|------------ | ------------- | ------------- | -------------|
|**error** | [**ApiError**](ApiError.md) |  |  |
|**requestId** | **String** |  |  |
|**timestamp** | **OffsetDateTime** | Intentionally omitted from public API error responses to avoid exposing request timing; use request_id for support correlation. |  [optional] |
|**item** | **String** |  |  |



