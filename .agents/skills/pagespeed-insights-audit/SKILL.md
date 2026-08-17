---
name: pagespeed-insights-audit
description: Audit public webpages with Google PageSpeed Insights and Lighthouse data, interpret Core Web Vitals and lab metrics, diagnose performance, accessibility, best-practice, and technical SEO issues, and prioritize engineering or marketing fixes. Use when asked to check PageSpeed Insights, page speed, Core Web Vitals, Lighthouse scores, mobile versus desktop performance, slow landing pages, performance regressions, or technical page-experience issues for one or more URLs.
---

# PageSpeed Insights Audit

Use Google PageSpeed Insights as diagnostic evidence, then turn the output into a short, prioritized remediation plan. Treat a single run as a snapshot, not proof of a persistent trend.

## Workflow

1. Identify the URLs, page templates, audience, conversion goal, device priority, and whether the user needs a point-in-time audit or a repeatable baseline.
2. Use `run_pagespeed_insights` for each representative URL. Run mobile first; add desktop when comparison is requested or desktop traffic matters. Default to all four categories unless the request is performance-only.
3. Read `references/interpretation-guide.md` before interpreting results.
4. Confirm the requested URL, final URL, fetch time, strategy, and Lighthouse version. Flag redirects, failed categories, missing field data, or inconsistent runs.
5. Separate evidence into:
   - **Field data**: available page- or origin-level real-user percentiles and categories.
   - **Lab data**: Lighthouse metrics and scores from this synthetic run.
   - **Diagnostics**: specific audits, estimated savings, and affected resources or systems.
6. Group related diagnostics into root causes such as render-blocking resources, oversized images, excessive JavaScript, third-party scripts, slow server response, layout instability, or accessibility defects.
7. Prioritize by user impact, affected traffic/templates, estimated savings, implementation effort, confidence, and business risk.
8. Recommend verification: rerun comparable mobile and desktop tests, test representative templates, and monitor field data or CrUX separately when longitudinal evidence matters.

## URL Selection

- For one URL, test the exact canonical page and report any redirect to the final URL.
- For a site audit, sample representative templates instead of treating the homepage as the whole site: homepage, primary product/solution page, high-traffic landing page, article/resource page, and conversion page.
- For a suspected regression, test the same URL, strategy, categories, and approximate conditions more than once. Do not claim causality from one synthetic run.
- Avoid bulk testing every URL by default; API results are slower and may consume quota without improving the diagnosis.

## Output Format

Return:

1. **Bottom Line**: the main user-experience constraint, affected device/template, and best next move.
2. **Scorecard**: URL, strategy, fetch time, category scores, core lab metrics, and available field-data status.
3. **Prioritized Findings**: evidence, likely root cause, affected users/templates, recommendation, impact, effort, and confidence.
4. **Implementation Plan**: fixes grouped into immediate, near-term, and structural work with likely owners.
5. **Verification Plan**: exact URLs, strategies, metrics, and post-change checks.
6. **Caveats**: snapshot variability, missing field data, origin fallback, redirects, authentication, consent, or third-party behavior.

## Interpretation Rules

- Never average mobile and desktop scores or category scores into a custom overall grade.
- Do not describe a Lighthouse score as a Core Web Vital. Use LCP, INP, and CLS field data for Core Web Vitals when available; treat TBT as a lab proxy for responsiveness, not INP itself.
- Prefer field data for statements about actual users and lab diagnostics for explaining what to fix.
- Do not treat absent field data as a passing result; state that the page or origin lacks sufficient returned data.
- Do not promise that estimated millisecond or byte savings will translate directly into the same real-user improvement.
- Tie recommendations to named audits, metrics, URLs, templates, scripts, assets, or third parties.
- Distinguish fixes that marketing teams can own from changes requiring frontend, platform, analytics, or vendor work.
- Preserve accessibility and conversion behavior when recommending performance changes; do not remove essential content, consent controls, analytics, or form functionality without a safer replacement.

## Related Skills

- Use `$cro-landing-page-review` when speed evidence needs to be combined with page messaging, form, CTA, or conversion analysis.
- Use `$seo-aeo-opportunity-audit` when technical performance is one part of a broader organic-search opportunity audit.
- Use `$website-performance-report` when the findings need to appear in an executive reporting deck. Present PageSpeed as a technical snapshot unless comparable historical runs exist.
