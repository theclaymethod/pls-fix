import { useState } from "react";
import { motion } from "motion/react";
import {
  SlideContainer,
  Eyebrow,
  SectionHeader,
  MonoText,
  Label,
  TwoColumnLayout,
  StaggerContainer,
  AnimatedEntry,
  BarChart,
  DonutChart,
  LineChart,
  slideUpVariants,
} from "@/design-system";

const datasets = {
  q1: {
    label: "Q1 2025",
    bar: [
      { label: "Web", value: 42 },
      { label: "Mobile", value: 28 },
      { label: "API", value: 65 },
      { label: "SDK", value: 35 },
    ],
    donut: [
      { label: "Direct", value: 45 },
      { label: "Organic", value: 30 },
      { label: "Referral", value: 15 },
      { label: "Paid", value: 10 },
    ],
    line: {
      series: [
        { label: "Revenue", data: [20, 28, 35, 32, 45, 42] },
        { label: "Costs", data: [30, 28, 25, 30, 28, 32] },
      ],
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    },
  },
  q2: {
    label: "Q2 2025",
    bar: [
      { label: "Web", value: 58 },
      { label: "Mobile", value: 45 },
      { label: "API", value: 72 },
      { label: "SDK", value: 52 },
    ],
    donut: [
      { label: "Direct", value: 35 },
      { label: "Organic", value: 40 },
      { label: "Referral", value: 10 },
      { label: "Paid", value: 15 },
    ],
    line: {
      series: [
        { label: "Revenue", data: [42, 50, 55, 48, 62, 70] },
        { label: "Costs", data: [32, 30, 35, 28, 33, 30] },
      ],
      labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    },
  },
  q3: {
    label: "Q3 2025",
    bar: [
      { label: "Web", value: 75 },
      { label: "Mobile", value: 62 },
      { label: "API", value: 88 },
      { label: "SDK", value: 70 },
    ],
    donut: [
      { label: "Direct", value: 25 },
      { label: "Organic", value: 45 },
      { label: "Referral", value: 20 },
      { label: "Paid", value: 10 },
    ],
    line: {
      series: [
        { label: "Revenue", data: [70, 78, 82, 75, 90, 95] },
        { label: "Costs", data: [30, 32, 28, 35, 30, 28] },
      ],
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    },
  },
};

type DatasetKey = keyof typeof datasets;

export function Slide16Process() {
  const [active, setActive] = useState<DatasetKey>("q1");
  const data = datasets[active];

  return (
    <SlideContainer mode="dark">
      <TwoColumnLayout
        ratio="1:2"
        gap="lg"
        left={
          <StaggerContainer stagger={0.12} delay={0}>
            <motion.div variants={slideUpVariants}>
              <Eyebrow className="text-[20px]">Analytics</Eyebrow>
            </motion.div>
            <motion.div variants={slideUpVariants}>
              <SectionHeader
                className="mt-2"
                style={{ fontSize: "clamp(2rem, 4vw, 2.5rem)" }}
              >
                Data Dashboard
              </SectionHeader>
            </motion.div>
            <motion.div variants={slideUpVariants}>
              <MonoText
                className="mt-4 block text-[14px]"
                style={{ color: "var(--color-text-muted)" }}
              >
                Select a quarter to see metrics animate between states.
              </MonoText>
            </motion.div>
            <motion.div className="flex gap-3 mt-8" variants={slideUpVariants}>
              {(Object.keys(datasets) as DatasetKey[]).map((key) => (
                <button key={key} onClick={() => setActive(key)}>
                  <Label
                    variant={active === key ? "primary" : "default"}
                    className="cursor-pointer"
                  >
                    {datasets[key].label}
                  </Label>
                </button>
              ))}
            </motion.div>
          </StaggerContainer>
        }
        right={
          <AnimatedEntry variant="fade" delay={0.3}>
            <div className="flex flex-col justify-center gap-10">
              <div className="flex gap-10 items-start">
                <BarChart data={data.bar} width={340} height={220} />
                <DonutChart data={data.donut} size={220} thickness={36} />
              </div>
              <LineChart
                series={data.line.series}
                labels={data.line.labels}
                width={700}
                height={220}
              />
            </div>
          </AnimatedEntry>
        }
      />
    </SlideContainer>
  );
}
