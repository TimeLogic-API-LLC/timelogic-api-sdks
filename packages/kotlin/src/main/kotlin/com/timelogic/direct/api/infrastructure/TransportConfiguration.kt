package com.timelogic.direct.api.infrastructure

object TransportConfiguration {
    const val DEFAULT_API_BASE_URL = "https://api.timelogicapi.com"
    const val DEFAULT_RAPID_API_HOST = "timelogic-api-world-time-timezones-time-calculations.p.rapidapi.com"
    const val DEFAULT_RAPID_API_BASE_URL = "https://$DEFAULT_RAPID_API_HOST"

    fun create(apiKey: String, rapidApi: Boolean = false, baseUrl: String? = null, rapidApiHost: String? = null): ApiClient {
        require(apiKey.isNotBlank()) { "apiKey is required" }
        val host = rapidApiHost?.takeIf { it.isNotBlank() } ?: DEFAULT_RAPID_API_HOST
        ApiClient.apiKey.clear()
        ApiClient.apiKeyPrefix.clear()
        ApiClient.accessToken = null
        val client = ApiClient(baseUrl?.trimEnd('/') ?: if (rapidApi) "https://$host" else DEFAULT_API_BASE_URL)
        if (rapidApi) {
            ApiClient.apiKey["X-RapidAPI-Key"] = apiKey.trim()
            ApiClient.apiKey["X-RapidAPI-Host"] = host
        } else {
            ApiClient.accessToken = apiKey.trim()
        }
        return client
    }
}
