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
    <header className="sticky top-0 z-10 bg-white shadow-sm px-6 py-3 flex items-center justify-between">
      {/* Title on the left */}
      <h1 className="text-gray-800 text-xl sm:text-2xl font-bold">
        Prince Wako Foundation Assistant
      </h1>

      {/* Dropdowns on the right */}
      <div className="flex items-center gap-8">
        {/* Content Mode */}
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-gray-600 mb-1">
            Content Mode
          </label>
          <select
            className="border border-gray-300 rounded px-2 py-1 text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-400"
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
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-gray-600 mb-1">
            Project
          </label>
          <select
            className="border border-gray-300 rounded px-2 py-1 text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-400"
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
    </header>
  );
}
