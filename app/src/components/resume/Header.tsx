import React from 'react';
import type { PersonalInfo } from '@/types/resume';

interface HeaderProps {
  personalInfo: PersonalInfo;
}

export default function Header({ personalInfo }: HeaderProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 print:grid-cols-3 print:gap-6 print:mb-6">
      {/* Introduction Section - 2 columns */}
      <div className="lg:col-span-2 print:col-span-2">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 print:text-2xl">
          {personalInfo.name.toUpperCase()}, {personalInfo.title}
        </h1>
        <p className="text-gray-700 leading-relaxed text-sm print:text-xs">
          {personalInfo.introduction}
        </p>
      </div>
      
      {/* Contact Section - 1 column */}
      <div className="text-right text-sm print:text-xs">
        <div className="space-y-2">
          <div>
            <span className="text-gray-700">{personalInfo.phone}</span>
          </div>
          
          <div>
            <a 
              href={`mailto:${personalInfo.email}`}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              {personalInfo.email}
            </a>
          </div>
          
          {personalInfo.linkedin && (
            <div>
              <a 
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                LinkedIn
              </a>
            </div>
          )}
          
          {personalInfo.github && (
            <div>
              <a 
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                GitHub
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}