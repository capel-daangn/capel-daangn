"use client";

import React from "react";
import { TextItem } from "@/types/common";

interface SkillTagsProps {
  skills: TextItem[];
}

export default function SkillTags({ skills }: SkillTagsProps) {
  return (
    <div className="mb-4">
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="skill-tag px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-400 dark:text-blue-300 rounded-full text-xs border border-blue-200 dark:border-blue-700 print:px-2 print:py-0.5 print:text-xs"
          >
            {skill.content}
          </span>
        ))}
      </div>
    </div>
  );
}
