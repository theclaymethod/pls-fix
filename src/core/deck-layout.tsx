import { useNavigate } from "@tanstack/react-router";
import { SlideNav, type SlideNavItem } from "./slide-nav";
import { SlideScaler } from "./slide-scaler";
import { useKeyboardNav } from "./keyboard-nav";
import { useAuth } from "./auth-gate";
import { useMobileBlock, MobileBlocker } from "./mobile-blocker";
import { AuthGate } from "./auth-gate";
import { deckConfig } from "../../deck.config";

interface DeckLayoutProps {
  children: React.ReactNode;
  currentSlide: number;
  slides: SlideNavItem[];
}

export function DeckLayout({ children, currentSlide, slides }: DeckLayoutProps) {
  const navigate = useNavigate();
  const auth = useAuth();
  const mobile = useMobileBlock();

  const totalSlides = slides.length;

  useKeyboardNav({
    currentSlide,
    totalSlides,
    disabled: !auth.isAuthenticated,
  });

  const goToSlide = (slideNum: number) => {
    if (slideNum >= 1 && slideNum <= totalSlides) {
      navigate({
        to: "/deck/$slide",
        params: { slide: String(slideNum) },
      });
    }
  };

  if (auth.isLoading || mobile.isChecking) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ backgroundColor: "var(--color-bg-cream)" }}
      >
        <div
          className="text-[10px] uppercase tracking-[0.3em] animate-pulse"
          style={{ fontFamily: "var(--font-body)", color: "var(--color-text-muted)" }}
        >
          Loading presentation...
        </div>
      </div>
    );
  }

  if (mobile.isMobile) {
    return <MobileBlocker />;
  }

  if (!auth.isAuthenticated) {
    return <AuthGate onAuthenticated={() => {}} />;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex"
      style={{ backgroundColor: "var(--color-bg-cream)" }}
    >
      <SlideNav
        slides={slides}
        currentSlide={currentSlide}
        onNavigate={goToSlide}
      />

      <div className="flex-1 flex items-center justify-center overflow-hidden relative">
        <SlideScaler>{children}</SlideScaler>

        {deckConfig.navigation.showSlideNumbers && (
          <div
            className="absolute bottom-[20px] right-[24px] text-[11px] tracking-[0.1em]"
            style={{ fontFamily: "var(--font-mono)", color: "#999" }}
          >
            {String(currentSlide).padStart(2, "0")}/{String(totalSlides).padStart(2, "0")}
          </div>
        )}
      </div>
    </div>
  );
}
