<?php

namespace TimeLogic\Api\Test\Api;

use GuzzleHttp\Client;
use GuzzleHttp\Handler\MockHandler;
use GuzzleHttp\HandlerStack;
use GuzzleHttp\Psr7\Response;
use PHPUnit\Framework\TestCase;
use TimeLogic\Api\Api\TimeApi;
use TimeLogic\Api\Api\UtilityApi;
use TimeLogic\Api\ApiException;
use TimeLogic\Api\Configuration;
use TimeLogic\Api\Model\BulkError;
use TimeLogic\Api\Model\ErrorResponse;
use TimeLogic\Api\Model\TimePayload;
use TimeLogic\Api\Model\TimePayloadBulkResponse;
use TimeLogic\Api\Model\TimezoneMatch;
use TimeLogic\Api\TransportConfiguration;

/**
 * Typed /v1 response decoding. The offline tests send recorded API responses
 * through the real client with a mocked HTTP handler. The live tests run only
 * when TIMELOGIC_SDK_TEST_API_KEY (or TIMELOGIC_API_KEY) is set.
 */
class V1ResponsesTest extends TestCase
{
    const SINGLE = '{"unix":1772366400,"unix_ms":1772366400000,"utc":"2026-03-01T12:00:00Z","iso_local":"2026-03-01T21:00:00+09:00","rfc2822":"Sun, 01 Mar 2026 21:00:00 +0900","human":"March 1, 2026, 9:00 PM Asia/Tokyo","day_number":1,"day_short":"Sun","day_full":"Sunday","timezone":"Asia/Tokyo"}';
    const BULK = '[{"unix":1772366400,"unix_ms":1772366400000,"utc":"2026-03-01T12:00:00Z","iso_local":"2026-03-01T21:00:00+09:00","rfc2822":"Sun, 01 Mar 2026 21:00:00 +0900","human":"March 1, 2026, 9:00 PM Asia/Tokyo","day_number":1,"day_short":"Sun","day_full":"Sunday","timezone":"Asia/Tokyo"},{"item":"Bad/Zone","error":{"code":"INVALID_PARAMETER","message":"Invalid timezone.","details":{"tz":"Bad/Zone"}},"request_id":"a6116a2e-8809-46e9-99c5-765cf0d50fcb"}]';
    const TIMEZONE = '{"unix":1772366400,"unix_ms":1772366400000,"utc":"2026-03-01T12:00:00Z","iso_local":"2026-03-01T21:00:00+09:00","rfc2822":"Sun, 01 Mar 2026 21:00:00 +0900","human":"March 1, 2026, 9:00 PM Asia/Tokyo","day_number":1,"day_short":"Sun","day_full":"Sunday","timezone":"Asia/Tokyo","offset":540,"dst":false}';
    const OFFSET = '{"unix":1772366400,"unix_ms":1772366400000,"utc":"2026-03-01T12:00:00Z","iso_local":"2026-03-01T17:30:00+05:30","rfc2822":"Sun, 01 Mar 2026 21:00:00 +0900","human":"March 1, 2026, 5:30 PM UTC+05:30","day_number":1,"day_short":"Sun","day_full":"Sunday","timezone":null,"offset":330,"dst":false,"matching_zones":[{"timezone":"Asia/Colombo","offset":330,"dst":false},{"timezone":"Asia/Kolkata","offset":330,"dst":false}]}';
    const ERROR = '{"error":{"code":"INVALID_PARAMETER","message":"Invalid timezone.","details":{"tz":"Bad/Zone"}},"request_id":"a6116a2e-8809-46e9-99c5-765cf0d50fcb"}';

    private function api(int $status, string $body): TimeApi
    {
        $stack = HandlerStack::create(new MockHandler([new Response($status, ['Content-Type' => 'application/json'], $body)]));
        $config = (new Configuration())->setHost('https://api.example.test')->setAccessToken('test-key');
        return new TimeApi(new Client(['handler' => $stack]), $config);
    }

    public function testSingleResultIsTypedPayload()
    {
        $value = $this->api(200, self::SINGLE)->getCurrentTime('Asia/Tokyo');
        $this->assertNotInstanceOf(TimePayloadBulkResponse::class, $value);
        $this->assertSame(1772366400000, $value->getUnixMs());
        $this->assertSame('2026-03-01T21:00:00+09:00', $value->getIsoLocal());
    }

    public function testBulkResultItemsAreTimePayloadOrBulkError()
    {
        $value = $this->api(200, self::BULK)->convertTime(1772366400, null, null, null, null, null, null, null, 'Asia/Tokyo,Bad/Zone');
        $this->assertInstanceOf(TimePayloadBulkResponse::class, $value);
        $this->assertCount(2, $value);
        $this->assertInstanceOf(TimePayload::class, $value[0]);
        $this->assertSame('Asia/Tokyo', $value[0]->getTimezone());
        $this->assertSame('2026-03-01T21:00:00+09:00', $value[0]->getIsoLocal());
        $this->assertInstanceOf(BulkError::class, $value[1]);
        $this->assertTrue(TimePayloadBulkResponse::isBulkError($value[1]));
        $this->assertSame('Bad/Zone', $value[1]->getItem());
        $this->assertSame('INVALID_PARAMETER', $value[1]->getError()->getCode());
        $this->assertSame('a6116a2e-8809-46e9-99c5-765cf0d50fcb', $value[1]->getRequestId());
        $this->assertSame('Bad/Zone', json_decode(json_encode($value), true)[1]['item']);
    }

