package com.timelogic.direct.api.worldtimeapi

import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass
import com.squareup.moshi.Moshi
import com.squareup.moshi.Types
import com.squareup.moshi.kotlin.reflect.KotlinJsonAdapterFactory
import okhttp3.HttpUrl.Companion.toHttpUrl
import okhttp3.OkHttpClient
import okhttp3.Request
import java.io.IOException
import java.util.Locale
import java.util.concurrent.TimeUnit

/**
 * Time object returned by `/api/timezone/{zone}` and `/api/ip`, with the worldtimeapi.org
 * field names (JSON) and types.
 */
data class WorldTimeApiDateTime(
    @Json(name = "abbreviation") val abbreviation: String,
    @Json(name = "client_ip") val clientIp: String,
    @Json(name = "datetime") val datetime: String,
    @Json(name = "day_of_week") val dayOfWeek: Int,
    @Json(name = "day_of_year") val dayOfYear: Int,
    @Json(name = "dst") val dst: Boolean,
    @Json(name = "dst_from") val dstFrom: String?,
    @Json(name = "dst_offset") val dstOffset: Int,
    @Json(name = "dst_until") val dstUntil: String?,
    @Json(name = "raw_offset") val rawOffset: Int,
    @Json(name = "timezone") val timezone: String,
    @Json(name = "unixtime") val unixtime: Long,
    @Json(name = "utc_datetime") val utcDatetime: String,
    @Json(name = "utc_offset") val utcOffset: String,
    @Json(name = "week_number") val weekNumber: Int
)

/** HTTP answer, including the X-TimeLogic-Signature* headers when signing is enabled (names lower-case). */
data class WorldTimeApiRawResponse(val status: Int, val headers: Map<String, List<String>>, val body: String) {
    fun header(name: String): String? = headers[name.lowercase(Locale.ROOT)]?.firstOrNull()
}

/**
 * Thrown for any non-2xx answer. [error] is the worldtimeapi.org-style message (for example
 * `unknown location`) or the TimeLogic message for authentication and quota errors.
 */
open class WorldTimeApiException(
    val status: Int,
    val error: String,
    val code: String?,
    val body: String
) : IOException("WorldTimeAPI-compatible request failed ($status): $error") {
    /** True for the 404 `{"error":"unknown location"}` answer. */
    val isUnknownLocation: Boolean get() = status == 404 && error == "unknown location"

    /** True for the 404 `{"error":"malformed ip"}` answer. */
    val isMalformedIp: Boolean get() = status == 404 && error == "malformed ip"

    companion object {
        private const val serialVersionUID: Long = 1L
    }
}

/** The 404 `{"error":"unknown location"}` answer. */
class WorldTimeApiUnknownLocationException(status: Int, error: String, code: String?, body: String) :
    WorldTimeApiException(status, error, code, body) {
    companion object {
        private const val serialVersionUID: Long = 1L
    }
}

/**
 * Client for the TimeLogic API WorldTimeAPI-compatible routes (`/api/ *`).
 *
 * Contract: openapi/openapi-worldtimeapi.yaml. The routes answer the same paths, field names
 * and plain-text variants as worldtimeapi.org; a TimeLogic API key is required and is sent as
 * the `X-API-Key` header. This class does not use or change the generated `/v1` `ApiClient`.
 *
 * ```kotlin
 * val wta = WorldTimeApiClient(System.getenv("TIMELOGIC_API_KEY"))
 * val now = wta.getTimezone("Europe/London")
 * ```
 */
