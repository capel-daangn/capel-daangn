"use client";

import React from "react";
import { useTranslations } from "@/hooks/useTranslations";
import SkillTags from "@/components/common/SkillTags";
import { Section as SectionType, TextItem } from "@/types/common";

export default function Introduction() {
  const { messages } = useTranslations();
  const resumeData = messages as any;
  const profile = resumeData?.profile;
  // Get skills and skillsSummary sections
  const skillsSection = resumeData?.sections?.skills as SectionType;

  if (!profile) return null;

  return (
    <div className="space-y-2 lg:col-span-2 print:col-span-2">
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 print:text-xs">
        {profile.description}
      </p>

      {/* Skills Tags Section */}
      {skillsSection && (
        <SkillTags skills={skillsSection.content as TextItem[]} />
      )}
    </div>
  );
}
