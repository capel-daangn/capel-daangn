"use client";

import React from "react";
import { useTranslations } from "@/hooks/useTranslations";
import Section from "@/components/common/Section";
import { Section as SectionType } from "@/types/common";
import { TranslationMessages } from "@/types/translations";

export default function Certifications() {
  const { messages } = useTranslations();
  const resumeData = messages as TranslationMessages;
  
  const certificationsSection = resumeData?.sections?.certifications as SectionType;

  if (!certificationsSection) return null;

  return (
    <Section 
      section={certificationsSection} 
      variant="bordered"
    />
  );
}