from typing import Optional

from timelogic_direct_api.configuration import Configuration

DEFAULT_API_BASE_URL = "https://api.timelogicapi.com"
DEFAULT_RAPID_API_HOST = "timelogic-api-world-time-timezones-time-calculations.p.rapidapi.com"
DEFAULT_RAPID_API_BASE_URL = f"https://{DEFAULT_RAPID_API_HOST}"


def create_configuration(
    api_key: str,
    rapid_api: bool = False,
    base_url: Optional[str] = None,
    rapid_api_host: Optional[str] = None,
) -> Configuration:
    if not api_key or not api_key.strip():
        raise ValueError("api_key is required")
    configuration = Configuration()
    if rapid_api:
        host = (rapid_api_host or DEFAULT_RAPID_API_HOST).strip()
        configuration.host = (base_url or f"https://{host}").rstrip("/")
        configuration.api_key = {"rapidApiKey": api_key.strip(), "rapidApiHost": host}
        configuration.access_token = None
    else:
        configuration.host = (base_url or DEFAULT_API_BASE_URL).rstrip("/")
        configuration.api_key = {}
        configuration.access_token = api_key.strip()
    return configuration
