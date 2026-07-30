# Website Performance Deck Blueprint

Adapt this sequence to the audience and evidence. Omit empty sections; do not add slides merely to fill the sequence.

Generated deck files, slide renders, inspection dumps, and temporary build assets should live in the non-repo output folder chosen from `SKILL.md`. Keep this repository reserved for reusable skill source, templates, references, and project code unless the user explicitly asks to save an export here.

| Slide | Decision question | Recommended evidence |
| --- | --- | --- |
| Title and context | What is being reported? | Reporting/comparison periods, scope, sources, audience. |
| Executive summary | What happened and what should happen next? | 3–4 outcome-led bullets: result, driver, risk, action. |
| KPI scorecard | Did the website meet its most important outcomes? | Current, prior, change, target (only if supplied), caveat. |
| Traffic trend | Is demand or site reach changing? | Time series for sessions/users; annotate material launches or tracking changes. |
| Acquisition mix | Which channels drove the change? | Channel contribution/decomposition; quality metric beside volume when available. |
| Conversion funnel | Where did value increase or leak? | Stage volumes and rates; use qualified conversion or lead quality when available. |
| Landing pages/content | What pages or content explain performance? | Top movers by meaningful contribution, not a long top-10 list. |
| Organic search | What changed in search visibility and demand? | Clicks, impressions, CTR, position; branded/non-branded and query/page cuts when available. |
| Audience/experience | Which segments need attention? | Device, geography, new/returning, engagement, speed or UX signal only if relevant. |
| Actions | What will be done, by whom, and when? | Prioritized action, expected outcome, owner/team, timing, measurement. |
| Appendix | Can a reviewer verify the story? | Definitions, filters, detailed tables, source notes, assumptions, health-check findings. |

## Slide Design Rules

- Prefer one point per slide and a maximum of two visual elements.
- Make the title a conclusion: “Organic traffic grew, but conversion quality softened,” not “Organic traffic.”
- Put both the value and comparison beside headline metrics. Use `+12%` for counts and `+0.4 pp` for rate changes.
- Ensure color is not the only way to distinguish series; label lines/bars directly where practical.
- Use an `as of` date, timezone if material, and source/filters footer on every data slide.
- Avoid dual axes unless the relationship cannot be shown more clearly another way.

## Source Note Pattern

Use a concise footer or speaker note: `Source: GA4, [property/report]; [date range]; filters: [scope]; extracted [date].` Include comparable notes for GSC, CRM, advertising, or dashboard sources. Name metric definitions and attribution model in the appendix when they can alter interpretation.
