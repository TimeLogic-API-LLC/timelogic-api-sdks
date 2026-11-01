# coding: utf-8
"""Typed root-array model for the direct API bulk response."""

from __future__ import annotations

from typing import Any, Dict, Iterator, List, Optional

from pydantic import RootModel, field_validator
from typing_extensions import Self

from timelogic_direct_api.models.time_payload_bulk_item import TimePayloadBulkItem


class TimePayloadBulkResponse(RootModel[List[TimePayloadBulkItem]]):
    """Bulk response array returned by current and convert operations.

    Each item is a TimePayloadBulkItem whose actual_instance is either a
    TimePayload or a BulkError, in the order of the requested selectors.
    """

    @field_validator('root', mode='before')
    @classmethod
    def _decode_items(cls, value: Any) -> Any:
        if isinstance(value, list):
            return [
                item if isinstance(item, TimePayloadBulkItem) else TimePayloadBulkItem.from_dict(item)
                for item in value
            ]
        return value

    def __iter__(self) -> Iterator[TimePayloadBulkItem]:  # type: ignore[override]
        return iter(self.root)

    def __len__(self) -> int:
        return len(self.root)

    def __getitem__(self, index: int) -> TimePayloadBulkItem:
        return self.root[index]

    @classmethod
    def from_json(cls, json_str: str) -> Self:
        return cls.model_validate_json(json_str)

    @classmethod
    def from_dict(cls, obj: Optional[List[Dict[str, Any]]]) -> Self:
        return cls.model_validate(obj)

    def to_json(self) -> str:
        return self.model_dump_json()

    def to_dict(self) -> List[Dict[str, Any]]:
        return [item.to_dict() for item in self.root]
