"use client";

import React from "react";
import { Section as SectionType } from "@/types/common";
import ItemRenderer from "./ItemRenderer";

interface SectionProps {
  section: SectionType;
  variant?: "bordered" | "timeline" | "simple";
  titleColor?: string;
  borderColor?: string;
}

export default function Section({ 
  section, 
  variant = "simple",
  titleColor = "text-blue-400 dark:text-blue-300",
  borderColor = "border-blue-400 dark:border-blue-300"
}: SectionProps) {
  return (
    <section className="mb-8 print:mb-6">
      {/* Section Title */}
      <h2 className={`text-sm font-semibold ${titleColor} mb-4 border-b ${borderColor} pb-2 print:text-lg`}>
        {section.title}
      </h2>

      {/* Section Content */}
      <div className="space-y-3 print:space-y-2">
        {section.content.map((item, index) => (
          <ItemRenderer key={index} item={item} variant={variant} />
        ))}
      </div>
    </section>
  );
}