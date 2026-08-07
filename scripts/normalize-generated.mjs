import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const repoUrl = 'https://github.com/TimeLogic-API-LLC/timelogic-api.git';
const moduleName = 'github.com/TimeLogic-API-LLC/timelogic-api-sdks/packages/go';

function filesUnder(directory) {
  const result = [];
  for (const name of readdirSync(directory)) {
    if (['.openapi-generator', '.gradle', 'build', 'node_modules', 'target', 'dist'].includes(name)) continue;
    const file = join(directory, name);
    if (statSync(file).isDirectory()) result.push(...filesUnder(file));
    else result.push(file);
  }
  return result;
}

for (const file of filesUnder('packages')) {
  if (!/\.(json|md|py|rs|go|java|cs|php|rb|kt|swift|toml|gradle|xml|yml|yaml|sh|csproj)$/.test(file)) continue;
  const original = readFileSync(file, 'utf8');
  const normalized = original
    .replaceAll('https://github.com/GIT_USER_ID/GIT_REPO_ID.git', repoUrl)
    .replaceAll('github.com/GIT_USER_ID/GIT_REPO_ID', moduleName)
    .replaceAll('GIT_USER_ID', 'TimeLogic-API-LLC')
    .replaceAll('GIT_REPO_ID', 'timelogic-api-sdks')
    .replace(/date = "\d{4}-\d{2}-\d{2}T[^\"]+\[Etc\/UTC\]"/g, 'date = "1970-01-01T00:00:00Z[Etc/UTC]"')
    .replace(/- Build date: .*/g, '- Build date: 1970-01-01T00:00:00Z[Etc/UTC]');
  if (normalized !== original) writeFileSync(file, normalized);
}

const csharpSolutionPath = 'packages/csharp/TimeLogic.DirectApi.sln';
const csharpFixedProjectGuid = '{0F073C98-0C47-4A15-B71F-D69526FB4A50}';
let csharpSolution = readFileSync(csharpSolutionPath, 'utf8');
const csharpGeneratedProjectGuid = csharpSolution.match(/Project\("\{FAE04EC0-301F-11D3-BF4B-00C04F79EFBC\}"\) = "TimeLogic\.DirectApi", "[^"]+", "(\{[A-F0-9-]+\})"/)?.[1];
if (csharpGeneratedProjectGuid && csharpGeneratedProjectGuid !== csharpFixedProjectGuid) {
  csharpSolution = csharpSolution.replaceAll(csharpGeneratedProjectGuid, csharpFixedProjectGuid);
}
writeFileSync(csharpSolutionPath, csharpSolution);

const goMod = 'packages/go/go.mod';
writeFileSync(goMod, `module ${moduleName}

go 1.18

require (
\tgithub.com/stretchr/testify v1.11.1
\tgopkg.in/validator.v2 v2.0.1
)

require (
\tgithub.com/davecgh/go-spew v1.1.1 // indirect
\tgithub.com/pmezard/go-difflib v1.0.0 // indirect
\tgopkg.in/yaml.v3 v3.0.1 // indirect
)
`);
writeFileSync('packages/go/go.sum', `github.com/davecgh/go-spew v1.1.1 h1:vj9j/u1bqnvCEfJOwUhtlOARqs3+rkHYY13jYWTU97c=
github.com/davecgh/go-spew v1.1.1/go.mod h1:J7Y8YcW2NihsgmVo/mv3lAwl/skON4iLHjSsI+c5H38=
github.com/kr/pretty v0.2.1 h1:Fmg33tUaq4/8ym9TJN1x7sLJnHVwhP33CNkpYV/7rwI=
github.com/kr/text v0.1.0 h1:45sCR5RtlFHMR4UwH9sdQ5TC8v0qDQCHnXt+kaKSTVE=
github.com/pmezard/go-difflib v1.0.0 h1:4DBwDE0NGyQoBHbLQYPwSUPoCMWR5BEzIk/f1lZbAQM=
github.com/pmezard/go-difflib v1.0.0/go.mod h1:iKH77koFhYxTK1pcRnkKkqfTogsbg7gZNVY4sRDYZ/4=
github.com/stretchr/testify v1.11.1 h1:7s2iGBzp5EwR7/aIZr8ao5+dra3wiQyKjjFuvgVKu7U=
github.com/stretchr/testify v1.11.1/go.mod h1:wZwfW3scLgRK+23gO65QZefKpKQRnfz6sD981Nm4B6U=
gopkg.in/check.v1 v0.0.0-20161208181325-20d25e280405/go.mod h1:Co6ibVJAznAaIkqp8huTwlJQCZ016jof/cbN4VW5Yz0=
gopkg.in/check.v1 v1.0.0-20201130134442-10cb98267c6c h1:Hei/4ADfdWqJk1ZMxUNpqntNwaWcugrBjAiHlqqRiVk=
gopkg.in/validator.v2 v2.0.1 h1:xF0KWyGWXm/LM2G1TrEjqOu4pa6coO9AlWSf3msVfDY=
gopkg.in/validator.v2 v2.0.1/go.mod h1:lIUZBlB3Im4s/eYp39Ry/wkR02yOPhZ9IwIRBjuPuG8=
gopkg.in/yaml.v3 v3.0.1 h1:fxVm/GzAzEWqLHuvctI91KS9hhNmmWOoWu0XTYJS7CA=
gopkg.in/yaml.v3 v3.0.1/go.mod h1:K4uyk7z7BCEPqu6E+C64Yfv1cQ7kz7rIZviUmN+EgEM=
`);

