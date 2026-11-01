# Changelog

All notable changes to the TimeLogic API SDKs. Versions follow [semantic versioning](https://semver.org/); every package in this repository is released with the same version.

## 2.0.0 - 2026-11-01

Every `/v1` response now decodes into typed models in all ten SDKs, including bulk `current` / `convert` calls and `offset` lookups with `timezone`. The API is unchanged; the contract now describes the responses it actually sends. Each package README has a "Migrating from 1.x to 2.0" section with before and after code.

### Breaking changes

- `timezone` returns one model, `TimezoneResponse` (the time payload plus `offset`, `dst`, and `matching_zones` for `offset` lookups). `GetTimezone200Response`, `TimezoneResolvedResponse` and `TimezoneOffsetResponse` are removed.
- `TimezoneMatch`, the `matching_zones` item, is `timezone`, `offset` and `dst`, all required. It previously described a full time payload.
- `timezone` takes the `format` parameter, after `sign`. Calls that pass every argument by position (Java, Rust, and PHP without named arguments) take one more argument.
- TypeScript: `getCurrentTime` and `convertTime` resolve to camelCase `TimePayload` or `TimePayloadBulkResponse` models instead of the API's snake_case JSON. `isTimePayloadBulkResponse()` and `isBulkError()` tell the shapes apart.
- Go: the module path is `github.com/TimeLogic-API-LLC/timelogic-api-sdks/packages/go/v2`, as Go requires for a new major version.
- Rust: `TimePayloadBulkResponse` is `Vec<TimePayloadBulkItem>`.
- .NET and Java: `TimePayloadBulkResponse` is a list of `TimePayloadBulkItem`.
- Kotlin: `GetCurrentTime200Response` and `TimePayloadBulkItem` are sealed interfaces. `TimePayload` and `TimePayloadBulkResponse` implement the first; `TimePayload` and `BulkError` implement the second.
- PHP: bulk calls return `TimePayloadBulkResponse`, a countable and iterable list of `TimePayload` and `BulkError` objects.
- Ruby: bulk calls return `TimePayloadBulkResponse`, an `Array` of `TimePayload` and `BulkError` objects.

### Changed

- Bulk `current` / `convert` responses decode in Rust, Java, Kotlin, .NET, PHP and Ruby; Python bulk results can be iterated, indexed and measured with `len()`.
- `offset` lookups with `timezone` decode with typed `matching_zones` in every language.
- `current` and `convert` accept a comma-separated `tz` list longer than 64 characters and an `offset` list; an invalid value in a list comes back as a `BulkError` item instead of being refused by the client.
- `JwkKey` lists the optional `key_ops` and `ext` members.
- .NET: date-like strings in `current` / `convert` results (`IsoLocal`) keep the API's offset instead of being rewritten in the machine's local offset.
- Live tests for every `/v1` operation run in CI for all ten SDKs when `TIMELOGIC_SDK_TEST_API_KEY` is set.

### Known issues

- None known for `/v1` decoding.

## 1.1.0 - 2026-11-01

### Added

- WorldTimeAPI-compatible client in all ten SDKs, for `/api/timezone`, `/api/timezone/{area}`, `/api/timezone/{area}/{location}[/{region}]`, `/api/ip`, `/api/ip/{ip}` and their `.txt` variants. It returns worldtimeapi.org's paths, field names and plain-text format, sends the key as `X-API-Key`, supports signed responses, and lives in its own namespace without changing any `/v1` class or default.
- `404 NOT_FOUND` responses are documented on every `/v1` route (unknown routes, and IP addresses without a time zone mapping).
- The response headers `X-Auth-Mode`, `X-TimeLogic-Customer-ID`, `X-TimeLogic-Plan`, `X-TimeLogic-Quota-Limit` and `X-TimeLogic-Quota-State` are part of the contract.
- Complete READMEs for every package and the repository: installation, configuration, every operation with examples, errors, headers, quotas, signed responses and known issues. Package READMEs are written from templates in `config/readmes` during generation.

### Changed

- `holiday_country` accepts an ISO 3166-1 alpha-2 code in any letter case, optionally with a subdivision (`US-CA`, `CH-ZH`). The PHP SDK validates `holiday_subdivision` as letters and digits.
- PHP dependency security floors: `guzzlehttp/guzzle` `^7.16.1 || ^8.3.1` (was `^7.3`) and `guzzlehttp/psr7` `^2.13.2 || ^3.2` (was `^1.7 || ^2.0`).
- Rust: every operation's error enum (for example `GetCurrentTimeError`) has a new `Status404` variant. An exhaustive `match` on these enums needs an arm for it or a wildcard.
- Ruby: the client sends only the credentials that are configured. It previously added an empty `api_key` query parameter and empty headers, which the API answers with `401`.
- TypeScript: `getTimezone` returns the decoded zone. It previously returned an empty object.
- Python: bulk `get_current_time` and `convert_time` items decode to `TimePayload` or `BulkError`. They were previously empty.
- .NET: API errors from `GetCurrentTime`, `ConvertTime` and `GetTimezone` throw `ApiException` with the status and body, like every other operation, instead of a deserialization error.
- Kotlin: `getTimezone` decodes `tz`, `ip` and coordinate lookups (`matchingZones` is now nullable), and `getClock` returns the HTML.
- Rust: `get_clock` returns the HTML instead of a JSON parsing error.
- Go and Java: `getPublicSigningKey` accepts the standard JWK members `key_ops` and `ext` in the key set.
- Swift: `+` in query values is sent as `%2B`, so offsets such as `+05:30` and ISO timestamps with a positive offset are accepted.

### Known issues

- Bulk `current` / `convert` responses do not decode in Rust, Java, Kotlin, .NET, PHP and Ruby, and `timezone` lookups by `offset` do not decode (or omit `matching_zones`) in Python, Go, Rust, Java, Kotlin, .NET, Ruby and Swift. Each package README shows how to read these responses directly.
- TypeScript `getCurrentTime` and `convertTime` return the API's snake_case field names rather than the camelCase names of their declared type.
