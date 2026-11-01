// Response-decoding and authentication adjustments applied after
// normalize-generated.mjs. Each change replaces an exact generated snippet and
// stops generation if that snippet is missing, so a generator upgrade cannot
// silently drop it. The typed decoding of bulk arrays, bulk items and
// timezone lookups lives in normalize-typed-responses.mjs.
import { readFileSync, writeFileSync } from 'node:fs';

function replaceOnce(file, before, after, label) {
  const source = readFileSync(file, 'utf8');
  if (source.includes(after)) return;
  const count = source.split(before).length - 1;
  if (count !== 1) throw new Error(`${label}: expected the generated snippet once in ${file}, found ${count}`);
  writeFileSync(file, source.replace(before, after));
}

// Ruby: the generated client sends every configured auth scheme, including the
// unset ones as an empty `api_key=` query parameter and empty headers. The API
// rejects that request with 401, so only credentials that have a value are sent.
replaceOnce(
  'packages/ruby/lib/timelogic-api/api_client.rb',
  `        auth_setting = @config.auth_settings[auth_name]
        next unless auth_setting
`,
  `        auth_setting = @config.auth_settings[auth_name]
        next unless auth_setting
        value = auth_setting[:value].to_s.strip
        next if value.empty? || value == 'Bearer'
`,
  'ruby auth'
);

// .NET: decode a oneOf response body only for successful responses, so API
// errors on current, convert and timezone raise ApiException with the error
// body instead of a deserialization error.
replaceOnce(
  'packages/csharp/src/TimeLogic.Api/Client/ApiClient.cs',
  `                if (typeof(AbstractOpenAPISchema).IsAssignableFrom(typeof(T)))
                {`,
  `                if (typeof(AbstractOpenAPISchema).IsAssignableFrom(typeof(T)) && response.IsSuccessStatusCode)
                {`,
  'csharp oneOf errors'
);

// Rust: /v1/time/clock answers text/html. The generated function parsed it as
// JSON and always failed, so the HTML is returned as the String it declares.
{
  const file = 'packages/rust/src/apis/time_api.rs';
  const source = readFileSync(file, 'utf8');
  const start = source.indexOf('pub async fn get_clock(');
  if (start < 0) throw new Error('rust clock: get_clock not found');
  const end = source.indexOf('\npub async fn ', start + 1);
  const body = source.slice(start, end < 0 ? undefined : end);
  const parse = 'serde_json::from_str(&local_var_content).map_err(Error::from)';
  if (!body.includes('Ok(local_var_content)')) {
    if (body.split(parse).length - 1 !== 1) throw new Error('rust clock: expected one JSON parse in get_clock');
    writeFileSync(file, source.slice(0, start) + body.replace(parse, 'Ok(local_var_content)') + (end < 0 ? '' : source.slice(end)));
  }
}

// Go and Java: the public key set also carries standard JWK members that the
// contract does not list (`key_ops`, `ext`). The generated Go and Java JwkKey
// decoders rejected any unlisted member, so getPublicSigningKey always failed.
// Unlisted JWK members are now ignored.
replaceOnce(
  'packages/go/model_jwk_key.go',
  `	decoder := json.NewDecoder(bytes.NewReader(data))
	decoder.DisallowUnknownFields()
	err = decoder.Decode(&varJwkKey)`,
  `	decoder := json.NewDecoder(bytes.NewReader(data))
	err = decoder.Decode(&varJwkKey)`,
  'go jwk key'
);
replaceOnce(
  'packages/java/src/main/java/com/timelogic/direct/model/JwkKey.java',
  `      Set<Map.Entry<String, JsonElement>> entries = jsonElement.getAsJsonObject().entrySet();
      // check to see if the JSON string contains additional fields
      for (Map.Entry<String, JsonElement> entry : entries) {
        if (!JwkKey.openapiFields.contains(entry.getKey())) {
          throw new IllegalArgumentException(String.format("The field \`%s\` in the JSON string is not defined in the \`JwkKey\` properties. JSON: %s", entry.getKey(), jsonElement.toString()));
        }
      }
`,
  `      // Standard JWK members that the contract does not list (for example key_ops and ext) are ignored.
`,
  'java jwk key'
);

// Kotlin: /v1/time/clock answers text/html, which the generated response
// reader rejected. Text bodies are now returned as the String the operation
// declares.
replaceOnce(
  'packages/kotlin/src/main/kotlin/com/timelogic/direct/api/infrastructure/ApiClient.kt',
  `            mediaType == OctetMediaType -> body.bytes() as? T
            else ->  throw UnsupportedOperationException("responseBody currently only supports JSON body.")`,
  `            mediaType == OctetMediaType -> body.bytes() as? T
            mediaType.startsWith("text/") -> body.string() as? T
            else ->  throw UnsupportedOperationException("responseBody currently only supports JSON body.")`,
  'kotlin text responses'
);

// Swift: URLComponents leaves "+" unescaped in query values, and the API reads
// a bare "+" as a space. Offsets such as "+05:30" and ISO timestamps with a
// positive offset were rejected with 400. "+" is now sent as %2B.
for (const file of ['packages/swift/OpenAPIClient/Classes/OpenAPIs/APIs/TimeAPI.swift', 'packages/swift/OpenAPIClient/Classes/OpenAPIs/APIs/UtilityAPI.swift']) {
  const source = readFileSync(file, 'utf8');
  const before = 'URLString: (localVariableUrlComponents?.string ?? localVariableURLString)';
  const after = 'URLString: (localVariableUrlComponents?.string?.replacingOccurrences(of: "+", with: "%2B") ?? localVariableURLString)';
  if (source.includes(after)) continue;
  if (!source.includes(before)) throw new Error(`swift query encoding: request builder URL not found in ${file}`);
  writeFileSync(file, source.replaceAll(before, after));
}
