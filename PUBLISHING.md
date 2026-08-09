# Publishing TimeLogic SDKs

This repository has ten generated SDKs. A release tag publishes the registry-backed packages in independent jobs after shared verification. Go and Packagist are tag/index-driven, and Swift Package Manager consumes the repository tag directly.

## Current release status

| SDK | Distribution channel | Current package identity | Tag workflow publishes it? | Status |
| --- | --- | --- | --- | --- |
| TypeScript | npm | `@timelogic/direct-api` | Yes | Ready after trusted-publisher/2FA publishing access is configured |
| Python | PyPI | `timelogic-api` | Yes | Ready after trusted-publisher setup |
| Rust | crates.io | `timelogic-api` | Optional | Gated: requires crates.io publisher setup and `PUBLISH_CRATES=true` |
| Go | Go module proxy | `github.com/TimeLogic-API-LLC/timelogic-api-sdks/packages/go` | No | Publish with a matching module tag |
| Java | Maven Central | `com.timelogicapi:timelogic-api` | Yes | Requires the protected `maven-central` environment's signing secrets |
| C# | NuGet.org | `TimeLogic.Api` | Yes | Requires NuGet trusted publishing and the `NUGET_USER` repository variable |
| PHP | Packagist | `timelogic-api/php-sdk` | Tag-indexed | Root Composer manifest added; requires Packagist registration and a public repository |
| Ruby | RubyGems.org | `timelogic-api` | Yes | Release target v1.0.1; metadata uses `dev@timelogicapi.com` |
| Kotlin | Maven Central | `com.timelogicapi:timelogic-api-kotlin` | Yes | Ready for its first publication through the protected `maven-central` environment |
| Swift | Swift Package Manager / CocoaPods source | Root Git package (`TimeLogicAPI`) | Source tag | Requires a public repository; the release job also creates `packages/swift/vMAJOR.MINOR.PATCH` for the podspec |

The existing release workflow is [`.github/workflows/release.yml`](.github/workflows/release.yml). After shared verification, npm, PyPI, crates.io, NuGet.org, and the GitHub release run independently and in parallel. A failure in one registry does not block publishing to the others.

## One release, end to end

Use this sequence for every production release. Do not publish a version that is already present in a registry: registry releases are immutable.

1. Choose the next semantic version, for example `1.0.1`. Use the same version for all registry-backed SDKs unless there is a deliberate per-language release policy.
2. Update the version inputs **before regeneration**:
   - Update the shared release version in [`scripts/generate-all.mjs`](scripts/generate-all.mjs) and `scripts/normalize-generated.mjs`.
   - For PHP, add intentional registry/package metadata as described below. Swift now has an intentional root package identity; it still needs a public repository and a Swift-specific release tag.
3. Regenerate and review the complete generated diff:

   ```powershell
   npm ci
   npm run validate
   npm run generate
   npm run verify-generated
   npm run test:contract
   git diff -- openapi packages config scripts
   ```

   `npm run generate` requires Docker Desktop. Supply `TIMELOGIC_SDK_TEST_API_KEY` to make the contract test perform live HTTP checks; without it, the test performs static checks and exits successfully.
4. Run the language-specific package checks in the sections below. Inspect the package archive where the tool supports it.
5. Commit and merge the generated output and release metadata to `main`. Confirm the `SDK CI` workflow is green.
6. After every registry has either been automated or manually published, create and push the matching Git tag:

   ```powershell
   git switch main
   git pull --ff-only
   git tag -a v1.0.1 -m "Release v1.0.1"
   git push origin v1.0.1
   ```

7. Monitor `Release SDKs`; then install each published artifact in a clean sample project and exercise a simple authenticated request.

## Existing automated publications

### TypeScript / npm

Package: `@timelogic/direct-api`, from [`packages/typescript/package.json`](packages/typescript/package.json).

Prerequisites:

