import {
  SlideContainer,
  CornerBrackets,
  Eyebrow,
  SectionHeader,
  MonoText,
} from "@/design-system";

interface ThreeUpItem {
  imageUrl: string;
  title: string;
  subtitle?: string;
}

interface ThreeUpTemplateProps {
  eyebrow?: string;
  title?: string;
  items: [ThreeUpItem, ThreeUpItem, ThreeUpItem];
  variant?: "light" | "dark" | "cream";
  showBrackets?: boolean;
  aspectRatio?: "square" | "portrait" | "landscape";
}

export function ThreeUpTemplate({
  eyebrow,
  title,
  items,
  variant = "light",
  showBrackets = true,
  aspectRatio = "portrait",
}: ThreeUpTemplateProps) {
  const isLight = variant === "light" || variant === "cream";

  const aspectClass = {
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    landscape: "aspect-video",
  }[aspectRatio];

  return (
    <SlideContainer variant={variant}>
      <div className="h-full flex flex-col">
        {(eyebrow || title) && (
          <div className="mb-8 text-center">
            {eyebrow && (
              <Eyebrow
                className="text-[14px]"
                style={{ color: "var(--color-primary)" }}
              >
                {eyebrow}
              </Eyebrow>
            )}
            {title && (
              <SectionHeader
                className="mt-2"
                style={{ fontSize: "clamp(2rem, 4vw, 2.5rem)" }}
              >
                {title}
              </SectionHeader>
            )}
          </div>
        )}

        <div className="flex-1 flex items-center justify-center">
          <div className="grid grid-cols-3 gap-6 w-full max-w-5xl">
            {items.map((item, idx) => {
              const content = (
                <div className="flex flex-col">
                  <div
                    className={`${aspectClass} bg-cover bg-center rounded-lg overflow-hidden`}
                    style={{ backgroundImage: `url('${item.imageUrl}')` }}
                  />
                  <div className="mt-4 text-center">
                    <h3
                      className="text-[18px]"
                      style={{
                        fontFamily: "var(--font-heading)",
                        color: isLight
                          ? "var(--color-text-primary)"
                          : "var(--color-text-inverse)",
                      }}
                    >
                      {item.title}
                    </h3>
                    {item.subtitle && (
                      <MonoText
                        className="text-[14px] mt-1 block"
                        style={{
                          color: isLight
                            ? "var(--color-text-muted)"
                            : "rgba(255,255,255,0.6)",
                        }}
                      >
                        {item.subtitle}
                      </MonoText>
                    )}
                  </div>
                </div>
              );

              return showBrackets ? (
                <CornerBrackets
                  key={idx}
                  size="sm"
                  color={isLight ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.2)"}
                >
                  {content}
                </CornerBrackets>
              ) : (
                <div key={idx}>{content}</div>
              );
            })}
          </div>
        </div>
      </div>
    </SlideContainer>
  );
}
