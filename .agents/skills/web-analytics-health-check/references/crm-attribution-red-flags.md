# CRM And Attribution Red Flags

Use this reference when reviewing HubSpot, Salesforce, Marketo, Pardot, CRM, marketing automation, pipeline, form, or attribution exports.

## Source Of Truth

- Identify which system owns each metric: GA4 for web behavior, form system for submissions, marketing automation for lead records, CRM for lifecycle stage and pipeline.
- Check sync timing before declaring mismatches. CRM and marketing automation data can lag GA4 by hours or days.
- Confirm whether reports use created date, converted date, MQL date, SQL date, opportunity created date, or closed date.
- Confirm whether counts are people, accounts, form submissions, leads, contacts, opportunities, or deals.
- Deduplication rules matter. GA4 form submits, marketing automation leads, and CRM contacts rarely have identical grains.

## Lead Quality Red Flags

- Leads up but MQL/SQL/opportunity rates down: traffic quality, offer quality, spam, qualification threshold, or routing may have changed.
- Strong conversion rate but weak pipeline: check company size, industry fit, geography, job titles, student/personal emails, competitor submissions, and disqualification reasons.
- Paid or partner campaigns with high leads and low qualification should be reviewed by offer, audience, and query/placement quality.
- Organic pages with fewer leads but stronger downstream quality may be more valuable than raw volume suggests.
- A surge in leads from one domain, country, IP pattern, or form may be spam or internal testing.

## Attribution Issues

- Missing original source, latest source, UTM fields, or landing page fields can inflate direct/unknown and weaken campaign conclusions.
- Last-click attribution under-values long B2B journeys. Look for assisted influence, first-touch, account engagement, and page/content sequences when available.
- Brand paid search can claim demand created by organic, direct, partner, or offline channels.
- Retargeting can appear efficient while mostly harvesting existing demand.
- Offline events, sales outreach, webinars, partner referrals, and dark social may not be visible in web analytics.
- Field overwrite rules can erase original campaign context. Check whether latest UTM overwrites first-touch values.

## Funnel Diagnostics

- Form submissions in GA4 exceed CRM leads: check duplicate firing, spam filtering, failed sync, test leads, iframe behavior, or hidden required fields.
- CRM leads exceed GA4 conversions: check consent loss, blocked tags, server-side submissions, form vendor redirects, or missing key event flags.
- MQL drops with stable leads: check scoring model, enrichment provider, routing rules, lifecycle automation, required fields, or sales acceptance criteria.
- SQL/opportunity drops with stable MQLs: check sales follow-up SLA, routing queues, territory rules, lead quality, or qualification changes.
- Pipeline changes should be segmented by source, campaign, landing page, offer, segment, account size, and sales motion.

## Recommended Cuts

- Source / medium / campaign
- Landing page or first page
- Form, offer, or content asset
- Lifecycle stage
- Industry, company size, employee count, revenue band
- Region and language
- New vs existing account
- Sales owner, territory, or routing path
- Disqualification reason
