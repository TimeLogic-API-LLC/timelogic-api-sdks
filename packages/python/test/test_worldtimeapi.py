# coding: utf-8
"""Tests for the WorldTimeAPI-compatible client (mocked, plus an optional live check)."""

import json
import os
import unittest

from timelogic_direct_api.worldtimeapi import (
    WorldTimeApiClient,
    WorldTimeApiDateTime,
    WorldTimeApiError,
    WorldTimeApiRawResponse,
    WorldTimeApiUnknownLocationError,
)
from timelogic_direct_api.worldtimeapi.client import FIELD_NAMES

LONDON = {
    "utc_offset": "+00:00", "timezone": "Europe/London", "day_of_week": 0, "day_of_year": 305,
    "datetime": "2026-11-01T03:34:38.413000+00:00", "utc_datetime": "2026-11-01T03:34:38.413000+00:00",
    "unixtime": 1793504078, "raw_offset": 0, "week_number": 44, "dst": False, "abbreviation": "GMT",
    "dst_offset": 0, "dst_from": None, "dst_until": None, "client_ip": "203.0.113.7",
}


class MockTransport:
    def __init__(self, routes):
        self.routes = routes
        self.calls = []

    def __call__(self, url, headers):
        self.calls.append((url, headers))
        path = url.split("://", 1)[1]
        path = path[path.index("/"):].split("?", 1)[0]
        status, body = self.routes.get(path, (404, '{"error":"not found"}'))
        return WorldTimeApiRawResponse(status=status, headers={"x-timelogic-signature": "sig"}, body=body)


class TestWorldTimeApiClient(unittest.TestCase):
    def test_get_timezone_fields_and_header(self):
        transport = MockTransport({"/api/timezone/Europe/London": (200, json.dumps(LONDON))})
        client = WorldTimeApiClient(api_key="test-key", transport=transport)
        value = client.get_timezone("Europe/London")
        self.assertIsInstance(value, WorldTimeApiDateTime)
        self.assertEqual(value.to_dict(), LONDON)
        self.assertEqual(len(FIELD_NAMES), 15)
        self.assertEqual(sorted(value.to_dict()), sorted(FIELD_NAMES))
        url, headers = transport.calls[0]
        self.assertEqual(url, "https://api.timelogicapi.com/api/timezone/Europe/London")
        self.assertEqual(headers["X-API-Key"], "test-key")

    def test_paths(self):
        salta = dict(LONDON, timezone="America/Argentina/Salta")
        transport = MockTransport({
            "/api/timezone": (200, '["Europe/London","UTC"]'),
            "/api/timezone.txt": (200, "Europe/London\nUTC"),
            "/api/timezone/Europe": (200, '["Europe/London"]'),
            "/api/timezone/Europe.txt": (200, "Europe/London"),
            "/api/timezone/America/Argentina/Salta": (200, json.dumps(salta)),
            "/api/timezone/Europe/London.txt": (200, "abbreviation: GMT"),
            "/api/ip": (200, json.dumps(LONDON)),
            "/api/ip/8.8.8.8": (200, json.dumps(LONDON)),
            "/api/ip.txt": (200, "abbreviation: GMT"),
            "/api/ip/8.8.8.8.txt": (200, "abbreviation: GMT"),
        })
        client = WorldTimeApiClient(api_key="k", base_url="https://example.test/", transport=transport)
        self.assertEqual(client.list_timezones(), ["Europe/London", "UTC"])
        self.assertEqual(client.list_timezones_text(), "Europe/London\nUTC")
        self.assertEqual(client.list_timezones_in_area("Europe"), ["Europe/London"])
        self.assertEqual(client.list_timezones_in_area_text("Europe"), "Europe/London")
        self.assertEqual(client.get_timezone("America/Argentina/Salta").timezone, "America/Argentina/Salta")
        self.assertEqual(client.get_timezone_text("Europe/London"), "abbreviation: GMT")
        self.assertEqual(client.get_ip().timezone, "Europe/London")
        self.assertEqual(client.get_ip("8.8.8.8").timezone, "Europe/London")
        self.assertEqual(client.get_ip_text(), "abbreviation: GMT")
        self.assertEqual(client.get_ip_text("8.8.8.8"), "abbreviation: GMT")
        self.assertTrue(all(u.startswith("https://example.test/api/") for u, _ in transport.calls))

    def test_unknown_location(self):
        transport = MockTransport({
            "/api/timezone/Nowhere/Land": (404, '{"error":"unknown location"}'),
            "/api/timezone/Nowhere/Land.txt": (404, "Error: unknown location"),
            "/api/ip/999.1.1.1": (404, '{"error":"malformed ip"}'),
        })
        client = WorldTimeApiClient(api_key="k", transport=transport)
        with self.assertRaises(WorldTimeApiUnknownLocationError) as ctx:
            client.get_timezone("Nowhere/Land")
        self.assertTrue(ctx.exception.is_unknown_location)
        self.assertEqual(ctx.exception.status, 404)
        with self.assertRaises(WorldTimeApiUnknownLocationError):
            client.get_timezone_text("Nowhere/Land")
        with self.assertRaises(WorldTimeApiError) as ctx:
            client.get_ip("999.1.1.1")
        self.assertTrue(ctx.exception.is_malformed_ip)

    def test_auth_error(self):
        transport = MockTransport({
            "/api/timezone/UTC": (401, '{"error":{"code":"UNAUTHORIZED","message":"Missing API key credentials."}}'),
        })
        client = WorldTimeApiClient(api_key="bad", transport=transport)
        with self.assertRaises(WorldTimeApiError) as ctx:
            client.get_timezone("UTC")
        self.assertEqual(ctx.exception.status, 401)
        self.assertEqual(ctx.exception.code, "UNAUTHORIZED")
        self.assertFalse(ctx.exception.is_unknown_location)

    def test_sign(self):
        transport = MockTransport({"/api/timezone/Europe/London": (200, json.dumps(LONDON))})
        client = WorldTimeApiClient(api_key="k", sign=True, transport=transport)
        raw = client.request_raw("/api/timezone/Europe/London")
        self.assertEqual(transport.calls[0][0], "https://api.timelogicapi.com/api/timezone/Europe/London?sign=true")
        self.assertEqual(raw.headers["x-timelogic-signature"], "sig")

    def test_v1_package_unchanged(self):
        import timelogic_direct_api

        self.assertTrue(hasattr(timelogic_direct_api, "TimeApi"))
        self.assertTrue(hasattr(timelogic_direct_api, "create_configuration"))
        self.assertFalse(hasattr(timelogic_direct_api, "WorldTimeApiClient"))

    @unittest.skipUnless(os.environ.get("TIMELOGIC_API_KEY"), "TIMELOGIC_API_KEY is not set")
    def test_live_smoke(self):
        client = WorldTimeApiClient(api_key=os.environ["TIMELOGIC_API_KEY"])
        value = client.get_timezone("Europe/London")
        self.assertEqual(value.timezone, "Europe/London")
        self.assertIn("Europe/London", client.list_timezones())
        with self.assertRaises(WorldTimeApiUnknownLocationError):
            client.get_timezone("Nowhere/Land")


if __name__ == "__main__":
    unittest.main()
