"use client";

import React from "react";
import { useTranslations } from "@/hooks/useTranslations";
import { TranslationMessages } from "@/types/translations";
import { HiExternalLink } from "react-icons/hi";

export default function Title() {
  const { messages } = useTranslations();
  const resumeData = messages as TranslationMessages;
  const profile = resumeData?.profile;

  if (!profile) return null;

  return (
    <div className="lg:col-span-2 print:col-span-2">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 print:text-2xl">
        {profile.title?.url ? (
          <a
            href={profile.title.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 transition-colors dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            {profile.title.content?.toUpperCase()}{' '}
            <HiExternalLink className="inline w-6 h-6 opacity-70" />
          </a>
        ) : (
          profile.title?.content?.toUpperCase()
        )}, {profile.subtitle}
      </h1>
    </div>
  );
}