const typescriptPackagePath = 'packages/typescript/package.json';
const typescriptPackage = JSON.parse(readFileSync(typescriptPackagePath, 'utf8'));
typescriptPackage.repository = {
  type: 'git',
  url: 'git+https://github.com/TimeLogic-API-LLC/timelogic-api-sdks.git'
};
typescriptPackage.files = ['dist', 'README.md'];
delete typescriptPackage.scripts.prepare;
typescriptPackage.scripts.prepack = 'npm run build';
writeFileSync(typescriptPackagePath, `${JSON.stringify(typescriptPackage, null, 2)}\n`);

const pythonPyprojectPath = 'packages/python/pyproject.toml';
let pythonPyproject = readFileSync(pythonPyprojectPath, 'utf8')
  .replace('name = "timelogic_direct_api"', 'name = "timelogic-api"')
  .replace(/^description = ".*"$/m, 'description = "TimeLogic API | A World Time API"')
  .replace(
    'repository = "https://github.com/TimeLogic-API-LLC/timelogic-api-sdks/packages/go"',
    'repository = "https://github.com/TimeLogic-API-LLC/timelogic-api-sdks"'
  );
writeFileSync(pythonPyprojectPath, pythonPyproject);

const pythonSetupPath = 'packages/python/setup.py';
let pythonSetup = readFileSync(pythonSetupPath, 'utf8')
  .replace('url="",', 'url="https://github.com/TimeLogic-API-LLC/timelogic-api-sdks",')
  .replace(/description="[^"]*"/, 'description="TimeLogic API | A World Time API"')
  .replace(
    /long_description="""\\[\s\S]*?""",  # noqa: E501/,
    `long_description="""\\
# TimeLogic API | A World Time API

Official Python SDK for world time, timezone conversion, and calendar information.

## Install

\`\`\`bash
pip install timelogic-api
\`\`\`

\`\`\`python
import timelogic_direct_api
\`\`\`

See the API reference and source code at https://github.com/TimeLogic-API-LLC/timelogic-api-sdks.
""",  # noqa: E501`
  );
writeFileSync(pythonSetupPath, pythonSetup);

const pythonReadmePath = 'packages/python/README.md';
let pythonReadme = readFileSync(pythonReadmePath, 'utf8')
  .replace('# timelogic-direct-api', '# timelogic-api')
  .replaceAll(
    'git+https://github.com/TimeLogic-API-LLC/timelogic-api.git',
    'git+https://github.com/TimeLogic-API-LLC/timelogic-api-sdks.git#subdirectory=packages/python'
  )
  .trimEnd() + '\n';
writeFileSync(pythonReadmePath, pythonReadme);

const pythonBulk = 'packages/python/timelogic_direct_api/models/time_payload_bulk_response.py';
writeFileSync(pythonBulk, `# coding: utf-8
"""Typed root-array model for the direct API bulk response."""

from __future__ import annotations

import json
from typing import Any, Dict, List, Optional

from pydantic import RootModel
from typing_extensions import Self

from timelogic_direct_api.models.time_payload_bulk_item import TimePayloadBulkItem


class TimePayloadBulkResponse(RootModel[List[TimePayloadBulkItem]]):
    """Bulk response array returned by current and convert operations."""

    @classmethod
    def from_json(cls, json_str: str) -> Self:
        return cls.model_validate_json(json_str)

    @classmethod
    def from_dict(cls, obj: Optional[List[Dict[str, Any]]]) -> Self:
        return cls.model_validate(obj)

    def to_json(self) -> str:
        return self.model_dump_json()

    def to_dict(self) -> List[Dict[str, Any]]:
        return self.model_dump(mode='json')
`);

