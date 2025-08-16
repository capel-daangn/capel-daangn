"use client";

import React from "react";
import { useTranslations } from "@/hooks/useTranslations";

export default function Contact() {
  const { messages } = useTranslations();
  const resumeData = messages as any;
  const profile = resumeData?.profile;

  if (!profile || !profile.items) return null;

  return (
    <div className="text-sm text-right print:text-xs">
      <div className="space-y-2">
        {profile.items.map((item: any, index: number) => {
          const isEmail = item.content.includes("@");
          const isUrl = item.content.startsWith("http");

          if (isEmail) {
            return (
              <div key={index}>
                <a
                  href={`mailto:${item.content}`}
                  className="text-blue-600 transition-colors dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                >
                  {item.content}
                </a>
              </div>
            );
          }

          if (isUrl) {
            return (
              <div key={index}>
                <a
                  href={item.content}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 transition-colors dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                >
                  {item.content.includes("linkedin")
                    ? "LinkedIn"
                    : item.content.includes("github")
                    ? "GitHub"
                    : item.content}
                </a>
              </div>
            );
          }

          return (
            <div key={index}>
              <span className="text-gray-700 dark:text-gray-300">
                {item.content}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
