import { SlideContainer, TwoColumnLayout, Eyebrow, SectionHeader, MonoText } from "@/design-system";

interface SplitContentTemplateProps {
  eyebrow?: string;
  title: string;
  content: string;
  bulletPoints?: string[];
  imageUrl: string;
  imageSide?: "left" | "right";
  variant?: "light" | "dark" | "cream";
}

export function SplitContentTemplate({
  eyebrow,
  title,
  content,
  bulletPoints,
  imageUrl,
  imageSide = "right",
  variant = "light",
}: SplitContentTemplateProps) {
  const textContent = (
    <div className="space-y-6">
      {eyebrow && (
        <Eyebrow
          className="text-[14px]"
          style={{ color: "var(--color-primary)" }}
        >
          {eyebrow}
        </Eyebrow>
      )}
      <SectionHeader style={{ fontSize: "clamp(2rem, 4vw, 2.5rem)" }}>
        {title}
      </SectionHeader>
      <MonoText
        className="text-[16px] leading-[1.8] block"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {content}
      </MonoText>
      {bulletPoints && bulletPoints.length > 0 && (
        <ul className="mt-6 space-y-3">
          {bulletPoints.map((point, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span
                className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: "var(--color-primary)" }}
              />
              <MonoText
                className="text-[14px] leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {point}
              </MonoText>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const imageContent = (
    <div
      className="w-full h-full bg-cover bg-center rounded-lg"
      style={{
        backgroundImage: `url('${imageUrl}')`,
        minHeight: 400,
      }}
    />
  );

  return (
    <SlideContainer variant={variant}>
      <TwoColumnLayout
        left={imageSide === "left" ? imageContent : textContent}
        right={imageSide === "right" ? imageContent : textContent}
      />
    </SlideContainer>
  );
}