const goBulk = 'packages/go/model_time_payload_bulk_response.go';
writeFileSync(goBulk, `/*
TimeLogic API — Direct Customer Access

Code generated by OpenAPI Generator and normalized for Go's array-model handling.
*/

package timelogicdirectapi

import "encoding/json"

var _ MappedNullable = (*TimePayloadBulkResponse)(nil)

// TimePayloadBulkResponse is the array returned by bulk current/convert calls.
type TimePayloadBulkResponse []TimePayloadBulkItem

func NewTimePayloadBulkResponse() *TimePayloadBulkResponse {
	value := TimePayloadBulkResponse{}
	return &value
}

func NewTimePayloadBulkResponseWithDefaults() *TimePayloadBulkResponse {
	return NewTimePayloadBulkResponse()
}

func (o TimePayloadBulkResponse) MarshalJSON() ([]byte, error) {
	return json.Marshal([]TimePayloadBulkItem(o))
}

// ToMap satisfies the generated client's model interface while preserving the
// wire representation as an array through MarshalJSON.
func (o TimePayloadBulkResponse) ToMap() (map[string]interface{}, error) {
	items := make([]interface{}, len(o))
	for i, item := range o {
		items[i] = item
	}
	return map[string]interface{}{"items": items}, nil
}

func (o *TimePayloadBulkResponse) UnmarshalJSON(data []byte) error {
	return json.Unmarshal(data, (*[]TimePayloadBulkItem)(o))
}

type NullableTimePayloadBulkResponse struct {
	value TimePayloadBulkResponse
	isSet bool
}

func (v NullableTimePayloadBulkResponse) Get() TimePayloadBulkResponse { return v.value }
func (v *NullableTimePayloadBulkResponse) Set(value TimePayloadBulkResponse) {
	v.value = value
	v.isSet = true
}
func (v NullableTimePayloadBulkResponse) IsSet() bool { return v.isSet }
func (v *NullableTimePayloadBulkResponse) Unset() {
	v.value = nil
	v.isSet = false
}
func NewNullableTimePayloadBulkResponse(value TimePayloadBulkResponse) *NullableTimePayloadBulkResponse {
	return &NullableTimePayloadBulkResponse{value: value, isSet: true}
}
func (v NullableTimePayloadBulkResponse) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}
func (v *NullableTimePayloadBulkResponse) UnmarshalJSON(data []byte) error {
	v.isSet = true
	return json.Unmarshal(data, &v.value)
}
`);

const rubyVersion = 'packages/ruby/lib/timelogic-direct-api/version.rb';
writeFileSync(rubyVersion, `# frozen_string_literal: true

module TimeLogic
  module DirectApi
    VERSION = '0.1.0'
  end
end
`);

const rubyRoot = 'packages/ruby/lib/timelogic-direct-api.rb';
const rubyRootSource = readFileSync(rubyRoot, 'utf8');
if (!rubyRootSource.startsWith('module TimeLogic\n')) {
  writeFileSync(rubyRoot, `module TimeLogic\nend\n\n${rubyRootSource}`);
}

const rubyException = 'packages/ruby/lib/timelogic-direct-api/api_error.rb';
writeFileSync(
  rubyException,
  readFileSync(rubyException, 'utf8').replace('class ApiError < StandardError', 'class ApiException < StandardError')
);
const rubyClient = 'packages/ruby/lib/timelogic-direct-api/api_client.rb';
writeFileSync(rubyClient, readFileSync(rubyClient, 'utf8').replaceAll('ApiError.new', 'ApiException.new'));

