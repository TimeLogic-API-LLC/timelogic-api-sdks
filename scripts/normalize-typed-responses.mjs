// Typed decoding for responses that can come back in more than one shape.
//
// /v1/time/current and /v1/time/convert return one time payload, or an array
// when one comma-separated tz, ip or offset selector is used. Each array item
// is a time payload or a per-item error. The generators' oneOf support for a
// root array and for array items differs per language, so this pass rewrites
// the affected generated files after normalize-generated.mjs. Every rewrite is
// deterministic and idempotent, and each one names the file it owns.
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';

function rewrite(path, transform) {
  if (!existsSync(path)) throw new Error(`${path} is missing; the generator output changed`);
  const before = readFileSync(path, 'utf8');
  const after = transform(before);
  if (after !== before) writeFileSync(path, after);
}

function replaceOnce(source, search, replacement, label) {
  if (source.includes(replacement)) return source;
  const count = source.split(search).length - 1;
  if (count !== 1) throw new Error(`${label}: expected one match, found ${count}`);
  return source.replace(search, replacement);
}

// Python: pydantic builds a RootModel's items with the item class's own
// constructor, which leaves a oneOf wrapper empty. Decode each item through
// TimePayloadBulkItem.from_dict so actual_instance is a TimePayload or BulkError.
writeFileSync('packages/python/timelogic_direct_api/models/time_payload_bulk_response.py', `# coding: utf-8
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
`);

// TypeScript: the generated oneOf readers test camelCase members on the raw
// snake_case JSON, so they never recognise a time payload and hand back the
// raw object. Choose the branch from the JSON shape instead: an array is a
// bulk response, an item with an `error` member is a per-item error.
const tsModels = 'packages/typescript/src/models';
rewrite(`${tsModels}/GetCurrentTime200Response.ts`, (source) => {
  let next = replaceOnce(source, `    if (instanceOfTimePayload(json)) {
        return TimePayloadFromJSONTyped(json, true);
    }
    if (instanceOfTimePayloadBulkResponse(json)) {
        return TimePayloadBulkResponseFromJSONTyped(json, true);
    }

    return {} as any;`, `    if (Array.isArray(json)) {
        return TimePayloadBulkResponseFromJSONTyped(json, true);
    }
    return TimePayloadFromJSONTyped(json, true);`, 'TS GetCurrentTime200Response reader');
  next = replaceOnce(next, `    if (instanceOfTimePayload(value)) {
        return TimePayloadToJSON(value as TimePayload);
    }
    if (instanceOfTimePayloadBulkResponse(value)) {
        return TimePayloadBulkResponseToJSON(value as TimePayloadBulkResponse);
    }

    return {};`, `    if (Array.isArray(value)) {
        return TimePayloadBulkResponseToJSON(value as TimePayloadBulkResponse);
    }
    return TimePayloadToJSON(value as TimePayload);`, 'TS GetCurrentTime200Response writer');
  next = replaceOnce(next, `export type GetCurrentTime200Response = TimePayload | TimePayloadBulkResponse;
`, `export type GetCurrentTime200Response = TimePayload | TimePayloadBulkResponse;

/**
 * True when a current/convert result is a bulk array (one comma-separated
 * tz, ip or offset selector). Narrows the result to TimePayloadBulkResponse.
 */
export function isTimePayloadBulkResponse(value: GetCurrentTime200Response): value is TimePayloadBulkResponse {
    return Array.isArray(value);
}
`, 'TS bulk type guard');
  return next;
});
rewrite(`${tsModels}/TimePayloadBulkItem.ts`, (source) => {
  let next = replaceOnce(source, `    if (instanceOfBulkError(json)) {
        return BulkErrorFromJSONTyped(json, true);
    }
    if (instanceOfTimePayload(json)) {
        return TimePayloadFromJSONTyped(json, true);
    }

    return {} as any;`, `    if (typeof json === 'object' && 'error' in json) {
        return BulkErrorFromJSONTyped(json, true);
    }
    return TimePayloadFromJSONTyped(json, true);`, 'TS TimePayloadBulkItem reader');
  next = replaceOnce(next, `    if (instanceOfBulkError(value)) {
        return BulkErrorToJSON(value as BulkError);
    }
    if (instanceOfTimePayload(value)) {
        return TimePayloadToJSON(value as TimePayload);
    }

    return {};`, `    if (isBulkError(value)) {
        return BulkErrorToJSON(value);
    }
    return TimePayloadToJSON(value as TimePayload);`, 'TS TimePayloadBulkItem writer');
  next = replaceOnce(next, `export type TimePayloadBulkItem = BulkError | TimePayload;
`, `export type TimePayloadBulkItem = BulkError | TimePayload;

/**
 * True when a bulk item is a per-item error. Narrows the item to BulkError;
 * otherwise it is a TimePayload.
 */
export function isBulkError(value: TimePayloadBulkItem): value is BulkError {
    return value != null && typeof value === 'object' && 'error' in value && 'item' in value;
}
`, 'TS bulk item type guard');
  return next;
});
rewrite(`${tsModels}/TimePayloadBulkResponse.ts`, (source) => {
  let next = replaceOnce(source, `export function TimePayloadBulkResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): TimePayloadBulkResponse {
    return json;
}`, `export function TimePayloadBulkResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): TimePayloadBulkResponse {
    if (json == null) {
        return json;
    }
    return (json as Array<any>).map(TimePayloadBulkItemFromJSON);
}`, 'TS TimePayloadBulkResponse reader');
  next = replaceOnce(next, `export function TimePayloadBulkResponseToJSONTyped(value?: TimePayloadBulkResponse | null, ignoreDiscriminator: boolean = false): any {
    return value;
}`, `export function TimePayloadBulkResponseToJSONTyped(value?: TimePayloadBulkResponse | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }
    return (value as Array<TimePayloadBulkItem>).map(TimePayloadBulkItemToJSON);
}`, 'TS TimePayloadBulkResponse writer');
  next = replaceOnce(next, `export function instanceOfTimePayloadBulkResponse(value: object): value is TimePayloadBulkResponse {
    return true;
}`, `export function instanceOfTimePayloadBulkResponse(value: object): value is TimePayloadBulkResponse {
    return Array.isArray(value);
}`, 'TS TimePayloadBulkResponse guard');
  return next;
});

