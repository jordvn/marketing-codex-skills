# PageSpeed Insights Interpretation Guide

Use this guide to distinguish observed user experience, synthetic diagnostics, and remediation priorities.

## Evidence Hierarchy

1. Use page-level field data for claims about visitors to the tested URL.
2. Use origin-level field data only when page-level data is unavailable, and label origin fallback clearly.
3. Use Lighthouse lab metrics to reproduce and diagnose problems under the reported test configuration.
4. Use audit savings as directional prioritization evidence, not guaranteed production impact.

Google has announced that CrUX real-user data will be removed from the PageSpeed Insights API. When field-data history or durable real-user monitoring matters, use the dedicated CrUX API or CrUX History API rather than relying on PageSpeed responses.

Official references:

- PageSpeed Insights API: <https://developers.google.com/speed/docs/insights/v5/get-started>
- PageSpeed API method: <https://developers.google.com/speed/docs/insights/v5/reference/pagespeedapi/runpagespeed>
- Core Web Vitals: <https://web.dev/articles/vitals>
- CrUX APIs: <https://developer.chrome.com/docs/crux/api>

## Core Metrics

| Metric | Evidence | What it represents | Good threshold |
| --- | --- | --- | --- |
| LCP | Field and lab | Loading performance of the main content | At or below 2.5 seconds |
| INP | Field | Interaction responsiveness | At or below 200 milliseconds |
| CLS | Field and lab | Visual stability | At or below 0.1 |
| TBT | Lab | Main-thread blocking during load; useful diagnostic proxy for responsiveness | At or below 200 milliseconds |
| FCP | Field and lab | Time until initial content renders | At or below 1.8 seconds |
| TTFB | Field and supporting diagnostics | Server/network response latency | At or below 0.8 seconds |

Apply field thresholds at the 75th percentile. Use the category returned by Google when available rather than reclassifying rounded values.

## Common Root-Cause Groups

### Slow LCP

- Check server response time, redirects, render-blocking CSS, font loading, hero-image discovery, image encoding and sizing, client-side rendering, and late cookie/consent behavior.
- Identify the actual LCP element before recommending image work.

### High TBT Or Poor INP

- Check excessive JavaScript, long tasks, hydration, third-party tags, tag-manager containers, chat widgets, personalization, consent platforms, and large client-side bundles.
- Recommend reducing, deferring, splitting, or conditionally loading work; do not simply remove measurement or consent tooling.

### High CLS

- Check images or embeds without dimensions, injected banners, consent interfaces, fonts, late-loading components, ads, and dynamic personalization.
- Reserve layout space and avoid inserting content above the current viewport.

### Large Transfer Or Render Cost

- Check responsive images, modern formats, compression, unused CSS/JavaScript, caching, CDN behavior, duplicate libraries, video, and third-party payloads.
- Prefer template-level fixes when the same asset or bundle affects many pages.

### Accessibility And Best Practices

- Treat critical accessibility failures as product defects, even when they do not explain the performance score.
- Keep security, browser-console, image-quality, and deprecated-API findings separate from speed findings so ownership stays clear.

## Prioritization

Prioritize a finding when several signals align:

- It affects a Core Web Vital or a critical conversion interaction.
- It appears across high-traffic or high-value templates.
- Lighthouse reports meaningful estimated savings.
- The responsible asset, script, component, or vendor is identifiable.
- The fix has low regression risk and a clear owner.

Lower confidence when only one run exists, the result changes substantially between runs, the page is personalized or authenticated, field data falls back to the origin, or a third party behaves intermittently.

## Comparison Rules

- Compare like with like: same URL, strategy, categories, and similar test timing.
- Record `fetchTime` and `lighthouseVersion` for every baseline.
- Run repeated samples before calling a small score movement a regression or improvement.
- Compare metrics and audit changes, not only the headline performance score.
- Treat one PageSpeed run as a deployment check, not a time-series monitoring system.
