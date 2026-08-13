export const SUPPORTED_LANGUAGES = ["ko", "en", "jp"] as const;
export type Language = (typeof SUPPORTED_LANGUAGES)[number];

export function isLanguage(
  value: string | null | undefined
): value is Language {
  return (
    value !== null &&
    value !== undefined &&
    SUPPORTED_LANGUAGES.includes(value as Language)
  );
}

export function getLanguageFromPathname(
  pathname: string
): Language | undefined {
  const firstSegment = pathname
    .split("?")[0]
    .split("#")[0]
    .split("/")
    .filter(Boolean)[0];

  return isLanguage(firstSegment) ? firstSegment : undefined;
}

export function resolveInitialLanguage(
  pathname: string,
  storedLanguage: string | null
): Language {
  return (
    getLanguageFromPathname(pathname) ??
    (isLanguage(storedLanguage) ? storedLanguage : "en")
  );
}
