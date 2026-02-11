import { useState, useEffect } from "react";
import { invalidateSlideCache, getSlideComponent } from "@/deck/config";
import type { ComponentType } from "react";

export function useSlidePreview(
  fileKey: string | null,
  slideNumber: number
): { component: ComponentType | null; version: number } {
  const [version, setVersion] = useState(0);

  useEffect(() => {
    if (!fileKey || !import.meta.hot) return;

    const handler = (payload: { updates: Array<{ path: string }> }) => {
      const updatedModules = payload.updates.map((u) => u.path);
      if (updatedModules.some((p) => p.includes(fileKey))) {
        invalidateSlideCache(fileKey);
        setVersion((v) => v + 1);
      }
    };

    import.meta.hot.on("vite:afterUpdate", handler);
    return () => {
      import.meta.hot?.off("vite:afterUpdate", handler);
    };
  }, [fileKey]);

  if (!fileKey || slideNumber < 1) {
    return { component: null, version };
  }

  return { component: getSlideComponent(slideNumber), version };
}
