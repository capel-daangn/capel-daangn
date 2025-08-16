"use client";

import React from "react";
import { useTranslations } from "@/hooks/useTranslations";
import Section from "@/components/common/Section";
import { Section as SectionType } from "@/types/common";
import { TranslationMessages } from "@/types/translations";

export default function Skills() {
  const { messages } = useTranslations();
  const resumeData = messages as TranslationMessages;

  const skillsSummarySection = resumeData?.sections
    ?.skillsSummary as SectionType;

  return (
    <>
      {/* Skills Summary Section */}
      {skillsSummarySection && (
        <Section section={skillsSummarySection} variant="simple" />
      )}
    </>
  );
}