- Create the `@timelogic` npm organization and ensure the publishing GitHub identity has permission to publish the package.
- Configure npm trusted publishing for this repository and the `Release SDKs` workflow/environment named `npm`. The workflow uses GitHub OIDC, so no `NPM_TOKEN` is configured in this repo.
- The first scoped package publish must be public. The workflow already uses `--access public`.
- The release job installs the package build dependency, builds `dist/`, and performs an `npm pack --dry-run` check before publishing.

Local preflight:

```powershell
Push-Location packages/typescript
npm ci
npm run build
npm pack --dry-run
Pop-Location
```

Publishing is performed by the tag workflow:

```powershell
git push origin v0.1.1
```

For a one-time manual publish (only if OIDC automation is intentionally bypassed), authenticate with `npm login`, then run `npm publish --access public` from `packages/typescript`. Do not add a long-lived npm token to the repository.

### Python / PyPI

Distribution: `timelogic-api`, from [`packages/python/setup.py`](packages/python/setup.py). The installed Python import remains `timelogic_direct_api`.

Prerequisites:

- Reserve the name on PyPI and configure a PyPI trusted publisher for this GitHub repository, `release.yml`, and the `pypi` environment.
- Keep the package version identical in `setup.py` and [`packages/python/pyproject.toml`](packages/python/pyproject.toml). Today the build backend is setuptools, so `setup.py` is the effective build metadata; the Poetry metadata is still misleading if it diverges.

Local preflight:

```powershell
Push-Location packages/python
python -m pip install --upgrade build twine
Remove-Item -Recurse -Force dist -ErrorAction SilentlyContinue
python -m build
python -m twine check dist/*
Pop-Location
```

The tag workflow builds and publishes `packages/python/dist/` with PyPI OIDC. For a first release, publish to TestPyPI manually or by a separate trusted-publisher workflow, install it in a clean virtual environment, then publish the same version only to production PyPI.

### Rust / crates.io

Crate: `timelogic-api`, from [`packages/rust/Cargo.toml`](packages/rust/Cargo.toml). Its Rust import name is `timelogic_api`.

Prerequisites:

- Claim the crate name and add the organization/maintainers on crates.io.
- Configure a protected GitHub environment named `crates-io`, containing the `CARGO_REGISTRY_TOKEN` secret.
- Set the repository variable `PUBLISH_CRATES` to exactly `true`. This deliberately gates the existing workflow job.
- The release workflow first runs `cargo publish --dry-run`, then publishes. It intentionally remains gated until the crate name and public metadata have been reviewed.

Local preflight:

```powershell
Push-Location packages/rust
cargo test
cargo package
cargo publish --dry-run
Pop-Location
```

For an independently published Rust version, create a dedicated immutable tag such as `rust-v1.0.1`, then manually dispatch `Release SDKs` with target `crates`. This skips npm, PyPI, and GitHub-release creation while using the same verified workflow. Do not invoke a second publish after the job succeeds. The crate metadata includes its repository, homepage, readme, keywords, and categories for a complete crates.io listing.

## Manual targets and required one-time setup

### Go / Go module proxy

Module: `github.com/TimeLogic-API-LLC/timelogic-api-sdks/packages/go` in [`packages/go/go.mod`](packages/go/go.mod).

Go modules are released from immutable source tags, not uploaded to a central package registry. Because this is a module in a subdirectory, its release tag must include the directory prefix:

```powershell
git tag -a packages/go/v0.1.1 -m "Go SDK v0.1.1"
git push origin packages/go/v0.1.1
```

Before tagging:

```powershell
Push-Location packages/go
go test ./...
go vet ./...
go mod tidy
git diff -- go.mod go.sum
Pop-Location
```

`go mod tidy` must leave only intentional changes; commit them before creating the tag. Test consumption with:

```powershell
go list -m github.com/TimeLogic-API-LLC/timelogic-api-sdks/packages/go@v0.1.1
```

