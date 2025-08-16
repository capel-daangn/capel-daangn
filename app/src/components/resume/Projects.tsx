"use client";

import React from "react";
import { useTranslations } from "@/hooks/useTranslations";
import Section from "@/components/common/Section";
import { Section as SectionType } from "@/types/common";
import { TranslationMessages } from "@/types/translations";

export default function Projects() {
  const { messages } = useTranslations();
  const resumeData = messages as TranslationMessages;
  
  const projectsSection = resumeData?.sections?.projects as SectionType;

  if (!projectsSection) return null;

  return (
    <Section 
      section={projectsSection} 
      variant="timeline"
    />
  );
}