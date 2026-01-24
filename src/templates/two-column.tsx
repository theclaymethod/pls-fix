import {
  SlideContainer,
  TwoColumnLayout,
  Eyebrow,
  SectionHeader,
  ListItem,
} from "@/design-system";

interface TwoColumnTemplateProps {
  eyebrow?: string;
  title: string;
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  ratio?: "1:1" | "2:1" | "1:2" | "3:2" | "2:3";
  variant?: "light" | "dark" | "cream";
}

export function TwoColumnTemplate({
  eyebrow,
  title,
  leftContent,
  rightContent,
  ratio = "1:1",
  variant = "light",
}: TwoColumnTemplateProps) {
  return (
    <SlideContainer variant={variant}>
      <div className="h-full flex flex-col">
        <div className="mb-8">
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

        <div className="flex-1">
          <TwoColumnLayout
            left={leftContent}
            right={rightContent}
            ratio={ratio}
          />
        </div>
      </div>
    </SlideContainer>
  );
}

interface TwoColumnTextProps {
  eyebrow?: string;
  title: string;
  leftTitle: string;
  leftItems: string[];
  rightTitle: string;
  rightItems: string[];
  variant?: "light" | "dark" | "cream";
}

export function TwoColumnTextTemplate({
  eyebrow,
  title,
  leftTitle,
  leftItems,
  rightTitle,
  rightItems,
  variant = "light",
}: TwoColumnTextProps) {
  const leftContent = (
    <div>
      <h3
        className="text-xl mb-4"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {leftTitle}
      </h3>
      <div className="space-y-3">
        {leftItems.map((item, idx) => (
          <ListItem key={idx} number={idx + 1}>
            {item}
          </ListItem>
        ))}
      </div>
    </div>
  );

  const rightContent = (
    <div>
      <h3
        className="text-xl mb-4"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {rightTitle}
      </h3>
      <div className="space-y-3">
        {rightItems.map((item, idx) => (
          <ListItem key={idx} number={idx + 1}>
            {item}
          </ListItem>
        ))}
      </div>
    </div>
  );

  return (
    <TwoColumnTemplate
      eyebrow={eyebrow}
      title={title}
      leftContent={leftContent}
      rightContent={rightContent}
      variant={variant}
    />
  );
}
