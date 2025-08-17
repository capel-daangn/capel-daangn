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
              className={`font-semibold print:text-xs ${
                card.level === "secondary" ? "text-sm" : "text-lg"
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
                <span className="text-gray-900 dark:text-white">
                  {card.title.content}
                </span>
              )}
            </h3>
          )}
          {card.tag && (
            <span className="text-xs text-right text-gray-500 dark:text-gray-400 print:text-xs">
              {card.tag}
            </span>
          )}
        </div>
        {card.subtitle && (
          <p className="mt-1 text-sm text-blue-400 dark:text-blue-300 print:text-xs">
            {card.subtitle}
          </p>
        )}
        {card.description && (
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 print:text-xs">
            {card.description}
          </p>
        )}
      </div>
      {/* Card Content */}
      {card.content && card.content.length > 0 && (
        <div className="mt-2 space-y-1">
          {card.content.map((item, index) => (
            <ItemRenderer key={index} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
