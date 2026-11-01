package com.timelogic.direct.api.v1

import com.sun.net.httpserver.HttpServer
import com.timelogic.direct.api.apis.TimeApi
import com.timelogic.direct.api.apis.UtilityApi
import com.timelogic.direct.api.infrastructure.ApiClient
import com.timelogic.direct.api.infrastructure.ClientError
import com.timelogic.direct.api.infrastructure.ClientException
import com.timelogic.direct.api.infrastructure.Serializer
import com.timelogic.direct.api.infrastructure.TransportConfiguration
import com.timelogic.direct.api.models.ApiError
import com.timelogic.direct.api.models.BulkError
import com.timelogic.direct.api.models.ErrorResponse
import com.timelogic.direct.api.models.GetCurrentTime200Response
import com.timelogic.direct.api.models.JwkKey
import com.timelogic.direct.api.models.TimePayload
import com.timelogic.direct.api.models.TimePayloadBulkResponse
import io.kotlintest.matchers.types.shouldBeInstanceOf
import io.kotlintest.shouldBe
import io.kotlintest.shouldNotBe
import io.kotlintest.shouldThrow
import io.kotlintest.specs.ShouldSpec
import java.net.InetSocketAddress

private const val SINGLE = """{"unix":1772366400,"unix_ms":1772366400000,"utc":"2026-03-01T12:00:00Z","iso_local":"2026-03-01T21:00:00+09:00","rfc2822":"Sun, 01 Mar 2026 21:00:00 +0900","human":"March 1, 2026, 9:00 PM Asia/Tokyo","day_number":1,"day_short":"Sun","day_full":"Sunday","timezone":"Asia/Tokyo"}"""
private const val BULK = """[{"unix":1772366400,"unix_ms":1772366400000,"utc":"2026-03-01T12:00:00Z","iso_local":"2026-03-01T21:00:00+09:00","rfc2822":"Sun, 01 Mar 2026 21:00:00 +0900","human":"March 1, 2026, 9:00 PM Asia/Tokyo","day_number":1,"day_short":"Sun","day_full":"Sunday","timezone":"Asia/Tokyo"},{"item":"Bad/Zone","error":{"code":"INVALID_PARAMETER","message":"Invalid timezone.","details":{"tz":"Bad/Zone"}},"request_id":"a6116a2e-8809-46e9-99c5-765cf0d50fcb"}]"""
private const val TIMEZONE = """{"unix":1772366400,"unix_ms":1772366400000,"utc":"2026-03-01T12:00:00Z","iso_local":"2026-03-01T21:00:00+09:00","rfc2822":"Sun, 01 Mar 2026 21:00:00 +0900","human":"March 1, 2026, 9:00 PM Asia/Tokyo","day_number":1,"day_short":"Sun","day_full":"Sunday","timezone":"Asia/Tokyo","offset":540,"dst":false}"""
private const val OFFSET = """{"unix":1772366400,"unix_ms":1772366400000,"utc":"2026-03-01T12:00:00Z","iso_local":"2026-03-01T17:30:00+05:30","rfc2822":"Sun, 01 Mar 2026 21:00:00 +0900","human":"March 1, 2026, 5:30 PM UTC+05:30","day_number":1,"day_short":"Sun","day_full":"Sunday","timezone":null,"offset":330,"dst":false,"matching_zones":[{"timezone":"Asia/Colombo","offset":330,"dst":false},{"timezone":"Asia/Kolkata","offset":330,"dst":false}]}"""
private const val ERROR = """{"error":{"code":"INVALID_PARAMETER","message":"Invalid timezone.","details":{"tz":"Bad/Zone"}},"request_id":"a6116a2e-8809-46e9-99c5-765cf0d50fcb"}"""

private fun <T> served(status: Int, body: String, call: (TimeApi) -> T): T {
    val server = HttpServer.create(InetSocketAddress("127.0.0.1", 0), 0)
    server.createContext("/") { exchange ->
        val bytes = body.toByteArray()
        exchange.responseHeaders.add("Content-Type", "application/json")
        exchange.sendResponseHeaders(status, bytes.size.toLong())
        exchange.responseBody.use { it.write(bytes) }
    }
    server.start()
    try {
        ApiClient.accessToken = "test-key"
        return call(TimeApi("http://127.0.0.1:${server.address.port}"))
    } finally {
        server.stop(0)
    }
}

private fun liveKey(): String? =
    System.getenv("TIMELOGIC_SDK_TEST_API_KEY")?.takeIf { it.isNotBlank() }
        ?: System.getenv("TIMELOGIC_API_KEY")?.takeIf { it.isNotBlank() }

/**
 * Typed /v1 response decoding. The offline cases serve recorded API responses
 * from a local server. The live cases run only when TIMELOGIC_SDK_TEST_API_KEY
 * (or TIMELOGIC_API_KEY) is set.
 */
