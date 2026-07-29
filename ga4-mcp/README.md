# Marketing Analytics MCP

Local read-only MCP server for Google Analytics 4 and Google Search Console.

## Tools

- `run_ga4_report`: runs GA4 Data API reports.
- `run_gsc_search_analytics`: runs Search Console Search Analytics reports.

## Environment

Required for GA4:

```bash
GA4_PROPERTY_ID="123456789"
```

Required for Google auth:

```bash
GOOGLE_APPLICATION_CREDENTIALS="/absolute/path/to/service-account.json"
```

Optional default for Search Console:

```bash
GSC_SITE_URL="https://example.com/"
```

You can also pass `siteUrl` directly when calling `run_gsc_search_analytics`.

## Google Setup

1. Enable the Google Analytics Data API for GA4 reports.
2. Enable the Google Search Console API for Search Console reports.
3. Add the service account email as a Viewer on the GA4 property.
4. Add the service account email as a user on the Search Console property.

Search Console properties must match exactly. Use either a URL-prefix property like `https://example.com/` or a domain property like `sc-domain:example.com`.

## Codex Config

```toml
[mcp_servers.ga4]
enabled = true
command = "npx"
args = ["tsx", "/Users/jordan/Documents/marketing-codex-skills/ga4-mcp/src/index.ts"]
env = {
  GA4_PROPERTY_ID = "123456789",
  GSC_SITE_URL = "https://example.com/",
  GOOGLE_APPLICATION_CREDENTIALS = "/absolute/path/to/service-account.json"
}
tool_timeout_sec = 60
```

Restart Codex after changing the MCP config.

## Local Checks

```bash
npm run typecheck
npm run start
```

`npm run start` waits on stdio. That is normal for an MCP server.
