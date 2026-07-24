---
name: llm-discoverability-audit
description: Assess whether a company, product, category, or topic is likely to be understood, recommended, and cited by AI search and LLM answer systems. Use when asked to audit LLM discoverability, AI search visibility, answer-engine readiness, entity clarity, citation gaps, source coverage, comparison/alternative content, brand or product presence in generated answers, or content improvements for ChatGPT, Perplexity, Google AI Overviews, Gemini, Claude, or similar AI discovery surfaces.
---

# LLM Discoverability Audit

## Overview

Use this skill to evaluate whether AI systems can confidently understand who the company is, what it offers, who it serves, why it is credible, and when it should be mentioned. Optimize for entity clarity, citation readiness, useful source coverage, and buyer-relevant answers.

## Core Workflow

1. Identify the entity, product/category, target audience, geography, competitors, and AI surfaces or prompts under review.
2. Inventory evidence: website pages, docs, reviews, directories, analyst mentions, partner pages, schema, Wikipedia/Wikidata if relevant, press, comparison pages, and sample AI answers.
3. Read `references/ai-discovery-signals.md` before evaluating gaps.
4. Assess:
   - **Entity clarity**: names, categories, relationships, audience, products, founders, locations, and consistent facts.
   - **Topical authority**: depth across buyer questions, use cases, alternatives, definitions, and comparisons.
   - **Citation readiness**: authoritative pages, third-party sources, structured data, dated facts, and proof.
   - **Answer usefulness**: concise explanations, comparison tables, FAQs, examples, and decision criteria.
   - **Risk**: outdated facts, thin claims, conflicting descriptions, missing proof, or over-optimized content.
5. Prioritize gaps by buyer importance, answer likelihood, source credibility, and effort.
6. Produce content and source-building next steps, clearly separating owned-site work from third-party citation opportunities.

## Output Format

For most audits, return:

1. **Bottom Line**: likely AI discoverability strength and the most important gap.
2. **Entity And Topic Findings**: prioritized issues with evidence, impact, confidence, and recommendation.
3. **Citation Gap Analysis**: source types that are missing, weak, outdated, or inconsistent.
4. **Content Recommendations**: pages, sections, FAQs, comparisons, schema, proof, and answer blocks.
5. **Prompt/Answer Test Plan**: prompts and answer qualities to monitor.
6. **Caveats**: inaccessible sources, unstable AI answers, missing crawl evidence, or assumptions.

## Guidance

- Do not claim direct ranking influence unless evidence supports it. Frame recommendations as improving clarity, retrievability, and citation usefulness.
- Prefer durable, factual, externally corroborated content over speculative "AI SEO" tricks.
- Cite specific pages, missing facts, answer examples, source types, schema gaps, or contradictory language when available.
- Distinguish owned content fixes from PR, partner, review, directory, analyst, and community source gaps.

When the user provides live AI answer examples, treat them as samples, not stable measurements.
