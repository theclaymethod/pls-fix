import {
  SlideContainer,
  CornerBrackets,
  Eyebrow,
  SectionHeader,
  MonoText,
} from "@/design-system";

interface PhoneMockupTemplateProps {
  eyebrow?: string;
  title?: string;
  imageUrl: string;
  caption?: string;
  variant?: "light" | "dark" | "cream";
  phoneColor?: "black" | "white" | "silver";
}

export function PhoneMockupTemplate({
  eyebrow,
  title,
  imageUrl,
  caption,
  variant = "cream",
  phoneColor = "black",
}: PhoneMockupTemplateProps) {
  const isLight = variant === "light" || variant === "cream";
  const frameColor = {
    black: "#1a1a1a",
    white: "#f5f5f5",
    silver: "#d4d4d4",
  }[phoneColor];

  return (
    <SlideContainer variant={variant}>
      <div className="h-full flex flex-col items-center justify-center">
        {eyebrow && (
          <Eyebrow className="mb-2" style={{ color: "var(--color-primary)" }}>
            {eyebrow}
          </Eyebrow>
        )}

        {title && (
          <SectionHeader
            className="mb-8 text-center"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.2rem)" }}
          >
            {title}
          </SectionHeader>
        )}

        <CornerBrackets
          size="lg"
          color={isLight ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.2)"}
        >
          <div
            className="relative rounded-[40px] overflow-hidden"
            style={{
              border: `12px solid ${frameColor}`,
              maxHeight: "65vh",
            }}
          >
            <div
              className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-7 rounded-full z-10"
              style={{ backgroundColor: frameColor }}
            />

            <div
              className="bg-cover bg-center bg-no-repeat"
              style={{
                width: "280px",
                height: "600px",
                backgroundImage: `url('${imageUrl}')`,
              }}
            />
          </div>
        </CornerBrackets>

        {caption && (
          <MonoText
            className="mt-8 text-center max-w-md block text-[14px]"
            style={{
              color: isLight
                ? "var(--color-text-muted)"
                : "rgba(255,255,255,0.6)",
            }}
          >
            {caption}
          </MonoText>
        )}
      </div>
    </SlideContainer>
  );
}