const swiftTransport = 'packages/swift/OpenAPIClient/Classes/OpenAPIs/URLSessionImplementations.swift';
let swiftSource = readFileSync(swiftTransport, 'utf8');
if (!swiftSource.includes('#if canImport(FoundationNetworking)')) {
  swiftSource = swiftSource.replace(
    'import Foundation\n',
    'import Foundation\n#if canImport(FoundationNetworking)\nimport FoundationNetworking\n#endif\n'
  );
}
swiftSource = swiftSource.replace(
  '#if !os(macOS)\nimport MobileCoreServices\n#endif',
  '#if canImport(MobileCoreServices)\nimport MobileCoreServices\n#endif'
);
swiftSource = swiftSource.replace(
  '        } else {\n            if let uti = UTTypeCreatePreferredIdentifierForTag(kUTTagClassFilenameExtension, pathExtension as NSString, nil)?.takeRetainedValue(),\n                    let mimetype = UTTypeCopyPreferredTagWithClass(uti, kUTTagClassMIMEType)?.takeRetainedValue() {\n                return mimetype as String\n            }\n            return "application/octet-stream"\n',
  '        } else {\n            #if canImport(MobileCoreServices)\n            if let uti = UTTypeCreatePreferredIdentifierForTag(kUTTagClassFilenameExtension, pathExtension as NSString, nil)?.takeRetainedValue(),\n                    let mimetype = UTTypeCopyPreferredTagWithClass(uti, kUTTagClassMIMEType)?.takeRetainedValue() {\n                return mimetype as String\n            }\n            #endif\n            return "application/octet-stream"\n'
);
writeFileSync(swiftTransport, swiftSource);

const rustConfiguration = 'packages/rust/src/apis/configuration.rs';
let rustConfigurationSource = readFileSync(rustConfiguration, 'utf8');
if (!rustConfigurationSource.includes('pub rapid_api: bool')) {
  rustConfigurationSource = rustConfigurationSource.replace(
    '    pub api_key: Option<ApiKey>,\n',
    '    pub api_key: Option<ApiKey>,\n    pub rapid_api: bool,\n    pub rapid_api_host: String,\n'
  );
  rustConfigurationSource = rustConfigurationSource.replace(
    '            api_key: None,\n',
    '            api_key: None,\n            rapid_api: false,\n            rapid_api_host: "timelogic-api-world-time-timezones-time-calculations.p.rapidapi.com".to_owned(),\n'
  );
  rustConfigurationSource = rustConfigurationSource.replace(
    'impl Configuration {\n    pub fn new() -> Configuration {\n        Configuration::default()\n    }\n}',
    `impl Configuration {
    pub fn new() -> Configuration {
        Configuration::default()
    }

    pub fn with_api_key(api_key: impl Into<String>, rapid_api: bool, base_path: Option<String>, rapid_api_host: Option<String>) -> Configuration {
        let key = api_key.into();
        let host = rapid_api_host.unwrap_or_else(|| "timelogic-api-world-time-timezones-time-calculations.p.rapidapi.com".to_owned());
        Configuration {
            base_path: base_path.unwrap_or_else(|| if rapid_api { format!("https://{}", host) } else { "https://api.timelogicapi.com".to_owned() }),
            api_key: if rapid_api { Some(ApiKey { prefix: None, key: key.clone() }) } else { None },
            bearer_access_token: if rapid_api { None } else { Some(key) },
            rapid_api,
            rapid_api_host: host,
            ..Configuration::default()
        }
    }
}`
  );
  writeFileSync(rustConfiguration, rustConfigurationSource);
}

const rustApiFiles = ['packages/rust/src/apis/time_api.rs', 'packages/rust/src/apis/utility_api.rs'];
const rustDirectQuery = `    if let Some(ref local_var_apikey) = local_var_configuration.api_key {
        let local_var_key = local_var_apikey.key.clone();
        let local_var_value = match local_var_apikey.prefix {
            Some(ref local_var_prefix) => format!("{} {}", local_var_prefix, local_var_key),
            None => local_var_key,
        };
        local_var_req_builder = local_var_req_builder.query(&[("api_key", local_var_value)]);
    }`;
const rustDirectHeader = `    if let Some(ref local_var_apikey) = local_var_configuration.api_key {
        let local_var_key = local_var_apikey.key.clone();
        let local_var_value = match local_var_apikey.prefix {
            Some(ref local_var_prefix) => format!("{} {}", local_var_prefix, local_var_key),
            None => local_var_key,
        };
        local_var_req_builder = local_var_req_builder.header("X-API-Key", local_var_value);
    };`;
const rustBearer = `    if let Some(ref local_var_token) = local_var_configuration.bearer_access_token {
        local_var_req_builder = local_var_req_builder.bearer_auth(local_var_token.to_owned());
    };`;
