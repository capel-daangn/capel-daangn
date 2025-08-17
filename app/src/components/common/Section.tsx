"use client";

import React from "react";
import { Section as SectionType } from "@/types/common";
import ItemRenderer from "./ItemRenderer";
import { HiExternalLink } from "react-icons/hi";

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
  // Don't render if inactive
  if (section.inactive) return null;
  
  return (
    <section className="mb-8 print:mb-6">
      {/* Section Title */}
      <h2 className={`text-sm font-semibold ${titleColor} mb-4 border-b ${borderColor} pb-2 print:text-lg`}>
        {section.title?.url ? (
          <a
            href={section.title.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 transition-colors dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            {section.title.content}{' '}
            <HiExternalLink className="inline w-3 h-3 opacity-70" />
          </a>
        ) : (
          section.title?.content
        )}
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