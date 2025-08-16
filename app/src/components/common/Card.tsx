"use client";

import React from "react";
import { CardItem } from "@/types/common";
import ItemRenderer from "./ItemRenderer";

interface CardProps {
  card: CardItem;
  variant?: "bordered" | "timeline" | "simple";
}

export default function Card({ card, variant = "simple" }: CardProps) {
  const variantClasses = {
    bordered:
      "p-3 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-800/50 print:p-2 print:dark:bg-transparent",
    timeline:
      "border-l-2 border-gray-200 dark:border-gray-700 pl-4 print:border-l print:pl-3",
    simple: "p-2",
  };

  return (
    <div className={`mb-4 print:mb-3 ${variantClasses[variant]}`}>
      {/* Card Header */}
      <div>
        <div className="flex items-center justify-between space-x-1">
          <h3
            className={`font-semibold text-gray-900 dark:text-white print:text-xs ${
              card.level === "secondary" ? "text-sm" : "text-lg"
            }`}
          >
            {card.title}
          </h3>
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
