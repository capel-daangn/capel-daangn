"use client";

import React, { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { FiDownload, FiPrinter, FiMenu, FiX } from "react-icons/fi";

export default function NavigationBar() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Trigger print dialog which can be used to save as PDF
    window.print();
  };

  const languages = [
    { code: "ko" as const, label: "한국어", flag: "🇰🇷" },
    { code: "en" as const, label: "English", flag: "🇺🇸" },
    { code: "jp" as const, label: "日本語", flag: "🇯🇵" },
  ];

  const currentLanguage =
    languages.find((lang) => lang.code === language) || languages[0];

  return (
    <nav className="sticky top-0 z-50 px-6 py-3 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {/* Logo/Title */}
        <div className="font-semibold text-gray-900 dark:text-white">
          Resume
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="sm:hidden p-2 text-gray-700 transition-colors dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>

        {/* Desktop Controls */}
        <div className="hidden sm:flex items-center gap-4">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 transition-colors dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <span>{currentLanguage.flag}</span>
              <span>{currentLanguage.label}</span>
              <svg
                className={`w-4 h-4 transition-transform ${
                  isLanguageDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isLanguageDropdownOpen && (
              <div className="absolute right-0 py-1 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-36 dark:bg-gray-800 dark:border-gray-600 z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsLanguageDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                      language === lang.code
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Buttons */}
          <div className="flex items-center gap-2 print:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-700 transition-colors dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              )}
            </button>
            <button
              onClick={handlePrint}
              className="p-2 text-gray-700 transition-colors dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              aria-label="Print"
            >
              <FiPrinter size={18} />
            </button>
            <button
              onClick={handleDownload}
              className="p-2 text-gray-700 transition-colors dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              aria-label="Download as PDF"
            >
              <FiDownload size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="sm:hidden mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          {/* Language Options */}
          <div className="mb-3">
            <p className="px-2 mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
              Language
            </p>
            <div className="space-y-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                    language === lang.code
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-1">
            <button
              onClick={() => {
                toggleTheme();
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              {theme === "light" ? (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                  <span>Dark Mode</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <span>Light Mode</span>
                </>
              )}
            </button>
            <button
              onClick={() => {
                handlePrint();
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <FiPrinter size={18} />
              <span>Print</span>
            </button>
            <button
              onClick={() => {
                handleDownload();
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <FiDownload size={18} />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      )}

      {/* Close dropdown when clicking outside */}
      {isLanguageDropdownOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setIsLanguageDropdownOpen(false)}
        />
      )}
    </nav>
  );
}