class WorldTimeApiClient @JvmOverloads constructor(
    private val apiKey: String,
    baseUrl: String = DEFAULT_BASE_URL,
    private val sign: Boolean = false,
    httpClient: OkHttpClient? = null
) {
    private val baseUrl: String = baseUrl.trimEnd('/')
    private val client: OkHttpClient = httpClient ?: OkHttpClient.Builder()
        .followRedirects(false)
        .followSslRedirects(false)
        .callTimeout(30, TimeUnit.SECONDS)
        .build()

    init {
        require(apiKey.isNotEmpty()) { "apiKey is required" }
    }

    /** GET /api/timezone */
    fun listTimezones(): List<String> = parseList(getText(listOf("timezone"), false))

    /** GET /api/timezone.txt */
    fun listTimezonesText(): String = getText(listOf("timezone"), true)

    /** GET /api/timezone/{area} */
    fun listTimezonesInArea(area: String): List<String> {
        val body = getText(zoneSegments(area), false)
        if (!body.trimStart().startsWith("[")) {
            throw WorldTimeApiException(200, "$area is a timezone, not an area; use getTimezone", null, body)
        }
        return parseList(body)
    }

    /** GET /api/timezone/{area}.txt */
    fun listTimezonesInAreaText(area: String): String = getText(zoneSegments(area), true)

    /** GET /api/timezone/{area}/{location}[/{region}], or a one-word zone such as UTC. */
    fun getTimezone(timezone: String): WorldTimeApiDateTime = parseTime(getText(zoneSegments(timezone), false))

    /** Plain-text variant of [getTimezone]. */
    fun getTimezoneText(timezone: String): String = getText(zoneSegments(timezone), true)

    /** GET /api/ip (the caller's address) when [ip] is null, else /api/ip/{ip}. */
    @JvmOverloads
    fun getIp(ip: String? = null): WorldTimeApiDateTime = parseTime(getText(ipSegments(ip), false))

    /** Plain-text variant of [getIp]. */
    @JvmOverloads
    fun getIpText(ip: String? = null): String = getText(ipSegments(ip), true)

    /** GET any /api/ * path (segments after "api") without throwing for non-2xx answers. */
    fun requestRaw(pathSegments: List<String>, text: Boolean): WorldTimeApiRawResponse {
        val url = baseUrl.toHttpUrl().newBuilder().addPathSegment("api")
        pathSegments.forEachIndexed { index, segment ->
            url.addPathSegment(if (text && index == pathSegments.size - 1) "$segment.txt" else segment)
        }
        if (sign) url.addQueryParameter("sign", "true")
        val request = Request.Builder()
            .url(url.build())
            .get()
            .header("X-API-Key", apiKey)
            .header("Accept", if (text) "text/plain" else "application/json")
            .build()
        client.newCall(request).execute().use { response ->
            val headers = response.headers.names().associate { it.lowercase(Locale.ROOT) to response.headers(it) }
            return WorldTimeApiRawResponse(response.code, headers, response.body?.string() ?: "")
        }
    }

    private fun getText(pathSegments: List<String>, text: Boolean): String {
        val raw = requestRaw(pathSegments, text)
        if (raw.status !in 200..299) throw errorFromResponse(raw.status, raw.body)
        return raw.body
    }

    companion object {
        /** Default host for the WorldTimeAPI-compatible routes. */
        const val DEFAULT_BASE_URL = "https://api.timelogicapi.com"

        private val moshi: Moshi = Moshi.Builder().addLast(KotlinJsonAdapterFactory()).build()
        private val listAdapter = moshi.adapter<List<String>>(Types.newParameterizedType(List::class.java, String::class.java))
        private val timeAdapter = moshi.adapter(WorldTimeApiDateTime::class.java)
        private val mapAdapter = moshi.adapter<Map<String, Any?>>(
            Types.newParameterizedType(Map::class.java, String::class.java, Any::class.java)
        )

        private fun parseList(body: String): List<String> = listAdapter.fromJson(body) ?: emptyList()

        private fun parseTime(body: String): WorldTimeApiDateTime =
            timeAdapter.fromJson(body) ?: throw IOException("empty WorldTimeAPI-compatible response")

        /** Parses a non-2xx answer. */
        @JvmStatic
        fun errorFromResponse(status: Int, body: String): WorldTimeApiException {
            var message = body.trim()
            var code: String? = null
            if (message.startsWith("Error:")) {
                message = message.removePrefix("Error:").trim()
            } else {
                val parsed = try { mapAdapter.fromJson(body) } catch (e: Exception) { null }
                when (val error = parsed?.get("error")) {
                    is String -> message = error
                    is Map<*, *> -> {
                        message = error["message"]?.toString() ?: ""
                        code = error["code"]?.toString()
                    }
                }
            }
            return if (status == 404 && message == "unknown location") {
                WorldTimeApiUnknownLocationException(status, message, code, body)
            } else {
                WorldTimeApiException(status, message, code, body)
            }
        }

        private fun zoneSegments(timezone: String): List<String> {
            val parts = timezone.split("/").filter { it.isNotEmpty() }
            require(parts.size in 1..3) { "timezone must have one to three segments, for example \"Europe/London\"" }
            return listOf("timezone") + parts
        }

        private fun ipSegments(ip: String?): List<String> =
            if (ip.isNullOrEmpty()) listOf("ip") else listOf("ip", ip)
    }
}
