# GA4 Red Flags

Use this reference when reviewing GA4, web analytics, event, page, landing page, funnel, or conversion exports.

## Tracking Integrity

- Sudden zeros or near-zeros in sessions, users, key events, form submissions, page views, or revenue-like goals usually indicate tracking, consent, tag, or filter changes.
- Step changes on a single day often map to GTM publishes, consent-banner changes, CMS releases, domain changes, redirect changes, or GA4 admin changes.
- Impossible rates need validation: conversion rate above plausible levels, engagement rate near 100%, bounce rate near 0%, or event counts far exceeding page views.
- Duplicate events can appear as inflated form submits, clicks, downloads, video plays, or key events. Compare event count to unique users and expected form completions.
- Missing or renamed events can create false declines. Check event names, key event toggles, parameter changes, and whether reports are mixing old and new names.
- Cross-domain or referral issues can inflate self-referrals, payment/app subdomains, or identity provider domains.
- Consent-mode or cookie-banner changes can shift users, sessions, attribution, and modeled conversions without a true demand change.
- Internal traffic filters, developer traffic, bot filters, and data retention settings can alter trend comparability.

## Traffic Quality

- Direct / none spikes often indicate missing UTMs, redirect stripping, email/app traffic, dark social, or broken campaign tagging.
- Unassigned, not set, or unknown source/medium increases usually point to taxonomy or tagging problems.
- Referral spikes from suspicious domains, low-engagement geos, or odd device/browser mixes may be bot or spam traffic.
- Paid search increases with falling non-brand conversions may indicate brand leakage, poor query quality, or campaign mix changes.
- Organic traffic changes should be cross-checked with Search Console before attributing to SEO.

## Conversion Diagnostics

- Segment conversion movement by landing page, source/medium, campaign, device, country, form/offer, and new vs returning users.
- If conversion rate falls while traffic rises, check traffic mix and paid/partner/referral quality before blaming the page.
- If conversions fall but form starts/clicks do not, check form errors, hidden fields, validation, routing, thank-you page loads, and CRM sync.
- If GA4 conversions rise but CRM leads do not, check duplicate events, bot form fills, test submissions, integration failures, or changed lead filters.
- If CRM leads rise but GA4 conversions do not, check key event configuration, event firing, consent effects, or iframe/form vendor changes.

## Opportunity Signals

- High sessions with low conversion: review message match, CTA clarity, form friction, mobile UX, and audience quality.
- High engagement with low conversion: add stronger next steps, proof, offer alignment, or internal links.
- High conversion with low traffic: consider SEO expansion, paid promotion, internal linking, or campaign reuse.
- Strong desktop conversion but weak mobile conversion: inspect form usability, layout, page speed, sticky CTA behavior, and field count.
- Landing pages with strong assisted influence but weak last-click conversion may still deserve investment in B2B buying journeys.
