"use client";

import React from "react";
import { useTranslations } from "@/hooks/useTranslations";
import Section from "@/components/common/Section";
import { Section as SectionType } from "@/types/common";
import { TranslationMessages } from "@/types/translations";

export default function Languages() {
  const { messages } = useTranslations();
  const resumeData = messages as TranslationMessages;
  
  const languagesSection = resumeData?.sections?.languages as SectionType;

  if (!languagesSection) return null;

  return (
    <Section 
      section={languagesSection} 
      variant="bordered"
    />
  );
}