const rustRapidKey = `    if let Some(ref local_var_apikey) = local_var_configuration.api_key {
        let local_var_key = local_var_apikey.key.clone();
        let local_var_value = match local_var_apikey.prefix {
            Some(ref local_var_prefix) => format!("{} {}", local_var_prefix, local_var_key),
            None => local_var_key,
        };
        local_var_req_builder = local_var_req_builder.header("X-RapidAPI-Key", local_var_value);
    };`;
const rustRapidHost = `    if let Some(ref local_var_apikey) = local_var_configuration.api_key {
        let local_var_key = local_var_apikey.key.clone();
        let local_var_value = match local_var_apikey.prefix {
            Some(ref local_var_prefix) => format!("{} {}", local_var_prefix, local_var_key),
            None => local_var_key,
        };
        local_var_req_builder = local_var_req_builder.header("X-RapidAPI-Host", local_var_value);
    };`;
for (const rustApiFile of rustApiFiles) {
  let source = readFileSync(rustApiFile, 'utf8');
  if (!source.includes('if !local_var_configuration.rapid_api')) {
    source = source.replaceAll(rustDirectQuery, `    if !local_var_configuration.rapid_api {
${rustDirectQuery}
    }`);
    source = source.replaceAll(rustDirectHeader, `    if !local_var_configuration.rapid_api {
${rustDirectHeader}
    }`);
    source = source.replaceAll(rustBearer, `    if !local_var_configuration.rapid_api {
${rustBearer}
    }`);
    source = source.replaceAll(rustRapidKey, `    if local_var_configuration.rapid_api {
${rustRapidKey}
    }`);
    source = source.replaceAll(rustRapidHost, `    if local_var_configuration.rapid_api {
        local_var_req_builder = local_var_req_builder.header("X-RapidAPI-Host", local_var_configuration.rapid_api_host.clone());
    };`);
  }
  writeFileSync(rustApiFile, source);
}

const kotlinClient = 'packages/kotlin/src/main/kotlin/com/timelogic/direct/api/infrastructure/ApiClient.kt';
let kotlinClientSource = readFileSync(kotlinClient, 'utf8');
if (!kotlinClientSource.includes('X-RapidAPI-Key')) {
  kotlinClientSource = kotlinClientSource.replace(
    '        if (requestConfig.query["api_key"].isNullOrEmpty()) {',
    `        if (requestConfig.headers["X-RapidAPI-Key"].isNullOrEmpty()) {
            apiKey["X-RapidAPI-Key"]?.let { requestConfig.headers["X-RapidAPI-Key"] = it }
        }
        if (requestConfig.headers["X-RapidAPI-Host"].isNullOrEmpty()) {
            apiKey["X-RapidAPI-Host"]?.let { requestConfig.headers["X-RapidAPI-Host"] = it }
        }
        if (requestConfig.query["api_key"].isNullOrEmpty()) {`
  );
  writeFileSync(kotlinClient, kotlinClientSource);
}

const rapidApiHost = 'timelogic-api-world-time-timezones-time-calculations.p.rapidapi.com';

writeFileSync('packages/typescript/src/transport.ts', `import { BASE_PATH, Configuration } from './runtime';

export const DEFAULT_API_BASE_URL = BASE_PATH;
export const DEFAULT_RAPID_API_HOST = '${rapidApiHost}';
export const DEFAULT_RAPID_API_BASE_URL = \`https://\${DEFAULT_RAPID_API_HOST}\`;

export interface TransportOptions {
  apiKey: string;
  rapidApi?: boolean;
  baseUrl?: string;
  rapidApiHost?: string;
}

function required(value: string, name: string): string {
  if (!value || !value.trim()) throw new Error(\`\${name} is required\`);
  return value.trim();
}

export function createConfiguration(options: TransportOptions): Configuration {
  const apiKey = required(options.apiKey, 'apiKey');
  if (options.rapidApi) {
    const host = (options.rapidApiHost || DEFAULT_RAPID_API_HOST).trim();
    const baseUrl = (options.baseUrl || \`https://\${host}\`).replace(/\\/+$/, '');
    return new Configuration({
      basePath: baseUrl,
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': host,
      },
    });
  }
  return new Configuration({
    basePath: options.baseUrl?.replace(/\\/+$/, ''),
    accessToken: apiKey,
  });
}
`);
const tsIndex = 'packages/typescript/src/index.ts';
let tsIndexSource = readFileSync(tsIndex, 'utf8');
if (!tsIndexSource.includes("'./transport'")) tsIndexSource += "\nexport * from './transport';\n";
writeFileSync(tsIndex, tsIndexSource);

