import { useState, useCallback, useRef } from "react";
import { useGeneration } from "./use-generation";

type SlideStatus = "pending" | "processing" | "done" | "error";
type ApplyPhase = "idle" | "selecting" | "applying" | "reviewing";

interface ApplyState {
  phase: ApplyPhase;
  selectedSlides: Set<string>;
  slideStatuses: Map<string, SlideStatus>;
  slideResults: Map<string, string>;
}

export function useApplyDesignSystem() {
  const [state, setState] = useState<ApplyState>({
    phase: "idle",
    selectedSlides: new Set(),
    slideStatuses: new Map(),
    slideResults: new Map(),
  });

  const generation = useGeneration();
  const abortedRef = useRef(false);

  const enterSelecting = useCallback(() => {
    setState({
      phase: "selecting",
      selectedSlides: new Set(),
      slideStatuses: new Map(),
      slideResults: new Map(),
    });
  }, []);

  const cancel = useCallback(() => {
    abortedRef.current = true;
    generation.cancel();
    setState({
      phase: "idle",
      selectedSlides: new Set(),
      slideStatuses: new Map(),
      slideResults: new Map(),
    });
  }, [generation]);

  const toggleSlide = useCallback((fileKey: string) => {
    setState((s) => {
      const next = new Set(s.selectedSlides);
      if (next.has(fileKey)) next.delete(fileKey);
      else next.add(fileKey);
      return { ...s, selectedSlides: next };
    });
  }, []);

  const selectAll = useCallback((fileKeys: string[]) => {
    setState((s) => ({ ...s, selectedSlides: new Set(fileKeys) }));
  }, []);

  const deselectAll = useCallback(() => {
    setState((s) => ({ ...s, selectedSlides: new Set() }));
  }, []);

  const applyToSlides = useCallback(async () => {
    abortedRef.current = false;
    const slides = Array.from(state.selectedSlides);

    const initialStatuses = new Map<string, SlideStatus>();
    for (const fk of slides) initialStatuses.set(fk, "pending");

    setState((s) => ({
      ...s,
      phase: "applying",
      slideStatuses: initialStatuses,
      slideResults: new Map(),
    }));

    for (const fileKey of slides) {
      if (abortedRef.current) break;

      setState((s) => {
        const next = new Map(s.slideStatuses);
        next.set(fileKey, "processing");
        return { ...s, slideStatuses: next };
      });

      try {
        await generation.applyDesignSystem(fileKey);

        setState((s) => {
          const statuses = new Map(s.slideStatuses);
          const results = new Map(s.slideResults);
          statuses.set(fileKey, "done");
          results.set(fileKey, generation.output || "Applied successfully");
          return { ...s, slideStatuses: statuses, slideResults: results };
        });
      } catch {
        setState((s) => {
          const statuses = new Map(s.slideStatuses);
          const results = new Map(s.slideResults);
          statuses.set(fileKey, "error");
          results.set(fileKey, generation.error || "Unknown error");
          return { ...s, slideStatuses: statuses, slideResults: results };
        });
      }
    }

    if (!abortedRef.current) {
      setState((s) => ({ ...s, phase: "reviewing" }));
    }
  }, [state.selectedSlides, generation]);

  const finishReview = useCallback(() => {
    setState({
      phase: "idle",
      selectedSlides: new Set(),
      slideStatuses: new Map(),
      slideResults: new Map(),
    });
  }, []);

  return {
    ...state,
    enterSelecting,
    cancel,
    toggleSlide,
    selectAll,
    deselectAll,
    applyToSlides,
    finishReview,
    generationStatus: generation.status,
  };
}
