import React, { Suspense } from 'react';
import { ToolPage as ToolWorkspacePage } from '@/src/components/tool-workspace';

/**
 * ToolPage route view.
 * Delegates directly to the shared Tool Workspace page component,
 * resolving tool metadata dynamically from src/data/tools.ts.
 */
export default function ToolPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-[400px] flex items-center justify-center p-12 text-sm text-slate-500 dark:text-slate-400 animate-pulse">
          Loading tool workspace...
        </div>
      }
    >
      <ToolWorkspacePage />
    </Suspense>
  );
}
