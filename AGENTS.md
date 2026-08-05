# Repository Instructions

This is a multilingual Next.js resume application. Its resume copy lives in:

- `app/src/messages/ko.json`
- `app/src/messages/en.json`
- `app/src/messages/jp.json`

Personal contact data lives only in `app/src/config/personal.json`.

For any resume drafting, revision, or Korean-to-English translation, follow
the authoritative workflow in `.agent/skills/resume-writing/SKILL.md`.
Ground every claim and metric in provided evidence, preserve contribution
ownership and production status, and omit confidential details unsuitable for
a public resume.

Keep the existing JSON schema and card structure intact. Complete Korean
updates before translating to English, and leave Japanese untouched unless it
is explicitly requested. After changes, parse edited JSON files and run
`npm run lint` from `app/`.
