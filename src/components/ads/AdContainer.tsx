import { type ReactNode } from "react";
import { cn } from "@lib/cn";

interface AdContainerProps {
  children: ReactNode;
  label?: string;
  spacing?: "sm" | "md" | "lg";
  className?: string;
}

const spacingMap = {
  sm: "my-4",
  md: "my-8",
  lg: "my-12",
};

export function AdContainer({
  children,
  label = "Advertisement",
  spacing = "md",
  className,
}: AdContainerProps) {
  if (!children) return null;

  return (
    <aside
      aria-label={label}
      className={cn("w-full flex flex-col items-center", spacingMap[spacing], className)}
    >
      <span
        aria-hidden="true"
        className="text-[10px] uppercase tracking-widest text-silk-wine/40 dark:text-silk-rose/30 font-medium mb-2"
      >
        {label}
      </span>
      <div className="w-full max-w-3xl">{children}</div>
    </aside>
  );
}
