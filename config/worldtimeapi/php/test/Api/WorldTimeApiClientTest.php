<?php

namespace TimeLogic\Api\Test\Api;

use GuzzleHttp\Client;
use GuzzleHttp\Handler\MockHandler;
use GuzzleHttp\HandlerStack;
use GuzzleHttp\Middleware;
use GuzzleHttp\Psr7\Response;
use PHPUnit\Framework\TestCase;
use TimeLogic\Api\WorldTimeApi\WorldTimeApiClient;
use TimeLogic\Api\WorldTimeApi\WorldTimeApiDateTime;
use TimeLogic\Api\WorldTimeApi\WorldTimeApiException;
use TimeLogic\Api\WorldTimeApi\WorldTimeApiUnknownLocationException;

class WorldTimeApiClientTest extends TestCase
{
    const LONDON = '{"utc_offset":"+00:00","timezone":"Europe/London","day_of_week":0,"day_of_year":305,"datetime":"2026-11-01T03:34:38.413000+00:00","utc_datetime":"2026-11-01T03:34:38.413000+00:00","unixtime":1793504078,"raw_offset":0,"week_number":44,"dst":false,"abbreviation":"GMT","dst_offset":0,"dst_from":null,"dst_until":null,"client_ip":"203.0.113.7"}';

    /** @var array */
    private $history = [];

    private function client(array $responses, $sign = false)
    {
        $this->history = [];
        $stack = HandlerStack::create(new MockHandler($responses));
        $stack->push(Middleware::history($this->history));
        return new WorldTimeApiClient('test-key', 'https://example.test/', $sign, new Client(['handler' => $stack]));
    }

    private function path($index)
    {
        return $this->history[$index]['request']->getUri()->getPath();
    }

    public function testGetTimezoneReturnsTheFifteenFields()
    {
        $client = $this->client([new Response(200, [], self::LONDON)]);
        $value = $client->getTimezone('Europe/London');
        $this->assertInstanceOf(WorldTimeApiDateTime::class, $value);
        $this->assertSame('Europe/London', $value->timezone);
        $this->assertSame(1793504078, $value->unixtime);
        $this->assertNull($value->dst_from);
        $this->assertEquals(json_decode(self::LONDON, true), $value->toArray());
        $this->assertCount(15, WorldTimeApiDateTime::FIELDS);
        $this->assertSame('/api/timezone/Europe/London', $this->path(0));
        $this->assertSame('test-key', $this->history[0]['request']->getHeaderLine('X-API-Key'));
    }

    public function testUsesTheWorldTimeApiPaths()
    {
        $client = $this->client([
            new Response(200, [], '["Europe/London","UTC"]'),
            new Response(200, [], "Europe/London\nUTC"),
            new Response(200, [], '["Europe/London"]'),
            new Response(200, [], 'Europe/London'),
            new Response(200, [], self::LONDON),
            new Response(200, [], 'abbreviation: GMT'),
            new Response(200, [], self::LONDON),
            new Response(200, [], self::LONDON),
            new Response(200, [], 'abbreviation: GMT'),
            new Response(200, [], 'abbreviation: GMT'),
        ]);
        $this->assertSame(['Europe/London', 'UTC'], $client->listTimezones());
        $this->assertSame("Europe/London\nUTC", $client->listTimezonesText());
        $this->assertSame(['Europe/London'], $client->listTimezonesInArea('Europe'));
        $this->assertSame('Europe/London', $client->listTimezonesInAreaText('Europe'));
        $this->assertSame('Europe/London', $client->getTimezone('America/Argentina/Salta')->timezone);
        $this->assertSame('abbreviation: GMT', $client->getTimezoneText('Europe/London'));
        $client->getIp();
        $client->getIp('8.8.8.8');
        $client->getIpText();
        $client->getIpText('8.8.8.8');
        $paths = array_map(function ($entry) {
            return $entry['request']->getUri()->getPath();
        }, $this->history);
        $this->assertSame([
            '/api/timezone', '/api/timezone.txt', '/api/timezone/Europe', '/api/timezone/Europe.txt',
            '/api/timezone/America/Argentina/Salta', '/api/timezone/Europe/London.txt',
            '/api/ip', '/api/ip/8.8.8.8', '/api/ip.txt', '/api/ip/8.8.8.8.txt',
        ], $paths);
    }

    public function testUnknownLocationIsItsOwnException()
    {
        $client = $this->client([
            new Response(404, [], '{"error":"unknown location"}'),
            new Response(404, [], 'Error: unknown location'),
            new Response(404, [], '{"error":"malformed ip"}'),
        ]);
        try {
            $client->getTimezone('Nowhere/Land');
            $this->fail('expected an exception');
        } catch (WorldTimeApiUnknownLocationException $e) {
            $this->assertTrue($e->isUnknownLocation());
            $this->assertSame(404, $e->getStatus());
        }
        try {
            $client->getTimezoneText('Nowhere/Land');
            $this->fail('expected an exception');
        } catch (WorldTimeApiUnknownLocationException $e) {
            $this->assertTrue($e->isUnknownLocation());
        }
        try {
            $client->getIp('999.1.1.1');
            $this->fail('expected an exception');
        } catch (WorldTimeApiException $e) {
            $this->assertTrue($e->isMalformedIp());
        }
    }

    public function testAuthErrorsKeepTheTimeLogicCode()
    {
        $client = $this->client([new Response(401, [], '{"error":{"code":"UNAUTHORIZED","message":"Missing API key credentials."}}')]);
        try {
            $client->getTimezone('UTC');
            $this->fail('expected an exception');
        } catch (WorldTimeApiException $e) {
            $this->assertSame(401, $e->getStatus());
            $this->assertSame('UNAUTHORIZED', $e->getErrorCode());
            $this->assertFalse($e->isUnknownLocation());
        }
    }

    public function testSignAddsTheQueryAndRawExposesHeaders()
    {
        $client = $this->client([new Response(200, ['X-TimeLogic-Signature' => 'sig'], self::LONDON)], true);
        $raw = $client->requestRaw('/api/timezone/Europe/London');
        $this->assertSame('sign=true', $this->history[0]['request']->getUri()->getQuery());
        $this->assertSame('sig', $raw->headers['x-timelogic-signature']);
    }

    public function testLiveSmoke()
    {
        $key = getenv('TIMELOGIC_API_KEY');
        if (!$key) {
            $this->markTestSkipped('TIMELOGIC_API_KEY is not set');
        }
        $client = new WorldTimeApiClient($key);
        $this->assertSame('Europe/London', $client->getTimezone('Europe/London')->timezone);
        $this->expectException(WorldTimeApiUnknownLocationException::class);
        $client->getTimezone('Nowhere/Land');
    }
}
