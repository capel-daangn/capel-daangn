# Language Route Initialisation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task with review checkpoints.

**Goal:** Make `/ko`, `/en`, and `/jp` render the resume in the URL-selected language while preserving the existing local-storage preference and language selector.

**Architecture:** Extract the current client-side resume screen into a reusable component, expose it through both `/` and a validated `[locale]` route, and centralize language precedence in a pure helper. `LanguageProvider` will resolve `pathname` first, then the existing `language` local-storage value, then Korean as the fallback.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Node 22 built-in `node:test` with TypeScript type stripping.

## Global Constraints

- Supported languages are exactly `ko`, `en`, and `jp`.
- A supported URL language takes precedence over `localStorage["language"]`.
- A supported URL language updates the existing `language` local-storage key.
- Unsupported URL/storage values fall back to Korean (`ko`).
- Do not add redirects, duplicate translation files, or server-side locale rendering.
- Existing `/`, `/portfolio`, language selector behavior, and message-loading behavior must remain available.

### Task 1: Add and test the language precedence helper

**Files:**
- Create: `app/src/contexts/languageRouting.ts`
- Create: `app/src/contexts/languageRouting.test.ts`
- Modify: `app/package.json: scripts`

**Interfaces:**
- Produces `Language`, `isLanguage(value)`, `getLanguageFromPathname(pathname)`, and `resolveInitialLanguage(pathname, storedLanguage)` for `LanguageContext` and route validation.

- [ ] **Step 1: Add a repeatable focused test command**

Add this script to `app/package.json`:

```json
"test": "node --experimental-strip-types --test src/contexts/languageRouting.test.ts"
```

- [ ] **Step 2: Write the failing tests**

Create `app/src/contexts/languageRouting.test.ts`:

```ts
import test from "node:test";
import assert from "node:assert/strict";
import {
  getLanguageFromPathname,
  resolveInitialLanguage,
} from "./languageRouting.ts";

test("each supported language route selects its matching language", () => {
  assert.equal(getLanguageFromPathname("/ko"), "ko");
  assert.equal(getLanguageFromPathname("/en"), "en");
  assert.equal(getLanguageFromPathname("/jp"), "jp");
  assert.equal(getLanguageFromPathname("/en/anything"), "en");
});

test("a supported route overrides a conflicting stored language", () => {
  assert.equal(resolveInitialLanguage("/ko", "en"), "ko");
  assert.equal(resolveInitialLanguage("/jp", "ko"), "jp");
});

test("a valid stored language is used without a language route", () => {
  assert.equal(resolveInitialLanguage("/", "en"), "en");
  assert.equal(resolveInitialLanguage("/portfolio", "jp"), "jp");
});

test("invalid route and storage values fall back to Korean", () => {
  assert.equal(getLanguageFromPathname("/english"), undefined);
  assert.equal(resolveInitialLanguage("/english", "fr"), "ko");
  assert.equal(resolveInitialLanguage("/", null), "ko");
});
```

- [ ] **Step 3: Run the focused test and verify the expected failure**

Run from `app/`:

```bash
npm test
```

Expected: the test command fails because `languageRouting.ts` does not exist yet.

- [ ] **Step 4: Implement the minimal pure helper**

Create `app/src/contexts/languageRouting.ts`:

```ts
export const SUPPORTED_LANGUAGES = ["ko", "en", "jp"] as const;
export type Language = (typeof SUPPORTED_LANGUAGES)[number];

export function isLanguage(value: string | null | undefined): value is Language {
  return value !== null && value !== undefined && SUPPORTED_LANGUAGES.includes(value as Language);
}

export function getLanguageFromPathname(pathname: string): Language | undefined {
  const firstSegment = pathname.split("?")[0].split("#")[0].split("/").filter(Boolean)[0];
  return isLanguage(firstSegment) ? firstSegment : undefined;
}

export function resolveInitialLanguage(pathname: string, storedLanguage: string | null): Language {
  return getLanguageFromPathname(pathname) ?? (isLanguage(storedLanguage) ? storedLanguage : "ko");
}
```

- [ ] **Step 5: Run the focused test and verify it passes**

Run from `app/`:

```bash
npm test
```

Expected: 4 tests pass with 0 failures.

- [ ] **Step 6: Commit the helper and tests**

```bash
git add app/package.json app/src/contexts/languageRouting.ts app/src/contexts/languageRouting.test.ts
git commit -m "test: define language route precedence"
```

### Task 2: Integrate URL precedence into `LanguageProvider`

**Files:**
- Modify: `app/src/contexts/LanguageContext.tsx`

**Interfaces:**
- Consumes `Language`, `resolveInitialLanguage`, and `isLanguage` from `./languageRouting`.
- Preserves the existing `LanguageContextType` API used by `NavigationBar` and translation hooks.

- [ ] **Step 1: Write the failing integration assertion**

