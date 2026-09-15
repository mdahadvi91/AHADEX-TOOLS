import React from 'react';
import { HelpCircle, Check } from 'lucide-react';
import type { HowToUseStep } from '@/src/types/workspace';

export interface HowToUseProps {
  toolName?: string;
  steps?: HowToUseStep[];
  className?: string;
  id?: string;
}

const DEFAULT_STEPS: HowToUseStep[] = [
  {
    stepNumber: 1,
    title: 'Select or Upload',
    description: 'Choose your files from your device or drag and drop them directly into the secure upload area.',
  },
  {
    stepNumber: 2,
    title: 'Configure Options',
    description: 'Adjust formatting, quality, orientation, or custom parameters to suit your exact needs.',
  },
  {
    stepNumber: 3,
    title: 'Process Instantly',
    description: 'Execute the transformation in milliseconds. Processing takes place in your local browser.',
  },
  {
    stepNumber: 4,
    title: 'Download & Save',
    description: 'Download your processed file instantly without waiting in queues or providing personal details.',
  },
];

/**
 * Reusable How-To-Use section for AHADEX TOOLS.
 * Demonstrates a transparent 4-step workflow configured per tool.
 */
export default function HowToUse({
  toolName = 'this tool',
  steps = DEFAULT_STEPS,
  className = '',
  id = 'tool-how-to-use',
}: HowToUseProps) {
  const activeSteps = steps && steps.length > 0 ? steps : DEFAULT_STEPS;

  return (
    <section
      id={id}
      aria-labelledby="how-to-use-heading"
      className={`w-full flex flex-col space-y-6 ${className}`}
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center">
          <HelpCircle className="w-4 h-4" aria-hidden="true" />
        </div>
        <div>
          <h2
            id="how-to-use-heading"
            className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight"
          >
            How to use {toolName}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Simple 4-step workflow, zero setup required.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {activeSteps.map((step) => (
          <div
            key={step.stepNumber}
            className="relative p-5 rounded-2xl glass-panel bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between hover:border-sky-500/30 transition-colors"
          >
            <div>
              {/* Step indicator number */}
              <div className="flex items-center justify-between mb-3">
                <span className="w-7 h-7 rounded-lg bg-sky-600/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 font-mono font-bold text-xs flex items-center justify-center">
                  0{step.stepNumber}
                </span>
                <span className="text-[10px] uppercase font-mono text-slate-400 dark:text-slate-500">
                  Step {step.stepNumber}
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                {step.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
