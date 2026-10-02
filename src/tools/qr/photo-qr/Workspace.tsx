import type { ReactNode } from "react";
import { cn } from "@lib/cn";

interface WorkspaceProps {
  settingsPanel: ReactNode;
  previewPanel: ReactNode;
  className?: string;
}

export function Workspace({
  settingsPanel,
  previewPanel,
  className,
}: WorkspaceProps) {
  return (
    <section
      className={cn(
        "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-[280px_1fr] lg:grid-cols-[360px_1fr] gap-2.5 sm:gap-4 lg:gap-6 pb-12 items-stretch",
        className
      )}
    >
      {/* LEFT — Settings */}
      {settingsPanel}

      {/* RIGHT — Preview */}
      {previewPanel}
    </section>
  );
}
