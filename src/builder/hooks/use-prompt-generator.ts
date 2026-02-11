import { useMemo } from "react";
import type { CanvasBox } from "../types";
import { buildPrompt } from "../prompt-builder";

interface UsePromptGeneratorInput {
  boxes: CanvasBox[];
  layoutPrompt: string;
  contentPrompt: string;
  templateHint: string;
  slideName: string;
  slidePosition: number;
  mode: "light" | "dark" | "cream";
}

export function usePromptGenerator(input: UsePromptGeneratorInput): string {
  return useMemo(() => buildPrompt(input), [
    input.boxes,
    input.layoutPrompt,
    input.contentPrompt,
    input.templateHint,
    input.slideName,
    input.slidePosition,
    input.mode,
  ]);
}
