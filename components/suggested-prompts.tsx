"use client";

import { motion } from "motion/react";
import { Button } from "./ui/button";
import { memo } from "react";

interface SuggestedPromptsProps {
  sendMessage: (input: string) => void;
}

function PureSuggestedPrompts({ sendMessage }: SuggestedPromptsProps) {
  // Updated prompts – relevant to Prince Wako Foundation
  const suggestedActions = [
    {
      title: "Write a blog post about",
      label: "Clean Water Project",
      action: "Write a blog post about the Prince Wako Foundation Clean Water Project.",
    },
    {
      title: "Create a social caption for",
      label: "Building Schools Initiative",
      action:
        "Create a short, engaging social media caption about the Building Schools Initiative by Prince Wako Foundation.",
    },
    {
      title: "Draft a donor letter for",
      label: "Housing Project – Iganga",
      action:
        "Draft a thank-you letter for donors supporting the Housing Project in Iganga.",
    },
    {
      title: "Report Summary on",
      label: "Healthcare Access Initiative",
      action:
        "Create a professional report summary about the Healthcare Access Initiative by Prince Wako Foundation.",
    },
  ];

  return (
    <div
      data-testid="suggested-actions"
      className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full"
    >
      {suggestedActions.map((prompt, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.05 * index }}
          key={`suggested-action-${prompt.title}-${index}`}
        >
          <Button
            variant="ghost"
            onClick={() => {
              sendMessage(prompt.action);
            }}
            className="text-left border border-gray-200 rounded-xl px-4 py-3 text-sm w-full h-auto hover:bg-gray-100"
          >
            <span className="font-medium">{prompt.title}</span>
            <span className="text-muted-foreground ml-1">
              {prompt.label}
            </span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}

export const SuggestedPrompts = memo(PureSuggestedPrompts, () => true);
