import { useTranslations } from "next-intl";
import { ContactButton } from "@/components/ui/contact-button";
import { AnimatedImage } from "./animated-image";
import { cn } from "@/lib/utils";

interface ServiceRowProps {
  serviceKey: string;
  isDark: boolean;
  variant?: "main" | "complementary";
}

export function ServiceRow({ serviceKey, isDark, variant = "main" }: ServiceRowProps) {
  const t = useTranslations("services");
  const title = t(`list.${serviceKey}.title`);
  const heading = t(`list.${serviceKey}.heading`);
  const hasDescription = t.has(`list.${serviceKey}.description` as never);
  const description = hasDescription ? t(`list.${serviceKey}.description` as never) : null;
  const hasBullets = t.has(`list.${serviceKey}.bullets` as never);
  const bullets = hasBullets ? (t.raw(`list.${serviceKey}.bullets` as never) as string[]) : [];

  const textPrimary = isDark ? "text-white" : "text-black";
  const textDescription = isDark ? "text-white/60" : "text-black/60";
  const borderColor = isDark ? "border-white/20" : "border-black/20";
  const imagePlaceholder = isDark ? "bg-white/10" : "bg-[#e0e0e0]";

  if (variant === "complementary") {
    return (
      <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 border-t pt-5 pb-6", borderColor)}>
        {/* Column 1: title + bullets + CTA */}
        <div className="flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-5">
            <h3 className={cn("text-sm font-semibold uppercase tracking-wide whitespace-pre-line", textPrimary)}>
              {title}
            </h3>
            {bullets.length > 0 && (
              <ul className="flex flex-col gap-2.5">
                {bullets.map((bullet) => (
                  <li key={bullet} className={cn("flex items-center gap-2.5 text-sm font-medium", textPrimary)}>
                    <span className={cn("size-1.5 shrink-0 rounded-full", "bg-black/40")} />
                    {bullet}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <ContactButton
            href="/contact-us"
            text={t("getInTouch")}
            bgColor="transparent"
            textColor="#000000"
            className={cn("w-fit border-[1.5px]", borderColor)}
          />
        </div>

        {/* Column 2: image */}
        <AnimatedImage className={cn("h-[240px] md:h-full min-h-[280px]", imagePlaceholder)} />

        {/* Column 3: heading + description */}
        <div className="flex flex-col gap-4">
          <p className={cn("text-xl sm:text-2xl font-semibold tracking-tight", textPrimary)}>
            {heading}
          </p>
          {description && (
            <p className={cn("text-sm leading-relaxed", textDescription)}>
              {description}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col lg:flex-row gap-6 lg:gap-8 border-t pt-5 pb-6", borderColor)}>
      <div
        className={cn(
          "flex flex-col justify-between gap-8 lg:w-[32%] lg:max-w-[611px] lg:border-r pt-0 lg:pt-1 lg:pr-8",
          borderColor
        )}
      >
        <div className="flex flex-col gap-6">
          <h3 className={cn("text-sm font-semibold uppercase tracking-wide whitespace-pre-line", textPrimary)}>
            {title}
          </h3>
          {bullets.length > 0 && (
            <ul className="flex flex-col gap-2.5">
              {bullets.map((bullet) => (
                <li key={bullet} className={cn("flex items-center gap-2.5 text-sm font-medium", textPrimary)}>
                  <span className={cn("size-1.5 shrink-0 rounded-full", isDark ? "bg-white/60" : "bg-black/40")} />
                  {bullet}
                </li>
              ))}
            </ul>
          )}
        </div>

        <ContactButton
          href="/contact-us"
          text={t("getInTouch")}
          bgColor="transparent"
          textColor={isDark ? "#ffffff" : "#000000"}
          className={cn("w-fit border-[1.5px]", borderColor)}
        />
      </div>

      <div className="flex flex-1 flex-col gap-6 lg:gap-9 pt-0 lg:pt-1">
        <div className="flex flex-col gap-4 sm:gap-5">
          <p className={cn("text-xl sm:text-2xl lg:text-[32px] font-semibold tracking-tight", textPrimary)}>
            {heading}
          </p>
          {description && (
            <p className={cn("text-sm sm:text-base leading-relaxed max-w-[1069px]", textDescription)}>
              {description}
            </p>
          )}
        </div>
        <AnimatedImage className={cn("h-[240px] sm:h-[400px] lg:h-[560px]", imagePlaceholder)} />
      </div>
    </div>
  );
}
