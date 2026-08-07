# Publishing TimeLogic SDKs

This repository has ten generated SDKs. A release tag publishes the TypeScript/npm, Python/PyPI, Rust/crates.io (when `PUBLISH_CRATES=true`), and C#/NuGet.org packages independently after shared verification. The remaining packages must not be represented as released until their registry metadata and automation have been added.

## Current release status

| SDK | Distribution channel | Current package identity | Tag workflow publishes it? | Status |
| --- | --- | --- | --- | --- |
| TypeScript | npm | `@timelogic/direct-api` | Yes | Ready after trusted-publisher/2FA publishing access is configured |
| Python | PyPI | `timelogic-api` | Yes | Ready after trusted-publisher setup |
| Rust | crates.io | `timelogic-api` | Optional | Gated: requires crates.io publisher setup and `PUBLISH_CRATES=true` |
| Go | Go module proxy | `github.com/TimeLogic-API-LLC/timelogic-api-sdks/packages/go` | No | Publish with a matching module tag |
| Java | Maven Central | `com.timelogic:timelogic-direct-api` | No | Requires Central publishing/signing configuration |
| C# | NuGet.org | `TimeLogic.Api` | Yes | Requires NuGet trusted publishing and the `NUGET_USER` repository variable |
| PHP | Packagist | Not yet declared | No | Blocked: `composer.json` has no required `name` |
| Ruby | RubyGems.org | `timelogic-direct-api` | No | Requires RubyGems publisher setup and automation |
| Kotlin | Maven Central | Intended: `com.timelogic:timelogic-direct-api` | No | Blocked: no Maven publication is defined |
| Swift | Swift Package Manager | Git source package (currently `OpenAPIClient`) | No | Release by Git tag after package identity cleanup |

The existing release workflow is [`.github/workflows/release.yml`](.github/workflows/release.yml). After shared verification, npm, PyPI, crates.io, NuGet.org, and the GitHub release run independently and in parallel. A failure in one registry does not block publishing to the others.

## One release, end to end

Use this sequence for every production release. Do not publish a version that is already present in a registry: registry releases are immutable.

1. Choose the next semantic version, for example `0.1.1`. Use the same version for all registry-backed SDKs unless there is a deliberate per-language release policy.
2. Update the version inputs **before regeneration**:
   - In [`scripts/generate-all.mjs`](scripts/generate-all.mjs), replace every `packageVersion=0.1.0` / `artifactVersion=0.1.0` / `npmVersion=0.1.0` value.
   - Update the hard-coded Ruby value in [`scripts/normalize-generated.mjs`](scripts/normalize-generated.mjs). That script otherwise restores `0.1.0` after every generation.
   - For PHP and Swift, add intentional registry/package metadata as described below; neither target currently gets a release version from the generator configuration.
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
   git tag -a v0.1.1 -m "Release v0.1.1"
   git push origin v0.1.1
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

For an independently published Rust version, create a dedicated immutable tag such as `rust-v1.0.0`, then manually dispatch `Release SDKs` with target `crates`. This skips npm, PyPI, and GitHub-release creation while using the same verified workflow. Do not invoke a second publish after the job succeeds. The crate metadata includes its repository, homepage, readme, keywords, and categories for a complete crates.io listing.

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

Coordinates: `com.timelogic:timelogic-direct-api`, defined in [`packages/java/pom.xml`](packages/java/pom.xml).

The POM has source and Javadoc attachment plugins, but it lacks Maven Central deployment configuration, signing, a Central Portal token setup, and TimeLogic SCM/developer metadata. Update those before the first release. In particular, replace the current OpenAPI Generator URLs in the POM with this SDK repository.

Recommended path: use the Maven Central Publishing Portal with a `central`/Nexus-compatible Maven deployment plugin, a GPG signing plugin, and environment-injected credentials. Then verify locally:

```powershell
Push-Location packages/java
./gradlew.bat test
./gradlew.bat publishToMavenLocal
mvn -B -ntp verify
Pop-Location
```

After the portal and signing configuration exist, publish through CI, not a developer workstation. The exact final command depends on the chosen Maven plugin; document it in `release.yml` beside its protected `maven-central` environment. Do not use the current Gradle `publish` task as a Central release mechanism: it declares no remote repository or signing.

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

This package is not publishable to Packagist yet. [`packages/php/composer.json`](packages/php/composer.json) is missing Composer's required `name` field.

Before registration:

