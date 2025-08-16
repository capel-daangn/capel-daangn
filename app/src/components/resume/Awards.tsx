"use client";

import React from "react";
import { useTranslations } from "@/hooks/useTranslations";
import Section from "@/components/common/Section";
import { Section as SectionType } from "@/types/common";
import { TranslationMessages } from "@/types/translations";

export default function Awards() {
  const { messages } = useTranslations();
  const resumeData = messages as TranslationMessages;
  
  const awardsSection = resumeData?.sections?.awards as SectionType;

  if (!awardsSection) return null;

  return (
    <Section 
      section={awardsSection} 
      variant="bordered"
    />
  );
}