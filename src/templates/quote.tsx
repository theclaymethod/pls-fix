import { SlideContainer, MonoText } from "@/design-system";

interface QuoteTemplateProps {
  quote: string;
  attribution: string;
  role?: string;
  variant?: "light" | "dark";
}

export function QuoteTemplate({
  quote,
  attribution,
  role,
  variant = "dark",
}: QuoteTemplateProps) {
  return (
    <SlideContainer variant={variant}>
      <div className="h-full flex flex-col items-center justify-center p-12 text-center">
        <div
          className="text-[120px] leading-none mb-4"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--color-primary)",
          }}
        >
          "
        </div>

        <p
          className="max-w-4xl leading-relaxed"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            color: variant === "dark" ? "white" : "var(--color-text-primary)",
          }}
        >
          {quote}
        </p>

        <div className="mt-10 flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              backgroundColor:
                variant === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
            }}
          >
            <span
              className="text-lg"
              style={{
                color: variant === "dark" ? "white" : "var(--color-text-primary)",
              }}
            >
              {attribution
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div className="text-left">
            <MonoText
              className="text-base font-medium"
              style={{
                color: variant === "dark" ? "white" : "var(--color-text-primary)",
              }}
            >
              {attribution}
            </MonoText>
            {role && (
              <MonoText
                className="text-sm block"
                style={{
                  color:
                    variant === "dark"
                      ? "rgba(255,255,255,0.6)"
                      : "var(--color-text-muted)",
                }}
              >
                {role}
              </MonoText>
            )}
          </div>
        </div>
      </div>
    </SlideContainer>
  );
}
