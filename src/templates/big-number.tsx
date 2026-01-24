import { SlideContainer, CenterContent, CornerBrackets, Eyebrow, MonoText } from "@/design-system";

interface BigNumberTemplateProps {
  eyebrow?: string;
  number: string;
  label: string;
  description?: string;
  variant?: "light" | "dark" | "primary";
  showBrackets?: boolean;
}

export function BigNumberTemplate({
  eyebrow,
  number,
  label,
  description,
  variant = "light",
  showBrackets = false,
}: BigNumberTemplateProps) {
  const textColor =
    variant === "light"
      ? "var(--color-text-primary)"
      : "var(--color-text-inverse)";

  const mutedColor =
    variant === "light"
      ? "var(--color-text-muted)"
      : "rgba(255,255,255,0.7)";

  const accentColor =
    variant === "light" ? "var(--color-primary)" : "rgba(255,255,255,0.3)";

  const numberContent = (
    <div className="px-12 py-8">
      <div
        className="font-light leading-none"
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(8rem, 20vw, 14rem)",
          color: variant === "light" ? "var(--color-primary)" : textColor,
        }}
      >
        {number}
      </div>
    </div>
  );

  return (
    <SlideContainer variant={variant}>
      <CenterContent>
        {eyebrow && (
          <Eyebrow
            className="mb-6"
            style={{
              color: variant === "primary" ? "rgba(255,255,255,0.8)" : "var(--color-text-muted)",
            }}
          >
            {eyebrow}
          </Eyebrow>
        )}

        {showBrackets ? (
          <CornerBrackets size="lg" color={accentColor}>
            {numberContent}
          </CornerBrackets>
        ) : (
          numberContent
        )}

        <MonoText
          className="text-xl uppercase tracking-[0.2em] mt-6 block"
          style={{ color: textColor }}
        >
          {label}
        </MonoText>

        {description && (
          <MonoText
            className="text-base mt-4 max-w-md block text-center"
            style={{ color: mutedColor }}
          >
            {description}
          </MonoText>
        )}
      </CenterContent>
    </SlideContainer>
  );
}
