import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@lib/cn";

interface WorkspacePanelProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
  delay?: number;
  /** Visual variant */
  variant?: "glass" | "soft" | "outlined";
}

export function WorkspacePanel({
  children,
  className,
  animate = true,
  delay = 0,
  variant = "glass",
}: WorkspacePanelProps) {
  const baseClass = cn(
    "relative rounded-2xl sm:rounded-3xl overflow-hidden",
    variant === "glass" &&
      "bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20",
    variant === "soft" &&
      "bg-silk-rose/5 border border-silk-rose/15",
    variant === "outlined" &&
      "bg-transparent border border-dashed border-silk-rose/30",
    className
  );

  if (!animate) {
    return <div className={baseClass}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={baseClass}
    >
      {children}
    </motion.div>
  );
}
