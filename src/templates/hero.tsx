import { SlideContainer, CornerBrackets, MonoText } from "@/design-system";

interface HeroTemplateProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  imageUrl?: string;
}

export function HeroTemplate({
  eyebrow,
  title,
  subtitle,
  imageUrl,
}: HeroTemplateProps) {
  return (
    <SlideContainer variant="dark" className="relative !p-0 overflow-hidden">
      {imageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${imageUrl}')` }}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      <div className="relative h-full flex flex-col justify-end p-8 md:p-12 lg:p-16">
        <div className="max-w-2xl">
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

      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 lg:bottom-16 lg:right-16">
        <CornerBrackets size="lg" color="rgba(255,255,255,0.3)">
          <div className="w-16 h-16" />
        </CornerBrackets>
      </div>
    </SlideContainer>
  );
}