// Rust: the generator emits the root array as an empty struct, so a bulk
// response decodes to nothing. Model it as the list of untagged items.
writeFileSync('packages/rust/src/models/time_payload_bulk_response.rs', `/*
 * TimeLogic API | A World Time API
 *
 * Code generated by OpenAPI Generator and normalized for Rust's array-model handling.
 */

use crate::models;

/// TimePayloadBulkResponse : Bulk response array returned when \`/v1/time/current\` or \`/v1/time/convert\` receives one comma-separated \`tz\`, \`ip\`, or \`offset\` selector.
/// Each item is a \`TimePayloadBulkItem::TimePayload\` or a \`TimePayloadBulkItem::BulkError\`, in the order of the requested selectors.
pub type TimePayloadBulkResponse = Vec<models::TimePayloadBulkItem>;
`);
rewrite('packages/rust/Cargo.toml', (source) => {
  if (source.includes('[dev-dependencies]')) return source;
  return `${source.replace(/\n*$/, '\n')}\n[dev-dependencies]\ntokio = { version = "^1", features = ["macros", "rt-multi-thread"] }\n`;
});

// Java: the generated root-array model validates and writes itself as a JSON
// object, so every bulk response fails to decode. Validate it as an array of
// TimePayloadBulkItem and read/write each item through the item adapter.
function replaceBetween(source, start, end, replacement, label) {
  const from = source.indexOf(start);
  const to = source.indexOf(end, from);
  if (from < 0 || to < 0 || source.indexOf(start, from + 1) >= 0) throw new Error(`${label}: anchors not found once`);
  return source.slice(0, from) + replacement + source.slice(to);
}
rewrite('packages/java/src/main/java/com/timelogic/direct/model/TimePayloadBulkResponse.java', (source) => replaceBetween(source,
  '  /**\n   * Validates the JSON Element',
  '  /**\n   * Create an instance of TimePayloadBulkResponse given an JSON string',
  `  /**
   * Validates the JSON Element and throws an exception if issues found
   *
   * @param jsonElement JSON Element
   * @throws IOException if the JSON Element is invalid with respect to TimePayloadBulkResponse
   */
  public static void validateJsonElement(JsonElement jsonElement) throws IOException {
    if (jsonElement == null || !jsonElement.isJsonArray()) {
      throw new IllegalArgumentException(String.format("Expected a JSON array for TimePayloadBulkResponse but got \`%s\`", jsonElement));
    }
    for (JsonElement item : jsonElement.getAsJsonArray()) {
      TimePayloadBulkItem.validateJsonElement(item);
    }
  }

  public static class CustomTypeAdapterFactory implements TypeAdapterFactory {
    @SuppressWarnings("unchecked")
    @Override
    public <T> TypeAdapter<T> create(Gson gson, TypeToken<T> type) {
       if (!TimePayloadBulkResponse.class.isAssignableFrom(type.getRawType())) {
         return null; // this class only serializes 'TimePayloadBulkResponse' and its subtypes
       }
       final TypeAdapter<JsonElement> elementAdapter = gson.getAdapter(JsonElement.class);
       final TypeAdapter<TimePayloadBulkItem> itemAdapter = gson.getAdapter(TimePayloadBulkItem.class);

       return (TypeAdapter<T>) new TypeAdapter<TimePayloadBulkResponse>() {
           @Override
           public void write(JsonWriter out, TimePayloadBulkResponse value) throws IOException {
             JsonArray array = new JsonArray();
             for (TimePayloadBulkItem item : value) {
               array.add(itemAdapter.toJsonTree(item));
             }
             elementAdapter.write(out, array);
           }

           @Override
           public TimePayloadBulkResponse read(JsonReader in) throws IOException {
             JsonElement jsonElement = elementAdapter.read(in);
             validateJsonElement(jsonElement);
             TimePayloadBulkResponse result = new TimePayloadBulkResponse();
             for (JsonElement item : jsonElement.getAsJsonArray()) {
               result.add(itemAdapter.fromJsonTree(item));
             }
             return result;
           }

       }.nullSafe();
    }
  }

`, 'Java TimePayloadBulkResponse'));