The root `v0.1.1` tag does not create a Go release for this nested module. Automate creation of the module tag alongside root releases if Go uses the shared version policy.

### Java / Maven Central

Coordinates: `com.timelogicapi:timelogic-api`, defined in [`packages/java/pom.xml`](packages/java/pom.xml). The Java package keeps its generated `com.timelogic.direct.*` source namespace for compatibility, but the public Maven coordinates no longer contain `direct`.

The package is configured for Sonatype Central Portal publishing with the `central-publishing-maven-plugin`, source/Javadoc attachments, and GPG signatures. The namespace `com.timelogicapi` must be verified in Central Portal before the first release.

Create a protected GitHub environment named `maven-central` with these secrets:

- `MAVEN_CENTRAL_USERNAME` — the Central Portal token username;
- `MAVEN_CENTRAL_PASSWORD` — the Central Portal token password;
- `MAVEN_GPG_PRIVATE_KEY` — the ASCII-armored signing private key;
- `MAVEN_GPG_PASSPHRASE` — the signing key passphrase.

The release workflow imports the signing key, runs tests, signs all published artifacts, and deploys through Central Portal. It runs independently when a tag is pushed, or when `Release SDKs` is manually dispatched with target `maven`.

Verify locally:

```powershell
Push-Location packages/java
./gradlew.bat test
./gradlew.bat publishToMavenLocal
mvn -B -ntp verify
Pop-Location
```

After the portal and signing configuration exist, publish through CI, not a developer workstation. Because `v1.0.0` already exists in this repository, use **Actions → Release SDKs → Run workflow → target `maven`** for this first Maven publication. For a future version, push its new immutable tag:

```powershell
git push origin v1.0.1
```

For an independent release, manually dispatch `Release SDKs` with target `maven`; a Maven failure does not block npm, PyPI, NuGet, RubyGems, or other jobs.

### C# / NuGet.org

Package: `TimeLogic.Api`, defined in [`packages/csharp/src/TimeLogic.Api/TimeLogic.Api.csproj`](packages/csharp/src/TimeLogic.Api/TimeLogic.Api.csproj).

Configure a NuGet trusted-publishing policy for this GitHub repository, `release.yml`, and the protected `nuget` environment. Add the repository variable `NUGET_USER` with the NuGet.org profile username that owns the policy. This is not a secret. The workflow exchanges GitHub OIDC for a short-lived publishing key; do not add a NuGet API key to the repository.

Local preflight:

```powershell
Push-Location packages/csharp
dotnet restore TimeLogic.Api.sln
dotnet test TimeLogic.Api.sln -c Release
dotnet pack src/TimeLogic.Api/TimeLogic.Api.csproj -c Release -o ./artifacts
Pop-Location
```

For the first independent NuGet release, manually dispatch `Release SDKs` with target `nuget`. This skips the other registries and publishes `TimeLogic.Api` through the trusted-publishing policy. The workflow waits for the public NuGet catalog to expose the version before reporting success; NuGet may need several minutes to index a newly accepted upload. The version in the `.csproj` is regenerated from `scripts/generate-all.mjs`, so update the generator script rather than only editing the project file.

### PHP / Packagist

The PHP SDK is now exposed by the repository-root [`composer.json`](composer.json) as `timelogic-api/php-sdk`. Generated PHP sources remain under `packages/php`, and regeneration rewrites both manifests consistently. The manifest deliberately omits a `version`; Composer libraries derive versions from Git tags.

Before registration:

1. Make the repository public (or use a private Packagist plan for private consumers).
2. Register the GitHub repository at Packagist and enable its GitHub webhook.
3. Commit the root Composer metadata and create a new semver tag. Packagist then indexes that tag; there is no archive upload step.

Preflight:

```powershell
Push-Location .
composer validate --strict
composer install
vendor/bin/phpunit -c phpunit.xml.dist
Pop-Location
```

