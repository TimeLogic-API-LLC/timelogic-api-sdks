# TimeLogic API | A World Time API

Official .NET SDK for TimeLogic API.

## Install

```bash
dotnet add package TimeLogic.Api --version 1.0.1
```

## Quick start

```csharp
using TimeLogic.Api.Api;
using TimeLogic.Api.Client;

var configuration = TransportConfiguration.Create("YOUR_API_KEY");
var api = new TimeApi(configuration);
var result = api.GetCurrentTime(tz: "America/New_York");
```

For API reference and usage guides, visit [TimeLogic API](https://api.timelogicapi.com).
