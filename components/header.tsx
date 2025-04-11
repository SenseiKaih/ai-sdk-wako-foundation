"use client";

import { ChangeEvent } from "react";
import { ModeType, ProjectType } from "./wakoData";

interface HeaderProps {
  foundationMode: ModeType;
  setFoundationMode: (mode: ModeType) => void;
  foundationProject: ProjectType;
  setFoundationProject: (project: ProjectType) => void;
  modes: Record<string, { label: string }>;
  projects: Record<string, { label: string; summary: string }>;
}

export function Header({
  foundationMode,
  setFoundationMode,
  foundationProject,
  setFoundationProject,
  modes,
  projects,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm px-4 sm:px-6 py-3">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-8">
        {/* Title */}
        <h1 className="text-gray-800 text-lg sm:text-xl md:text-2xl font-bold text-center sm:text-left">
          Prince Wako Foundation Assistant
        </h1>

        {/* Dropdowns */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 w-full sm:w-auto">
          {/* Content Mode */}
          <div className="flex flex-col w-full sm:w-auto">
            <label className="text-xs font-semibold text-gray-600 mb-1">
              Content Mode
            </label>
            <select
              className="border border-gray-300 rounded px-2 py-1 text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-400 w-full sm:w-auto"
              value={foundationMode}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setFoundationMode(e.target.value as ModeType)
              }
            >
              {Object.entries(modes).map(([key, val]) => (
                <option key={key} value={key}>
                  {val.label}
                </option>
              ))}
            </select>
          </div>

          {/* Project */}
          <div className="flex flex-col w-full sm:w-auto">
            <label className="text-xs font-semibold text-gray-600 mb-1">
              Project
            </label>
            <select
              className="border border-gray-300 rounded px-2 py-1 text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-400 w-full sm:w-auto"
              value={foundationProject}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setFoundationProject(e.target.value as ProjectType)
              }
            >
              {Object.entries(projects).map(([key, val]) => (
                <option key={key} value={key}>
                  {val.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
