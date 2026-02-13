import type { HTMLAttributes } from "react";

const PHONE_WIDTH = 433;
const PHONE_HEIGHT = 882;
const SCREEN_X = 21.25;
const SCREEN_Y = 19.25;
const SCREEN_WIDTH = 389.5;
const SCREEN_HEIGHT = 843.5;
const SCREEN_RADIUS = 55.75;

const LEFT_PCT = (SCREEN_X / PHONE_WIDTH) * 100;
const TOP_PCT = (SCREEN_Y / PHONE_HEIGHT) * 100;
const WIDTH_PCT = (SCREEN_WIDTH / PHONE_WIDTH) * 100;
const HEIGHT_PCT = (SCREEN_HEIGHT / PHONE_HEIGHT) * 100;
const RADIUS_H = (SCREEN_RADIUS / SCREEN_WIDTH) * 100;
const RADIUS_V = (SCREEN_RADIUS / SCREEN_HEIGHT) * 100;

export interface IphoneProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  children?: React.ReactNode;
}

export function Iphone({
  src,
  children,
  className,
  style,
  ...props
}: IphoneProps) {
  const hasMedia = !!src || !!children;

  return (
    <div
      className={`relative inline-block w-full align-middle leading-none ${className ?? ""}`}
      style={{
        aspectRatio: `${PHONE_WIDTH}/${PHONE_HEIGHT}`,
        ...style,
      }}
      {...props}
    >
      {src && !children && (
        <div
          className="pointer-events-none absolute z-0 overflow-hidden"
          style={{
            left: `${LEFT_PCT}%`,
            top: `${TOP_PCT}%`,
            width: `${WIDTH_PCT}%`,
            height: `${HEIGHT_PCT}%`,
            borderRadius: `${RADIUS_H}% / ${RADIUS_V}%`,
          }}
        >
          <img
            src={src}
            alt=""
            className="block size-full object-cover object-top"
          />
        </div>
      )}

      {children && (
        <div
          className="absolute z-0 overflow-hidden"
          style={{
            left: `${LEFT_PCT}%`,
            top: `${TOP_PCT}%`,
            width: `${WIDTH_PCT}%`,
            height: `${HEIGHT_PCT}%`,
            borderRadius: `${RADIUS_H}% / ${RADIUS_V}%`,
          }}
        >
          {children}
        </div>
      )}

      <svg
        viewBox={`0 0 ${PHONE_WIDTH} ${PHONE_HEIGHT}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 size-full pointer-events-none"
        style={{ transform: "translateZ(0)" }}
      >
        <defs>
          <linearGradient id="iphFrameGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2d2d2d" />
            <stop offset="15%" stopColor="#1a1a1a" />
            <stop offset="35%" stopColor="#0f0f0f" />
            <stop offset="50%" stopColor="#080808" />
            <stop offset="65%" stopColor="#0f0f0f" />
            <stop offset="85%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#2d2d2d" />
          </linearGradient>

          <linearGradient id="iphMetalBase" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2a2a2e" />
            <stop offset="20%" stopColor="#1a1a1d" />
            <stop offset="50%" stopColor="#0d0d0f" />
            <stop offset="80%" stopColor="#1a1a1d" />
            <stop offset="100%" stopColor="#2a2a2e" />
          </linearGradient>

          <linearGradient id="iphSpecular" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="8%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="20%" stopColor="#ffffff" stopOpacity="0.2" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.08" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="iphSideL" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="20%" stopColor="#ffffff" stopOpacity="0.22" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.12" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.3" />
          </linearGradient>

          <linearGradient id="iphSideR" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="20%" stopColor="#ffffff" stopOpacity="0.22" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.12" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.3" />
          </linearGradient>

          <linearGradient id="iphEdge" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.35" />
          </linearGradient>

          <mask id="iphScreenPunch" maskUnits="userSpaceOnUse">
            <rect x="0" y="0" width={PHONE_WIDTH} height={PHONE_HEIGHT} fill="white" />
            <rect
              x={SCREEN_X}
              y={SCREEN_Y}
              width={SCREEN_WIDTH}
              height={SCREEN_HEIGHT}
              rx={SCREEN_RADIUS}
              ry={SCREEN_RADIUS}
              fill="black"
            />
          </mask>
        </defs>

        <g mask={hasMedia ? "url(#iphScreenPunch)" : undefined}>
          <path
            d="M2 73C2 34.4508 34.4508 2 73 2H359C397.549 2 431 34.4508 431 73V809C431 847.549 397.549 880 359 880H73C34.4508 880 2 847.549 2 809V73Z"
            fill="url(#iphMetalBase)"
          />
          <path
            d="M2 73C2 34.4508 34.4508 2 73 2H359C397.549 2 431 34.4508 431 73V809C431 847.549 397.549 880 359 880H73C34.4508 880 2 847.549 2 809V73Z"
            fill="url(#iphFrameGrad)"
            opacity="0.8"
          />
          <path
            d="M2 73C2 34.4508 34.4508 2 73 2H359C397.549 2 431 34.4508 431 73V280"
            fill="url(#iphSpecular)"
          />
          <path
            d="M2 73C2 34.4508 34.4508 2 73 2H359C397.549 2 431 34.4508 431 73V809C431 847.549 397.549 880 359 880H73C34.4508 880 2 847.549 2 809V73Z"
            fill="none"
            stroke="url(#iphEdge)"
            strokeWidth="0.3"
          />
          <path d="M2 73C2 34.4508 34.4508 2 73 2H200V280H2V73Z" fill="url(#iphSideL)" />
          <path d="M232 2H359C397.549 2 431 34.4508 431 73V280H232V2Z" fill="url(#iphSideR)" />

          {/* Button cutouts */}
          <path d="M0 171C0 170.448 0.447715 170 1 170H3V204H1C0.447715 204 0 203.552 0 203V171Z" fill="url(#iphMetalBase)" />
          <path d="M1 234C1 233.448 1.44772 233 2 233H3.5V300H2C1.44772 300 1 299.552 1 299V234Z" fill="url(#iphMetalBase)" />
          <path d="M1 319C1 318.448 1.44772 318 2 318H3.5V385H2C1.44772 385 1 384.552 1 384V319Z" fill="url(#iphMetalBase)" />
          <path d="M430 279H432C432.552 279 433 279.448 433 280V384C433 384.552 432.552 385 432 385H430V279Z" fill="url(#iphMetalBase)" />

          {/* Inner frame */}
          <path
            d="M7 74C7 36.7787 37.7787 5 75 5H357C394.221 5 425 36.7787 425 74V808C425 845.221 394.221 876 357 876H75C37.7787 876 7 845.221 7 808V74Z"
            fill="url(#iphMetalBase)"
          />
          <path
            d="M7 74C7 36.7787 37.7787 5 75 5H357C394.221 5 425 36.7787 425 74V808C425 845.221 394.221 876 357 876H75C37.7787 876 7 845.221 7 808V74Z"
            fill="url(#iphFrameGrad)"
            opacity="0.7"
          />
        </g>

        <path
          opacity="0.4"
          d="M174 5H258V5.5C258 6.60457 257.105 7.5 256 7.5H176C174.895 7.5 174 6.60457 174 5.5V5Z"
          fill="url(#iphMetalBase)"
        />

        <path
          d={`M${SCREEN_X} 75C${SCREEN_X} 44.2101 46.2101 ${SCREEN_Y} 77 ${SCREEN_Y}H355C385.79 ${SCREEN_Y} 410.75 44.2101 410.75 75V807C410.75 837.79 385.79 862.75 355 862.75H77C46.2101 862.75 ${SCREEN_X} 837.79 ${SCREEN_X} 807V75Z`}
          fill="url(#iphMetalBase)"
          mask={hasMedia ? "url(#iphScreenPunch)" : undefined}
        />
        <path
          d={`M${SCREEN_X} 75C${SCREEN_X} 44.2101 46.2101 ${SCREEN_Y} 77 ${SCREEN_Y}H355C385.79 ${SCREEN_Y} 410.75 44.2101 410.75 75V807C410.75 837.79 385.79 862.75 355 862.75H77C46.2101 862.75 ${SCREEN_X} 837.79 ${SCREEN_X} 807V75Z`}
          fill="url(#iphFrameGrad)"
          opacity="0.6"
          mask={hasMedia ? "url(#iphScreenPunch)" : undefined}
        />
        <path
          d={`M${SCREEN_X} 75C${SCREEN_X} 44.2101 46.2101 ${SCREEN_Y} 77 ${SCREEN_Y}H355C385.79 ${SCREEN_Y} 410.75 44.2101 410.75 75V807C410.75 837.79 385.79 862.75 355 862.75H77C46.2101 862.75 ${SCREEN_X} 837.79 ${SCREEN_X} 807V75Z`}
          fill="none"
          stroke="#000000"
          strokeWidth="0.25"
          strokeOpacity="0.5"
          mask={hasMedia ? "url(#iphScreenPunch)" : undefined}
        />
        <path
          d={`M${SCREEN_X} 75C${SCREEN_X} 44.2101 46.2101 ${SCREEN_Y} 77 ${SCREEN_Y}H355C385.79 ${SCREEN_Y} 410.75 44.2101 410.75 75V250`}
          fill="url(#iphSpecular)"
          mask={hasMedia ? "url(#iphScreenPunch)" : undefined}
        />

        {/* Dynamic Island */}
        <path
          d="M154 48.5C154 38.2827 162.283 30 172.5 30H259.5C269.717 30 278 38.2827 278 48.5C278 58.7173 269.717 67 259.5 67H172.5C162.283 67 154 58.7173 154 48.5Z"
          fill="#000000"
        />
        <path
          d="M249 48.5C249 42.701 253.701 38 259.5 38C265.299 38 270 42.701 270 48.5C270 54.299 265.299 59 259.5 59C253.701 59 249 54.299 249 48.5Z"
          fill="#000000"
        />
        <path
          d="M254 48.5C254 45.4624 256.462 43 259.5 43C262.538 43 265 45.4624 265 48.5C265 51.5376 262.538 54 259.5 54C256.462 54 254 51.5376 254 48.5Z"
          fill="#1a1a1a"
        />
      </svg>
    </div>
  );
}
