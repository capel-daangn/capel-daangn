"use client";

import React from "react";
import { PortfolioProject } from "@/types/portfolio";
import ItemRenderer from "@/components/common/ItemRenderer";
import { HiExternalLink } from "react-icons/hi";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

interface PortfolioCardProps {
  project: PortfolioProject;
}

export default function PortfolioCard({ project }: PortfolioCardProps) {
  if (project.inactive) return null;

  return (
    <div className="mb-6 overflow-hidden transition-all border border-gray-200 rounded-lg dark:border-gray-700 dark:bg-gray-800/50 hover:shadow-lg">
      {/* Card Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          {project.title && (
            <h3 className="text-xl font-semibold">
              {project.title.url ? (
                <a
                  href={project.title.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 transition-colors dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                >
                  {project.title.content}{' '}
                  <HiExternalLink className="inline w-5 h-5 opacity-70" />
                </a>
              ) : (
                <span className="text-gray-900 dark:text-white">
                  {project.title.content}
                </span>
              )}
            </h3>
          )}
        </div>

        {project.description && (
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            {project.description}
          </p>
        )}

        {/* Tech Stack */}
        {project.techStack && project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full dark:bg-blue-900/30 dark:text-blue-300"
              >
                {tech.name}
              </span>
            ))}
          </div>
        )}

        {/* Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-1 gap-3 p-4 mb-4 border border-gray-200 rounded-lg sm:grid-cols-3 bg-gray-50 dark:bg-gray-900/50 dark:border-gray-700">
            {project.metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {metric.label}
                </div>
                <div className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                  {metric.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Project Content (Why-How-What) */}
        {project.content && project.content.length > 0 && (
          <div className="space-y-2">
            {project.content.map((item, index) => (
              <ItemRenderer key={index} item={item} />
            ))}
          </div>
        )}

        {/* Links */}
        {project.links && (
          <div className="flex gap-3 mt-4">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <FaGithub className="w-4 h-4" />
                GitHub
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                <FaExternalLinkAlt className="w-4 h-4" />
                Demo
              </a>
            )}
            {project.links.blog && (
              <a
                href={project.links.blog}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <HiExternalLink className="w-4 h-4" />
                Blog
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
