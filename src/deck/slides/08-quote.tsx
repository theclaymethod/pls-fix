import { motion } from "motion/react";
import {
  SlideContainer,
  Quote,
  StaggerContainer,
  slideUpVariants,
} from "@/design-system";

const quotes = [
  {
    text: "AI is transforming how we build software",
    attribution: "John Doe, CTO at Anthropic",
    imageUrl:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80",
    grayscale: true,
  },
  {
    text: "The best software is still built by humans who deeply understand the problem",
    attribution: "Jane Smith, Lead Engineer at Acme",
    imageUrl:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80",
    grayscale: false,
  },
];

export function Slide08Quote() {
  return (
    <SlideContainer mode="dark" className="!p-0">
      <StaggerContainer stagger={0.15} delay={0} className="flex h-full gap-1">
        {quotes.map((q) => (
          <motion.div
            key={q.attribution}
            variants={slideUpVariants}
            className="group relative flex-1 overflow-hidden cursor-pointer"
          >
            <div
              className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${q.grayscale ? "grayscale group-hover:grayscale-0" : ""}`}
              style={{ backgroundImage: `url('${q.imageUrl}')` }}
            />
            <div className="absolute inset-0 bg-black/60 transition-colors duration-500 group-hover:bg-black/40" />

            <div className="relative h-full flex flex-col justify-center p-12">
              <Quote attribution={q.attribution}>{q.text}</Quote>
            </div>
          </motion.div>
        ))}
      </StaggerContainer>
    </SlideContainer>
  );
}
