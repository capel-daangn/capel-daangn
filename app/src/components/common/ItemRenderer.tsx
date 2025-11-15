"use client";

import React from "react";
import { Item, CardItem, TextItem, ListItem } from "@/types/common";
import Card from "./Card";
import List from "./List";
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
    // Don't render if inactive
    if (textItem.inactive) return null;

    // Add bullet point if not already present
    const shouldAddBullet =
      !textItem.content.startsWith("•") &&
      !textItem.content.startsWith("✓") &&
      !textItem.content.startsWith("·");
    const displayContent = shouldAddBullet ? `• ${textItem.content}` : textItem.content;

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
            {displayContent}{' '}
            <HiExternalLink className={`inline opacity-70 ${
              item.level === "secondary" ? "w-3 h-3" : "w-3 h-3"
            }`} />
          </a>
        ) : (
          displayContent
        )}
      </div>
    );
  }

  if (item.type === "card") {
    const cardItem = item as CardItem;
    // Don't render if inactive
    if (cardItem.inactive) return null;
    
    // Use card's own variant if specified, otherwise use parent's variant
    return <Card card={cardItem} variant={cardItem.variant || variant} />;
  }

  if (item.type === "list") {
    const listItem = item as ListItem;
    return <List list={listItem} />;
  }

  return null;
}
