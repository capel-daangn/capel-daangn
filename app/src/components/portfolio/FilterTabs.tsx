"use client";

import React from "react";
import { PortfolioCategory } from "@/types/portfolio";
import { useLanguage } from "@/contexts/LanguageContext";

interface FilterTabsProps {
  activeFilter: PortfolioCategory;
  onFilterChange: (filter: PortfolioCategory) => void;
}

const filterLabels: Record<PortfolioCategory, { en: string; ko: string; jp: string }> = {
  all: { en: "All", ko: "전체", jp: "すべて" },
  karrot: { en: "Karrot", ko: "당근마켓", jp: "Karrot" },
  competition: { en: "Competition", ko: "공모전", jp: "コンペ" },
  side: { en: "Side", ko: "사이드", jp: "サイド" },
};

export default function FilterTabs({ activeFilter, onFilterChange }: FilterTabsProps) {
  const { language } = useLanguage();
  const filters: PortfolioCategory[] = ['all', 'karrot', 'competition', 'side'];

  return (
    <div className="mb-8">
      <div className="flex flex-col gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`w-full px-4 py-3 text-left text-sm font-medium rounded-lg transition-colors ${
              activeFilter === filter
                ? "bg-blue-600 text-white dark:bg-blue-500"
                : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {filterLabels[filter][language]}
          </button>
        ))}
      </div>
    </div>
  );
}
