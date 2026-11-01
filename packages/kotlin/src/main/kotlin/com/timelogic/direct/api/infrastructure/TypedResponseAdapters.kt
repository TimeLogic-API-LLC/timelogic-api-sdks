package com.timelogic.direct.api.infrastructure

import com.squareup.moshi.JsonAdapter
import com.squareup.moshi.JsonReader
import com.squareup.moshi.JsonWriter
import com.squareup.moshi.Moshi
import com.squareup.moshi.Types
import com.timelogic.direct.api.models.BulkError
import com.timelogic.direct.api.models.GetCurrentTime200Response
import com.timelogic.direct.api.models.TimePayload
import com.timelogic.direct.api.models.TimePayloadBulkItem
import com.timelogic.direct.api.models.TimePayloadBulkResponse
import java.lang.reflect.Type

/**
 * Decodes the sealed /v1 result types: an array is a [TimePayloadBulkResponse],
 * an object with an `error` member is a [BulkError], any other object a [TimePayload].
 */
object TypedResponseAdapterFactory : JsonAdapter.Factory {
    override fun create(type: Type, annotations: Set<Annotation>, moshi: Moshi): JsonAdapter<*>? {
        if (annotations.isNotEmpty()) return null
        return when (Types.getRawType(type)) {
            GetCurrentTime200Response::class.java -> ResultAdapter(moshi)
            TimePayloadBulkItem::class.java -> ItemAdapter(moshi)
            TimePayloadBulkResponse::class.java -> BulkAdapter(moshi)
            else -> null
        }
    }

    private class ItemAdapter(moshi: Moshi) : JsonAdapter<TimePayloadBulkItem>() {
        private val payload = moshi.adapter(TimePayload::class.java)
        private val error = moshi.adapter(BulkError::class.java)

        override fun fromJson(reader: JsonReader): TimePayloadBulkItem? {
            if (reader.peek() == JsonReader.Token.NULL) return reader.nextNull()
            var isError = false
            reader.peekJson().use { peek ->
                peek.beginObject()
                while (peek.hasNext()) {
                    if (peek.nextName() == "error") {
                        isError = true
                        break
                    }
                    peek.skipValue()
                }
            }
            return if (isError) error.fromJson(reader) else payload.fromJson(reader)
        }

        override fun toJson(writer: JsonWriter, value: TimePayloadBulkItem?) {
            when (value) {
                null -> writer.nullValue()
                is TimePayload -> payload.toJson(writer, value)
                is BulkError -> error.toJson(writer, value)
            }
        }
    }

    private class BulkAdapter(moshi: Moshi) : JsonAdapter<TimePayloadBulkResponse>() {
        private val item = ItemAdapter(moshi)

        override fun fromJson(reader: JsonReader): TimePayloadBulkResponse? {
            if (reader.peek() == JsonReader.Token.NULL) return reader.nextNull()
            val items = ArrayList<TimePayloadBulkItem>()
            reader.beginArray()
            while (reader.hasNext()) {
                items.add(item.fromJson(reader) ?: throw com.squareup.moshi.JsonDataException("null bulk item at ${reader.path}"))
            }
            reader.endArray()
            return TimePayloadBulkResponse(items)
        }

        override fun toJson(writer: JsonWriter, value: TimePayloadBulkResponse?) {
            if (value == null) {
                writer.nullValue()
                return
            }
            writer.beginArray()
            value.forEach { item.toJson(writer, it) }
            writer.endArray()
        }
    }

    private class ResultAdapter(moshi: Moshi) : JsonAdapter<GetCurrentTime200Response>() {
        private val payload = moshi.adapter(TimePayload::class.java)
        private val bulk = BulkAdapter(moshi)

        override fun fromJson(reader: JsonReader): GetCurrentTime200Response? = when (reader.peek()) {
            JsonReader.Token.NULL -> reader.nextNull()
            JsonReader.Token.BEGIN_ARRAY -> bulk.fromJson(reader)
            else -> payload.fromJson(reader)
        }

        override fun toJson(writer: JsonWriter, value: GetCurrentTime200Response?) {
            when (value) {
                null -> writer.nullValue()
                is TimePayload -> payload.toJson(writer, value)
                is TimePayloadBulkResponse -> bulk.toJson(writer, value)
            }
        }
    }
}
