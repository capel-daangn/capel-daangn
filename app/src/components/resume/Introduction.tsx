"use client";

import React from "react";
import { useTranslations } from "@/hooks/useTranslations";
import SkillTags from "@/components/common/SkillTags";
import { Section as SectionType, TextItem } from "@/types/common";
import { TranslationMessages } from "@/types/translations";

export default function Introduction() {
  const { messages } = useTranslations();
  const resumeData = messages as TranslationMessages;
  const profile = resumeData?.profile;
  // Get skills and skillsSummary sections
  const skillsSection = resumeData?.sections?.skills as SectionType;

  if (!profile) return null;

  return (
    <div className="space-y-2 md:col-span-2 print:col-span-2">
      <p className="text-sm leading-relaxed text-justify text-gray-700 dark:text-gray-300 print:text-xs print:text-black">
        {profile.description}
      </p>

      {/* Skills Tags Section */}
      {skillsSection && skillsSection.content?.[0]?.content && (
        <SkillTags skills={skillsSection.content[0].content as TextItem[]} />
      )}
    </div>
  );
}
