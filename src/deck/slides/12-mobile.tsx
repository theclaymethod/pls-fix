import { motion } from "motion/react";
import {
  SlideContainer,
  Eyebrow,
  SectionHeader,
  MonoText,
  AnimatedEntry,
  Iphone,
} from "@/design-system";

const RESTAURANTS = [
  { name: "Farm & Table", score: 94, color: "#10b981", x: "52%", y: "35%" },
  { name: "Tokyo Ramen", score: 68, color: "#f59e0b", x: "38%", y: "55%" },
  { name: "Burger Joint", score: 45, color: "#ef4444", x: "65%", y: "62%" },
];

function MapScreen() {
  return (
    <div className="h-full w-full bg-[#1a1f2e] flex flex-col relative overflow-hidden font-sans">
      {/* Status bar */}
      <div className="flex items-center justify-between px-6 pt-4 pb-2 text-[11px] relative z-20">
        <span className="font-semibold text-white">9:41</span>
        <div className="flex items-center gap-1">
          <div className="flex items-end gap-[2px] h-2.5">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-[2.5px] rounded-sm bg-white"
                style={{ height: 3 + i * 1.5 }}
              />
            ))}
          </div>
          <span className="ml-0.5 text-[10px] font-medium text-white">5G</span>
          <div className="ml-1 w-5 h-2.5 border border-white/50 rounded-[2px] relative">
            <div
              className="absolute inset-[1px] bg-white rounded-[1px]"
              style={{ width: "68%" }}
            />
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div className="px-4 pb-3 relative z-20">
        <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-2.5 flex items-center gap-2 border border-white/5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-white/50">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M16 16L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="text-white/50 text-[13px]">Search restaurants nearby</span>
        </div>
      </div>

      {/* Map area */}
      <div className="flex-1 relative overflow-hidden">
        {/* Dark map background with grid */}
        <div className="absolute inset-0 bg-[#141925]">
          {/* Street grid */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* Horizontal streets */}
            <line x1="0" y1="20%" x2="100%" y2="20%" stroke="#1e2436" strokeWidth="3" />
            <line x1="0" y1="40%" x2="100%" y2="40%" stroke="#1e2436" strokeWidth="5" />
            <line x1="0" y1="60%" x2="100%" y2="60%" stroke="#1e2436" strokeWidth="3" />
            <line x1="0" y1="80%" x2="100%" y2="80%" stroke="#1e2436" strokeWidth="4" />
            {/* Vertical streets */}
            <line x1="25%" y1="0" x2="25%" y2="100%" stroke="#1e2436" strokeWidth="3" />
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#1e2436" strokeWidth="5" />
            <line x1="75%" y1="0" x2="75%" y2="100%" stroke="#1e2436" strokeWidth="3" />
            {/* Diagonal road */}
            <line x1="10%" y1="0" x2="90%" y2="100%" stroke="#1e2436" strokeWidth="4" />
            {/* Building blocks */}
            <rect x="5%" y="22%" width="18%" height="16%" rx="2" fill="#181d2b" />
            <rect x="28%" y="22%" width="20%" height="16%" rx="2" fill="#181d2b" />
            <rect x="53%" y="22%" width="20%" height="16%" rx="2" fill="#181d2b" />
            <rect x="5%" y="42%" width="18%" height="16%" rx="2" fill="#181d2b" />
            <rect x="53%" y="42%" width="20%" height="16%" rx="2" fill="#181d2b" />
            <rect x="28%" y="62%" width="20%" height="16%" rx="2" fill="#181d2b" />
            <rect x="53%" y="62%" width="20%" height="16%" rx="2" fill="#181d2b" />
            <rect x="78%" y="42%" width="18%" height="16%" rx="2" fill="#181d2b" />
          </svg>
        </div>

        {/* Restaurant markers */}
        {RESTAURANTS.map((r, i) => (
          <div
            key={r.name}
            className="absolute z-10 flex flex-col items-center"
            style={{ left: r.x, top: r.y, transform: "translate(-50%, -50%)" }}
          >
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold text-white shadow-lg ring-2 ring-white/40"
              style={{ backgroundColor: r.color }}
            >
              {i + 1}
            </div>
            <div className="mt-1 bg-black/70 backdrop-blur-sm rounded px-1.5 py-0.5">
              <span className="text-[9px] text-white/90 font-medium whitespace-nowrap">
                {r.name}
              </span>
            </div>
          </div>
        ))}

        {/* Current location */}
        <div
          className="absolute z-10"
          style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
        >
          <div className="relative">
            <div className="absolute -inset-3 animate-ping rounded-full bg-blue-500/20" />
            <div className="absolute -inset-1.5 rounded-full bg-blue-500/30" />
            <div className="h-4 w-4 rounded-full border-2 border-white bg-blue-500 shadow-lg" />
          </div>
        </div>
      </div>

      {/* Bottom card */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-3 pb-6">
        <div className="bg-[#1c2030]/95 backdrop-blur-xl rounded-2xl p-4 border border-white/10 shadow-2xl">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white shadow-lg">
              94
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold text-[14px]">Farm & Table</span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded-full border border-emerald-400/20">
                  #1 Choice
                </span>
              </div>
              <span className="text-white/50 text-[11px]">Farm-to-table American · 0.8 mi</span>
              <div className="flex gap-2 mt-2">
                <div className="bg-white/5 rounded-lg px-2 py-1">
                  <span className="text-emerald-400 text-[10px] font-medium">Heritage Chicken 96</span>
                </div>
                <div className="bg-white/5 rounded-lg px-2 py-1">
                  <span className="text-emerald-400 text-[10px] font-medium">Wild Salmon 91</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Slide12Mobile() {
  return (
    <SlideContainer mode="dark">
      <div className="h-full flex items-center justify-center gap-16">
        {/* Left: Text */}
        <div className="flex flex-col justify-center max-w-md">
          <AnimatedEntry variant="slideUp" delay={0}>
            <Eyebrow className="mb-3" style={{ color: "var(--color-primary)" }}>
              Mobile Experience
            </Eyebrow>
          </AnimatedEntry>

          <AnimatedEntry variant="slideUp" delay={0.1}>
            <SectionHeader className="mb-6" style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)" }}>
              AI-Powered Discovery
            </SectionHeader>
          </AnimatedEntry>

          <AnimatedEntry variant="slideUp" delay={0.2}>
            <MonoText
              className="block text-[18px] leading-relaxed"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Personalized restaurant recommendations with dish-level scoring,
              map-based discovery, and real-time nutritional guidance.
            </MonoText>
          </AnimatedEntry>
        </div>

        {/* Right: Phone */}
        <motion.div
          className="shrink-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <div className="w-[340px]">
            <Iphone>
              <MapScreen />
            </Iphone>
          </div>
        </motion.div>
      </div>
    </SlideContainer>
  );
}
