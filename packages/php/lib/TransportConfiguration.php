<?php

namespace TimeLogic\DirectApi;

final class TransportConfiguration
{
    public const DEFAULT_API_BASE_URL = 'https://api.timelogicapi.com';
    public const DEFAULT_RAPID_API_HOST = 'timelogic-api-world-time-timezones-time-calculations.p.rapidapi.com';
    public const DEFAULT_RAPID_API_BASE_URL = 'https://' . self::DEFAULT_RAPID_API_HOST;

    public static function create(string $apiKey, bool $rapidApi = false, ?string $baseUrl = null, ?string $rapidApiHost = null): Configuration
    {
        if (trim($apiKey) === '') {
            throw new \InvalidArgumentException('apiKey is required');
        }
        $host = trim($rapidApiHost ?: self::DEFAULT_RAPID_API_HOST);
        $configuration = new Configuration();
        $configuration->setHost(rtrim($baseUrl ?: ($rapidApi ? 'https://' . $host : self::DEFAULT_API_BASE_URL), '/'));
        if ($rapidApi) {
            $configuration->setApiKey('X-RapidAPI-Key', trim($apiKey));
            $configuration->setApiKey('X-RapidAPI-Host', $host);
        } else {
            $configuration->setAccessToken(trim($apiKey));
        }
        return $configuration;
    }
}