// .NET: the generated root-array model is an empty class, so a bulk response
// never decodes. Make it the list of oneOf items it describes.
rewrite('packages/csharp/src/TimeLogic.Api/Model/TimePayloadBulkResponse.cs', (source) => {
  const start = source.indexOf('namespace TimeLogic.Api.Model');
  if (start < 0) throw new Error('C# TimePayloadBulkResponse: namespace not found');
  return `${source.slice(0, start)}namespace TimeLogic.Api.Model
{
    /// <summary>
    /// Bulk response array returned when &#x60;/v1/time/current&#x60; or &#x60;/v1/time/convert&#x60; receives one comma-separated &#x60;tz&#x60;, &#x60;ip&#x60;, or &#x60;offset&#x60; selector.
    /// Each item is a <see cref="TimePayloadBulkItem" /> holding a <see cref="TimePayload" /> or a <see cref="BulkError" />, in the order of the requested selectors.
    /// </summary>
    public partial class TimePayloadBulkResponse : List<TimePayloadBulkItem>, IValidatableObject
    {
        /// <summary>
        /// Initializes a new, empty instance of the <see cref="TimePayloadBulkResponse" /> class.
        /// </summary>
        [JsonConstructorAttribute]
        public TimePayloadBulkResponse()
        {
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="TimePayloadBulkResponse" /> class with the given items.
        /// </summary>
        /// <param name="items">Bulk items in request order.</param>
        public TimePayloadBulkResponse(IEnumerable<TimePayloadBulkItem> items) : base(items)
        {
        }

        /// <summary>
        /// Returns the string presentation of the object
        /// </summary>
        /// <returns>String presentation of the object</returns>
        public override string ToString()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("class TimePayloadBulkResponse {\\n");
            foreach (TimePayloadBulkItem item in this)
            {
                sb.Append("  ").Append(item).Append("\\n");
            }
            sb.Append("}\\n");
            return sb.ToString();
        }

        /// <summary>
        /// Returns the JSON string presentation of the object
        /// </summary>
        /// <returns>JSON string presentation of the object</returns>
        public virtual string ToJson()
        {
            return Newtonsoft.Json.JsonConvert.SerializeObject(this, Newtonsoft.Json.Formatting.Indented);
        }

        /// <summary>
        /// To validate all properties of the instance
        /// </summary>
        /// <param name="validationContext">Validation context</param>
        /// <returns>Validation Result</returns>
        IEnumerable<ValidationResult> IValidatableObject.Validate(ValidationContext validationContext)
        {
            yield break;
        }
    }

}
`;
});


