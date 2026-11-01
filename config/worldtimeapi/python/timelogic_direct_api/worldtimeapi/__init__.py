# coding: utf-8
"""WorldTimeAPI-compatible client for the TimeLogic API ``/api/*`` routes.

Contract: openapi/openapi-worldtimeapi.yaml. The routes answer the same paths,
field names and plain-text variants as worldtimeapi.org; a TimeLogic API key is
required and is sent as the ``X-API-Key`` header.

This subpackage is self-contained: importing it does not change the generated
``/v1`` clients, their configuration or their transport.

    from timelogic_direct_api.worldtimeapi import WorldTimeApiClient

    client = WorldTimeApiClient(api_key=os.environ["TIMELOGIC_API_KEY"])
    now = client.get_timezone("Europe/London")
    print(now.datetime, now.utc_offset)
"""

from timelogic_direct_api.worldtimeapi.client import (
    DEFAULT_BASE_URL,
    WorldTimeApiClient,
    WorldTimeApiDateTime,
    WorldTimeApiError,
    WorldTimeApiRawResponse,
    WorldTimeApiUnknownLocationError,
)

__all__ = [
    "DEFAULT_BASE_URL",
    "WorldTimeApiClient",
    "WorldTimeApiDateTime",
    "WorldTimeApiError",
    "WorldTimeApiRawResponse",
    "WorldTimeApiUnknownLocationError",
]
