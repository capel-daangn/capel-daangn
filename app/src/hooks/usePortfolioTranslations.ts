import { useLanguage } from '@/contexts/LanguageContext';
import { useMemo } from 'react';

import portfolioEn from '@/messages/portfolio-en.json';
import portfolioKo from '@/messages/portfolio-ko.json';
import portfolioJp from '@/messages/portfolio-jp.json';

export function usePortfolioTranslations() {
  const { language } = useLanguage();

  const messages = useMemo(() => {
    switch (language) {
      case 'en':
        return portfolioEn;
      case 'ko':
        return portfolioKo;
      case 'jp':
        return portfolioJp;
      default:
        return portfolioEn;
    }
  }, [language]);

  return { messages };
}
