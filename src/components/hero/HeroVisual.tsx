import React from 'react';
import { FileText, Image as ImageIcon, QrCode, ShieldCheck, Zap, Sparkles } from 'lucide-react';

export interface HeroVisualProps {
  className?: string;
}

/**
 * Lightweight, accessible decorative hero visual.
 * Built strictly with CSS liquid glass panels and vector icons.
 * Never collapses layout and does not require WebGL or 3D runtimes.
 */
export default function HeroVisual({ className = '' }: HeroVisualProps) {
  return (
    <div
      aria-hidden="true"
      className={`relative w-full max-w-lg mx-auto flex items-center justify-center select-none pointer-events-none ${className}`}
    >
      {/* Ambient gradient glow behind cards */}
      <div className="absolute inset-0 -m-8 bg-gradient-to-tr from-sky-500/15 via-indigo-500/10 to-teal-400/15 rounded-full blur-3xl" />

      {/* Main glass composition container */}
      <div className="relative w-full aspect-square max-w-[380px] p-6 flex items-center justify-center">
        {/* Subtle decorative concentric orbits */}
        <div className="absolute inset-0 rounded-full border border-sky-500/15 dark:border-sky-400/10 animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute inset-8 rounded-full border border-indigo-500/15 dark:border-indigo-400/10" />

        {/* Center core glass hub */}
        <div className="relative z-10 p-6 rounded-3xl glass-panel-elevated bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-700/90 shadow-2xl flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/25 mb-3">
            <Sparkles className="w-7 h-7" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
            Browser Utilities
          </span>
          <span className="text-sm font-extrabold text-slate-900 dark:text-white">
            Fast &amp; Direct
          </span>
        </div>

        {/* Orbiting Satellite Card 1: PDF */}
        <div className="absolute -top-2 -left-2 z-20 px-3.5 py-2.5 rounded-2xl glass-panel bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-lg flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center">
            <FileText className="w-4 h-4" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">
              PDF Tools
            </span>
            <span className="text-[9px] text-slate-500 dark:text-slate-400">
              Convert &amp; Extract
            </span>
          </div>
        </div>

        {/* Orbiting Satellite Card 2: Image */}
        <div className="absolute -bottom-2 -left-3 z-20 px-3.5 py-2.5 rounded-2xl glass-panel bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-lg flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <ImageIcon className="w-4 h-4" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">
              Image Suite
            </span>
            <span className="text-[9px] text-slate-500 dark:text-slate-400">
              Compress &amp; Convert
            </span>
          </div>
        </div>

        {/* Orbiting Satellite Card 3: QR Code */}
        <div className="absolute top-10 -right-4 z-20 px-3.5 py-2.5 rounded-2xl glass-panel bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-lg flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
            <QrCode className="w-4 h-4" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">
              QR Code
            </span>
            <span className="text-[9px] text-slate-500 dark:text-slate-400">
              Generate &amp; Scan
            </span>
          </div>
        </div>

        {/* Orbiting Satellite Card 4: Local Processing */}
        <div className="absolute -bottom-4 right-2 z-20 px-3 py-1.5 rounded-full glass-panel bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow flex items-center gap-1.5 text-[10px] font-semibold text-slate-700 dark:text-slate-300">
          <ShieldCheck className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
          <span>Client Processing</span>
        </div>
      </div>
    </div>
  );
}
