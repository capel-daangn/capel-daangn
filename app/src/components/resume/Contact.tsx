"use client";

import React from "react";
import { useTranslations } from "@/hooks/useTranslations";
import { TranslationMessages } from "@/types/translations";
import { SiGmail, SiLinkedin, SiGithub } from "react-icons/si";

export default function Contact() {
  const { messages } = useTranslations();
  const resumeData = messages as TranslationMessages;
  const profile = resumeData?.profile;

  if (!profile || !profile.items) return null;

  return (
    <div className="text-sm text-right print:text-xs">
      <div className="space-y-2">
        {profile.items.map(
          (item: { type: string; content: string }, index: number) => {
            const isEmail = item.content.includes("@");
            const isUrl = item.content.startsWith("http");

            if (isEmail) {
              return (
                <div key={index}>
                  <a
                    href={`mailto:${item.content}`}
                    className="text-blue-600 transition-colors dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 inline-flex items-center gap-1 justify-end"
                  >
                    <SiGmail className="w-3 h-3" />
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
                    className="text-blue-600 transition-colors dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 inline-flex items-center gap-1 justify-end"
                  >
                    {item.content.includes("linkedin") ? (
                      <>
                        <SiLinkedin className="w-3 h-3" />
                        {item.content.replace(
                          "https://www.linkedin.com/in/",
                          "@"
                        )}
                      </>
                    ) : item.content.includes("github") ? (
                      <>
                        <SiGithub className="w-3 h-3" />
                        {item.content.replace("https://github.com/", "@")}
                      </>
                    ) : (
                      item.content
                    )}
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
          }
        )}
      </div>
    </div>
  );
}
