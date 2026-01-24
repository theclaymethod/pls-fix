import { useEffect, useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import { deckConfig } from "../../deck.config";

interface UseKeyboardNavOptions {
  currentSlide: number;
  totalSlides: number;
  disabled?: boolean;
}

export function useKeyboardNav({
  currentSlide,
  totalSlides,
  disabled = false,
}: UseKeyboardNavOptions) {
  const navigate = useNavigate();

  const goToSlide = useCallback(
    (slideNum: number) => {
      if (slideNum >= 1 && slideNum <= totalSlides) {
        navigate({
          to: "/deck/$slide",
          params: { slide: String(slideNum) },
        });
      }
    },
    [navigate, totalSlides]
  );

  useEffect(() => {
    if (!deckConfig.navigation.enableKeyboard || disabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        if (currentSlide < totalSlides) {
          goToSlide(currentSlide + 1);
        }
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToSlide(currentSlide - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goToSlide(1);
      } else if (e.key === "End") {
        e.preventDefault();
        goToSlide(totalSlides);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, totalSlides, goToSlide, disabled]);

  return { goToSlide };
}
