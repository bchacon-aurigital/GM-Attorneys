import { useTranslations } from "next-intl";
import { ContactButton } from "@/components/ui/contact-button";
import { cn } from "@/lib/utils";

interface ServiceRowProps {
  serviceKey: string;
  isDark: boolean;
}

export function ServiceRow({ serviceKey, isDark }: ServiceRowProps) {
  const t = useTranslations("services");
  const bullets = t.raw("bullets") as string[];
  const title = t(`list.${serviceKey}.title`);
  const heading = t(`list.${serviceKey}.heading`);

  const textPrimary = isDark ? "text-white" : "text-black";
  const textMuted = isDark ? "text-white/70" : "text-black/70";
  const textDescription = isDark ? "text-white/60" : "text-black/60";
  const borderColor = isDark ? "border-white/20" : "border-black/20";
  const imagePlaceholder = isDark ? "bg-[#e0e0e0]/[0.12]" : "bg-[#e0e0e0]";

  return (
    <div className={cn("flex flex-col lg:flex-row gap-6 lg:gap-8 border-t pt-5 pb-6", borderColor)}>
      <div
        className={cn(
          "flex flex-col justify-between gap-8 lg:w-[32%] lg:max-w-[611px] lg:border-r pt-0 lg:pt-1 lg:pr-8",
          borderColor
        )}
      >
        <div className="flex flex-col gap-8">
          <p className={cn("text-sm font-semibold uppercase tracking-wide whitespace-pre-line", textPrimary)}>
            {title}
          </p>
          <ul className="flex flex-col gap-3">
            {bullets.map((bullet) => (
              <li key={bullet} className={cn("list-disc ms-6 text-sm sm:text-base font-medium", textMuted)}>
                {bullet}
              </li>
            ))}
          </ul>
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
          <p className={cn("text-sm sm:text-base leading-relaxed max-w-[1069px]", textDescription)}>
            {t("description")}
          </p>
        </div>
        <div
          data-aos="zoom-in"
          className={cn("h-[240px] sm:h-[400px] lg:h-[719px] w-full rounded", imagePlaceholder)}
        />
      </div>
    </div>
  );
}
