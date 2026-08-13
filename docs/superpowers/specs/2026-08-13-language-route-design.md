# Language Route Initialisation Design

## Goal

Allow visitors who enter the app through `/ko`, `/en`, or `/jp` to start in
the language named by the URL, while preserving the existing language selector
and `localStorage` preference for other entry points.

## Behaviour

- A supported first pathname segment (`ko`, `en`, or `jp`) is the highest-priority
  language source.
- When a supported language route is visited, the selected language is written
  to `localStorage` under the existing `language` key. This keeps a later visit
  to `/` consistent with the language-specific link the visitor used.
- If the pathname has no supported language segment, a valid stored language is
  used.
- If neither the pathname nor storage provides a valid language, the existing
  English (`en`) default remains the fallback.
- Existing paths such as `/`, `/portfolio`, and unknown paths retain the current
  behaviour; this change does not add redirects or duplicate route trees.

## Implementation

Add a small pure language-routing helper that receives a pathname and optional
stored value, then returns the initial language. `LanguageProvider` will use
`window.location.pathname` and the existing `localStorage` key during its
client-side initialisation. The existing message-loading effect and language
selector remain unchanged.

The helper will validate values against the existing `Language` union instead
of trusting arbitrary URL segments or storage contents. The pathname parser
will examine only the first segment, so `/en/anything` is English while
`/english` is not a supported language route.

## Testing

Add focused tests for:

1. each supported route selecting its matching language;
2. a supported route overriding a conflicting stored language;
3. a valid stored language being used without a language route; and
4. invalid route/storage values falling back to the existing English default.

Run the focused tests, TypeScript/build validation, and the repository's
available lint command before considering the change complete.

## Non-goals

- No redirects from `/` to a language route.
- No changes to navigation link URLs or SEO metadata.
- No migration of the existing `localStorage` key.
- No server-side locale rendering; the current client-side message loading
  model remains in place.
