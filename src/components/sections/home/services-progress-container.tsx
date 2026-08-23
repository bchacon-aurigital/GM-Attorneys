import { servicesSlides } from "@/data/services-slider";
import { cn } from "@/lib/utils";

interface ServicesProgressContainerProps {
  className?: string;
}

// Purple band position within the Svg-container.svg canvas (777x654),
// traced from its own geometry: the solid purple rect starts at y=141
// and is 372px tall, with 24px horizontal padding on a 777px-wide canvas.
const BAND_TOP = 21.56;
const BAND_HEIGHT = 56.881;
const BAND_PADDING_X = 3.089;

export function ServicesProgressContainer({ className }: ServicesProgressContainerProps) {
  return (
    <div className={cn("relative w-full aspect-[777/654]", className)}>
      <img
        src="/assets/home/Svg-container.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      <div
        className="absolute flex items-center gap-3"
        style={{
          top: `${BAND_TOP + BAND_HEIGHT - 12}%`,
          left: `${BAND_PADDING_X}%`,
          right: `${BAND_PADDING_X}%`,
        }}
      >
        {servicesSlides.map((slide, index) => (
          <div key={slide.key} className="relative h-8 sm:h-10 lg:h-[46px] flex-1 border-t-[1.5px] border-white/20">
            <div data-segment-fill={index} className="absolute top-0 left-0 h-[1.5px] w-0 bg-white" />
          </div>
        ))}
      </div>
    </div>
  );
}
