---
name: website-performance-report
description: Create shareable, executive-ready slide decks that explain how a website performed over a requested reporting period. Use when producing weekly, monthly, quarterly, campaign, launch, or year-over-year website performance reports from GA4, Google Search Console, CRM, marketing automation, ad-platform, dashboard, CSV/XLSX, or analytics exports; when summarizing traffic, engagement, conversion, SEO, content, acquisition, or lead-quality results; or when turning website analytics into a presentation with insights, drivers, risks, and next actions.
---

# Website Performance Report

Create a concise story about performance and decisions, not a collection of charts. Deliver an editable, shareable slide deck in the format requested; if no format is specified, create a PowerPoint deck. Use the `presentations` skill to create and verify the deck, and use `spreadsheets` when calculations require structured workbook handling.

## Output Location

Write generated report decks, rendered slide images, inspection files, temporary scripts, working packages, and other report artifacts outside the repository by default. Use a non-repo workspace such as `/private/tmp/marketing-codex-skills/reports/<report-slug>/` when available, or the OS temp directory if `/private/tmp` is unavailable. Return the final deck path to the user.

Do not write generated report artifacts to the repository root, `.tmp/`, or skill folders unless the user explicitly asks to save the export in the repo. Source files, reusable skill instructions, templates, and code changes may still be edited in the repo when the task is to update the project itself.

## Workflow

1. Confirm or infer the audience, reporting period, comparison period, website scope, and decision the deck needs to support. Default to the immediately preceding equivalent period for comparison; label the choice and do not silently compare non-equivalent periods.
2. Inventory the supplied sources, their date coverage, filters, definitions, and known tracking changes. Reconcile totals across sources only when their scopes and definitions match.
3. Validate before interpreting. Invoke `$web-analytics-health-check` when data quality is uncertain, metrics move unexpectedly, sources conflict, or the report will influence a material decision. Surface any unresolved issue in the deck rather than presenting false precision.
4. Calculate period-over-period and, when meaningful, year-over-year changes. Use absolute changes for rates and percentages (for example, conversion rate +0.4 percentage points), and relative changes for counts (for example, sessions +12%). Do not manufacture baselines, targets, or causal explanations.
5. Choose the non-repo output folder and create all generated report artifacts there. Build the narrative with `references/deck-blueprint.md`. Select only the slides that answer the audience's decision; keep the main deck to roughly 8–12 slides and move supporting detail to an appendix.
6. Design legible charts with clear titles that state the takeaway, visible reporting periods, consistent scales, source notes, and a restrained palette. Use charts for trends, composition, comparisons, and funnels; use tables only for small, decision-relevant detail.
7. Quality-check the rendered deck: verify numbers, formulas, period labels, source attribution, chart legibility, and that every key conclusion has supporting evidence. Ensure speaker notes or an appendix explain definitions, filters, assumptions, and data caveats.

## Analytical Standards

- Start with business outcomes: qualified conversions, leads, pipeline, or revenue where available. Treat sessions, page views, impressions, and rankings as drivers or diagnostic metrics rather than success on their own.
- Segment movement before explaining it: channel, landing page or content group, device, geography, new/returning audience, campaign, query, and branded/non-branded search as applicable.
- Separate observed facts, plausible drivers, and recommended actions. Mark inferences as hypotheses and attach confidence where helpful.
- Account for incomplete periods, seasonality, paid-media spend changes, releases, consent or tracking changes, redirects, and sample size.
- Include a short, owned action plan: action, expected outcome, owner (or team), and timing. Prioritize a small number of high-leverage actions.
- If data is insufficient, make a useful deck about what is known, what cannot yet be concluded, and the exact data or check needed next. Never fill gaps with invented metrics or decorative charts.

## Deliverable Requirements

- Put the reporting period, comparison period, and website scope on the title or context slide.
- Lead with an executive summary: outcome, main drivers, risks/caveats, and decisions or actions requested.
- Give each slide a takeaway title, not a topic label.
- Cite each source in a small footer or notes, including the extraction date when available.
- Include a final action slide and an appendix for metric definitions, detailed cuts, and data-quality caveats as needed.

## Resource

Read `references/deck-blueprint.md` before outlining the deck. It supplies the recommended slide sequence, chart choices, and source-note standard.
