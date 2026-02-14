// Section 12 — Data Visualization: BarChart, DonutChart, LineChart, ProgressRing, AnimatedCounter,
// TrendIndicator, Sparkline, HarveyBall, MagnitudeBar

import { SlideContainer, GridSection, Divider } from "../layout";
import { Eyebrow, BodyText, Label } from "../typography";
import {
  BarChart,
  DonutChart,
  LineChart,
  ProgressRing,
  AnimatedCounter,
  TrendIndicator,
  Sparkline,
  HarveyBall,
  MagnitudeBar,
} from "../data-viz";
import { BriefSection, ReplayWrapper } from "./helpers";

export function ShowcaseDataViz() {
  return (
    <SlideContainer mode="white" className="h-auto min-h-[1080px]">
      <BriefSection number={12} title="Data Visualization">
        <BodyText className="mb-6 max-w-[1000px]">
          Lightweight, SVG-based data primitives for metrics, trends, and ratings.
          All components reference CSS variables for color — they adapt automatically
          across white, dark, and yellow modes without props.
        </BodyText>

        <Eyebrow className="mb-6">Progress Ring</Eyebrow>
        <BodyText size="sm" className="mb-4">
          Circular progress indicator. Auto-colors: primary at 80%+, muted below.
        </BodyText>
        <div className="flex items-center gap-8 mb-16">
          <ProgressRing value={25} size={64} strokeWidth={5} />
          <ProgressRing value={50} size={64} strokeWidth={5} />
          <ProgressRing value={75} size={64} strokeWidth={5} />
          <ProgressRing value={92} size={64} strokeWidth={5} />
          <ProgressRing value={100} size={64} strokeWidth={5} />
        </div>

        <Eyebrow className="mb-6">Animated Counter</Eyebrow>
        <BodyText size="sm" className="mb-4">
          Spring-animated number that counts up on mount.
        </BodyText>
        <ReplayWrapper>
          <div
            className="flex items-baseline gap-12 text-[56px]"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-text-primary)" }}
          >
            <AnimatedCounter value={2400} prefix="$" suffix="M" />
            <AnimatedCounter value={99} suffix="%" />
            <AnimatedCounter value={150} suffix="+" />
          </div>
        </ReplayWrapper>

        <Divider thickness="thin" className="my-12" />

        <Eyebrow className="mb-6">Trend Indicator</Eyebrow>
        <BodyText size="sm" className="mb-4">
          Directional arrows with optional value label. Three states: up, down, flat.
        </BodyText>
        <div className="flex items-center gap-10 mb-16">
          <div className="flex items-center gap-3">
            <TrendIndicator trend="up" value="+12%" size="lg" />
            <Label>Revenue</Label>
          </div>
          <div className="flex items-center gap-3">
            <TrendIndicator trend="down" value="-3%" size="lg" />
            <Label>Churn</Label>
          </div>
          <div className="flex items-center gap-3">
            <TrendIndicator trend="flat" value="0%" size="lg" />
            <Label>Burn Rate</Label>
          </div>
        </div>

        <Eyebrow className="mb-6">Sparkline</Eyebrow>
        <BodyText size="sm" className="mb-4">
          Inline trend line. Auto-colors based on trend direction (up = primary, down = muted).
        </BodyText>
        <div className="flex items-center gap-12 mb-16">
          <div className="flex items-center gap-4">
            <Sparkline data={[10, 14, 8, 22, 18, 30, 28, 35]} width={120} height={32} />
            <Label>Growth</Label>
          </div>
          <div className="flex items-center gap-4">
            <Sparkline data={[40, 35, 28, 30, 22, 18, 14, 10]} width={120} height={32} />
            <Label>Decline</Label>
          </div>
          <div className="flex items-center gap-4">
            <Sparkline data={[20, 22, 18, 24, 20, 26, 22, 24]} width={120} height={32} />
            <Label>Stable</Label>
          </div>
        </div>

        <Eyebrow className="mb-6">Harvey Ball & Magnitude Bar</Eyebrow>
        <BodyText size="sm" className="mb-4">
          Discrete rating indicators. Harvey balls show 0-4 quarter fills. Magnitude bars show 0-N segments.
        </BodyText>
        <div className="flex items-start gap-16">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              {([0, 1, 2, 3, 4] as const).map((r) => (
                <HarveyBall key={r} rating={r} size={32} />
              ))}
            </div>
            <Label>Harvey Ball — 0 through 4</Label>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <MagnitudeBar value={1} max={5} />
              <MagnitudeBar value={3} max={5} />
              <MagnitudeBar value={5} max={5} />
            </div>
            <Label>Magnitude Bar — 1, 3, 5 of 5</Label>
          </div>
        </div>

        <Divider thickness="thin" className="my-12" />

        <Eyebrow className="mb-6">Bar Chart</Eyebrow>
        <BodyText size="sm" className="mb-4">
          Vertical bars with spring-animated heights. Pass data array to update.
        </BodyText>
        <div className="flex items-end gap-12 mb-16">
          <BarChart
            data={[
              { label: "Jan", value: 42 },
              { label: "Feb", value: 78 },
              { label: "Mar", value: 55 },
              { label: "Apr", value: 91 },
              { label: "May", value: 64 },
            ]}
            width={320}
            height={200}
          />
          <BarChart
            data={[
              { label: "A", value: 30, color: "var(--color-yellow)" },
              { label: "B", value: 85, color: "var(--color-text-primary)" },
              { label: "C", value: 60, color: "var(--color-text-muted)" },
            ]}
            width={200}
            height={200}
          />
        </div>

        <Eyebrow className="mb-6">Donut Chart</Eyebrow>
        <BodyText size="sm" className="mb-4">
          Ring chart with animated arc transitions. Segments spring to new angles on data change.
        </BodyText>
        <div className="flex items-start gap-12 mb-16">
          <DonutChart
            data={[
              { label: "Direct", value: 45 },
              { label: "Organic", value: 30 },
              { label: "Referral", value: 15 },
              { label: "Paid", value: 10 },
            ]}
            size={200}
          />
          <DonutChart
            data={[
              { label: "Complete", value: 72 },
              { label: "Remaining", value: 28 },
            ]}
            size={200}
            thickness={24}
          />
        </div>

        <Eyebrow className="mb-6">Line Chart</Eyebrow>
        <BodyText size="sm" className="mb-4">
          Multi-series line chart. Lines and dots spring to new positions when data changes.
        </BodyText>
        <LineChart
          series={[
            { label: "Revenue", data: [20, 35, 28, 45, 52, 48, 65] },
            { label: "Costs", data: [30, 28, 32, 25, 30, 35, 28] },
          ]}
          labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]}
          width={500}
          height={240}
        />
      </BriefSection>
    </SlideContainer>
  );
}
