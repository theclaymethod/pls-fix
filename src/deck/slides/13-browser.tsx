import { motion } from "motion/react";
import {
  SlideContainer,
  Eyebrow,
  SectionHeader,
  MonoText,
  AnimatedEntry,
} from "@/design-system";

export function Slide13Browser() {
  return (
    <SlideContainer mode="yellow">
      <div className="h-full flex flex-col items-center justify-center">
        <AnimatedEntry variant="slideUp" delay={0}>
          <Eyebrow className="mb-2">Web Application</Eyebrow>
        </AnimatedEntry>

        <AnimatedEntry variant="slideUp" delay={0.1}>
          <SectionHeader
            className="mb-8 text-center"
            style={{ fontSize: "clamp(2.5rem, 4vw, 3rem)" }}
          >
            Dashboard Interface
          </SectionHeader>
        </AnimatedEntry>

        <motion.div
          className="w-full max-w-4xl overflow-hidden"
          style={{
            borderRadius: "var(--radius-lg, 12px)",
            border: "1px solid rgba(0,0,0,0.1)",
            boxShadow: "var(--shadow-xl, 0 20px 50px rgba(0,0,0,0.15))",
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
        >
          <div
            className="h-10 flex items-center px-4 gap-2"
            style={{
              backgroundColor: "#f5f5f5",
              borderBottom: "1px solid #e5e5e5",
            }}
          >
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 mx-4">
              <div
                className="rounded px-3 py-1 text-xs max-w-md mx-auto text-center"
                style={{ backgroundColor: "#fff", color: "#999" }}
              >
                app.example.com/dashboard
              </div>
            </div>
          </div>

          <div
            className="aspect-video bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=675&fit=crop')",
            }}
          />
        </motion.div>

        <AnimatedEntry variant="slideUp" delay={0.3}>
          <MonoText className="mt-6 text-center block">
            Real-time analytics and reporting
          </MonoText>
        </AnimatedEntry>
      </div>
    </SlideContainer>
  );
}