writeFileSync('packages/python/timelogic_direct_api/transport.py', `from typing import Optional

from timelogic_direct_api.configuration import Configuration

DEFAULT_API_BASE_URL = "https://api.timelogicapi.com"
DEFAULT_RAPID_API_HOST = "${rapidApiHost}"
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
`);
const pyInit = 'packages/python/timelogic_direct_api/__init__.py';
let pyInitSource = readFileSync(pyInit, 'utf8');
if (!pyInitSource.includes('from timelogic_direct_api.transport import create_configuration')) pyInitSource += '\nfrom timelogic_direct_api.transport import create_configuration\n';
writeFileSync(pyInit, pyInitSource);

writeFileSync('packages/go/transport.go', `package timelogicdirectapi

import (
    "context"
    "fmt"
    "strings"
)

const DefaultAPIBaseURL = "https://api.timelogicapi.com"
const DefaultRapidAPIHost = "${rapidApiHost}"
const DefaultRapidAPIBaseURL = "https://" + DefaultRapidAPIHost

type TransportOptions struct {
    APIKey        string
    RapidAPI      bool
    BaseURL       string
    RapidAPIHost  string
}

type Transport struct {
    Configuration *Configuration
    apiKey       string
    rapidAPI     bool
    rapidAPIHost string
}

func NewTransport(options TransportOptions) (*Transport, error) {
    if strings.TrimSpace(options.APIKey) == "" {
        return nil, fmt.Errorf("APIKey is required")
    }
    configuration := NewConfiguration()
    transport := &Transport{Configuration: configuration, apiKey: strings.TrimSpace(options.APIKey), rapidAPI: options.RapidAPI}
    if options.RapidAPI {
        transport.rapidAPIHost = strings.TrimSpace(options.RapidAPIHost)
        if transport.rapidAPIHost == "" {
            transport.rapidAPIHost = DefaultRapidAPIHost
        }
        configuration.Servers[1].URL = strings.TrimRight(options.BaseURL, "/")
        if options.BaseURL == "" {
            configuration.Servers[1].URL = "https://{rapidapiHost}"
        }
    } else {
        configuration.Servers[0].URL = strings.TrimRight(options.BaseURL, "/")
        if options.BaseURL == "" {
            configuration.Servers[0].URL = "https://{host}"
        }
    }
    return transport, nil
}

func (t *Transport) Context(ctx context.Context) context.Context {
    if t.rapidAPI {
        ctx = context.WithValue(ctx, ContextServerIndex, 1)
        ctx = context.WithValue(ctx, ContextServerVariables, map[string]string{"rapidapiHost": t.rapidAPIHost})
        ctx = context.WithValue(ctx, ContextAPIKeys, map[string]APIKey{
            "rapidApiKey":  {Key: t.apiKey},
            "rapidApiHost": {Key: t.rapidAPIHost},
        })
        return ctx
    }
    ctx = context.WithValue(ctx, ContextServerIndex, 0)
    ctx = context.WithValue(ctx, ContextAccessToken, t.apiKey)
    return ctx
}
`);

writeFileSync('packages/java/src/main/java/com/timelogic/direct/TransportConfiguration.java', `package com.timelogic.direct;

import com.timelogic.direct.auth.ApiKeyAuth;
import com.timelogic.direct.auth.HttpBearerAuth;

public final class TransportConfiguration {
    public static final String DEFAULT_API_BASE_URL = "https://api.timelogicapi.com";
    public static final String DEFAULT_RAPID_API_HOST = "${rapidApiHost}";
    public static final String DEFAULT_RAPID_API_BASE_URL = "https://" + DEFAULT_RAPID_API_HOST;

    private TransportConfiguration() {}

    public static ApiClient create(String apiKey, boolean rapidApi, String baseUrl, String rapidApiHost) {
        if (apiKey == null || apiKey.trim().isEmpty()) throw new IllegalArgumentException("apiKey is required");
        String host = rapidApiHost == null || rapidApiHost.trim().isEmpty() ? DEFAULT_RAPID_API_HOST : rapidApiHost.trim();
        ApiClient client = new ApiClient().setBasePath(baseUrl == null || baseUrl.trim().isEmpty()
                ? (rapidApi ? "https://" + host : DEFAULT_API_BASE_URL)
                : baseUrl.replaceAll("/+$", ""));
        if (rapidApi) {
            ((ApiKeyAuth) client.getAuthentication("rapidApiKey")).setApiKey(apiKey.trim());
            ((ApiKeyAuth) client.getAuthentication("rapidApiHost")).setApiKey(host);
        } else {
            ((HttpBearerAuth) client.getAuthentication("directBearerAuth")).setBearerToken(apiKey.trim());
        }
        return client;
    }
}
`);

