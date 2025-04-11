import { model, modelID } from "@/ai/providers";
import { streamText, UIMessage } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const {
    messages,
    selectedModel,
  }: { messages: UIMessage[]; selectedModel: modelID } = await req.json();

  // If `selectedModel` is somehow undefined or invalid, we can fallback to a default
  const modelToUse = selectedModel ?? "llama-3.3-70b-versatile";

  // System message instructing no function calls or tool usage:
  const systemPrompt = `
You are a straightforward text assistant for the Prince Wako Foundation.
Do not call any tools or produce function-calling placeholders.
Only provide direct text answers in normal conversation.
`;

  const result = streamText({
    // Use a valid model or fallback
    model: model.languageModel(modelToUse),

    // Combine your system prompt with the fallback if you like
    system: systemPrompt,

    // The user's conversation
    messages,

    // Remove or disable tools to prevent function-calling tokens
    tools: {},

    // Telemetry is optional
    experimental_telemetry: {
      isEnabled: true,
    },
  });

  return result.toDataStreamResponse({
    sendReasoning: true,
    getErrorMessage: (error) => {
      if (error instanceof Error) {
        if (error.message.includes("Rate limit")) {
          return "Rate limit exceeded. Please try again later.";
        }
      }
      console.error(error);
      return "An error occurred.";
    },
  });
}
