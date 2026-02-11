import type { CanvasBox } from "./types";

interface PromptInput {
  boxes: CanvasBox[];
  layoutPrompt: string;
  contentPrompt: string;
  templateHint: string;
  slideName: string;
  slidePosition: number;
  mode: "light" | "dark" | "cream";
}

export function buildPrompt(input: PromptInput): string {
  const parts: string[] = [];

  parts.push(
    `Create a new slide at position ${input.slidePosition} named "${input.slideName}" in ${input.mode} mode.`
  );

  parts.push("");
  parts.push(
    "Compose the slide from the design system primitives in @/design-system (SlideContainer, SectionHeader, BodyText, GridSection, TwoColumnLayout, cards, etc). " +
    "Use style={{}} with CSS variables for colors — not Tailwind color classes. Use Tailwind for spacing/layout only."
  );

  if (input.templateHint) {
    parts.push("");
    parts.push(
      `Reference these design system components if useful: ${input.templateHint}`
    );
  }

  parts.push("");
  parts.push(
    "Compose from @/design-system primitives. Do not use @/templates."
  );

  if (input.boxes.length > 0) {
    parts.push("");
    parts.push("Rough layout sketch (1920x1080) — approximate positions only, not a pixel-perfect reference:");
    for (const box of input.boxes) {
      parts.push(
        `- "${box.label}" (${box.type}): x=${box.x}, y=${box.y}, w=${box.width}, h=${box.height}`
      );
    }
  }

  if (input.layoutPrompt.trim()) {
    parts.push("");
    parts.push(`Layout intent: ${input.layoutPrompt.trim()}`);
  }

  if (input.contentPrompt.trim()) {
    parts.push("");
    parts.push(`Content: ${input.contentPrompt.trim()}`);
  }

  return parts.join("\n");
}
