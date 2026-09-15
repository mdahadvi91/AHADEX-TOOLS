import React, { useMemo } from 'react';
import { Sparkles } from 'lucide-react';
import type { Tool } from '@/src/types/tool';
import { getAllTools } from '@/src/data/tools';
import ToolCard from '@/src/components/tools/ToolCard';
import { trackRelatedToolClick } from '@/src/lib/analytics';

export interface RelatedToolsProps {
  currentTool: Tool;
  maxItems?: number;
  className?: string;
  id?: string;
}

/**
 * Reusable Related Tools section for AHADEX TOOLS.
 * Algorithmic matching based on shared category and tags from the central registry.
 * Strictly avoids recommending the active tool.
 */
export default function RelatedTools({
  currentTool,
  maxItems = 3,
  className = '',
  id = 'tool-related-tools',
}: RelatedToolsProps) {
  const allTools = getAllTools();

  const relatedTools = useMemo(() => {
    // Exclude current tool
    const candidatePool = allTools.filter((tool) => tool.id !== currentTool.id);

    // Score based on shared category and tag overlaps
    const scoredTools = candidatePool.map((tool) => {
      let score = 0;
      if (tool.categoryId === currentTool.categoryId || tool.category === currentTool.category) {
        score += 5;
      }
      // Tag intersection
      const sharedTags = tool.tags.filter((t) => currentTool.tags.includes(t));
      score += sharedTags.length * 2;

      return { tool, score };
    });

    // Sort descending by score, take top items
    scoredTools.sort((a, b) => b.score - a.score);
    return scoredTools.slice(0, maxItems).map((item) => item.tool);
  }, [allTools, currentTool, maxItems]);

  if (relatedTools.length === 0) {
    return null;
  }

  return (
    <section
      id={id}
      aria-labelledby="related-tools-heading"
      className={`w-full flex flex-col space-y-6 ${className}`}
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center">
          <Sparkles className="w-4 h-4" aria-hidden="true" />
        </div>
        <div>
          <h2
            id="related-tools-heading"
            className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight"
          >
            Related Utilities
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            More tools in the {currentTool.category.toUpperCase()} workflow.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatedTools.map((tool) => (
          <ToolCard
            key={tool.id}
            tool={tool}
            onClick={() => trackRelatedToolClick(currentTool.id, tool.id)}
          />
        ))}
      </div>
    </section>
  );
}
