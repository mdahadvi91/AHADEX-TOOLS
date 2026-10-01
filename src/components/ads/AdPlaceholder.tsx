import { cn } from "@lib/cn";

interface AdPlaceholderProps {
  slot: string;
  height?: "small" | "medium" | "large" | "banner";
  className?: string;
}

const heightMap = {
  small: "min-h-[90px]",
  medium: "min-h-[200px]",
  large: "min-h-[280px]",
  banner: "min-h-[100px]",
};

export function AdPlaceholder({
  slot,
  height = "medium",
  className,
}: AdPlaceholderProps) {
  if (!import.meta.env.DEV) return null;

  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={cn(
        "flex items-center justify-center rounded-2xl",
        "border border-dashed border-silk-rose/20 bg-silk-rose/5",
        "text-[10px] uppercase tracking-widest text-silk-wine/40 dark:text-silk-rose/30 font-medium",
        heightMap[height],
        className
      )}
    >
      <div className="text-center px-4">
        <p className="mb-1 font-mono text-[10px] text-silk-rose/50">
          [ AD SLOT ]
        </p>
        <p>{slot}</p>
      </div>
    </div>
  );
}
