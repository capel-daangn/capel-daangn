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
