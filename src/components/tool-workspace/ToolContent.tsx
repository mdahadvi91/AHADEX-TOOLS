import React from 'react';

export interface ToolContentProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  sidebar?: React.ReactNode;
}

/**
 * Reusable Content Wrapper for AHADEX TOOLS Workspaces.
 * Provides optical liquid-glass surface, mathematical padding, and responsive layout
 * for both simple single-column tools and tools with settings sidebars.
 */
export default function ToolContent({
  children,
  className = '',
  id = 'tool-workspace-content',
  sidebar,
}: ToolContentProps) {
  return (
    <section
      id={id}
      aria-label="Tool processing workspace"
      className={`w-full rounded-3xl glass-panel p-4 sm:p-6 lg:p-8 border border-slate-200/90 dark:border-slate-800/90 shadow-xl shadow-slate-200/40 dark:shadow-slate-950/40 ${className}`}
    >
      {sidebar ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main workspace area */}
          <div className="lg:col-span-8 flex flex-col space-y-6">{children}</div>

          {/* Configuration sidebar */}
          <div className="lg:col-span-4 flex flex-col space-y-4 p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80">
            {sidebar}
          </div>
        </div>
      ) : (
        <div className="flex flex-col space-y-6">{children}</div>
      )}
    </section>
  );
}
