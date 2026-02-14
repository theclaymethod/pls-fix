import { motion } from "motion/react";
import {
  SlideContainer,
  Eyebrow,
  SectionHeader,
  Divider,
  GridSection,
  FeatureCard,
  staggerContainerVariants,
  slideUpVariants,
  ShineBorder,
} from "@/design-system";

const CheckIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChartIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 17V9M13 17V5M8 17v-3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const features = [
  {
    icon: <CheckIcon />,
    title: "Easy Integration",
    description: "Connect with your existing tools in minutes, not hours",
  },
  {
    icon: <ChartIcon />,
    title: "Real-time Analytics",
    description: "Track performance with live dashboards and custom reports",
  },
  {
    icon: <ShieldIcon />,
    title: "Enterprise Security",
    description: "Bank-level encryption and compliance certifications",
  },
];

export function Slide04Features() {
  return (
    <SlideContainer mode="light" className="flex flex-col">
      <motion.div
        variants={staggerContainerVariants(0.12, 0)}
        initial="hidden"
        animate="visible"
        className="mb-12"
      >
        <motion.div variants={slideUpVariants} className="mb-4">
          <Eyebrow>Capabilities</Eyebrow>
        </motion.div>
        <motion.div variants={slideUpVariants} className="mb-8">
          <SectionHeader>Key Features</SectionHeader>
        </motion.div>
        <motion.div variants={slideUpVariants}>
          <Divider />
        </motion.div>
      </motion.div>

      <motion.div
        variants={staggerContainerVariants(0.15, 0.3)}
        initial="hidden"
        animate="visible"
        className="flex-1 flex items-center"
      >
        <GridSection columns={3} gap="lg" className="w-full">
          {features.map((feature) => (
            <motion.div key={feature.title} variants={slideUpVariants}>
              <ShineBorder>
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  className="border-2 border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-8"
                />
              </ShineBorder>
            </motion.div>
          ))}
        </GridSection>
      </motion.div>
    </SlideContainer>
  );
}