// .NET: oneOf readers re-read nested JSON through JObject, and Json.NET's
// default date parsing turns iso_local into a DateTime and writes it back in
// the machine's local offset. Keep date-like strings as strings while
// decoding oneOf results; DateTime properties still parse from the string.
rewrite('packages/csharp/src/TimeLogic.Api/Model/AbstractOpenAPISchema.cs', (source) => {
  const marker = '            ConstructorHandling = ConstructorHandling.AllowNonPublicDefaultConstructor,\n';
  if (source.includes('DateParseHandling = DateParseHandling.None')) return source;
  const count = source.split(marker).length - 1;
  if (count !== 2) throw new Error(`C# AbstractOpenAPISchema: expected two serializer settings, found ${count}`);
  return source.replaceAll(marker, `${marker}            DateParseHandling = DateParseHandling.None,\n`);
});

// PHP: the generator merges oneOf members into one object model, so a bulk
// array decodes into an empty GetCurrentTime200Response. Decode arrays into a
// TimePayloadBulkResponse collection whose items are TimePayload or BulkError.
rewrite('packages/php/lib/Model/TimePayloadBulkResponse.php', (source) => {
  const start = source.indexOf('namespace TimeLogic\\Api\\Model;');
  if (start < 0) throw new Error('PHP TimePayloadBulkResponse: namespace not found');
  return `${source.slice(0, start)}namespace TimeLogic\\Api\\Model;

use ArrayAccess;
use ArrayIterator;
use Countable;
use IteratorAggregate;
use JsonSerializable;
use TimeLogic\\Api\\ObjectSerializer;

/**
 * TimePayloadBulkResponse
 *
 * Bulk response array returned when \`/v1/time/current\` or \`/v1/time/convert\`
 * receives one comma-separated \`tz\`, \`ip\`, or \`offset\` selector. Each item is
 * a TimePayload or, for a selector that failed, a BulkError, in request order.
 *
 * @category Class
 * @package  TimeLogic\\Api
 * @implements ArrayAccess<int, TimePayload|BulkError>
 * @implements IteratorAggregate<int, TimePayload|BulkError>
 */
class TimePayloadBulkResponse implements ArrayAccess, Countable, IteratorAggregate, JsonSerializable
{
    /** @var array<int, TimePayload|BulkError> */
    private $items;

    /**
     * @param array<int, TimePayload|BulkError> $items
     */
    public function __construct(array $items = [])
    {
        $this->items = array_values($items);
    }

    /**
     * Decodes a JSON-decoded bulk array. Items with an \`error\` member become
     * BulkError, every other item becomes TimePayload.
     *
     * @param array<int, mixed> $data
     */
    public static function fromDecodedJson(array $data): self
    {
        $items = [];
        foreach ($data as $item) {
            $isError = is_object($item) ? property_exists($item, 'error') : (is_array($item) && array_key_exists('error', $item));
            $items[] = ObjectSerializer::deserialize($item, $isError ? '\\TimeLogic\\Api\\Model\\BulkError' : '\\TimeLogic\\Api\\Model\\TimePayload', []);
        }
        return new self($items);
    }

    /**
     * @return array<int, TimePayload|BulkError>
     */
    public function getItems(): array
    {
        return $this->items;
    }

    public static function isBulkError($item): bool
    {
        return $item instanceof BulkError;
    }

    public function offsetExists($offset): bool
    {
        return isset($this->items[$offset]);
    }

    #[\\ReturnTypeWillChange]
    public function offsetGet($offset)
    {
        return $this->items[$offset] ?? null;
    }

    public function offsetSet($offset, $value): void
    {
        if ($offset === null) {
            $this->items[] = $value;
        } else {
            $this->items[$offset] = $value;
        }
    }

    public function offsetUnset($offset): void
    {
        unset($this->items[$offset]);
        $this->items = array_values($this->items);
    }

    public function count(): int
    {
        return count($this->items);
    }

    public function getIterator(): ArrayIterator
    {
        return new ArrayIterator($this->items);
    }

    #[\\ReturnTypeWillChange]
    public function jsonSerialize()
    {
        return array_map(static function ($item) {
            return ObjectSerializer::sanitizeForSerialization($item);
        }, $this->items);
    }

    public function __toString()
    {
        return json_encode($this->jsonSerialize(), JSON_PRETTY_PRINT);
    }
}
`;
});
rewrite('packages/php/lib/ObjectSerializer.php', (source) => replaceOnce(source,
  `        if (null === $data) {
            return null;
        }

        if (strcasecmp(substr($class, -2), '[]') === 0) {`,
  `        if (null === $data) {
            return null;
        }

        // current/convert answer one payload, or a JSON array for one
        // comma-separated selector; the array decodes into a typed collection.
        if (($class === '\\TimeLogic\\Api\\Model\\GetCurrentTime200Response' || $class === '\\TimeLogic\\Api\\Model\\TimePayloadBulkResponse')
            && is_array($data = is_string($data) ? json_decode($data) : $data)) {
            return \\TimeLogic\\Api\\Model\\TimePayloadBulkResponse::fromDecodedJson($data);
        }

        if (strcasecmp(substr($class, -2), '[]') === 0) {`,
  'PHP bulk deserialization'));
