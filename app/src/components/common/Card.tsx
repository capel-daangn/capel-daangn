"use client";

import React from "react";
import { CardItem } from "@/types/common";
import ItemRenderer from "./ItemRenderer";
import { HiExternalLink } from "react-icons/hi";

interface CardProps {
  card: CardItem;
  variant?: "bordered" | "timeline" | "simple";
}

export default function Card({ card, variant = "simple" }: CardProps) {
  // Don't render if inactive
  if (card.inactive) return null;
  
  const variantClasses = {
    bordered:
      "p-3 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-800/50 print:p-2 print:dark:bg-transparent",
    timeline:
      "ml-1 border-l-2 border-gray-200 dark:border-gray-700 pl-3 print:border-l print:pl-2",
    simple: "p-2",
  };

  return (
    <div className={`mb-4 print:mb-3 ${variantClasses[variant]}`}>
      {/* Card Header */}
      <div>
        <div className="flex items-center justify-between space-x-1">
          {card.title && (
            <h3
              className={`font-semibold ${
                card.level === "secondary"
                  ? "text-sm print:text-xs"
                  : "text-lg print:text-base"
              }`}
            >
              {card.title.url ? (
                <a
                  href={card.title.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 transition-colors dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                >
                  {card.title.content}{' '}
                  <HiExternalLink
                    className={`inline opacity-70 ${
                      card.level === "secondary" ? "w-3 h-3" : "w-4 h-4"
                    }`}
                  />
                </a>
              ) : (
                <span className="text-gray-900 dark:text-white print:text-black">
                  {card.title.content}
                </span>
              )}
            </h3>
          )}
          {card.tag && (
            <span className="text-xs text-right text-gray-500 dark:text-gray-400 print:text-xs print:text-gray-800">
              {card.tag}
            </span>
          )}
        </div>
        {card.subtitle && (
          <p className="mt-1 text-sm text-blue-400 dark:text-blue-300 print:text-xs print:text-blue-600">
            {card.subtitle}
          </p>
        )}
        {card.description && (
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 print:text-xs print:text-gray-800">
            {card.description}
          </p>
        )}

        {/* Tech Stack */}
        {card.techStack && card.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2 print:gap-1">
            {card.techStack.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-0.5 text-xs font-medium text-blue-700 bg-blue-100 rounded dark:bg-blue-900/30 dark:text-blue-300 print:text-xs print:px-1.5 print:py-0 print:bg-blue-100 print:text-blue-700"
                style={{ printColorAdjust: 'exact', WebkitPrintColorAdjust: 'exact' }}
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Highlights */}
        {card.highlights && card.highlights.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2 print:gap-1">
            {card.highlights.map((highlight, index) => (
              <span
                key={index}
                className="px-2 py-0.5 text-xs font-medium text-amber-700 bg-amber-100 rounded dark:bg-amber-900/30 dark:text-amber-300 print:text-xs print:px-1.5 print:py-0 print:bg-amber-100 print:text-amber-700"
                style={{ printColorAdjust: 'exact', WebkitPrintColorAdjust: 'exact' }}
              >
                {highlight}
              </span>
            ))}
          </div>
        )}

        {card.link && (
          <a
            href={card.link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-2 text-sm text-blue-600 transition-colors dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 print:text-xs"
          >
            {card.link.text}
            <HiExternalLink className="w-3 h-3 opacity-70" />
          </a>
        )}
      </div>
      {/* Card Content */}
      {card.content && card.content.length > 0 && (
        <div className="mt-2 space-y-1">
          {card.content.map((item, index) => (
            <ItemRenderer key={index} item={item} variant={variant} />
          ))}
        </div>
      )}
    </div>
  );
}
