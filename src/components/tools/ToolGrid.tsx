import React from 'react';
import type { Tool } from '@/src/types/tool';
import ToolCard from './ToolCard';

export interface ToolGridProps {
  tools: Tool[];
  className?: string;
  emptyMessage?: string;
}

/**
 * Reusable ToolGrid component.
 * Displays tools in a responsive CSS grid adhering to mathematical spacing and responsive breakpoints.
 */
export default function ToolGrid({
  tools,
  className = '',
  emptyMessage = 'No tools currently available.',
}: ToolGridProps) {
  if (!tools || tools.length === 0) {
    return (
      <div className="w-full py-12 text-center rounded-2xl glass-panel border border-slate-200/80 dark:border-slate-800/80 p-6">
        <p className="text-sm text-slate-500 dark:text-slate-400">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full ${className}`}
    >
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
}
