"use client";

import { useState, FormEvent } from "react";
import { toast } from "sonner";
import { useChat } from "@ai-sdk/react";

// Import your model definitions (assuming you have them)
import { defaultModel, modelID } from "@/ai/providers";

// Import Wako data & system prompt
import {
  modes,
  projects,
  generateSystemPrompt,
  ModeType,
  ProjectType,
} from "./wakoData";

// Import your other components
import { Header } from "./header";
import { Messages } from "./messages";
import { ProjectOverview } from "./project-overview";
import { Textarea } from "./textarea";

/** 
 * A final Chat.tsx that compiles with no TS errors,
 * referencing your Wako data from `@/lib/wakoData`.
 */
export default function Chat() {
  // The user's chosen model
  const [selectedModel, setSelectedModel] = useState<modelID>(defaultModel);

  // The user's chosen content mode / project, typed from wakoData
  const [foundationMode, setFoundationMode] = useState<ModeType>("blog");
  const [foundationProject, setFoundationProject] =
    useState<ProjectType>("cleanWater");

  // Hooks from `@ai-sdk/react`
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit: originalHandleSubmit,
    status,
    stop,
    setMessages,
  } = useChat({
    maxSteps: 5,
    body: { selectedModel },
    onError: (error) => {
      toast.error(error.message || "An error occurred", {
        position: "top-center",
        richColors: true,
      });
    },
  });

  // Check if the AI is currently streaming
  const isLoading = status === "streaming" || status === "submitted";

  /** 
   * Intercept form submission to prepend a system message 
   * (based on the user's chosen mode/project).
   */
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // 1) Generate system message
    const systemMsg = {
      id: Date.now().toString(),
      role: "system" as const,
      content: generateSystemPrompt(foundationMode, foundationProject),
    };

    // 2) Insert system message, then proceed with normal submission
    setMessages((prev) => [systemMsg, ...prev]);
    originalHandleSubmit(e);
  }

  return (
    <div className="h-dvh flex flex-col w-full">
      {/* 
        The new `Header` that uses `foundationMode` / `foundationProject`
        plus the typed `modes` / `projects`
      */}
      <Header
        foundationMode={foundationMode}
        setFoundationMode={setFoundationMode}
        foundationProject={foundationProject}
        setFoundationProject={setFoundationProject}
        modes={modes}
        projects={projects}
      />

      {/* 
        Either show an overview if there are no messages,
        or show the chat messages 
      */}
      <div className="flex-1 overflow-auto">
        {messages.length === 0 ? (
          <div className="max-w-xl mx-auto w-full">
            <ProjectOverview />
          </div>
        ) : (
          <Messages messages={messages} isLoading={isLoading} status={status} />
        )}
      </div>

      {/* 
        The input form pinned at the bottom 
      */}
      <form
        onSubmit={onSubmit}
        className="bg-white dark:bg-black w-full max-w-xl mx-auto px-4 sm:px-0 pb-8"
      >
        <Textarea
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          handleInputChange={handleInputChange}
          input={input}
          isLoading={isLoading}
          status={status}
          stop={stop}
        />
      </form>
    </div>
  );
}
