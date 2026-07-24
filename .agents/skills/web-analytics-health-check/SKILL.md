---
name: web-analytics-health-check
description: Review B2B SaaS web marketing analytics for tracking issues, data-quality red flags, and suspicious performance changes before using the data for decisions. Use when analyzing GA4, Google Search Console, CRM, marketing automation, ad platform, Looker/Tableau/dashboard exports, CSV/XLSX extracts, screenshots of reports, weekly or monthly web performance reports, post-launch analytics QA, traffic drops/spikes, conversion anomalies, source/medium issues, UTM problems, form tracking issues, attribution questions, or requests to identify issues and opportunities in web analytics data.
---

# Web Analytics Health Check

## Overview

Use this skill to decide whether web marketing analytics are trustworthy, what looks broken or suspicious, and what follow-up checks or opportunities are worth prioritizing. Optimize for practical B2B SaaS decisions: traffic quality, lead generation, SEO performance, attribution, funnel movement, and launch/reporting confidence.

## Core Workflow

1. Identify the business question, reporting period, comparison period, data sources, and intended decision.
2. Inventory the provided fields, filters, segments, and metric definitions. State any missing context that materially limits confidence.
3. Run source-specific health checks using the relevant references:
   - GA4 or web analytics exports: read `references/ga4-red-flags.md`.
   - Google Search Console or SEO exports: read `references/search-console-red-flags.md`.
   - CRM, marketing automation, pipeline, or attribution exports: read `references/crm-attribution-red-flags.md`.
   - UTM or campaign tracking questions: read `references/utm-taxonomy.md`.
   - Executive reports, dashboards, or final recommendations: read `references/report-readiness.md`.
4. Separate issues into:
   - **Tracking/data quality**: data may be wrong or incomplete.
   - **Performance movement**: data appears valid and shows a real change.
   - **Opportunity**: data suggests an action, test, or deeper analysis.
5. Prioritize findings by impact, confidence, and urgency. Avoid treating every anomaly as equally important.
6. End with a short action list: what to fix, what to investigate, what to monitor, and what decision is safe or unsafe to make now.

## Review Heuristics

- Treat unexplained zeros, sudden step changes, impossible conversion rates, missing source/medium values, and metric-definition drift as trust issues before performance insights.
- Compare multiple cuts before concluding causality: channel, landing page, device, country, campaign, form/offer, query, and branded vs non-branded when available.
- Look for denominator problems: traffic mix shifts, tiny samples, incomplete current periods, bot traffic, consent changes, and delayed CRM syncs.
- For B2B SaaS, connect web metrics to downstream quality whenever possible: MQL, SQL, opportunity, pipeline, win rate, ACV, disqualification reason, segment, and company size.
- Distinguish launch effects from market effects: CMS releases, GTM publishes, consent-banner changes, redirects, paid budget changes, campaign launches, seasonality, and major content/indexing changes.
- Prefer specific next checks over vague recommendations. Name the exact segment, report, URL group, event, field, or owner to review.

## Output Format

For most reviews, return:

1. **Bottom Line**: whether the data is safe to use and the most important issue or opportunity.
2. **Findings**: prioritized bullets with evidence, likely explanation, confidence, and impact.
3. **Checks To Run Next**: concrete validations or data cuts.
4. **Actions**: fixes, experiments, content/SEO work, tracking work, or stakeholder follow-up.
5. **Caveats**: missing data, incomplete periods, small samples, or assumptions.

When the user provides a table or export, cite specific rows, columns, URLs, campaigns, queries, or metrics. When only a screenshot or summary is provided, clearly label inferences as tentative.

## Severity

- **Critical**: likely tracking breakage, missing conversions, broken attribution, or a misleading executive conclusion.
- **High**: material performance movement, major segment issue, or lead-quality/pipeline implication.
- **Medium**: optimization opportunity or localized data-quality concern.
- **Low**: monitoring note, naming cleanup, or minor reporting polish.

## Common Triggers

- "Why did traffic/conversions change?"
- "Can we trust this report?"
- "Review this GA4/GSC/HubSpot/Salesforce export."
- "Find tracking issues before launch/after launch."
- "Identify analytics issues and opportunities."
- "Summarize this weekly/monthly web performance data."
- "Audit this dashboard for misleading metrics."