class V1ResponsesTest : ShouldSpec() {
    init {
        should("decode a single result as TimePayload") {
            val value = served(200, SINGLE) { it.getCurrentTime(tz = "Asia/Tokyo") }
            value.shouldBeInstanceOf<TimePayload>()
            (value as TimePayload).unixMs shouldBe 1772366400000L
            value.isoLocal shouldBe "2026-03-01T21:00:00+09:00"
        }

        should("decode bulk items as TimePayload or BulkError") {
            val value = served(200, BULK) { it.convertTime(unix = 1772366400L, tz = "Asia/Tokyo,Bad/Zone") }
            value.shouldBeInstanceOf<TimePayloadBulkResponse>()
            val items = value as TimePayloadBulkResponse
            items.size shouldBe 2
            (items[0] as TimePayload).timezone shouldBe "Asia/Tokyo"
            val error = items[1] as BulkError
            error.item shouldBe "Bad/Zone"
            error.error.code shouldBe ApiError.Code.INVALID_PARAMETER
            error.requestId shouldBe "a6116a2e-8809-46e9-99c5-765cf0d50fcb"
            val adapter = Serializer.moshi.adapter(GetCurrentTime200Response::class.java)
            adapter.fromJson(adapter.toJson(value)) shouldBe value
        }

        should("decode timezone and offset lookups") {
            val zone = served(200, TIMEZONE) { it.getTimezone(tz = "Asia/Tokyo") }
            zone.timezone shouldBe "Asia/Tokyo"
            zone.offset shouldBe 540
            zone.matchingZones shouldBe null
            val lookup = served(200, OFFSET) { it.getTimezone(offset = "+05:30") }
            lookup.timezone shouldBe null
            lookup.matchingZones!!.map { it.timezone } shouldBe listOf("Asia/Colombo", "Asia/Kolkata")
            lookup.matchingZones!![1].offset shouldBe 330
            lookup.matchingZones!![1].dst shouldBe false
        }

        should("keep the error code and request id") {
            val raised = shouldThrow<ClientException> { served(400, ERROR) { it.getCurrentTime(tz = "Bad/Zone") } }
            raised.statusCode shouldBe 400
            val body = Serializer.moshi.adapter(ErrorResponse::class.java).fromJson((raised.response as ClientError<*>).body as String)!!
            body.error.code shouldBe ApiError.Code.INVALID_PARAMETER
            body.requestId shouldBe "a6116a2e-8809-46e9-99c5-765cf0d50fcb"
        }

        should("decode every operation against the live API").config(enabled = liveKey() != null) {
            val client = TransportConfiguration.create(liveKey()!!, baseUrl = System.getenv("TIMELOGIC_SDK_TEST_BASE_URL"))
            val api = TimeApi(client.baseUrl)
            (api.getCurrentTime(tz = "America/New_York") as TimePayload).timezone shouldBe "America/New_York"
            val bulk = api.getCurrentTime(tz = "America/New_York,Europe/London,Bad/Zone") as TimePayloadBulkResponse
            (bulk[1] as TimePayload).timezone shouldBe "Europe/London"
            bulk[2].shouldBeInstanceOf<BulkError>()
            (api.convertTime(unix = 1772366400L, tz = "Asia/Tokyo") as TimePayload).isoLocal shouldBe "2026-03-01T21:00:00+09:00"
            val converted = api.convertTime(unix = 1772366400L, offset = "+01:00,+02:00") as TimePayloadBulkResponse
            (converted[1] as TimePayload).isoLocal shouldBe "2026-03-01T14:00:00+02:00"
            api.getTimezone(tz = "Europe/London").matchingZones shouldBe null
            api.getTimezone(offset = "+05:30").matchingZones!![0].offset shouldBe 330
            val diff = api.diffTime("iso=2026-01-01T00:00:00Z", "iso=2026-03-01T12:00:00Z")
            diff.days shouldBe 59
            diff.from.unixMs shouldBe 1767225600000L
            api.addTime(unix = 0L, seconds = 60, utc = true).unix shouldBe 60L
            (api.getCalendar(tz = "America/New_York", week = true).weekNumber!! > 0) shouldBe true
            api.getDst(tz = "America/New_York", next = true).nextTransition shouldNotBe null
            api.getElapsed(iso = "2026-01-01T00:00:00Z", compareIso = "2026-02-01T00:00:00Z").days shouldBe 31
            api.getClock(TimeApi.StyleGetClock.digitalMinusBroadcast, tz = "UTC").contains("timelogic-clock") shouldBe true
            UtilityApi(client.baseUrl).getPublicSigningKey().propertyKeys[0].kty shouldBe JwkKey.Kty.OKP
        }

        should("keep the live error code and request id").config(enabled = liveKey() != null) {
            val client = TransportConfiguration.create(liveKey()!!, baseUrl = System.getenv("TIMELOGIC_SDK_TEST_BASE_URL"))
            val api = TimeApi(client.baseUrl)
            for (call in listOf<() -> Any>(
                { api.getCurrentTime(tz = "Bad/Zone") },
                { api.convertTime(unix = 0L, tz = "Bad/Zone") },
                { api.getTimezone(tz = "Bad/Zone") }
            )) {
                val raised = shouldThrow<ClientException> { call() }
                raised.statusCode shouldBe 400
                val body = Serializer.moshi.adapter(ErrorResponse::class.java).fromJson((raised.response as ClientError<*>).body as String)!!
                body.error.code shouldBe ApiError.Code.INVALID_PARAMETER
                (body.requestId.isNotEmpty()) shouldBe true
            }
        }
    }
}