writeFileSync('packages/csharp/src/TimeLogic.DirectApi/Client/TransportConfiguration.cs', `using System;

namespace TimeLogic.DirectApi.Client
{
    public static class TransportConfiguration
    {
        public const string DefaultApiBaseUrl = "https://api.timelogicapi.com";
        public const string DefaultRapidApiHost = "${rapidApiHost}";
        public const string DefaultRapidApiBaseUrl = "https://" + DefaultRapidApiHost;

        public static Configuration Create(string apiKey, bool rapidApi = false, string baseUrl = null, string rapidApiHost = null)
        {
            if (string.IsNullOrWhiteSpace(apiKey)) throw new ArgumentException("apiKey is required", nameof(apiKey));
            var host = string.IsNullOrWhiteSpace(rapidApiHost) ? DefaultRapidApiHost : rapidApiHost.Trim();
            var configuration = new Configuration
            {
                BasePath = string.IsNullOrWhiteSpace(baseUrl) ? (rapidApi ? "https://" + host : DefaultApiBaseUrl) : baseUrl.TrimEnd('/')
            };
            if (rapidApi)
            {
                configuration.ApiKey["X-RapidAPI-Key"] = apiKey.Trim();
                configuration.ApiKey["X-RapidAPI-Host"] = host;
            }
            else
            {
                configuration.AccessToken = apiKey.Trim();
            }
            return configuration;
        }
    }
}
`);

writeFileSync('packages/php/lib/TransportConfiguration.php', `<?php

namespace TimeLogic\\DirectApi;

final class TransportConfiguration
{
    public const DEFAULT_API_BASE_URL = 'https://api.timelogicapi.com';
    public const DEFAULT_RAPID_API_HOST = '${rapidApiHost}';
    public const DEFAULT_RAPID_API_BASE_URL = 'https://' . self::DEFAULT_RAPID_API_HOST;

    public static function create(string $apiKey, bool $rapidApi = false, ?string $baseUrl = null, ?string $rapidApiHost = null): Configuration
    {
        if (trim($apiKey) === '') {
            throw new \\InvalidArgumentException('apiKey is required');
        }
        $host = trim($rapidApiHost ?: self::DEFAULT_RAPID_API_HOST);
        $configuration = new Configuration();
        $configuration->setHost(rtrim($baseUrl ?: ($rapidApi ? 'https://' . $host : self::DEFAULT_API_BASE_URL), '/'));
        if ($rapidApi) {
            $configuration->setApiKey('X-RapidAPI-Key', trim($apiKey));
            $configuration->setApiKey('X-RapidAPI-Host', $host);
        } else {
            $configuration->setAccessToken(trim($apiKey));
        }
        return $configuration;
    }
}
`);

