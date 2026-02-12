import { motion } from "motion/react";
import { SlideContainer, Eyebrow, BodyText, AnimatedEntry } from "@/design-system";

export function Slide10Fullscreen() {
  return (
    <SlideContainer mode="dark" className="relative !p-0 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&h=1080&fit=crop')",
        }}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      <div className="relative h-full flex flex-col justify-end items-start p-16">
        <div className="max-w-3xl">
          <AnimatedEntry variant="slideUp" delay={0}>
            <Eyebrow className="mb-5">Visual Impact</Eyebrow>
          </AnimatedEntry>

          <AnimatedEntry variant="slideUp" delay={0.15}>
            <h1
              className="leading-[1.05] tracking-[-0.02em] mb-6"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(3.5rem, 7vw, 6rem)",
                color: "var(--color-text-primary)",
              }}
            >
              Full-Screen Image Layout
            </h1>
          </AnimatedEntry>

          <AnimatedEntry variant="slideUp" delay={0.3}>
            <BodyText size="lg" className="!text-[26px]">
              Perfect for impactful hero sections and visual storytelling
            </BodyText>
          </AnimatedEntry>
        </div>
      </div>
    </SlideContainer>
  );
}
