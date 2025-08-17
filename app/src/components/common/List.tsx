"use client";

import React from "react";
import { ListItem } from "@/types/common";
import ItemRenderer from "./ItemRenderer";

interface ListProps {
  list: ListItem;
}

export default function List({ list }: ListProps) {
  // Don't render if inactive
  if (list.inactive) return null;

  return (
    <div className="space-y-1">
      {list.content.map((item, index) => (
        <ItemRenderer key={index} item={item} />
      ))}
    </div>
  );
}