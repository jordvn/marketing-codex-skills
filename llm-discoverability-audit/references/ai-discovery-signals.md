# AI Discovery Signals

Use these checks when auditing LLM discoverability, AI search visibility, entity clarity, or generative answer readiness.

## Entity Clarity

- The entity should have a consistent name, category, audience, product description, location, and relationship to parent/sub-brands.
- The site should explain what the company does in plain language, not only slogans.
- Product and category pages should connect the brand to the problem, use case, industry, and alternative solution set.
- About, product, pricing, docs, comparison, customer, and integration pages should not contradict each other.
- Structured data should match visible page content and support entity understanding where appropriate.

## Citation Readiness

- AI systems need retrievable, citation-worthy sources: clear URLs, stable pages, accessible text, dated updates, author/source context, and factual specificity.
- Third-party corroboration can matter: reviews, directories, partner pages, analyst reports, podcasts, event pages, customer stories, industry publications, and community discussions.
- Claims should be backed by evidence: customer examples, quantified results, methodology, screenshots, integrations, certifications, or public documentation.
- Thin pages with generic claims are less useful than pages with specific answers and proof.

## Answer Coverage

- Cover buyer questions: what it is, who it is for, how it works, pricing model, integrations, alternatives, competitors, implementation, security, proof, and limitations.
- Create comparison content only when it is fair and specific.
- Define category terms, acronyms, and problem language so models can map the company to the right context.
- Include concise answer blocks near the top of pages for common questions.
- Use examples, tables, and step-by-step explanations where they help answer extraction.

## Common Gaps

- Brand is described differently across the site and third-party sources.
- Product pages lack category language, so AI systems cannot tell when to recommend the company.
- Strong claims exist only in sales copy, with little independent proof.
- Integration, security, pricing, or implementation details are hidden behind forms.
- Competitor and alternative questions are unanswered, leaving third-party pages to frame the company.
- Key pages are blocked, thin, outdated, script-rendered without accessible content, or missing schema.

## Prompt/Answer Monitoring

Track a small set of prompts by category:

- Category: "best [category] tools for [audience/use case]"
- Problem: "how to solve [problem] for [audience]"
- Comparison: "[brand] vs [competitor]"
- Alternative: "alternatives to [competitor] for [use case]"
- Definition: "what is [category/problem]"
- Recommendation: "what should a [role] use for [workflow]"

Assess whether answers mention the entity, describe it accurately, cite useful sources, compare it fairly, and route buyers to the right next question.

## Recommended Finding Shape

```text
[Priority] Discoverability gap
Evidence: page, source, prompt result, claim, schema, or missing citation.
Why it matters: answer, buyer, or credibility implication.
Recommendation: owned content, source-building, schema, proof, or monitoring action.
Confidence: high/medium/low and why.
Next check: prompt, crawl, source, or content validation.
```
