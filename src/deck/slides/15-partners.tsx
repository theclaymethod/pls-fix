import { motion } from "motion/react";
import {
  SlideContainer,
  Eyebrow,
  SectionHeader,
  MonoText,
  StaggerContainer,
} from "@/design-system";

const logos = [
  { name: "React", label: "Frontend" },
  { name: "TypeScript", label: "Language" },
  { name: "Tailwind", label: "Styling" },
  { name: "Cloudflare", label: "Infrastructure" },
  { name: "PostgreSQL", label: "Database" },
  { name: "Redis", label: "Caching" },
];

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

export function Slide15Partners() {
  return (
    <SlideContainer mode="white">
      <div className="h-full flex flex-col">
        <div className="text-center mb-8">
          <Eyebrow
            className="text-[20px]"
            style={{ color: "var(--color-primary)" }}
          >
            Technology Stack
          </Eyebrow>
          <SectionHeader
            className="mt-2"
            style={{ fontSize: "clamp(3rem, 5vw, 4rem)" }}
          >
            Built With
          </SectionHeader>
        </div>

        <StaggerContainer stagger={0.08} delay={0} className="flex-1 grid grid-cols-3 grid-rows-2 gap-4 items-center justify-items-center">
          {logos.map((logo, i) => (
            <motion.div key={i} variants={itemVariants}>
              <div
                className="w-40 h-24 flex flex-col items-center justify-center transition-all duration-300 grayscale hover:grayscale-0 hover:scale-105 hover:shadow-md hover:-translate-y-1 cursor-pointer"
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid rgba(0,0,0,0.1)",
                }}
              >
                <span
                  className="text-lg font-medium"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--color-text-primary)",
                  }}
                >
                  {logo.name}
                </span>
                <MonoText
                  className="text-[16px] mt-1"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {logo.label}
                </MonoText>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </SlideContainer>
  );
}
