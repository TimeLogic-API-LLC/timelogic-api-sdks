package com.timelogic.direct.api.worldtimeapi

import com.sun.net.httpserver.HttpServer
import io.kotlintest.shouldBe
import io.kotlintest.shouldThrow
import io.kotlintest.specs.ShouldSpec
import java.net.InetSocketAddress

private const val LONDON = """{"utc_offset":"+00:00","timezone":"Europe/London","day_of_week":0,"day_of_year":305,"datetime":"2026-11-01T03:34:38.413000+00:00","utc_datetime":"2026-11-01T03:34:38.413000+00:00","unixtime":1793504078,"raw_offset":0,"week_number":44,"dst":false,"abbreviation":"GMT","dst_offset":0,"dst_from":null,"dst_until":null,"client_ip":"203.0.113.7"}"""

private class MockServer(private val routes: Map<String, Pair<Int, String>>) : AutoCloseable {
    val paths = mutableListOf<String>()
    val keys = mutableListOf<String?>()
    val queries = mutableListOf<String?>()
    private val server: HttpServer = HttpServer.create(InetSocketAddress("127.0.0.1", 0), 0)

    init {
        server.createContext("/") { exchange ->
            val path = exchange.requestURI.rawPath
            paths.add(path)
            keys.add(exchange.requestHeaders.getFirst("X-API-Key"))
            queries.add(exchange.requestURI.rawQuery)
            val (status, body) = routes[path] ?: (404 to """{"error":"not found"}""")
            val bytes = body.toByteArray()
            exchange.responseHeaders.add("X-TimeLogic-Signature", "sig")
            exchange.sendResponseHeaders(status, bytes.size.toLong())
            exchange.responseBody.use { it.write(bytes) }
        }
        server.start()
    }

    fun client(sign: Boolean = false) = WorldTimeApiClient("test-key", "http://127.0.0.1:${server.address.port}/", sign)

    override fun close() = server.stop(0)
}

class WorldTimeApiClientTest : ShouldSpec() {
    init {
        should("return the 15 worldtimeapi.org fields and send X-API-Key") {
            MockServer(mapOf("/api/timezone/Europe/London" to (200 to LONDON))).use { server ->
                val value = server.client().getTimezone("Europe/London")
                value.timezone shouldBe "Europe/London"
                value.abbreviation shouldBe "GMT"
                value.unixtime shouldBe 1793504078L
                value.dstFrom shouldBe null
                server.keys[0] shouldBe "test-key"
                WorldTimeApiDateTime::class.java.declaredFields.count { !java.lang.reflect.Modifier.isStatic(it.modifiers) } shouldBe 15
            }
        }

        should("use the worldtimeapi.org paths") {
            MockServer(mapOf(
                "/api/timezone" to (200 to """["Europe/London","UTC"]"""),
                "/api/timezone.txt" to (200 to "Europe/London\nUTC"),
                "/api/timezone/Europe" to (200 to """["Europe/London"]"""),
                "/api/timezone/Europe.txt" to (200 to "Europe/London"),
                "/api/timezone/America/Argentina/Salta" to (200 to LONDON),
                "/api/timezone/Europe/London.txt" to (200 to "abbreviation: GMT"),
                "/api/ip" to (200 to LONDON),
                "/api/ip/8.8.8.8" to (200 to LONDON),
                "/api/ip.txt" to (200 to "abbreviation: GMT"),
                "/api/ip/8.8.8.8.txt" to (200 to "abbreviation: GMT")
            )).use { server ->
                val client = server.client()
                client.listTimezones() shouldBe listOf("Europe/London", "UTC")
                client.listTimezonesText() shouldBe "Europe/London\nUTC"
                client.listTimezonesInArea("Europe") shouldBe listOf("Europe/London")
                client.listTimezonesInAreaText("Europe") shouldBe "Europe/London"
                client.getTimezone("America/Argentina/Salta").timezone shouldBe "Europe/London"
                client.getTimezoneText("Europe/London") shouldBe "abbreviation: GMT"
                client.getIp().timezone shouldBe "Europe/London"
                client.getIp("8.8.8.8").timezone shouldBe "Europe/London"
                client.getIpText() shouldBe "abbreviation: GMT"
                client.getIpText("8.8.8.8") shouldBe "abbreviation: GMT"
                server.paths.size shouldBe 10
            }
        }

        should("raise WorldTimeApiUnknownLocationException for unknown locations") {
            MockServer(mapOf(
                "/api/timezone/Nowhere/Land" to (404 to """{"error":"unknown location"}"""),
                "/api/timezone/Nowhere/Land.txt" to (404 to "Error: unknown location"),
                "/api/ip/999.1.1.1" to (404 to """{"error":"malformed ip"}""")
            )).use { server ->
                val client = server.client()
                val e = shouldThrow<WorldTimeApiUnknownLocationException> { client.getTimezone("Nowhere/Land") }
                e.isUnknownLocation shouldBe true
                e.status shouldBe 404
                shouldThrow<WorldTimeApiUnknownLocationException> { client.getTimezoneText("Nowhere/Land") }
                shouldThrow<WorldTimeApiException> { client.getIp("999.1.1.1") }.isMalformedIp shouldBe true
            }
        }

        should("keep the TimeLogic code on auth errors") {
            MockServer(mapOf("/api/timezone/UTC" to (401 to """{"error":{"code":"UNAUTHORIZED","message":"Missing API key credentials."}}"""))).use { server ->
                val e = shouldThrow<WorldTimeApiException> { server.client().getTimezone("UTC") }
                e.status shouldBe 401
                e.code shouldBe "UNAUTHORIZED"
                e.isUnknownLocation shouldBe false
            }
        }

        should("add sign=true and expose signature headers") {
            MockServer(mapOf("/api/timezone/Europe/London" to (200 to LONDON))).use { server ->
                val raw = server.client(sign = true).requestRaw(listOf("timezone", "Europe", "London"), false)
                server.queries[0] shouldBe "sign=true"
                raw.header("X-TimeLogic-Signature") shouldBe "sig"
            }
        }

        val liveKey = System.getenv("TIMELOGIC_API_KEY")
        if (!liveKey.isNullOrEmpty()) {
            should("answer from the live API (TIMELOGIC_API_KEY)") {
                val client = WorldTimeApiClient(liveKey)
                client.getTimezone("Europe/London").timezone shouldBe "Europe/London"
                shouldThrow<WorldTimeApiUnknownLocationException> { client.getTimezone("Nowhere/Land") }
            }
        }
    }
}
