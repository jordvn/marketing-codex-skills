# SignalForge

AI-ready web marketing skills for finding growth signals, diagnosing measurement issues, and turning insights into action.

SignalForge is a Codex skill suite for modern web marketing work across SEO, AEO/GEO, CRO, analytics quality, attribution, LLM discoverability, and website performance reporting. It is built to produce practical deliverables: audits, executive summaries, prioritized next steps, shareable slide decks, experiment backlogs, and decision-ready briefs.

## Skill Catalog

| Skill | Use It For | Common Inputs | Typical Deliverables |
| --- | --- | --- | --- |
| `web-analytics-health-check` | Decide whether web marketing data is trustworthy and what changed. | GA4, Search Console, CRM, attribution, UTM, dashboard, CSV, XLSX, or screenshot exports. | Data-quality review, prioritized findings, next checks, tracking fixes, opportunity notes. |
| `website-performance-report` | Create a shareable, executive-ready slide deck that explains website performance over a reporting period. | GA4, Search Console, CRM, marketing automation, ad platforms, dashboards, CSV/XLSX exports. | Editable PowerPoint or native Google Slides deck with KPI story, drivers, caveats, and actions. |
| `seo-aeo-opportunity-audit` | Find SEO, AEO, and GEO growth opportunities. | Search Console exports, query/page tables, SERP notes, page copy, content inventories. | Opportunity report, content refresh plan, query/page map, answer-block recommendations, schema and internal-link next steps. |
| `cro-landing-page-review` | Improve B2B SaaS landing pages and conversion paths. | URLs, screenshots, page copy, form flows, analytics summaries, heatmap notes, funnel exports. | CRO audit, friction findings, experiment backlog, page-level recommendations, before/after messaging ideas. |
| `llm-discoverability-audit` | Assess whether a company, product, or topic can be understood and cited by AI systems. | Website pages, messaging docs, comparison pages, reviews, analyst notes, citation/source lists, AI answer examples. | Entity coverage audit, citation gap analysis, content recommendations, FAQ/comparison/proof-point plan. |
| `marketing-action-brief` | Convert messy findings into stakeholder-ready next steps. | Audit notes, analytics findings, research summaries, experiment ideas, meeting notes. | Executive brief, 30/60/90-day plan, presentation outline, owner/action matrix, decision memo. |

## Using These Skills In Codex

The skills live in `.agents/skills`, which is the repo-scoped discovery location Codex scans when you open a task from this repository. Start a new Codex task in this repo, then type `$` in the prompt or open **Skills** in the sidebar to confirm they are available.

To make the same skills available across all local Codex projects, copy or symlink the folders under `.agents/skills` into your personal skills directory at `$HOME/.agents/skills`.

## Example Prompts

```text
Use $web-analytics-health-check to review these GA4 and HubSpot exports for tracking issues, suspicious movement, and practical follow-up checks.
```

```text
Use $seo-aeo-opportunity-audit to audit this Search Console export and content inventory for SEO/AEO opportunities. Return a prioritized report and 30-day content refresh plan.
```

```text
Use $cro-landing-page-review to review this landing page screenshot and form flow for conversion friction. Return the top issues, evidence, and an experiment backlog.
```

```text
Use $llm-discoverability-audit to assess our product category visibility in AI answers. Identify entity gaps, citation gaps, and content next steps.
```

```text
Use $marketing-action-brief to turn these marketing findings into a concise executive brief and presentation outline for next week's leadership meeting.
```

```text
Use $website-performance-report with GA4 to create a website-performance slide deck for the last 90 days, compared with the preceding 90 days. Include traffic, acquisition, conversion, landing-page insights, data caveats, and next actions.
```

## Marketing Analytics MCP

`ga4-mcp` is a local, read-only MCP server that gives Codex access to Google Analytics 4 and Google Search Console. It currently exposes two tools:

| Tool | Source | Use it for |
| --- | --- | --- |
| `run_ga4_report` | Google Analytics Data API | Traffic acquisition, landing pages, events, key events, devices, channels, and period comparisons. |
| `run_gsc_search_analytics` | Google Search Console API | Queries, pages, countries, devices, dates, clicks, impressions, CTR, and average position. |

The MCP server is intended to fetch source-backed marketing data first, then hand the analytical work to the appropriate SignalForge skill.

### Set up the server

1. Enable the Google Analytics Data API and Google Search Console API for the Google Cloud project used for authentication.
2. Give the Google identity used by the server read access to the target GA4 property.
3. Add the same Google identity as a user on the Search Console property.
4. Configure Google Application Default Credentials in the environment that starts the server. The server creates `BetaAnalyticsDataClient` without explicit credentials, so it uses the standard Google authentication chain.
5. Set `GA4_PROPERTY_ID` to the numeric GA4 property ID.
6. Set `GSC_SITE_URL` to the exact Search Console property, such as `https://example.com/` or `sc-domain:example.com`.
7. Do not commit credentials, property IDs, or service-account keys to the repository.
8. Install and run the server from its directory:

```bash
cd ga4-mcp
npm install
GA4_PROPERTY_ID=123456789 GSC_SITE_URL=sc-domain:example.com npx tsx src/index.ts
```

Register that command as a stdio MCP server in Codex, passing `GA4_PROPERTY_ID`, `GSC_SITE_URL`, and the Google authentication environment to the server process. Once connected, Codex can call the GA4 and Search Console tools directly; no Google credentials should be placed in prompts or skill files.

Example Codex MCP config:

```toml
[mcp_servers.ga4]
enabled = true
command = "npx"
args = ["tsx", "/Users/jordan/Documents/marketing-codex-skills/ga4-mcp/src/index.ts"]
env = {
  GA4_PROPERTY_ID = "123456789",
  GSC_SITE_URL = "sc-domain:findyourbeacon.app",
  GOOGLE_APPLICATION_CREDENTIALS = "/absolute/path/to/service-account.json"
}
tool_timeout_sec = 60
```

See [`ga4-mcp/README.md`](ga4-mcp/README.md) for the subproject setup notes and local validation commands.

### GA4 query pattern

Always specify at least one dimension. Use a time dimension such as `date`, `yearWeek`, or `yearMonth` for totals and trends, then query the same period by a diagnostic dimension such as `sessionDefaultChannelGroup`, `landingPagePlusQueryString`, `deviceCategory`, or `eventName`.

Useful baseline metrics include `sessions`, `totalUsers`, `screenPageViews`, `engagedSessions`, `engagementRate`, `averageSessionDuration`, `eventCount`, and `keyEvents`. Confirm that event and conversion definitions are stable before comparing periods.

Example report call shape:

```json
{
  "startDate": "2026-05-01",
  "endDate": "2026-07-28",
  "dimensions": ["sessionDefaultChannelGroup"],
  "metrics": ["sessions", "engagedSessions", "keyEvents"],
  "limit": 20
}
```

### Search Console query pattern

Use Search Console for organic search questions that GA4 cannot answer cleanly, especially query quality. For homepage query analysis, filter `page` to the exact homepage URL and compare equivalent periods by `query`.

Useful dimensions include `query`, `page`, `country`, `device`, and `date`. Core metrics returned by the API are `clicks`, `impressions`, `ctr`, and `position`.

Example report call shape:

```json
{
  "siteUrl": "sc-domain:findyourbeacon.app",
  "startDate": "2026-07-01",
  "endDate": "2026-07-28",
  "dimensions": ["query"],
  "pageFilter": "https://www.findyourbeacon.app/",
  "rowLimit": 1000
}
```

### Use MCP data with the skills

Use the MCP to retrieve data, then assign the analytical job to the appropriate skill:

| Goal | Recommended workflow |
| --- | --- |
| Check whether web analytics can support a decision | Query totals, trends, channels, landing pages, devices, events, and Search Console queries → use `$web-analytics-health-check` to assess tracking, attribution, completeness, and anomalous movement. |
| Explain a traffic or conversion change | Pull the affected period and a comparable prior period by `date`, channel, landing page, device, event, Search Console query, and Search Console page → use `$web-analytics-health-check` before drawing conclusions. |
| Produce an executive report | Pull comparable period totals and key GA4/GSC segments with MCP → use `$website-performance-report` to create an editable deck. It should state the period, comparison, sources, caveats, drivers, and actions. |
| Turn findings into an operating plan | Complete the health check or performance report → use `$marketing-action-brief` to create owners, timing, decisions, and a 30/60/90-day plan. |
| Improve a high-traffic landing page | Identify high-volume, low-engagement, or low-conversion landing pages with GA4 MCP → use `$cro-landing-page-review` with the page URL, screenshots, and relevant GA4 cut. |
| Find SEO/AEO opportunities | Pull Search Console query/page data by impressions, clicks, CTR, and position → use `$seo-aeo-opportunity-audit` to prioritize content refreshes, answer blocks, internal links, and schema opportunities. |

For performance reports, compare equivalent date windows, distinguish percentage-point changes from relative changes, label partial days, and never treat `keyEvents` as distinct conversions until event definitions have been verified. When GA4 records multiple key events for one user action, report the event-definition issue and use the cleanest available primary conversion proxy. For SEO analysis, use Search Console queries as the source of truth for organic query quality; GA4 organic traffic reports do not include Google search queries.

## What SignalForge Optimizes For

- Actionable output over generic marketing advice.
- Evidence tied to URLs, queries, campaigns, page elements, segments, metrics, and assumptions.
- Clear confidence labels when data is incomplete or source quality is uncertain.
- B2B SaaS judgment: lead quality, pipeline context, buying journeys, attribution limits, and stakeholder-ready communication.
- AI-era discoverability: answer engines, generative engine optimization, entity clarity, citation readiness, and content that can be understood by both people and models.
