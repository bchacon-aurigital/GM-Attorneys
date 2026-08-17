import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
}

export function Section({
  as: Tag = "section",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Tag
      className={cn("w-full py-16 md:py-20", className)}
      {...props}
    >
      <div className="w-full px-4 sm:px-6 lg:px-10">
        {children}
      </div>
    </Tag>
  );
}
