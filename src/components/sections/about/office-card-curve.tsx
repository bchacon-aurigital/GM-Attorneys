// Local curve shape for the office cards, traced from the Figma "Subtract" path
// (232:3764, 1856x149 viewBox), mirrored horizontally to match the real layout:
// the flat white band rises all the way to the top edge on the LEFT (~0% to
// ~25% of the width, where the office name sits), then curves down to a lower
// band (~46% of the block height) that runs flat for the rest of the width to
// the right — that lower/right area is what stays transparent over the photo.
//
// The bezier run itself sits between the flat vertical edge (x=0) and the
// flat top edge; only that middle stretch shifts with an offset, translating
// the whole curve right without distorting it. On narrow screens the office
// name needs more room than the ~25%-wide band, so mobile uses a wider band
// (offset applied) while desktop keeps the original Figma geometry (offset 0).
const CURVE_RUN_START = 0;
const CURVE_RUN_END = 31.919;

const CURVE_POINTS: [number, number][] = [
  [0, 100],
  [0, 2.685],
  [0.008, 1.971],
  [0.029, 1.33],
  [0.063, 0.786],
  [0.107, 0.367],
  [0.158, 0.096],
  [0.216, 0],
  [25.267, 0],
  [25.734, 0.371],
  [26.189, 1.463],
  [26.625, 3.243],
  [27.039, 5.677],
  [27.425, 8.732],
  [27.779, 12.376],
  [28.096, 16.576],
  [28.371, 21.298],
  [28.685, 26.694],
  [29.047, 31.494],
  [29.452, 35.658],
  [29.894, 39.15],
  [30.367, 41.932],
  [30.865, 43.965],
  [31.385, 45.213],
  [31.919, 45.638],
  [99.784, 45.638],
  [99.842, 45.733],
  [99.893, 46.004],
  [99.937, 46.424],
  [99.971, 46.967],
  [99.992, 47.608],
  [100, 48.322],
  [100, 100],
];

function buildClipPath(offset: number) {
  const points = CURVE_POINTS.map(([x, y]) => {
    const shiftedX = x > CURVE_RUN_START && x <= CURVE_RUN_END ? Math.min(100, x + offset) : x;
    return `${shiftedX}% ${y}%`;
  });
  return `polygon(${points.join(", ")})`;
}

const MOBILE_CLIP_PATH = buildClipPath(20);
const DESKTOP_CLIP_PATH = buildClipPath(0);

interface OfficeCardCurveProps {
  className?: string;
  children?: React.ReactNode;
}

export function OfficeCardCurve({ className, children }: OfficeCardCurveProps) {
  return (
    <>
      <div
        className={`sm:hidden ${className ?? ""}`}
        style={{
          backgroundColor: "#ffffff",
          clipPath: MOBILE_CLIP_PATH,
          WebkitClipPath: MOBILE_CLIP_PATH,
        }}
      >
        {children}
      </div>
      <div
        className={`hidden sm:flex ${className ?? ""}`}
        style={{
          backgroundColor: "#ffffff",
          clipPath: DESKTOP_CLIP_PATH,
          WebkitClipPath: DESKTOP_CLIP_PATH,
        }}
      >
        {children}
      </div>
    </>
  );
}