1. Add a stable identity such as `timelogic/direct-api`, proper `homepage`, `support`, license, authors, and `version` policy. Composer libraries normally derive versions from VCS tags, so do not hard-code a `version` unless there is a strong reason.
2. Commit that metadata after regeneration has been made to preserve it (the generator currently overwrites the directory).
3. Move this Composer package to a repository root or a dedicated public repository. Packagist indexes the root `composer.json`; it cannot directly publish this `packages/php` subdirectory as an independent package.
4. Register that public package repository at Packagist and enable the Packagist GitHub webhook. Packagist then discovers its `v0.1.1` tags automatically.

Preflight:

```powershell
Push-Location packages/php
composer validate --strict
composer install
./vendor/bin/phpunit
Pop-Location
```

Packagist does not receive an uploaded archive. Its “publish” action is a committed, reachable Git tag plus webhook/index update. Tagging only makes sense after the package is at the repository root (or split into its own repository) and the name/metadata work has been committed.

### Ruby / RubyGems.org

Gem: `timelogic-direct-api`, versioned by [`packages/ruby/lib/timelogic-direct-api/version.rb`](packages/ruby/lib/timelogic-direct-api/version.rb).

Before first release, claim the gem name and add organization owners on RubyGems. Replace the generator placeholder homepage and add source-code, changelog, and bug-tracker metadata in the `.gemspec`. Confirm the gem does not unintentionally package CI artifacts; its current file list is derived from `find *`.

Preflight and publish:

```powershell
Push-Location packages/ruby
bundle install
bundle exec rspec
gem build timelogic-direct-api.gemspec
gem push timelogic-direct-api-0.1.1.gem
Pop-Location
```

Use an API key supplied by a protected CI environment (`GEM_HOST_API_KEY`), rather than a developer login. The normalizer hard-codes the Ruby version, so update `scripts/normalize-generated.mjs` before regeneration. Add a RubyGems job to the tag workflow before treating root tags as Ruby releases.

### Kotlin / Maven Central

The Kotlin package has `maven-publish` applied in [`packages/kotlin/build.gradle`](packages/kotlin/build.gradle), but it defines no `MavenPublication`, repository, source/Javadoc artifacts, or signing. `publish` therefore cannot publish a usable artifact today.

First add a Maven Central-ready publication with:

- `groupId` `com.timelogic`, artifact ID `timelogic-direct-api`, and the release version;
- `components.java`, a sources JAR, and a Dokka/Javadoc JAR;
- a Central Portal repository and environment-supplied credentials;
- GPG signing and complete POM metadata (license, developers, SCM);
- a `maven-central` protected environment in GitHub Actions.

Then run:

```powershell
Push-Location packages/kotlin
./gradlew.bat test
./gradlew.bat publishToMavenLocal
Pop-Location
```

After verifying the local repository contains `com/timelogic/timelogic-direct-api/0.1.1`, publish through the CI-only Central task. Keep Kotlin and Java as distinct Central artifacts even though their coordinates would otherwise collide; use a different artifact ID (for example `timelogic-direct-api-kotlin`) or publish only one of them. This collision must be resolved before either is released.

### Swift / Swift Package Manager (and CocoaPods)

Swift Package Manager consumes Git repositories and tags. [`packages/swift/Package.swift`](packages/swift/Package.swift) currently calls the package and library `OpenAPIClient`; its CocoaPods podspec also has the placeholder name, source URL, license, and version. Do not release this branding publicly unchanged.

One-time cleanup:

1. Rename the SPM package/product/target as appropriate (for example `TimeLogicDirectAPI`) and update import examples.
2. Update `OpenAPIClient.podspec` with the same public identity, the SDK repository HTTPS URL, a real license, summary, and version/tag source.
3. Move the Swift package to a repository root or a dedicated public repository. Swift Package Manager evaluates `Package.swift` at a dependency repository's root and has no dependency-URL option for selecting this `packages/swift` subdirectory.

Preflight:

```powershell
Push-Location packages/swift
swift package resolve
swift build
Pop-Location
```

After moving it to a package root, release it using `v0.1.1`. CocoaPods additionally requires a public specs trunk account and then `pod trunk push OpenAPIClient.podspec`. Automate either tag/pod release only after the identity cleanup passes review.

## Automation target

The durable end state is one protected tag workflow that publishes every configured registry package, with a separate job and protected environment for npm, PyPI, crates.io, Maven Central, NuGet, and RubyGems. Keep Go, Packagist, and Swift as tag-driven jobs that create their required nested-module tags or trigger package-index updates. Each job should:

1. validate, build, and package its SDK;
2. publish only its declared version;
3. verify that the registry resolves the just-published version; and
4. be a required dependency of the GitHub release job.

Until those jobs exist, the only release claim supported by the current workflow is: “TypeScript and Python published; Rust published only when explicitly enabled.”