writeFileSync('packages/ruby/lib/timelogic-direct-api/transport_configuration.rb', `# frozen_string_literal: true

require 'uri'

module TimeLogic
  module DirectApi
    module TransportConfiguration
      DEFAULT_API_BASE_URL = 'https://api.timelogicapi.com'
      DEFAULT_RAPID_API_HOST = '${rapidApiHost}'
      DEFAULT_RAPID_API_BASE_URL = "https://#{DEFAULT_RAPID_API_HOST}"

      module_function

      def build(api_key:, rapid_api: false, base_url: nil, rapid_api_host: nil)
        raise ArgumentError, 'api_key is required' if api_key.to_s.strip.empty?

        host = (rapid_api_host || DEFAULT_RAPID_API_HOST).strip
        uri = URI.parse(base_url || (rapid_api ? DEFAULT_RAPID_API_BASE_URL : DEFAULT_API_BASE_URL))
        configuration = Configuration.new
        configuration.scheme = uri.scheme
        configuration.host = uri.port && ![80, 443].include?(uri.port) ? "#{uri.host}:#{uri.port}" : uri.host
        configuration.base_path = uri.path
        configuration.ignore_operation_servers = true
        if rapid_api
          configuration.api_key['X-RapidAPI-Key'] = api_key.strip
          configuration.api_key['X-RapidAPI-Host'] = host
        else
          configuration.access_token = api_key.strip
        end
        configuration
      end
    end
  end
end
`);
const rubyRootPath = 'packages/ruby/lib/timelogic-direct-api.rb';
let rubyRootForTransport = readFileSync(rubyRootPath, 'utf8');
if (!rubyRootForTransport.includes("require 'timelogic-direct-api/transport_configuration'")) rubyRootForTransport = rubyRootForTransport.replace("require 'timelogic-direct-api/configuration'", "require 'timelogic-direct-api/configuration'\nrequire 'timelogic-direct-api/transport_configuration'");
writeFileSync(rubyRootPath, rubyRootForTransport);

writeFileSync('packages/kotlin/src/main/kotlin/com/timelogic/direct/api/infrastructure/TransportConfiguration.kt', `package com.timelogic.direct.api.infrastructure

object TransportConfiguration {
    const val DEFAULT_API_BASE_URL = "https://api.timelogicapi.com"
    const val DEFAULT_RAPID_API_HOST = "${rapidApiHost}"
    const val DEFAULT_RAPID_API_BASE_URL = "https://$DEFAULT_RAPID_API_HOST"

    fun create(apiKey: String, rapidApi: Boolean = false, baseUrl: String? = null, rapidApiHost: String? = null): ApiClient {
        require(apiKey.isNotBlank()) { "apiKey is required" }
        val host = rapidApiHost?.takeIf { it.isNotBlank() } ?: DEFAULT_RAPID_API_HOST
        ApiClient.apiKey.clear()
        ApiClient.apiKeyPrefix.clear()
        ApiClient.accessToken = null
        val client = ApiClient(baseUrl?.trimEnd('/') ?: if (rapidApi) "https://$host" else DEFAULT_API_BASE_URL)
        if (rapidApi) {
            ApiClient.apiKey["X-RapidAPI-Key"] = apiKey.trim()
            ApiClient.apiKey["X-RapidAPI-Host"] = host
        } else {
            ApiClient.accessToken = apiKey.trim()
        }
        return client
    }
}
`);

writeFileSync('packages/swift/Package.resolved', `{
  "object": {
    "pins": [
      {
        "package": "AnyCodable",
        "repositoryURL": "https://github.com/Flight-School/AnyCodable",
        "state": {
          "branch": null,
          "revision": "862808b2070cd908cb04f9aafe7de83d35f81b05",
          "version": "0.6.7"
        }
      }
    ]
  },
  "version": 1
}
`);

writeFileSync('packages/swift/OpenAPIClient/Classes/OpenAPIs/TransportConfiguration.swift', `import Foundation

public enum TransportConfiguration {
    public static let defaultApiBaseURL = "https://api.timelogicapi.com"
    public static let defaultRapidApiHost = "${rapidApiHost}"
    public static let defaultRapidApiBaseURL = "https://\\(defaultRapidApiHost)"

    @discardableResult
    public static func configure(apiKey: String, rapidApi: Bool = false, baseURL: String? = nil, rapidApiHost: String? = nil) -> String {
        precondition(!apiKey.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty, "apiKey is required")
        let host = rapidApiHost?.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty == false ? rapidApiHost! : defaultRapidApiHost
        let resolvedBaseURL = (baseURL?.isEmpty == false ? baseURL! : (rapidApi ? "https://\\(host)" : defaultApiBaseURL)).trimmingCharacters(in: CharacterSet(charactersIn: "/"))
        OpenAPIClientAPI.basePath = resolvedBaseURL
        OpenAPIClientAPI.customHeaders.removeAll()
        if rapidApi {
            OpenAPIClientAPI.customHeaders["X-RapidAPI-Key"] = apiKey
            OpenAPIClientAPI.customHeaders["X-RapidAPI-Host"] = host
        } else {
            OpenAPIClientAPI.customHeaders["Authorization"] = "Bearer \\(apiKey)"
        }
        return resolvedBaseURL
    }
}
`);
