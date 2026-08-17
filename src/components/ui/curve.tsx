import { cn } from "@/lib/utils";

interface CurveProps {
  curveColor?: string;
  cornerColor?: string;
  corner?: "left" | "right";
  className?: string;
  children?: React.ReactNode;
  contentClassName?: string;
}

// Polygon approximation (in %) of the original Figma "Subtract" curve, traced
// bottom-right -> bottom-left -> up the straight edge -> along the Bezier curve
// (sampled into points) -> across the straight top edge -> back to start.
// Percentages (not px/viewBox units) so clip-path scales correctly with the
// container at any size/DPR, with no separate SVG or transform layer to misalign.
const CURVE_POINTS_LEFT: [number, number][] = [
  [100, 100],
  [0, 100],
  [0, 58.85],
  [12.95, 58.85],
  [13.74, 58.496],
  [14.514, 57.453],
  [15.264, 55.746],
  [15.987, 53.403],
  [16.675, 50.45],
  [17.324, 46.914],
  [17.929, 42.82],
  [18.484, 38.196],
  [18.982, 33.068],
  [19.42, 27.463],
  [19.803, 22.558],
  [20.24, 18.072],
  [20.725, 14.026],
  [21.254, 10.444],
  [21.822, 7.349],
  [22.425, 4.765],
  [23.057, 2.715],
  [23.713, 1.222],
  [24.39, 0.309],
  [25.082, 0],
  [100, 0],
];

function toPolygon(points: [number, number][], mirror: boolean) {
  return points
    .map(([x, y]) => `${mirror ? 100 - x : x}% ${y}%`)
    .join(", ");
}

export function Curve({
  curveColor = "#240824",
  cornerColor = "#ffffff",
  corner = "left",
  className,
  children,
  contentClassName,
}: CurveProps) {
  const mirror = corner === "right";
  const clipPath = `polygon(${toPolygon(CURVE_POINTS_LEFT, mirror)})`;

  return (
    <div
      className={cn("relative w-full", className)}
      style={{ backgroundColor: cornerColor }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: curveColor,
          clipPath,
          WebkitClipPath: clipPath,
        }}
      />

      {children && (
        <div
          className={cn(
            "absolute inset-y-0 flex items-center px-4 sm:px-6 lg:px-10 pb-2 sm:pb-4",
            corner === "right" ? "justify-start" : "justify-end",
            contentClassName
          )}
          style={{
            width: "74.92%",
            ...(corner === "right" ? { left: 0 } : { right: 0 }),
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
