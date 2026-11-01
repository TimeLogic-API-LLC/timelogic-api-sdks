<?php

/**
 * WorldTimeAPI-compatible client for the TimeLogic API /api/* routes.
 *
 * Contract: openapi/openapi-worldtimeapi.yaml. The routes answer the same paths, field
 * names and plain-text variants as worldtimeapi.org; a TimeLogic API key is required and
 * is sent as the X-API-Key header. This namespace does not use or change the generated
 * /v1 clients, Configuration or TransportConfiguration.
 */

namespace TimeLogic\Api\WorldTimeApi;

use GuzzleHttp\Client;
use GuzzleHttp\ClientInterface;
use GuzzleHttp\RequestOptions;

/**
 * Example:
 *
 *     $wta = new WorldTimeApiClient(getenv('TIMELOGIC_API_KEY'));
 *     $now = $wta->getTimezone('Europe/London');
 *     echo $now->datetime;
 */
class WorldTimeApiClient
{
    /** Default host for the WorldTimeAPI-compatible routes. */
    public const DEFAULT_BASE_URL = 'https://api.timelogicapi.com';

    /** @var string */
    private $apiKey;
    /** @var string */
    private $baseUrl;
    /** @var bool */
    private $sign;
    /** @var ClientInterface */
    private $httpClient;

    /**
     * @param string $apiKey TimeLogic API key, sent as the X-API-Key header
     * @param string $baseUrl defaults to https://api.timelogicapi.com
     * @param bool $sign adds sign=true so responses carry detached signature headers
     * @param ClientInterface|null $httpClient Guzzle client to use
     */
    public function __construct($apiKey, $baseUrl = self::DEFAULT_BASE_URL, $sign = false, ClientInterface $httpClient = null)
    {
        if (!is_string($apiKey) || $apiKey === '') {
            throw new \InvalidArgumentException('apiKey is required');
        }
        $this->apiKey = $apiKey;
        $this->baseUrl = rtrim($baseUrl === null ? self::DEFAULT_BASE_URL : $baseUrl, '/');
        $this->sign = (bool) $sign;
        $this->httpClient = $httpClient !== null ? $httpClient : new Client([
            RequestOptions::TIMEOUT => 30,
            RequestOptions::ALLOW_REDIRECTS => false,
        ]);
    }

    /** GET /api/timezone @return string[] */
    public function listTimezones()
    {
        return $this->decode($this->getText('/api/timezone'));
    }

    /** GET /api/timezone.txt */
    public function listTimezonesText()
    {
        return $this->getText('/api/timezone.txt');
    }

    /** GET /api/timezone/{area} @return string[] */
    public function listTimezonesInArea($area)
    {
        $body = $this->getText(self::zonePath($area, false));
        $value = $this->decode($body);
        if (!is_array($value) || ($value !== [] && array_keys($value) !== range(0, count($value) - 1))) {
            throw new WorldTimeApiException(200, $area . ' is a timezone, not an area; use getTimezone', null, $body);
        }
        return $value;
    }

    /** GET /api/timezone/{area}.txt */
    public function listTimezonesInAreaText($area)
    {
        return $this->getText(self::zonePath($area, true));
    }

    /** GET /api/timezone/{area}/{location}[/{region}], or a one-word zone such as UTC. */
    public function getTimezone($timezone)
    {
        return WorldTimeApiDateTime::fromArray($this->decode($this->getText(self::zonePath($timezone, false))));
    }

    /** Plain-text variant of getTimezone(). */
    public function getTimezoneText($timezone)
    {
        return $this->getText(self::zonePath($timezone, true));
    }

    /** GET /api/ip (the caller's address) when $ip is null, else /api/ip/{ip}. */
    public function getIp($ip = null)
    {
        return WorldTimeApiDateTime::fromArray($this->decode($this->getText(self::ipPath($ip, false))));
    }

    /** Plain-text variant of getIp(). */
    public function getIpText($ip = null)
    {
        return $this->getText(self::ipPath($ip, true));
    }

    /**
     * GET any /api/* path and return status, headers and body without throwing for non-2xx answers.
     *
     * @return WorldTimeApiRawResponse
     */
    public function requestRaw($path)
    {
        $url = $this->baseUrl . $path . ($this->sign ? '?sign=true' : '');
        $response = $this->httpClient->request('GET', $url, [
            RequestOptions::HEADERS => [
                'X-API-Key' => $this->apiKey,
                'Accept' => substr($path, -4) === '.txt' ? 'text/plain' : 'application/json',
            ],
            RequestOptions::HTTP_ERRORS => false,
            RequestOptions::ALLOW_REDIRECTS => false,
        ]);
        $headers = [];
        foreach ($response->getHeaders() as $name => $values) {
            $headers[strtolower($name)] = implode(', ', $values);
        }
        return new WorldTimeApiRawResponse($response->getStatusCode(), $headers, (string) $response->getBody());
    }

    /** Path for "Europe/London", "America/Argentina/Salta" or a one-word zone such as "UTC". */
    public static function zonePath($timezone, $text)
    {
        $segments = array_values(array_filter(explode('/', (string) $timezone), function ($s) {
            return $s !== '';
        }));
        if (count($segments) < 1 || count($segments) > 3) {
            throw new \InvalidArgumentException('timezone must have one to three segments, for example "Europe/London"');
        }
        return '/api/timezone/' . implode('/', array_map('rawurlencode', $segments)) . ($text ? '.txt' : '');
    }

    /** /api/ip or /api/ip/{ip}. */
    public static function ipPath($ip, $text)
    {
        return ($ip === null || $ip === '' ? '/api/ip' : '/api/ip/' . rawurlencode($ip)) . ($text ? '.txt' : '');
    }

    /** Parses a non-2xx answer. */
    public static function errorFromResponse($status, $body)
    {
        $message = trim((string) $body);
        $code = null;
        if (strpos($message, 'Error:') === 0) {
            $message = trim(substr($message, strlen('Error:')));
        } else {
            $parsed = json_decode((string) $body, true);
            if (is_array($parsed) && array_key_exists('error', $parsed)) {
                if (is_string($parsed['error'])) {
                    $message = $parsed['error'];
                } elseif (is_array($parsed['error'])) {
                    $message = isset($parsed['error']['message']) ? (string) $parsed['error']['message'] : '';
                    $code = isset($parsed['error']['code']) ? (string) $parsed['error']['code'] : null;
                }
            }
        }
        if ($status === 404 && $message === 'unknown location') {
            return new WorldTimeApiUnknownLocationException($status, $message, $code, (string) $body);
        }
        return new WorldTimeApiException($status, $message, $code, (string) $body);
    }

    private function getText($path)
    {
        $raw = $this->requestRaw($path);
        if ($raw->status < 200 || $raw->status > 299) {
            throw self::errorFromResponse($raw->status, $raw->body);
        }
        return $raw->body;
    }

    private function decode($body)
    {
        $value = json_decode($body, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new \UnexpectedValueException('invalid JSON from WorldTimeAPI-compatible route: ' . json_last_error_msg());
        }
        return $value;
    }
}