    public function testTimezoneLookupsDecode()
    {
        $zone = $this->api(200, self::TIMEZONE)->getTimezone('Asia/Tokyo');
        $this->assertSame('Asia/Tokyo', $zone->getTimezone());
        $this->assertSame(540, $zone->getOffset());
        $this->assertEmpty($zone->getMatchingZones());
        $offset = $this->api(200, self::OFFSET)->getTimezone(null, null, null, null, '+05:30');
        $this->assertNull($offset->getTimezone());
        $this->assertCount(2, $offset->getMatchingZones());
        $this->assertInstanceOf(TimezoneMatch::class, $offset->getMatchingZones()[1]);
        $this->assertSame('Asia/Kolkata', $offset->getMatchingZones()[1]->getTimezone());
        $this->assertSame(330, $offset->getMatchingZones()[1]->getOffset());
        $this->assertFalse($offset->getMatchingZones()[1]->getDst());
    }

    public function testApiErrorKeepsCodeAndRequestId()
    {
        try {
            $this->api(400, self::ERROR)->getCurrentTime('Bad/Zone');
            $this->fail('expected an ApiException');
        } catch (ApiException $error) {
            $this->assertSame(400, $error->getCode());
            $this->assertInstanceOf(ErrorResponse::class, $error->getResponseObject());
            $this->assertSame('INVALID_PARAMETER', $error->getResponseObject()->getError()->getCode());
            $this->assertSame('a6116a2e-8809-46e9-99c5-765cf0d50fcb', $error->getResponseObject()->getRequestId());
        }
    }

    private function liveConfiguration(): Configuration
    {
        $key = getenv('TIMELOGIC_SDK_TEST_API_KEY') ?: getenv('TIMELOGIC_API_KEY');
        if (!$key) {
            $this->markTestSkipped('set TIMELOGIC_SDK_TEST_API_KEY to run live calls');
        }
        return TransportConfiguration::create($key, false, getenv('TIMELOGIC_SDK_TEST_BASE_URL') ?: null);
    }

    public function testLiveEveryOperationDecodes()
    {
        $config = $this->liveConfiguration();
        $api = new TimeApi(new Client(), $config);
        $this->assertSame('America/New_York', $api->getCurrentTime('America/New_York')->getTimezone());
        $bulk = $api->getCurrentTime('America/New_York,Europe/London,Bad/Zone');
        $this->assertInstanceOf(TimePayloadBulkResponse::class, $bulk);
        $this->assertSame('Europe/London', $bulk[1]->getTimezone());
        $this->assertInstanceOf(BulkError::class, $bulk[2]);
        $this->assertSame('2026-03-01T21:00:00+09:00', $api->convertTime(1772366400, null, null, null, null, null, null, null, 'Asia/Tokyo')->getIsoLocal());
        $converted = $api->convertTime(1772366400, null, null, null, null, null, null, null, null, null, null, null, '+01:00,+02:00');
        $this->assertSame('2026-03-01T14:00:00+02:00', $converted[1]->getIsoLocal());
        $zone = $api->getTimezone('Europe/London');
        $this->assertSame('Europe/London', $zone->getTimezone());
        $this->assertEmpty($zone->getMatchingZones());
        $offset = $api->getTimezone(null, null, null, null, '+05:30');
        $this->assertNull($offset->getTimezone());
        $this->assertSame(330, $offset->getMatchingZones()[0]->getOffset());
        $diff = $api->diffTime('iso=2026-01-01T00:00:00Z', 'iso=2026-03-01T12:00:00Z');
        $this->assertSame(59, $diff->getDays());
        $this->assertSame(1767225600000, $diff->getFrom()->getUnixMs());
        $this->assertSame(60, $api->addTime(0, null, null, null, null, null, null, null, 60, null, null, null, null, null, null, null, null, null, true)->getUnix());
        $this->assertGreaterThan(0, $api->getCalendar(null, null, null, null, null, null, null, null, 'America/New_York', null, null, null, null, null, null, true)->getWeekNumber());
        $this->assertNotNull($api->getDst('America/New_York', null, null, null, null, null, null, true)->getNextTransition());
        $this->assertSame(31, $api->getElapsed(null, null, '2026-01-01T00:00:00Z', null, null, null, null, null, null, null, '2026-02-01T00:00:00Z')->getDays());
        $this->assertStringContainsString('timelogic-clock', $api->getClock('digital-broadcast', null, null, null, null, null, null, null, null, 'UTC'));
        $this->assertSame('OKP', (new UtilityApi(new Client(), $config))->getPublicSigningKey()->getKeys()[0]->getKty());
    }

    public function testLiveApiErrorKeepsCodeAndRequestId()
    {
        $api = new TimeApi(new Client(), $this->liveConfiguration());
        try {
            $api->getCurrentTime('Bad/Zone');
            $this->fail('expected an ApiException');
        } catch (ApiException $error) {
            $this->assertSame(400, $error->getCode());
            $this->assertSame('INVALID_PARAMETER', $error->getResponseObject()->getError()->getCode());
            $this->assertNotEmpty($error->getResponseObject()->getRequestId());
        }
    }
}
