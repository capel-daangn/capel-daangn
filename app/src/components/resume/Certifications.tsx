"use client";

import React from "react";
import { useTranslations } from "@/hooks/useTranslations";
import Section from "@/components/common/Section";
import { Section as SectionType } from "@/types/common";

export default function Certifications() {
  const { messages } = useTranslations();
  const resumeData = messages as any;
  
  const certificationsSection = resumeData?.sections?.certifications as SectionType;

  if (!certificationsSection) return null;

  return (
    <Section 
      section={certificationsSection} 
      variant="bordered"
    />
  );
}