Extend the focused test file with a pure equivalent of the provider's source precedence:

```ts
test("the route resolver treats a language route as the persisted selection", () => {
  const language = resolveInitialLanguage("/en", "ko");
  assert.equal(language, "en");
});
```

Run `npm test` from `app/` and confirm the new assertion passes against the already-tested resolver before changing the provider. The provider change is integration wiring; the helper test is the regression contract.

- [ ] **Step 2: Replace the local `Language` type and resolve the initial source**

In `LanguageContext.tsx`:

1. Import `Language` and `resolveInitialLanguage` from `./languageRouting`.
2. Remove the local duplicate `Language` union.
3. Add an `isLanguageInitialized` state flag initialized to `false`.
4. In the existing client-only initialization effect, call:

```ts
const initialLanguage = resolveInitialLanguage(
  window.location.pathname,
  localStorage.getItem("language")
);
setLanguage(initialLanguage);
setIsLanguageInitialized(true);
```

5. Keep the message-loading effect dependent on `language`.
6. Move the local-storage write into a separate effect guarded by `isLanguageInitialized`, so the initial default `ko` cannot overwrite a URL-selected language before resolution completes:

```ts
useEffect(() => {
  if (isLanguageInitialized) {
    localStorage.setItem("language", language);
  }
}, [isLanguageInitialized, language]);
```

- [ ] **Step 3: Run tests and TypeScript validation**

Run from `app/`:

```bash
npm test
npx tsc --noEmit
```

Expected: all focused tests pass and TypeScript reports no errors.

- [ ] **Step 4: Commit provider integration**

```bash
git add app/src/contexts/LanguageContext.tsx app/src/contexts/languageRouting.test.ts
git commit -m "feat: prioritize language routes"
```

### Task 3: Expose the resume through language routes

**Files:**
- Create: `app/src/components/ResumePage.tsx`
- Create: `app/src/app/[locale]/page.tsx`
- Modify: `app/src/app/page.tsx`
- Modify: `app/src/components/NavigationBar.tsx`

**Interfaces:**
- `ResumePage` owns the existing client-side resume composition and provider setup.
- `/` renders `<ResumePage />`.
- `/[locale]` renders `<ResumePage />` only when `locale` is `ko`, `en`, or `jp`; otherwise it calls `notFound()`.

- [ ] **Step 1: Extract the current resume screen without behavior changes**

Move the current client component contents from `app/src/app/page.tsx` into `app/src/components/ResumePage.tsx`, preserving:

- `"use client"`;
- `ThemeProvider` and `LanguageProvider` nesting;
- `ResumeContent` markup and imports; and
- the current translated message rendering.

Replace `app/src/app/page.tsx` with:

```tsx
import ResumePage from "@/components/ResumePage";

export default function Page() {
  return <ResumePage />;
}
```

- [ ] **Step 2: Add the validated dynamic route**

Create `app/src/app/[locale]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import ResumePage from "@/components/ResumePage";
import { isLanguage } from "@/contexts/languageRouting";

export default async function LocalizedResumePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLanguage(locale)) {
    notFound();
  }

  return <ResumePage />;
}
```

- [ ] **Step 3: Keep resume navigation active on language routes**

In `NavigationBar.tsx`, change the resume-page check to treat `/ko`, `/en`, and `/jp` as resume pages while leaving `/portfolio` behavior unchanged:

```ts
const isResumePage =
  pathname === "/" || /^\/(ko|en|jp)(?:\/|$)/.test(pathname);
```

- [ ] **Step 4: Build the app and verify route compilation**

Run from `app/`:

```bash
npm run build
```

Expected: the Next.js build completes and includes the root and dynamic resume routes without route-conflict errors.

- [ ] **Step 5: Commit route exposure**

```bash
git add app/src/app/page.tsx app/src/app/[locale]/page.tsx app/src/components/ResumePage.tsx app/src/components/NavigationBar.tsx
git commit -m "feat: add language-prefixed resume routes"
```

### Task 4: Run the complete verification set

**Files:**
- No additional files expected.

- [ ] **Step 1: Run focused tests**

```bash
cd app && npm test
```

Expected: all language-routing tests pass.

- [ ] **Step 2: Run TypeScript validation**

```bash
cd app && npx tsc --noEmit
```

Expected: no TypeScript errors.

- [ ] **Step 3: Run the production build**

```bash
cd app && npm run build
```

Expected: build completes successfully.

- [ ] **Step 4: Run the repository lint command and record its result**

```bash
cd app && npm run lint
```

Expected: lint passes. If the existing Next.js 15 `next lint` script is unsupported, record that tooling limitation separately rather than changing unrelated lint configuration.

- [ ] **Step 5: Inspect the final diff**

```bash
git diff HEAD~3..HEAD --check
git status --short
```

Confirm only the language-route feature, its tests, its scripts, and the approved plan/design documents are present.