Packagist does not receive an uploaded archive. Its publish action is a committed, reachable Git tag plus webhook/index update. The root `composer.json` and root `Package.swift` can coexist in this monorepo.

### Ruby / RubyGems.org

Gem: `timelogic-api`, versioned by [`packages/ruby/lib/timelogic-api/version.rb`](packages/ruby/lib/timelogic-api/version.rb).

The gem uses RubyGems Trusted Publishing. The pending publisher is registered for the `TimeLogic-API-LLC/timelogic-api-sdks` repository, the `release.yml` workflow, and the `release` GitHub environment. No RubyGems API token is stored in the repository or GitHub secrets.

Preflight:

```powershell
Push-Location packages/ruby
bundle install
bundle exec rspec
gem build timelogic-api.gemspec
Pop-Location
```

Release a tag such as `v1.0.1`, or manually run the root `Release SDKs` workflow with target `ruby`. The Ruby job runs independently after the shared verification job and uses `rubygems/release-gem@v1` with OIDC. Its gemspec includes only the public README, API documentation, and `lib/` code.

### Kotlin / Maven Central

The Kotlin package is configured as a distinct Maven Central artifact:

- group ID: `com.timelogicapi`;
- artifact ID: `timelogic-api-kotlin`;
- version: `1.0.1` for this release;
- sources and documentation artifacts: supplied by the Vanniktech Maven Publish plugin;
- GPG signing and Central Portal upload: supplied by the protected `maven-central` environment.

It reuses the existing Maven Central account, namespace, `MAVEN_CENTRAL_USERNAME`, `MAVEN_CENTRAL_PASSWORD`, `MAVEN_GPG_PRIVATE_KEY`, and `MAVEN_GPG_PASSPHRASE` secrets. No new Maven account or GPG key is required.

Then run:

```powershell
Push-Location packages/kotlin
./gradlew.bat test
./gradlew.bat publishToMavenLocal
Pop-Location
```

After verifying the local repository contains `com/timelogicapi/timelogic-api-kotlin/1.0.1`, use **Actions → Release SDKs → Run workflow → target `kotlin`**. The Kotlin job is independent of Java and the other registries after shared verification. For later versions, update the shared generator version inputs, regenerate, commit, and publish a new immutable version.

### Swift / Swift Package Manager (and CocoaPods)

The Swift package uses the public identity `TimeLogicAPI` and the summary `TimeLogic API | A World Time API`. The repository-root `Package.swift` exposes that library while generated sources remain under `packages/swift`. The podspec uses the repository HTTPS URL, the Unlicense, and the immutable tag `packages/swift/v1.0.1`.

The repository is currently private, so public SPM/CocoaPods consumers still need the repository made public (or granted Git access). The existing root `v1.0.0` tag predates this manifest; use a new semver tag (for example `v1.0.1`). The release workflow creates the matching `packages/swift/v1.0.1` source tag used by the podspec.

Preflight:

```powershell
Push-Location .
swift package resolve
swift build
swift test
Pop-Location
```

Publish the Swift package with the new semver tag. CocoaPods additionally requires a public specs trunk account and then `pod trunk push OpenAPIClient.podspec` from `packages/swift` (the pod name is `TimeLogicAPI`).

## Automation target

The durable end state is one protected tag workflow that publishes every configured registry package, with a separate job and protected environment for npm, PyPI, crates.io, Maven Central, NuGet, and RubyGems. Keep Go, Packagist, and Swift as tag/index-driven jobs that create their required source tags or trigger package-index updates. Each release job should:

1. validate, build, and package its SDK;
2. publish only its declared version;
3. verify that the registry resolves the just-published version; and
4. be a required dependency of the GitHub release job.

The release workflow now contains independent jobs for every configured registry target. A release claim is made only after the corresponding job reports success; a failed registry job does not block the other registry jobs. Swift remains a tag-consumed source package, and Packagist remains Git-tag/index driven rather than an archive upload.
