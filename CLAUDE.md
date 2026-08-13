# Resume App Guidance

This repository contains a multilingual Next.js resume application.

## Resume Content

- Korean: `app/src/messages/ko.json`
- English: `app/src/messages/en.json`
- Japanese: `app/src/messages/jp.json`
- Contact links: `app/src/config/personal.json`

Use `.agent/skills/resume-writing/SKILL.md` for every resume copy request,
including Korean drafting, revisions, and Korean-to-English translation.
Preserve the existing JSON schema and update Korean before English unless the
user explicitly requests another order.

Use source-backed claims only. Do not expose confidential internal details or
turn an experiment into a production claim.

## Validation

After a content change, parse every edited JSON file and run `npm run lint`
from `app/`. Do not edit `jp.json` unless Japanese is in scope.
