"use client";

import React from "react";
import { useTranslations } from "@/hooks/useTranslations";
import Section from "@/components/common/Section";
import { Section as SectionType } from "@/types/common";
import { TranslationMessages } from "@/types/translations";

export default function Education() {
  const { messages } = useTranslations();
  const resumeData = messages as TranslationMessages;
  
  const educationSection = resumeData?.sections?.education as SectionType;

  if (!educationSection) return null;

  return (
    <Section 
      section={educationSection} 
      variant="bordered"
    />
  );
}