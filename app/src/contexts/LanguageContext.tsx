"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { TranslationMessages } from "@/types/translations";
import enMessages from "@/messages/en.json";
import personalConfig from "@/config/personal.json";
import {
  resolveInitialLanguage,
  type Language,
} from "./languageRouting";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  messages: TranslationMessages;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [isLanguageInitialized, setIsLanguageInitialized] = useState(false);
  const [messages, setMessages] = useState<TranslationMessages>(
    enMessages as unknown as TranslationMessages
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const initialLanguage = resolveInitialLanguage(
      window.location.pathname,
      localStorage.getItem("language")
    );

    setLanguage(initialLanguage);
    setIsLanguageInitialized(true);
  }, []);

  useEffect(() => {
    // Load messages for current language
    const loadMessages = async () => {
      try {
        const messageModule = await import(`../messages/${language}.json`);
        const rawMessages = messageModule.default;
        
        // Replace template variables with personal config values
        const processedMessages = JSON.parse(
          JSON.stringify(rawMessages).replace(
            /\{\{personal\.([^}]+)\}\}/g,
            (match, path) => {
              const keys = path.split('.');
              let value: unknown = personalConfig;
              for (const key of keys) {
                value = (value as Record<string, unknown>)?.[key];
              }
              return (typeof value === 'string' ? value : match);
            }
          )
        );
        
        setMessages(processedMessages);
      } catch (error) {
        console.error(
          `Failed to load messages for language: ${language}`,
          error
        );
        // Fallback to English
        const processedEnMessages = JSON.parse(
          JSON.stringify(enMessages).replace(
            /\{\{personal\.([^}]+)\}\}/g,
            (match, path) => {
              const keys = path.split('.');
              let value: unknown = personalConfig;
              for (const key of keys) {
                value = (value as Record<string, unknown>)?.[key];
              }
              return (typeof value === 'string' ? value : match);
            }
          )
        );
        setMessages(processedEnMessages as unknown as TranslationMessages);
      }
    };

    loadMessages();
  }, [language]);

  useEffect(() => {
    if (isLanguageInitialized) {
      localStorage.setItem("language", language);
    }
  }, [isLanguageInitialized, language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, messages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
