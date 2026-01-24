import { SlideContainer, CornerBrackets, MonoText } from "@/design-system";

interface FullscreenImageTemplateProps {
  imageUrl: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  position?: "bottom-left" | "bottom-right" | "center" | "top-left";
  overlay?: "gradient" | "dark" | "light" | "none";
  showBrackets?: boolean;
}

export function FullscreenImageTemplate({
  imageUrl,
  eyebrow,
  title,
  subtitle,
  position = "bottom-left",
  overlay = "gradient",
  showBrackets = true,
}: FullscreenImageTemplateProps) {
  const overlayClass = {
    gradient: "bg-gradient-to-t from-black/80 via-black/40 to-transparent",
    dark: "bg-black/50",
    light: "bg-white/30",
    none: "",
  }[overlay];

  const positionClass = {
    "bottom-left": "justify-end items-start",
    "bottom-right": "justify-end items-end text-right",
    center: "justify-center items-center text-center",
    "top-left": "justify-start items-start",
  }[position];

  return (
    <SlideContainer variant="dark" className="relative !p-0 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${imageUrl}')` }}
      />

      {overlay !== "none" && <div className={`absolute inset-0 ${overlayClass}`} />}

      <div className={`relative h-full flex flex-col p-16 ${positionClass}`}>
        <div className={position === "center" ? "max-w-3xl" : "max-w-2xl"}>
          {eyebrow && (
            <MonoText
              className="block text-[14px] tracking-[0.2em] uppercase mb-4"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              {eyebrow}
            </MonoText>
          )}

          <h1
            className="text-white leading-[1.05] tracking-[-0.02em] mb-4"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
            }}
          >
            {title}
          </h1>

          {subtitle && (
            <p
              className="text-[18px] leading-[1.5]"
              style={{
                fontFamily: "var(--font-body)",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {showBrackets && (
        <div className="absolute bottom-12 right-12">
          <CornerBrackets size="lg" color="rgba(255,255,255,0.3)">
            <div className="w-16 h-16" />
          </CornerBrackets>
        </div>
      )}
    </SlideContainer>
  );
}
