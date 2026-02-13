import {
  CenterContent,
  Eyebrow,
  BodyText,
  AnimatedEntry,
} from "@/design-system";
import { Map, MapMarker } from "@/design-system/map";
import { cn } from "@/lib/utils";

const SF_CENTER: [number, number] = [-122.405, 37.785];

const MAP_MARKERS = [
  { score: 94, color: "#10b981", lng: -122.418, lat: 37.792 },
  { score: 68, color: "#f59e0b", lng: -122.395, lat: 37.795 },
  { score: 45, color: "#ef4444", lng: -122.390, lat: 37.782 },
  { score: 88, color: "#10b981", lng: -122.425, lat: 37.775 },
  { score: 71, color: "#f59e0b", lng: -122.408, lat: 37.798 },
  { score: 52, color: "#ef4444", lng: -122.430, lat: 37.780 },
  { score: 91, color: "#10b981", lng: -122.398, lat: 37.773 },
  { score: 77, color: "#f59e0b", lng: -122.412, lat: 37.800 },
  { score: 83, color: "#10b981", lng: -122.385, lat: 37.790 },
  { score: 59, color: "#f59e0b", lng: -122.420, lat: 37.788 },
  { score: 86, color: "#10b981", lng: -122.402, lat: 37.770 },
  { score: 73, color: "#f59e0b", lng: -122.392, lat: 37.800 },
  { score: 48, color: "#ef4444", lng: -122.435, lat: 37.770 },
  { score: 79, color: "#f59e0b", lng: -122.382, lat: 37.785 },
  { score: 92, color: "#10b981", lng: -122.440, lat: 37.772 },
  { score: 61, color: "#f59e0b", lng: -122.410, lat: 37.768 },
];

export function Slide09Closing() {
  return (
    <div
      className={cn("w-full h-full overflow-hidden relative")}
      data-slide-mode="dark"
      style={{ backgroundColor: "#141925", color: "#ffffff" }}
    >
      {/* Full-bleed map background */}
      <div className="absolute inset-0">
        <Map center={SF_CENTER} zoom={14}>
          {MAP_MARKERS.map((m, i) => (
            <MapMarker key={i} longitude={m.lng} latitude={m.lat}>
              <div
                className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-white shadow-lg ring-2 ring-white/30"
                style={{ backgroundColor: m.color }}
              >
                {m.score}
              </div>
            </MapMarker>
          ))}

          {/* Current location */}
          <MapMarker longitude={SF_CENTER[0]} latitude={SF_CENTER[1]}>
            <div className="relative">
              <div className="absolute -inset-3 animate-ping rounded-full bg-blue-500/20" />
              <div className="absolute -inset-1.5 rounded-full bg-blue-500/30" />
              <div className="h-4 w-4 rounded-full border-2 border-white bg-blue-500 shadow-lg" />
            </div>
          </MapMarker>
        </Map>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 w-full h-full p-[64px]">
        <CenterContent>
          <AnimatedEntry variant="slideUp" delay={0}>
            <Eyebrow className="mb-8" style={{ color: "#10b981" }}>
              Growth
            </Eyebrow>
          </AnimatedEntry>

          <AnimatedEntry variant="slideUp" delay={0.15}>
            <div
              className="leading-none"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(12rem, 30vw, 20rem)",
                color: "#ffffff",
              }}
            >
              <span style={{ color: "rgba(255,255,255,0.3)" }}>[</span>
              200%
              <span style={{ color: "rgba(255,255,255,0.3)" }}>]</span>
            </div>
          </AnimatedEntry>

          <AnimatedEntry variant="slideUp" delay={0.3}>
            <span
              className="text-[24px] uppercase tracking-[0.2em] mt-8 block"
              style={{
                fontFamily: "var(--font-body)",
                color: "rgba(255,255,255,0.8)",
              }}
            >
              Year over Year
            </span>
          </AnimatedEntry>

          <AnimatedEntry variant="slideUp" delay={0.45}>
            <BodyText
              size="sm"
              className="mt-6 max-w-lg text-center"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Our platform has delivered consistent growth for partners across all
              key metrics
            </BodyText>
          </AnimatedEntry>
        </CenterContent>
      </div>
    </div>
  );
}
