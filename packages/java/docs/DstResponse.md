

# DstResponse


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
|**dstActive** | **Boolean** |  |  |
|**nextTransition** | **OffsetDateTime** | Present only with &#x60;next&#x3D;true&#x60;. The instant of the next UTC offset change, written in the offset in force before it (e.g. &#x60;2026-11-01T02:00:00-04:00&#x60;); the new offset is not returned. &#x60;null&#x60; when no change is scheduled, for offset targets and with no selector. Tracks offset changes only, so &#x60;dst_active&#x60; can change without one. |  [optional] |



