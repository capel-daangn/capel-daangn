"use client";

import React from "react";
import { Item, CardItem, TextItem } from "@/types/common";
import Card from "./Card";

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
        {textItem.content}
      </div>
    );
  }

  if (item.type === "card") {
    const cardItem = item as CardItem;
    return <Card card={cardItem} variant={variant} />;
  }

  return null;
}
