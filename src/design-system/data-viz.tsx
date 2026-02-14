import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

interface BarChartBar {
  label: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  data: BarChartBar[];
  width?: number;
  height?: number;
  barGap?: number;
  showLabels?: boolean;
  showValues?: boolean;
  className?: string;
}

export function BarChart({
  data,
  width = 400,
  height = 280,
  barGap = 8,
  showLabels = true,
  showValues = true,
  className,
}: BarChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const labelHeight = showLabels ? 28 : 0;
  const valueHeight = showValues ? 24 : 0;
  const chartHeight = height - labelHeight - valueHeight;
  const barWidth = (width - barGap * (data.length - 1)) / data.length;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={className}>
      {data.map((bar, i) => {
        const barH = (bar.value / maxValue) * chartHeight;
        const x = i * (barWidth + barGap);
        const y = valueHeight + chartHeight - barH;
        const color = bar.color ?? "var(--color-text-primary)";

        return (
          <g key={i}>
            {showValues && (
              <motion.text
                x={x + barWidth / 2}
                textAnchor="middle"
                initial={false}
                animate={{ y: y - 6 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 16,
                  fill: "var(--color-text-muted)",
                }}
              >
                {bar.value}
              </motion.text>
            )}
            <motion.rect
              x={x}
              width={barWidth}
              rx={0}
              fill={color}
              initial={false}
              animate={{ y, height: barH }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            {showLabels && (
              <text
                x={x + barWidth / 2}
                y={height - 4}
                textAnchor="middle"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  fill: "var(--color-text-muted)",
                }}
              >
                {bar.label}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

interface DonutSegment {
  label: string;
  value: number;
  color?: string;
}

interface DonutChartProps {
  data: DonutSegment[];
  size?: number;
  thickness?: number;
  showLabels?: boolean;
  className?: string;
}

const DONUT_COLORS = [
  "var(--color-text-primary)",
  "var(--color-yellow)",
  "var(--color-text-muted)",
  "var(--color-border-light)",
];

export function DonutChart({
  data,
  size = 280,
  thickness = 40,
  showLabels = true,
  className,
}: DonutChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;
  const center = size / 2;
  const outerR = center - 2;
  const innerR = outerR - thickness;

  let cumulative = 0;
  const segments = data.map((d, i) => {
    const startAngle = (cumulative / total) * 2 * Math.PI - Math.PI / 2;
    cumulative += d.value;
    const endAngle = (cumulative / total) * 2 * Math.PI - Math.PI / 2;
    const color = d.color ?? DONUT_COLORS[i % DONUT_COLORS.length];
    return { ...d, startAngle, endAngle, color };
  });

  return (
    <div className={cn("inline-flex flex-col items-center gap-4", className)}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {segments.map((seg, i) => {
          const largeArc = seg.endAngle - seg.startAngle > Math.PI ? 1 : 0;
          const x1 = center + outerR * Math.cos(seg.startAngle);
          const y1 = center + outerR * Math.sin(seg.startAngle);
          const x2 = center + outerR * Math.cos(seg.endAngle);
          const y2 = center + outerR * Math.sin(seg.endAngle);
          const x3 = center + innerR * Math.cos(seg.endAngle);
          const y3 = center + innerR * Math.sin(seg.endAngle);
          const x4 = center + innerR * Math.cos(seg.startAngle);
          const y4 = center + innerR * Math.sin(seg.startAngle);

          const d = [
            `M ${x1} ${y1}`,
            `A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2} ${y2}`,
            `L ${x3} ${y3}`,
            `A ${innerR} ${innerR} 0 ${largeArc} 0 ${x4} ${y4}`,
            "Z",
          ].join(" ");

          return (
            <motion.path
              key={i}
              fill={seg.color}
              initial={false}
              animate={{ d }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            />
          );
        })}
      </svg>
      {showLabels && (
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-1">
          {segments.map((seg, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className="w-3 h-3"
                style={{ backgroundColor: seg.color }}
              />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  color: "var(--color-text-muted)",
                }}
              >
                {seg.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface LineSeries {
  label: string;
  data: number[];
  color?: string;
}

interface LineChartProps {
  series: LineSeries[];
  labels?: string[];
  width?: number;
  height?: number;
  showDots?: boolean;
  showLabels?: boolean;
  className?: string;
}

const LINE_COLORS = [
  "var(--color-text-primary)",
  "var(--color-yellow)",
  "var(--color-text-muted)",
];

export function LineChart({
  series,
  labels,
  width = 400,
  height = 280,
  showDots = true,
  showLabels = true,
  className,
}: LineChartProps) {
  const allValues = series.flatMap((s) => s.data);
  const min = Math.min(...allValues);
  const max = Math.max(...allValues);
  const range = max - min || 1;

  const labelHeight = showLabels && labels ? 28 : 0;
  const chartHeight = height - labelHeight;
  const padding = 12;
  const chartW = width - padding * 2;
  const chartH = chartHeight - padding * 2;

  const maxPoints = Math.max(...series.map((s) => s.data.length));

  function getPoints(data: number[]): string {
    return data
      .map((v, i) => {
        const x = padding + (i / (maxPoints - 1)) * chartW;
        const y = padding + chartH - ((v - min) / range) * chartH;
        return `${x},${y}`;
      })
      .join(" ");
  }

  return (
    <div className={cn("inline-flex flex-col gap-4", className)}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {[0, 0.25, 0.5, 0.75, 1].map((frac) => {
          const y = padding + chartH * (1 - frac);
          return (
            <line
              key={frac}
              x1={padding}
              y1={y}
              x2={width - padding}
              y2={y}
              stroke="var(--color-border-light)"
              strokeWidth={1}
              opacity={frac === 0 ? 0.6 : 0.2}
            />
          );
        })}

        {series.map((s, si) => {
          const color = s.color ?? LINE_COLORS[si % LINE_COLORS.length];
          const points = getPoints(s.data);
          return (
            <g key={si}>
              <motion.polyline
                fill="none"
                stroke={color}
                strokeWidth={2.5}
                strokeLinejoin="round"
                strokeLinecap="round"
                initial={false}
                animate={{ points }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              />
              {showDots &&
                s.data.map((v, i) => {
                  const x = padding + (i / (maxPoints - 1)) * chartW;
                  const y = padding + chartH - ((v - min) / range) * chartH;
                  return (
                    <motion.circle
                      key={i}
                      r={3.5}
                      fill={color}
                      initial={false}
                      animate={{ cx: x, cy: y }}
                      transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    />
                  );
                })}
            </g>
          );
        })}

        {showLabels &&
          labels?.map((label, i) => {
            const x = padding + (i / (labels.length - 1)) * chartW;
            return (
              <text
                key={i}
                x={x}
                y={height - 4}
                textAnchor="middle"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  fill: "var(--color-text-muted)",
                }}
              >
                {label}
              </text>
            );
          })}
      </svg>

      {series.length > 1 && (
        <div className="flex gap-5">
          {series.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className="w-5 h-[3px]"
                style={{
                  backgroundColor: s.color ?? LINE_COLORS[i % LINE_COLORS.length],
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  color: "var(--color-text-muted)",
                }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function ProgressRing({
  value,
  size = 48,
  strokeWidth = 4,
  color,
  className,
}: {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  className?: string;
}) {
  const clamped = Math.min(100, Math.max(0, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - clamped / 100);

  const resolvedColor =
    color ?? (clamped >= 80 ? "var(--color-text-primary)" : "var(--color-text-muted)");

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-border-light)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={resolvedColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="butt"
          className="transition-all duration-500"
        />
      </svg>
      <span
        className="absolute text-[14px]"
        style={{
          fontFamily: "var(--font-mono)",
          color: "var(--color-text-primary)",
        }}
      >
        {Math.round(clamped)}
      </span>
    </div>
  );
}

export function AnimatedCounter({
  value,
  duration = 1.5,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const spring = useSpring(0, { duration: duration * 1000 });
  const display = useTransform(spring, (v) => Math.round(v));
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  useEffect(() => {
    const unsubscribe = display.on("change", (v) => setCurrent(v));
    return unsubscribe;
  }, [display]);

  return (
    <span className={className}>
      {prefix}
      {current}
      {suffix}
    </span>
  );
}

export function TrendIndicator({
  trend,
  value,
  size = "md",
  className,
}: {
  trend: "up" | "down" | "flat";
  value?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const iconSize = { sm: 12, md: 16, lg: 20 }[size];
  const textSize = { sm: "14px", md: "16px", lg: "18px" }[size];

  const colors = {
    up: "var(--color-text-primary)",
    down: "var(--color-text-muted)",
    flat: "var(--color-text-muted)",
  };

  const arrows = {
    up: `M ${iconSize / 2} 2 L ${iconSize - 2} ${iconSize - 2} L 2 ${iconSize - 2} Z`,
    down: `M ${iconSize / 2} ${iconSize - 2} L ${iconSize - 2} 2 L 2 2 Z`,
    flat: `M 2 ${iconSize / 2 - 2} L ${iconSize - 2} ${iconSize / 2 - 2} L ${iconSize - 2} ${iconSize / 2 + 2} L 2 ${iconSize / 2 + 2} Z`,
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <svg width={iconSize} height={iconSize} viewBox={`0 0 ${iconSize} ${iconSize}`}>
        <path d={arrows[trend]} fill={colors[trend]} />
      </svg>
      {value && (
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: textSize,
            color: colors[trend],
          }}
        >
          {value}
        </span>
      )}
    </div>
  );
}

export function Sparkline({
  data,
  width = 80,
  height = 24,
  color,
  className,
}: {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}) {
  if (data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const padding = 2;

  const points = data.map((v, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - ((v - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  });

  const trendUp = data[data.length - 1] > data[0];
  const resolvedColor =
    color ?? (trendUp ? "var(--color-text-primary)" : "var(--color-text-muted)");

  const lastX = padding + ((data.length - 1) / (data.length - 1)) * (width - padding * 2);
  const lastY =
    height - padding - ((data[data.length - 1] - min) / range) * (height - padding * 2);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
    >
      <polyline
        points={points.join(" ")}
        fill="none"
        stroke={resolvedColor}
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx={lastX} cy={lastY} r={2.5} fill={resolvedColor} />
    </svg>
  );
}

export function HarveyBall({
  rating,
  size = 24,
  className,
}: {
  rating: 0 | 1 | 2 | 3 | 4;
  size?: number;
  className?: string;
}) {
  const center = size / 2;
  const radius = size / 2 - 1;

  const fractions: Record<number, number> = { 0: 0, 1: 0.25, 2: 0.5, 3: 0.75, 4: 1 };
  const fraction = fractions[rating];

  const getArcPath = (f: number): string => {
    if (f === 0 || f === 1) return "";
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + 2 * Math.PI * f;
    const x1 = center + radius * Math.cos(startAngle);
    const y1 = center + radius * Math.sin(startAngle);
    const x2 = center + radius * Math.cos(endAngle);
    const y2 = center + radius * Math.sin(endAngle);
    const large = f > 0.5 ? 1 : 0;
    return `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2} Z`;
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
    >
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="var(--color-bg-secondary)"
      />
      {fraction === 1 ? (
        <circle cx={center} cy={center} r={radius} fill="var(--color-text-primary)" />
      ) : fraction > 0 ? (
        <path d={getArcPath(fraction)} fill="var(--color-text-primary)" />
      ) : null}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="var(--color-text-primary)"
        strokeWidth={1}
      />
    </svg>
  );
}

export function MagnitudeBar({
  value,
  max = 5,
  color,
  className,
}: {
  value: number;
  max?: number;
  color?: string;
  className?: string;
}) {
  const clamped = Math.min(max, Math.max(0, value));
  const resolvedColor = color ?? "var(--color-text-primary)";

  return (
    <div className={cn("flex gap-[3px]", className)}>
      {Array.from({ length: max }, (_, i) => (
        <div
          key={i}
          className="h-[14px] w-[14px]"
          style={{
            backgroundColor: i < clamped ? resolvedColor : "var(--color-bg-secondary)",
          }}
        />
      ))}
    </div>
  );
}
