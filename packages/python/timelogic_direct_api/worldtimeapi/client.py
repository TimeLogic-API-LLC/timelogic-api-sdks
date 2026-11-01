# coding: utf-8
"""WorldTimeAPI-compatible client for the TimeLogic API ``/api/*`` routes."""

from __future__ import annotations

import json
from dataclasses import asdict, dataclass, fields
from typing import Any, Callable, Dict, List, Optional
from urllib.parse import quote

import urllib3

DEFAULT_BASE_URL = "https://api.timelogicapi.com"

FIELD_NAMES = (
    "abbreviation",
    "client_ip",
    "datetime",
    "day_of_week",
    "day_of_year",
    "dst",
    "dst_from",
    "dst_offset",
    "dst_until",
    "raw_offset",
    "timezone",
    "unixtime",
    "utc_datetime",
    "utc_offset",
    "week_number",
)


@dataclass(frozen=True)
class WorldTimeApiDateTime:
    """Time object with the worldtimeapi.org field names and types."""

    abbreviation: str
    client_ip: str
    datetime: str
    day_of_week: int
    day_of_year: int
    dst: bool
    dst_from: Optional[str]
    dst_offset: int
    dst_until: Optional[str]
    raw_offset: int
    timezone: str
    unixtime: int
    utc_datetime: str
    utc_offset: str
    week_number: int

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "WorldTimeApiDateTime":
        return cls(**{f.name: data.get(f.name) for f in fields(cls)})

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


@dataclass(frozen=True)
class WorldTimeApiRawResponse:
    """Raw HTTP answer, including ``X-TimeLogic-Signature*`` headers when signing is on."""

    status: int
    headers: Dict[str, str]
    body: str


class WorldTimeApiError(Exception):
    """Raised for any non-2xx answer.

    ``error`` is the worldtimeapi.org-style message (``unknown location``,
    ``malformed ip``) or the TimeLogic message for authentication and quota errors.
    """

    def __init__(self, status: int, error: str, body: str, code: Optional[str] = None) -> None:
        super().__init__(f"WorldTimeAPI-compatible request failed ({status}): {error}")
        self.status = status
        self.error = error
        self.body = body
        self.code = code

    @property
    def is_unknown_location(self) -> bool:
        return self.status == 404 and self.error == "unknown location"

    @property
    def is_malformed_ip(self) -> bool:
        return self.status == 404 and self.error == "malformed ip"


class WorldTimeApiUnknownLocationError(WorldTimeApiError, LookupError):
    """The 404 ``{"error":"unknown location"}`` answer."""


def error_from_response(status: int, body: str) -> WorldTimeApiError:
    message = body.strip()
    code: Optional[str] = None
    if message.startswith("Error:"):
        message = message[len("Error:"):].strip()
    else:
        try:
            parsed = json.loads(body)
        except ValueError:
            parsed = None
        if isinstance(parsed, dict):
            err = parsed.get("error")
            if isinstance(err, str):
                message = err
            elif isinstance(err, dict):
                message = str(err.get("message", ""))
                code = str(err["code"]) if "code" in err else None
    if status == 404 and message == "unknown location":
        return WorldTimeApiUnknownLocationError(status, message, body, code)
    return WorldTimeApiError(status, message, body, code)


def zone_path(timezone: str, text: bool = False) -> str:
    """Path for ``Europe/London``, ``America/Argentina/Salta`` or a one-word zone such as ``UTC``."""
    segments = [s for s in str(timezone).split("/") if s]
    if not 1 <= len(segments) <= 3:
        raise ValueError('timezone must have one to three segments, for example "Europe/London"')
    return "/api/timezone/" + "/".join(quote(s, safe="") for s in segments) + (".txt" if text else "")


def ip_path(ip: Optional[str] = None, text: bool = False) -> str:
    return ("/api/ip/" + quote(ip, safe="") if ip else "/api/ip") + (".txt" if text else "")


Transport = Callable[[str, Dict[str, str]], WorldTimeApiRawResponse]


class WorldTimeApiClient:
    """Client for the WorldTimeAPI-compatible routes.

    :param api_key: TimeLogic API key, sent as the ``X-API-Key`` header.
    :param base_url: defaults to https://api.timelogicapi.com
    :param sign: adds ``sign=true`` so responses carry detached signature headers.
    :param timeout: request timeout in seconds.
    :param transport: optional callable ``(url, headers) -> WorldTimeApiRawResponse`` (for tests).
    """

    def __init__(
        self,
        api_key: str,
        base_url: str = DEFAULT_BASE_URL,
        sign: bool = False,
        timeout: float = 30.0,
        transport: Optional[Transport] = None,
    ) -> None:
        if not api_key:
            raise ValueError("api_key is required")
        self._api_key = api_key
        self._base_url = base_url.rstrip("/")
        self._sign = sign
        self._timeout = timeout
        self._transport = transport
        self._pool: Optional[urllib3.PoolManager] = None

    def list_timezones(self) -> List[str]:
        """GET /api/timezone"""
        return self._get_json("/api/timezone")

    def list_timezones_text(self) -> str:
        """GET /api/timezone.txt"""
        return self._get_text("/api/timezone.txt")

    def list_timezones_in_area(self, area: str) -> List[str]:
        """GET /api/timezone/{area}"""
        value = self._get_json(zone_path(area))
        if not isinstance(value, list):
            raise WorldTimeApiError(200, f"{area} is a timezone, not an area; use get_timezone", json.dumps(value))
        return value

    def list_timezones_in_area_text(self, area: str) -> str:
        """GET /api/timezone/{area}.txt"""
        return self._get_text(zone_path(area, True))

    def get_timezone(self, timezone: str) -> WorldTimeApiDateTime:
        """GET /api/timezone/{area}/{location}[/{region}] or a one-word zone such as ``UTC``."""
        return WorldTimeApiDateTime.from_dict(self._get_json(zone_path(timezone)))

    def get_timezone_text(self, timezone: str) -> str:
        return self._get_text(zone_path(timezone, True))

    def get_ip(self, ip: Optional[str] = None) -> WorldTimeApiDateTime:
        """GET /api/ip (the caller's address) or /api/ip/{ip}."""
        return WorldTimeApiDateTime.from_dict(self._get_json(ip_path(ip)))

    def get_ip_text(self, ip: Optional[str] = None) -> str:
        return self._get_text(ip_path(ip, True))

    def request_raw(self, path: str) -> WorldTimeApiRawResponse:
        """GET any ``/api/*`` path and return status, headers and body without raising."""
        url = self._base_url + path + ("?sign=true" if self._sign else "")
        headers = {
            "X-API-Key": self._api_key,
            "Accept": "text/plain" if path.endswith(".txt") else "application/json",
        }
        if self._transport is not None:
            return self._transport(url, headers)
        if self._pool is None:
            self._pool = urllib3.PoolManager()
        response = self._pool.request(
            "GET", url, headers=headers, timeout=self._timeout, redirect=False, retries=False
        )
        return WorldTimeApiRawResponse(
            status=response.status,
            headers={k.lower(): v for k, v in response.headers.items()},
            body=response.data.decode("utf-8"),
        )

    def _get_text(self, path: str) -> str:
        raw = self.request_raw(path)
        if not 200 <= raw.status < 300:
            raise error_from_response(raw.status, raw.body)
        return raw.body

    def _get_json(self, path: str) -> Any:
        return json.loads(self._get_text(path))
