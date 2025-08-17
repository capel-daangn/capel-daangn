"use client";

import React from "react";
import { Item, CardItem, TextItem } from "@/types/common";
import Card from "./Card";
import { HiExternalLink } from "react-icons/hi";

interface ItemRendererProps {
  item: Item;
  variant?: "bordered" | "timeline" | "simple";
}

export default function ItemRenderer({
  item,
  variant = "simple",
}: ItemRendererProps) {
  // Handle typed items
  if (item.type === "text") {
    const textItem = item as TextItem;
    return (
      <div
        className={
          item.level === "secondary"
            ? "text-xs text-gray-500 dark:text-gray-400 print:text-xs ml-2"
            : "text-gray-700 dark:text-gray-300 print:text-xs leading-relaxed text-sm ml-2"
        }
      >
        {textItem.url ? (
          <a
            href={textItem.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 transition-colors dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            {textItem.content}{' '}
            <HiExternalLink className={`inline opacity-70 ${
              item.level === "secondary" ? "w-3 h-3" : "w-3 h-3"
            }`} />
          </a>
        ) : (
          textItem.content
        )}
      </div>
    );
  }

  if (item.type === "card") {
    const cardItem = item as CardItem;
    // Use card's own variant if specified, otherwise use parent's variant
    return <Card card={cardItem} variant={cardItem.variant || variant} />;
  }

  return null;
}
