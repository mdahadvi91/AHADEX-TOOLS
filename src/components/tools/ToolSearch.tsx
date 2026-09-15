import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Command, ArrowRight, Sparkles, Clock, LucideIcon, FileImage, FileText, RefreshCw, Minimize2, QrCode, Wrench } from 'lucide-react';
import { TOOLS } from '@/src/data/tools';
import type { Tool } from '@/src/types/tool';
import EmptySearchState from './EmptySearchState';
import { trackToolSearch, trackToolOpen } from '@/src/lib/analytics';

const ICON_MAP: Record<string, LucideIcon> = {
  FileImage,
  FileText,
  RefreshCw,
  Minimize2,
  QrCode,
  Wrench,
};

export interface ToolSearchProps {
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  isCompact?: boolean;
  onSelectTool?: (tool: Tool) => void;
}

/**
 * Global Tool Discovery Search Component.
 * Powered purely by central tools registry (src/data/tools.ts).
 * Fully keyboard accessible (ArrowUp, ArrowDown, Enter, Escape).
 */
export default function ToolSearch({
  placeholder = 'Search tools by name, action, or keyword (e.g. "compress", "pdf", "qr")...',
  className = '',
  autoFocus = false,
  isCompact = false,
  onSelectTool,
}: ToolSearchProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Search algorithm matching name, slug, category, keywords, aliases, and tags
  const matchedTools = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];

    return TOOLS.filter((tool) => {
      if (tool.name.toLowerCase().includes(trimmed)) return true;
      if (tool.slug.toLowerCase().includes(trimmed)) return true;
      if (tool.category.toLowerCase().includes(trimmed)) return true;
      if (tool.shortDescription.toLowerCase().includes(trimmed)) return true;
      if (tool.keywords.some((k) => k.toLowerCase().includes(trimmed))) return true;
      if (tool.aliases.some((a) => a.toLowerCase().includes(trimmed))) return true;
      if (tool.tags.some((t) => t.toLowerCase().includes(trimmed))) return true;
      return false;
    });
  }, [query]);

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Reset selected index when matches change
  useEffect(() => {
    setSelectedIndex(matchedTools.length > 0 ? 0 : -1);
  }, [matchedTools]);

  const handleSelect = (tool: Tool) => {
    trackToolSearch(query.length, matchedTools.length);
    trackToolOpen(tool.id, 'search');
    setIsOpen(false);
    setQuery('');
    if (onSelectTool) {
      onSelectTool(tool);
    } else {
      navigate(tool.route);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      if (matchedTools.length > 0) setIsOpen(true);
      return;
    }

    if (e.key === 'Escape') {
      setIsOpen(false);
      return;
    }

    if (matchedTools.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % matchedTools.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + matchedTools.length) % matchedTools.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < matchedTools.length) {
        handleSelect(matchedTools[selectedIndex]);
      }
    }
  };

  const clearQuery = () => {
    setQuery('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Search Bar Input */}
      <div className="relative flex items-center">
        <div className={`absolute inset-y-0 left-0 flex items-center pointer-events-none text-slate-400 dark:text-slate-500 ${isCompact ? 'pl-3' : 'pl-4'}`}>
          <Search className={isCompact ? 'w-4 h-4' : 'w-5 h-5'} aria-hidden="true" />
        </div>

        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            if (query.trim()) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus={autoFocus}
          autoComplete="off"
          spellCheck="false"
          role="combobox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls="tool-search-results"
          className={`w-full glass-panel-elevated bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-700/90 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 shadow-md transition-all ${
            isCompact
              ? 'pl-9 pr-9 py-2 text-xs sm:text-sm rounded-xl'
              : 'pl-12 pr-12 py-3.5 sm:py-4 text-sm sm:text-base rounded-2xl shadow-lg shadow-slate-200/40 dark:shadow-slate-950/40'
          }`}
        />

        {query ? (
          <button
            type="button"
            onClick={clearQuery}
            aria-label="Clear search query"
            className={`absolute inset-y-0 right-0 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 ${isCompact ? 'pr-3' : 'pr-4'}`}
          >
            <X className={isCompact ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
          </button>
        ) : (
          <div className={`absolute inset-y-0 right-0 flex items-center pointer-events-none ${isCompact ? 'pr-3' : 'pr-4'}`}>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700 rounded bg-slate-100/80 dark:bg-slate-800/80">
              <Command className="w-2.5 h-2.5" /> K
            </kbd>
          </div>
        )}
      </div>

      {/* Dropdown Results Box */}
      {isOpen && query.trim().length > 0 && (
        <div
          id="tool-search-results"
          role="listbox"
          className="absolute left-0 right-0 top-full mt-2 z-50 max-h-96 overflow-y-auto rounded-2xl glass-panel-elevated border border-slate-200/90 dark:border-slate-700/90 bg-white/95 dark:bg-slate-900/95 shadow-2xl p-2 animate-slide-up"
        >
          {matchedTools.length > 0 ? (
            <div className="flex flex-col gap-1">
              <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex justify-between items-center">
                <span>Matching Tools ({matchedTools.length})</span>
                <span className="text-[10px] lowercase font-normal">Use ↑↓ keys, enter to open</span>
              </div>

              {matchedTools.map((tool, index) => {
                const IconComponent = ICON_MAP[tool.icon] || Wrench;
                const isSelected = index === selectedIndex;
                const isComingSoon = tool.status === 'coming-soon';

                return (
                  <button
                    key={tool.id}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(tool)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-left transition-all ${
                      isSelected
                        ? 'bg-sky-500/10 text-sky-950 dark:text-sky-100 border border-sky-500/30'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100/60 dark:hover:bg-slate-800/60 border border-transparent'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0">
                      <IconComponent className="w-4 h-4" aria-hidden="true" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                          {tool.name}
                        </span>
                        {tool.isFeatured && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400">
                            Featured
                          </span>
                        )}
                        {isComingSoon && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                            Soon
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {tool.shortDescription}
                      </p>
                    </div>

                    <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-sky-600 dark:text-sky-400 translate-x-0.5' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </div>
          ) : (
            <EmptySearchState
              query={query}
              onClearQuery={clearQuery}
              onSelectSuggestion={(suggestion) => {
                setQuery(suggestion);
                inputRef.current?.focus();
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}
