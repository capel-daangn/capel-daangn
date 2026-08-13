---
name: resume-writing
description: Draft, revise, or translate this repository's resume content. Use for Korean resume writing, evidence-backed accomplishment updates, and Korean-to-English resume translation.
---

# Resume Writing

Create concise, evidence-led resume copy for this project. Treat the Korean
resume as the source of truth for English translation.

## Source and Scope

1. Identify the request's target language and section before editing.
2. Read the current target message file in `app/src/messages/`.
3. Read the source material supplied by the user or explicitly named for the
   update. Use it to distinguish confirmed facts, measured outcomes, and
   qualitative conclusions.
4. Do not include confidential implementation details, internal links, or
   sensitive operational information that is unsuitable for a public resume.
5. Ask for clarification when a claim's ownership, production status, metric
   definition, or publication suitability is unclear.

## Korean Resume Style

### Positioning and Skills

- Keep the profile concise and professional. State the engineering focus and
  the kind of systems or outcomes pursued; avoid ungrounded self-evaluation.
- Write skills as `technology or environment + demonstrated capability`.
- Prefer specific systems and engineering responsibilities over a long tool
  list.

### Project Structure

Use the existing `Context → Contribution → Outcome` card structure for
substantial projects.

- **Heading:** `problem or feature: technical approach or key decision`
- **Context:** Explain the user or business need, technical constraint, and
  why a solution was needed. Use calm Korean past tense, such as
  `필요했습니다` or `어려웠습니다`.
- **Contribution:** State the author's design and implementation choices in
  compact, action-led phrases. Omit repetitive subjects and end naturally with
  forms such as `구현.`, `설계.`, `구축.`, or `식별.`.
- **Outcome:** Lead with the delivered product or operational value. Add a
  source-backed metric only when its unit, timeframe, and scope are known.

Use English technical names when they make a term precise (for example, LLM,
MCP, gRPC, Structured Output, or Kafka), but explain the engineering purpose
in Korean. Avoid inflated claims such as `혁신`, `획기적`, or `업계 최고`.

## Evidence Rules

- Preserve each metric's original unit and scope: `DAU 약 15%`, `연간 25%`,
  or `p99 500ms 이내` are materially different claims.
- Attribute collaborative work accurately. Do not replace a shared or
  supporting contribution with an individual-lead claim.
- Describe unmeasured impact qualitatively; do not infer a business outcome
  from technical completion.
- Label an experiment or PoC as such. Do not present it as a production launch
  unless the source confirms that status.

## English Translation

Translate only after the Korean version is finalized or supplied as the source.

- Preserve the claim, ownership, confidence level, technical decision, and
  metric scope; do not translate word-for-word when natural English requires a
  different sentence order.
- Use concise action-and-result phrasing. For example, translate a Korean
  contribution into a strong verb-led bullet, not a first-person narrative.
- Keep proper technical nouns and product names consistent across the document.
- Retain `PoC`, `internal`, `approximately`, and other qualifiers when the
  Korean source uses them.
- Do not update `jp.json` unless the request explicitly includes Japanese.

## Editing and Validation

- Resume content lives in `app/src/messages/ko.json`, `en.json`, and
  `jp.json`. Preserve the existing JSON schema, section order, and card types.
- Contact links live in `app/src/config/personal.json`; do not duplicate them
  in a language message file.
- For bilingual updates, finish and review Korean content before changing
  English content.
- Parse every edited JSON file, then run `npm run lint` from `app/`.
- Review the diff for unsupported wording, metric drift, language-schema drift,
  and accidental changes to unaffected languages.
