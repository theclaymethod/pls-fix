import { cn } from "@/lib/utils";

export function CornerBrackets({
  children,
  className,
  size = "md",
  color = "rgba(0,0,0,0.2)",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: string;
}) {
  const sizeClasses = {
    sm: { bracket: "w-2 h-2", offset: "-top-1 -left-1 -right-1 -bottom-1" },
    md: { bracket: "w-3 h-3", offset: "-top-2 -left-2 -right-2 -bottom-2" },
    lg: { bracket: "w-4 h-4", offset: "-top-3 -left-3 -right-3 -bottom-3" },
  };

  const { bracket, offset } = sizeClasses[size];
  const [topOffset, leftOffset, rightOffset, bottomOffset] = offset.split(" ");

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "absolute border-t border-l",
          bracket,
          topOffset,
          leftOffset
        )}
        style={{ borderColor: color }}
      />
      <div
        className={cn(
          "absolute border-t border-r",
          bracket,
          topOffset,
          rightOffset
        )}
        style={{ borderColor: color }}
      />
      <div
        className={cn(
          "absolute border-b border-l",
          bracket,
          bottomOffset,
          leftOffset
        )}
        style={{ borderColor: color }}
      />
      <div
        className={cn(
          "absolute border-b border-r",
          bracket,
          bottomOffset,
          rightOffset
        )}
        style={{ borderColor: color }}
      />
      {children}
    </div>
  );
}

export function Divider({
  className,
  showMarkers = false,
}: {
  className?: string;
  showMarkers?: boolean;
}) {
  if (showMarkers) {
    return (
      <div className={cn("relative flex items-center", className)}>
        <span
          className="text-[10px] shrink-0"
          style={{
            fontFamily: "var(--font-body)",
            color: "rgba(0,0,0,0.2)",
          }}
        >
          +
        </span>
        <div
          className="flex-1 h-px mx-2"
          style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
        />
        <span
          className="text-[10px] shrink-0"
          style={{
            fontFamily: "var(--font-body)",
            color: "rgba(0,0,0,0.2)",
          }}
        >
          +
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn("h-px", className)}
      style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
    />
  );
}

export function SlideContainer({
  children,
  className,
  variant = "light",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "light" | "dark" | "cream" | "primary";
}) {
  const variantStyles = {
    light: {
      backgroundColor: "var(--color-bg-light)",
      color: "var(--color-text-primary)",
    },
    dark: {
      backgroundColor: "var(--color-bg-dark)",
      color: "var(--color-text-inverse)",
    },
    cream: {
      backgroundColor: "var(--color-bg-cream)",
      color: "var(--color-text-primary)",
    },
    primary: {
      backgroundColor: "var(--color-primary)",
      color: "var(--color-text-inverse)",
    },
  };

  return (
    <div
      className={cn("w-full h-full p-[64px] overflow-hidden", className)}
      style={variantStyles[variant]}
    >
      {children}
    </div>
  );
}

export function TwoColumnLayout({
  left,
  right,
  className,
  ratio = "1:1",
}: {
  left: React.ReactNode;
  right: React.ReactNode;
  className?: string;
  ratio?: "1:1" | "2:1" | "1:2" | "3:2" | "2:3";
}) {
  const ratioClasses = {
    "1:1": "",
    "2:1": "grid-cols-[2fr_1fr]",
    "1:2": "grid-cols-[1fr_2fr]",
    "3:2": "grid-cols-[3fr_2fr]",
    "2:3": "grid-cols-[2fr_3fr]",
  };

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-[48px] h-full",
        ratioClasses[ratio],
        className
      )}
    >
      <div className="flex flex-col justify-center">{left}</div>
      <div className="flex flex-col justify-center">{right}</div>
    </div>
  );
}

export function GridSection({
  children,
  columns = 2,
  className,
}: {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
}) {
  const colClasses = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  };

  return (
    <div className={cn("grid gap-[24px]", colClasses[columns], className)}>
      {children}
    </div>
  );
}

export function CenterContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center h-full text-center",
        className
      )}
    >
      {children}
    </div>
  );
}
