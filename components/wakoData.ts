// (A) PROJECTS
export const projects = {
    cleanWater: {
      label: "💧 Clean Water Project – Jinja",
      summary:
        "Constructed 5+ wells providing safe water to 3,000+ people in rural Uganda. Improved school attendance, reduced waterborne diseases, etc.",
    },
    education: {
      label: "🏫 Building Schools for Future Leaders – Kaliro",
      summary:
        "Constructed schools, employed teachers, supported 200+ students, etc.",
    },
    // ... more
  } as const;
  
  export type ProjectType = keyof typeof projects;
  
  // (B) CONTENT MODES
  export const modes = {
    blog: { label: "📝 Blog Post" },
    caption: { label: "📣 Social Caption" },
    report: { label: "📑 Report Summary" },
    donor: { label: "💌 Donor Letter" },
  } as const;
  
  export type ModeType = keyof typeof modes;
  
  // (C) Generate system prompt
  export function generateSystemPrompt(
    mode: ModeType,
    projectKey: ProjectType
  ): string {
    const project = projects[projectKey];
    switch (mode) {
      case "blog":
        return `You are writing an engaging blog post for Prince Wako Foundation.
  Focus on this project: ${project.label}
  Details: ${project.summary}
  Emphasize impact, personal stories, and mission-driven outcomes.`;
      case "caption":
        return `You are crafting a short, powerful social media caption for Prince Wako Foundation.
  Focus: ${project.label}
  Use emotional language, clarity, and relevant hashtags.`;
      case "report":
        return `You are preparing a professional report summary for ${project.label}.
  Include statistics, outcomes, and data from ${project.summary}.`;
      case "donor":
        return `Compose a donor thank-you letter regarding ${project.label}.
  Highlight successes, gratitude, future opportunities, etc.`;
      default:
        return "";
    }
  } 