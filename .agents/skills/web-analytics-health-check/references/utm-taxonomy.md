# UTM Taxonomy Review

Use this reference when reviewing campaign links, source/medium values, channel grouping, direct/none inflation, or campaign reporting fragmentation.

## Common UTM Problems

- Missing UTMs cause campaign traffic to fall into direct, referral, organic social, or email defaults.
- Inconsistent casing splits reporting: `LinkedIn`, `linkedin`, and `Linkedin` become separate values in many tools.
- Source and medium confusion breaks channel grouping. Example: source should often be the platform/vendor, medium should be the channel type.
- Overly granular campaign names make reporting hard. Use content/ad/group fields for variant-level details when possible.
- Reused campaign names across unrelated launches hide performance differences.
- Spaces, special characters, and inconsistent separators create duplicates.
- Redirects, URL shorteners, and CMS links can strip parameters.
- Internal links with UTMs can overwrite original acquisition source and should usually be avoided.

## B2B SaaS Naming Guidance

- Keep `utm_source` stable and platform/vendor-oriented: `linkedin`, `google`, `bing`, `newsletter`, `partner-name`.
- Keep `utm_medium` channel-oriented: `paid_social`, `cpc`, `email`, `partner`, `organic_social`, `display`, `webinar`.
- Use `utm_campaign` for the durable initiative: product launch, webinar, report, nurture, event, or demand program.
- Use `utm_content` for creative, CTA, placement, audience, or email module.
- Use `utm_term` for paid search keywords or audience/query detail when useful.
- Document exceptions. Unwritten exceptions become reporting drift.

## Audit Checks

- Group by source, medium, campaign, content, and landing page. Look for duplicates caused by casing, punctuation, pluralization, or synonyms.
- Check top direct/none landing pages for campaign-style URLs or launch pages that likely lacked UTMs.
- Compare ad platform campaign names to analytics campaign names.
- Check whether email, paid social, partner, and webinar links follow the same pattern.
- Review channel grouping rules if valid UTMs still land in unassigned or incorrect channels.
- Validate a sample of live campaign links through redirects to confirm parameters survive.

## Opportunity Signals

- Fragmented campaigns may hide winners. Consolidate naming before making budget decisions.
- Campaigns with high traffic but many unknown values need tracking cleanup before performance judgment.
- Source/medium cleanup often improves weekly reporting quality more than adding new charts.
