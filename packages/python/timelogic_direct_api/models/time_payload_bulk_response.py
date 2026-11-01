# coding: utf-8
"""Typed root-array model for the direct API bulk response."""

from __future__ import annotations

import json
from typing import Any, Dict, List, Optional

from pydantic import RootModel, model_validator
from typing_extensions import Self

from timelogic_direct_api.models.time_payload_bulk_item import TimePayloadBulkItem


class TimePayloadBulkResponse(RootModel[List[TimePayloadBulkItem]]):
    """Bulk response array returned by current and convert operations."""

    @model_validator(mode="before")
    @classmethod
    def _decode_items(cls, data: Any) -> Any:
        if isinstance(data, list):
            return [TimePayloadBulkItem.from_dict(item) if isinstance(item, dict) else item for item in data]
        return data

    @classmethod
    def from_json(cls, json_str: str) -> Self:
        return cls.model_validate(json.loads(json_str))

    @classmethod
    def from_dict(cls, obj: Optional[List[Dict[str, Any]]]) -> Self:
        return cls.model_validate(obj)

    def to_json(self) -> str:
        return self.model_dump_json()

    def to_dict(self) -> List[Dict[str, Any]]:
        return self.model_dump(mode='json')
