"""Typed /v1 response decoding.

The offline tests decode recorded API responses with the client's own
deserializer. The live tests run only when TIMELOGIC_SDK_TEST_API_KEY (or
TIMELOGIC_API_KEY) is set.
"""

import json
import os

import pytest

import timelogic_direct_api as sdk
from timelogic_direct_api.transport import create_configuration

SINGLE = {'unix': 1772366400, 'unix_ms': 1772366400000, 'utc': '2026-03-01T12:00:00Z', 'iso_local': '2026-03-01T21:00:00+09:00', 'rfc2822': 'Sun, 01 Mar 2026 21:00:00 +0900', 'human': 'March 1, 2026, 9:00 PM Asia/Tokyo', 'day_number': 1, 'day_short': 'Sun', 'day_full': 'Sunday', 'timezone': 'Asia/Tokyo'}
BULK = [{'unix': 1772366400, 'unix_ms': 1772366400000, 'utc': '2026-03-01T12:00:00Z', 'iso_local': '2026-03-01T21:00:00+09:00', 'rfc2822': 'Sun, 01 Mar 2026 21:00:00 +0900', 'human': 'March 1, 2026, 9:00 PM Asia/Tokyo', 'day_number': 1, 'day_short': 'Sun', 'day_full': 'Sunday', 'timezone': 'Asia/Tokyo'}, {'item': 'Bad/Zone', 'error': {'code': 'INVALID_PARAMETER', 'message': 'Invalid timezone.', 'details': {'tz': 'Bad/Zone'}}, 'request_id': 'a6116a2e-8809-46e9-99c5-765cf0d50fcb'}]
TIMEZONE = {'unix': 1772366400, 'unix_ms': 1772366400000, 'utc': '2026-03-01T12:00:00Z', 'iso_local': '2026-03-01T21:00:00+09:00', 'rfc2822': 'Sun, 01 Mar 2026 21:00:00 +0900', 'human': 'March 1, 2026, 9:00 PM Asia/Tokyo', 'day_number': 1, 'day_short': 'Sun', 'day_full': 'Sunday', 'timezone': 'Asia/Tokyo', 'offset': 540, 'dst': False}
OFFSET = {'unix': 1772366400, 'unix_ms': 1772366400000, 'utc': '2026-03-01T12:00:00Z', 'iso_local': '2026-03-01T17:30:00+05:30', 'rfc2822': 'Sun, 01 Mar 2026 21:00:00 +0900', 'human': 'March 1, 2026, 5:30 PM UTC+05:30', 'day_number': 1, 'day_short': 'Sun', 'day_full': 'Sunday', 'timezone': None, 'offset': 330, 'dst': False, 'matching_zones': [{'timezone': 'Asia/Colombo', 'offset': 330, 'dst': False}, {'timezone': 'Asia/Kolkata', 'offset': 330, 'dst': False}]}


def decode(body, response_type):
    return sdk.ApiClient().deserialize(json.dumps(body), response_type, "application/json")


def test_single_result_is_time_payload():
    value = decode(SINGLE, "GetCurrentTime200Response").actual_instance
    assert isinstance(value, sdk.TimePayload)
    assert value.unix_ms == 1772366400000
    assert value.iso_local == "2026-03-01T21:00:00+09:00"


def test_bulk_result_items_are_time_payload_or_bulk_error():
    value = decode(BULK, "GetCurrentTime200Response").actual_instance
    assert isinstance(value, sdk.TimePayloadBulkResponse)
    items = [item.actual_instance for item in value]
    assert len(value) == 2
    assert isinstance(items[0], sdk.TimePayload)
    assert items[0].timezone == "Asia/Tokyo"
    assert isinstance(items[1], sdk.BulkError)
    assert items[1].item == "Bad/Zone"
    assert items[1].error.code == "INVALID_PARAMETER"
    assert items[1].request_id == BULK[1]["request_id"]
    assert value.to_dict()[1]["item"] == "Bad/Zone"


def test_timezone_lookup_has_no_matching_zones():
    value = decode(TIMEZONE, "TimezoneResponse")
    assert isinstance(value, sdk.TimezoneResponse)
    assert value.timezone == "Asia/Tokyo"
    assert value.offset == 540
    assert value.matching_zones is None


def test_offset_lookup_lists_typed_matching_zones():
    value = decode(OFFSET, "TimezoneResponse")
    assert value.timezone is None
    assert value.offset == 330
    assert [(zone.timezone, zone.offset, zone.dst) for zone in value.matching_zones] == [
        ("Asia/Colombo", 330, False),
        ("Asia/Kolkata", 330, False),
    ]
    assert all(isinstance(zone, sdk.TimezoneMatch) for zone in value.matching_zones)


API_KEY = os.environ.get("TIMELOGIC_SDK_TEST_API_KEY") or os.environ.get("TIMELOGIC_API_KEY")
live = pytest.mark.skipif(not API_KEY, reason="set TIMELOGIC_SDK_TEST_API_KEY to run live calls")


def live_client():
    return sdk.ApiClient(create_configuration(API_KEY, base_url=os.environ.get("TIMELOGIC_SDK_TEST_BASE_URL")))


@live
def test_live_every_operation_decodes():
    api = sdk.TimeApi(live_client())
    single = api.get_current_time(tz="America/New_York").actual_instance
    assert isinstance(single, sdk.TimePayload) and single.timezone == "America/New_York"

    bulk = [item.actual_instance for item in api.get_current_time(tz="America/New_York,Europe/London,Bad/Zone").actual_instance]
    assert bulk[1].timezone == "Europe/London"
    assert isinstance(bulk[2], sdk.BulkError) and bulk[2].error.code == "INVALID_PARAMETER"

    converted = api.convert_time(tz="Asia/Tokyo", unix=1772366400).actual_instance
    assert converted.iso_local == "2026-03-01T21:00:00+09:00"
    converted_bulk = [item.actual_instance for item in api.convert_time(offset="+01:00,+02:00", unix=1772366400).actual_instance]
    assert converted_bulk[1].iso_local == "2026-03-01T14:00:00+02:00"

    zone = api.get_timezone(tz="Europe/London")
    assert zone.timezone == "Europe/London" and zone.matching_zones is None
    offset = api.get_timezone(offset="+05:30")
    assert offset.timezone is None and offset.matching_zones and offset.matching_zones[0].offset == 330

    diff = api.diff_time(var_from="iso=2026-01-01T00:00:00Z", to="iso=2026-03-01T12:00:00Z")
    assert diff.days == 59 and diff.var_from.unix_ms == 1767225600000
    assert api.add_time(unix=0, seconds=60, utc=True).unix == 60
    assert api.get_calendar(tz="America/New_York", week=True).week_number
    assert api.get_dst(tz="America/New_York", next=True).next_transition is not None
    assert api.get_elapsed(iso="2026-01-01T00:00:00Z", compare_iso="2026-02-01T00:00:00Z").days == 31
    assert "timelogic-clock" in api.get_clock(style="digital-broadcast", tz="UTC")
    assert sdk.UtilityApi(live_client()).get_public_signing_key().keys[0].kty == "OKP"


@live
def test_live_api_error_keeps_code_and_request_id():
    with pytest.raises(sdk.ApiException) as caught:
        sdk.TimeApi(live_client()).get_current_time(tz="Bad/Zone")
    assert caught.value.status == 400
    assert isinstance(caught.value.data, sdk.ErrorResponse)
    assert caught.value.data.error.code == "INVALID_PARAMETER"
    assert caught.value.data.request_id
