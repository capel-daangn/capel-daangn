import { useLanguage } from '@/contexts/LanguageContext';

export function useTranslations() {
  const { messages } = useLanguage();

  const t = (key: string): unknown => {
    const keys = key.split('.');
    let value: unknown = messages;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && value !== null && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key; // Return the key if translation is not found
      }
    }
    
    return value;
  };

  return { t, messages };
}