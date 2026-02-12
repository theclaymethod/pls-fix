import {
  SlideContainer,
  SectionHeader,
  BodyText,
  Eyebrow,
  Divider,
} from "@/design-system";

function AccentCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex flex-col justify-center p-8"
      style={{
        backgroundColor: "var(--color-bg-secondary)",
        borderLeft: "3px solid var(--color-primary)",
      }}
    >
      {children}
    </div>
  );
}

export function Slide18Text4() {
  return (
    <SlideContainer mode="white">
      <div className="h-full flex flex-col">
        <div className="mb-12">
          <Eyebrow>Profile</Eyebrow>
          <Divider className="mt-4" />
        </div>

        <div className="flex-1 grid grid-cols-3 gap-8 items-center">
          <div className="space-y-8">
            <AccentCard>
              <SectionHeader className="text-[28px] leading-tight">
                Ada Lovelace
              </SectionHeader>
            </AccentCard>
            <AccentCard>
              <BodyText size="sm">
                Her notes on the Analytical Engine included what is considered
                the first algorithm — making her a pioneer of computing.
              </BodyText>
            </AccentCard>
          </div>

          <div className="flex items-center">
            <AccentCard>
              <BodyText size="sm">
                Mathematician and writer, recognized as the first computer
                programmer for her work on Charles Babbage's Analytical Engine in
                1843.
              </BodyText>
            </AccentCard>
          </div>

          <div className="flex items-center">
            <AccentCard>
              <BodyText size="sm">
                She envisioned machines going beyond mere calculation —
                anticipating general-purpose computing over a century early.
              </BodyText>
            </AccentCard>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
}