rewrite('packages/php/lib/Api/TimeApi.php', (source) => source
  .replaceAll('     * @return \\TimeLogic\\Api\\Model\\GetCurrentTime200Response|', '     * @return \\TimeLogic\\Api\\Model\\GetCurrentTime200Response|\\TimeLogic\\Api\\Model\\TimePayloadBulkResponse|')
  .replaceAll('     * @return array of \\TimeLogic\\Api\\Model\\GetCurrentTime200Response|', '     * @return array of \\TimeLogic\\Api\\Model\\GetCurrentTime200Response|\\TimeLogic\\Api\\Model\\TimePayloadBulkResponse|')
  .replaceAll('|\\TimeLogic\\Api\\Model\\TimePayloadBulkResponse|\\TimeLogic\\Api\\Model\\TimePayloadBulkResponse|', '|\\TimeLogic\\Api\\Model\\TimePayloadBulkResponse|'));

// Ruby: the generated root-array model only builds from a Hash, so the oneOf
// caster rejects every bulk array and the call returns nil. Build it from the
// array, casting each item through the TimePayloadBulkItem oneOf.
rewrite('packages/ruby/lib/timelogic-api/models/time_payload_bulk_response.rb', (source) => {
  const start = source.search(/^(require 'date'|module TimeLogic::Api)$/m);
  if (start < 0) throw new Error('Ruby TimePayloadBulkResponse: header not found');
  return `${source.slice(0, start)}module TimeLogic::Api
  # Bulk response array returned when \`/v1/time/current\` or \`/v1/time/convert\`
  # receives one comma-separated \`tz\`, \`ip\`, or \`offset\` selector. Each item is
  # a TimePayload or, for a selector that failed, a BulkError, in request order.
  class TimePayloadBulkResponse < Array
    # The oneOf caster calls build for models that answer openapi_one_of.
    # This model is not a oneOf itself; it answers so its items are cast.
    def self.openapi_one_of
      [:TimePayloadBulkItem]
    end

    # Builds the bulk array from parsed JSON, or returns nil for anything else.
    # @param [Array] data Parsed JSON array
    # @return [TimePayloadBulkResponse, nil]
    def self.build(data)
      return nil unless data.is_a?(Array)
      items = data.map do |item|
        TimePayloadBulkItem.build(item) || fail(ArgumentError, "#{item} is neither a TimePayload nor a BulkError")
      end
      new(items)
    end

    # @see build
    def self.build_from_hash(data)
      build(data)
    end

    # True when the item is a per-item error.
    def self.bulk_error?(item)
      item.is_a?(BulkError)
    end

    # Returns the items as plain hashes, in the API's JSON shape.
    # @return [Array<Hash>]
    def to_hash
      map { |item| item.respond_to?(:to_hash) ? item.to_hash : item }
    end
    alias to_body to_hash

    def to_s
      to_hash.to_s
    end
  end
end
`;
});

