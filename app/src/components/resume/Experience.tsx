"use client";

import React from "react";
import { useTranslations } from "@/hooks/useTranslations";
import Section from "@/components/common/Section";
import { Section as SectionType } from "@/types/common";

export default function Experience() {
  const { messages } = useTranslations();
  const resumeData = messages as any;
  
  const experienceSection = resumeData?.sections?.experience as SectionType;

  if (!experienceSection) return null;

  return (
    <Section 
      section={experienceSection} 
      variant="timeline"
    />
  );
}