import {
  SlideContainer,
  CornerBrackets,
  Eyebrow,
  SectionHeader,
  MonoText,
} from "@/design-system";

interface PhotoGridItem {
  imageUrl: string;
  title: string;
  subtitle?: string;
}

interface PhotoGridTemplateProps {
  eyebrow?: string;
  title: string;
  items: PhotoGridItem[];
  columns?: 2 | 3 | 4;
  variant?: "light" | "dark" | "cream";
  showBrackets?: boolean;
}

export function PhotoGridTemplate({
  eyebrow,
  title,
  items,
  columns = 3,
  variant = "light",
  showBrackets = true,
}: PhotoGridTemplateProps) {
  const colClass = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  }[columns];

  const rows = columns === 2 ? 2 : columns === 4 ? 1 : 2;
  const rowClass = rows === 1 ? "grid-rows-1" : "grid-rows-2";

  return (
    <SlideContainer variant={variant}>
      <div className="h-full flex flex-col">
        <div className="mb-6">
          {eyebrow && (
            <Eyebrow
              className="text-[14px]"
              style={{ color: "var(--color-primary)" }}
            >
              {eyebrow}
            </Eyebrow>
          )}
          <SectionHeader
            className="mt-2"
            style={{ fontSize: "clamp(2rem, 4vw, 2.5rem)" }}
          >
            {title}
          </SectionHeader>
        </div>

        <div className={`flex-1 grid ${colClass} ${rowClass} gap-4`}>
          {items.map((item, idx) => {
            const content = (
              <div
                className="relative h-full bg-cover bg-center rounded overflow-hidden"
                style={{ backgroundImage: `url('${item.imageUrl}')` }}
              >
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "18px",
                    }}
                  >
                    {item.title}
                  </div>
                  {item.subtitle && (
                    <MonoText
                      className="opacity-80"
                      style={{ fontSize: "14px" }}
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
                color="rgba(255,255,255,0.3)"
              >
                {content}
              </CornerBrackets>
            ) : (
              <div key={idx} className="h-full">
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </SlideContainer>
  );
}