// Kotlin: the generator flattens each oneOf into one data class whose members
// are all required, so neither a bulk array nor a bulk item can decode. Model
// them as sealed interfaces: TimePayload and TimePayloadBulkResponse are the
// two GetCurrentTime200Response shapes; TimePayload and BulkError are the two
// TimePayloadBulkItem shapes. A Moshi factory picks the shape from the JSON.
{
  const models = 'packages/kotlin/src/main/kotlin/com/timelogic/direct/api/models';
  const infra = 'packages/kotlin/src/main/kotlin/com/timelogic/direct/api/infrastructure';
  const head = (source, name) => {
    const start = source.indexOf('package com.timelogic.direct.api.models');
    if (start < 0) throw new Error(`Kotlin ${name}: package line not found`);
    return source.slice(0, start);
  };
  rewrite(`${models}/GetCurrentTime200Response.kt`, (source) => `${head(source, 'GetCurrentTime200Response')}package com.timelogic.direct.api.models

/**
 * The \`/v1/time/current\` and \`/v1/time/convert\` result: a [TimePayload] for one
 * target, or a [TimePayloadBulkResponse] for a comma-separated selector list.
 */
sealed interface GetCurrentTime200Response
`);
  rewrite(`${models}/TimePayloadBulkItem.kt`, (source) => `${head(source, 'TimePayloadBulkItem')}package com.timelogic.direct.api.models

/**
 * One bulk array item: a [TimePayload], or a [BulkError] for a selector that failed.
 */
sealed interface TimePayloadBulkItem
`);
  rewrite(`${models}/TimePayloadBulkResponse.kt`, (source) => `${head(source, 'TimePayloadBulkResponse')}package com.timelogic.direct.api.models

/**
 * Bulk response array returned when \`/v1/time/current\` or \`/v1/time/convert\` receives one comma-separated \`tz\`, \`ip\`, or \`offset\` selector.
 * Items are in request order; each is a [TimePayload] or a [BulkError].
 */
class TimePayloadBulkResponse(
    items: kotlin.collections.Collection<TimePayloadBulkItem> = emptyList()
) : kotlin.collections.ArrayList<TimePayloadBulkItem>(items), GetCurrentTime200Response
`);
  rewrite(`${models}/TimePayload.kt`, (source) => {
    if (source.includes(') : GetCurrentTime200Response, TimePayloadBulkItem {')) return source;
    const at = source.indexOf('data class TimePayload (');
    const close = source.indexOf('\n) {\n', at);
    if (at < 0 || close < 0) throw new Error('Kotlin TimePayload: class header not found');
    return `${source.slice(0, close)}\n) : GetCurrentTime200Response, TimePayloadBulkItem {\n${source.slice(close + 5)}`;
  });
  rewrite(`${models}/BulkError.kt`, (source) => {
    if (source.includes(') : TimePayloadBulkItem {')) return source;
    const at = source.indexOf('data class BulkError (');
    const close = source.indexOf('\n) {\n', at);
    if (at < 0 || close < 0) throw new Error('Kotlin BulkError: class header not found');
    return `${source.slice(0, close)}\n) : TimePayloadBulkItem {\n${source.slice(close + 5)}`;
  });
  writeFileSync(`${infra}/TypedResponseAdapters.kt`, `package com.timelogic.direct.api.infrastructure

import com.squareup.moshi.JsonAdapter
import com.squareup.moshi.JsonReader
import com.squareup.moshi.JsonWriter
import com.squareup.moshi.Moshi
import com.squareup.moshi.Types
import com.timelogic.direct.api.models.BulkError
import com.timelogic.direct.api.models.GetCurrentTime200Response
import com.timelogic.direct.api.models.TimePayload
import com.timelogic.direct.api.models.TimePayloadBulkItem
import com.timelogic.direct.api.models.TimePayloadBulkResponse
import java.lang.reflect.Type

/**
 * Decodes the sealed /v1 result types: an array is a [TimePayloadBulkResponse],
 * an object with an \`error\` member is a [BulkError], any other object a [TimePayload].
 */
object TypedResponseAdapterFactory : JsonAdapter.Factory {
    override fun create(type: Type, annotations: Set<Annotation>, moshi: Moshi): JsonAdapter<*>? {
        if (annotations.isNotEmpty()) return null
        return when (Types.getRawType(type)) {
            GetCurrentTime200Response::class.java -> ResultAdapter(moshi)
            TimePayloadBulkItem::class.java -> ItemAdapter(moshi)
            TimePayloadBulkResponse::class.java -> BulkAdapter(moshi)
            else -> null
        }
    }

    private class ItemAdapter(moshi: Moshi) : JsonAdapter<TimePayloadBulkItem>() {
        private val payload = moshi.adapter(TimePayload::class.java)
        private val error = moshi.adapter(BulkError::class.java)

        override fun fromJson(reader: JsonReader): TimePayloadBulkItem? {
            if (reader.peek() == JsonReader.Token.NULL) return reader.nextNull()
            var isError = false
            reader.peekJson().use { peek ->
                peek.beginObject()
                while (peek.hasNext()) {
                    if (peek.nextName() == "error") {
                        isError = true
                        break
                    }
                    peek.skipValue()
                }
            }
            return if (isError) error.fromJson(reader) else payload.fromJson(reader)
        }

        override fun toJson(writer: JsonWriter, value: TimePayloadBulkItem?) {
            when (value) {
                null -> writer.nullValue()
                is TimePayload -> payload.toJson(writer, value)
                is BulkError -> error.toJson(writer, value)
            }
        }
    }

    private class BulkAdapter(moshi: Moshi) : JsonAdapter<TimePayloadBulkResponse>() {
        private val item = ItemAdapter(moshi)

        override fun fromJson(reader: JsonReader): TimePayloadBulkResponse? {
            if (reader.peek() == JsonReader.Token.NULL) return reader.nextNull()
            val items = ArrayList<TimePayloadBulkItem>()
            reader.beginArray()
            while (reader.hasNext()) {
                items.add(item.fromJson(reader) ?: throw com.squareup.moshi.JsonDataException("null bulk item at \${reader.path}"))
            }
            reader.endArray()
            return TimePayloadBulkResponse(items)
        }

        override fun toJson(writer: JsonWriter, value: TimePayloadBulkResponse?) {
            if (value == null) {
                writer.nullValue()
                return
            }
            writer.beginArray()
            value.forEach { item.toJson(writer, it) }
            writer.endArray()
        }
    }

    private class ResultAdapter(moshi: Moshi) : JsonAdapter<GetCurrentTime200Response>() {
        private val payload = moshi.adapter(TimePayload::class.java)
        private val bulk = BulkAdapter(moshi)

        override fun fromJson(reader: JsonReader): GetCurrentTime200Response? = when (reader.peek()) {
            JsonReader.Token.NULL -> reader.nextNull()
            JsonReader.Token.BEGIN_ARRAY -> bulk.fromJson(reader)
            else -> payload.fromJson(reader)
        }

        override fun toJson(writer: JsonWriter, value: GetCurrentTime200Response?) {
            when (value) {
                null -> writer.nullValue()
                is TimePayload -> payload.toJson(writer, value)
                is TimePayloadBulkResponse -> bulk.toJson(writer, value)
            }
        }
    }
}
`);
  rewrite(`${infra}/Serializer.kt`, (source) => replaceOnce(source,
    '        .add(URIAdapter())\n        .add(KotlinJsonAdapterFactory())\n',
    '        .add(URIAdapter())\n        .add(TypedResponseAdapterFactory)\n        .add(KotlinJsonAdapterFactory())\n',
    'Kotlin typed response adapters'));
}

// Typed-response tests live in config/v1-tests/<language>/ and mirror each
// package's layout, like the WorldTimeAPI client sources. They decode recorded
// API responses offline and make live calls when TIMELOGIC_SDK_TEST_API_KEY is set.
function testFilesUnder(directory) {
  const result = [];
  for (const name of readdirSync(directory).sort()) {
    const file = path.join(directory, name);
    if (statSync(file).isDirectory()) result.push(...testFilesUnder(file));
    else result.push(file);
  }
  return result;
}
const testSourceRoot = 'config/v1-tests';
for (const language of readdirSync(testSourceRoot).sort()) {
  const languageRoot = path.join(testSourceRoot, language);
  if (!statSync(languageRoot).isDirectory()) continue;
  for (const source of testFilesUnder(languageRoot)) {
    const target = path.join('packages', language, path.relative(languageRoot, source));
    if (existsSync(target) && readFileSync(target, 'utf8') !== readFileSync(source, 'utf8')) {
      throw new Error(`${target} already exists in the generated package; typed-response tests must be new files`);
    }
    mkdirSync(path.dirname(target), { recursive: true });
    copyFileSync(source, target);
  }
}
