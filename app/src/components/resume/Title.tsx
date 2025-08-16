"use client";

import React from "react";
import { useTranslations } from "@/hooks/useTranslations";

export default function Title() {
  const { messages } = useTranslations();
  const resumeData = messages as any;
  const profile = resumeData?.profile;

  if (!profile) return null;

  return (
    <div className="lg:col-span-2 print:col-span-2">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 print:text-2xl">
        {profile.title.toUpperCase()}, {profile.subtitle}
      </h1>
    </div>
  );
}