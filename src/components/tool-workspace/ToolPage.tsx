import React, { useMemo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Search, Wrench, AlertCircle } from 'lucide-react';
import { getToolBySlug, getToolById, getPopularTools } from '@/src/data/tools';
import { CATEGORIES } from '@/src/data/categories';
import type { Tool } from '@/src/types/tool';
import type { ToolInputMode, WorkspaceProgress, WorkspaceResult, WorkspaceFile } from '@/src/types/workspace';
import { useSEO, generateSoftwareApplicationSchema } from '@/src/lib/seo';
import {
  trackToolView,
  trackFileUpload,
  trackProcessingStart,
  trackToolReset,
} from '@/src/lib/analytics';
import ToolHeader from './ToolHeader';
import ToolWorkspace from './ToolWorkspace';
import HowToUse from './HowToUse';
import RelatedTools from './RelatedTools';
import ToolFAQ from './ToolFAQ';
import ToolSEOContent from './ToolSEOContent';
import ToolCard from '@/src/components/tools/ToolCard';
import { AdSlot } from '@/src/components/common';

export interface ToolPageProps {
  /** Optional override for testing or manual tool routing */
  toolSlug?: string;
  className?: string;
}

/**
 * Shared Tool Page Host for AHADEX TOOLS.
 * Dynamically resolves tool metadata, configures the shared workspace shell,
 * injects canonical SEO tags and JSON-LD schema, and safely logs user engagement analytics.
 * Does not implement tool processors directly.
 */
export default function ToolPage({ toolSlug: propSlug, className = '' }: ToolPageProps) {
  const { tool: routeSlug } = useParams<{ tool: string }>();
  const activeSlug = propSlug || routeSlug || '';

  // Resolve tool metadata from canonical registry
  const tool: Tool | undefined = useMemo(() => {
    return getToolBySlug(activeSlug) || getToolById(activeSlug);
  }, [activeSlug]);

  const category = useMemo(() => {
    if (!tool) return undefined;
    return CATEGORIES.find(
      (cat) => cat.id === tool.categoryId || cat.id === tool.category
    );
  }, [tool]);

  // Construct structured breadcrumb hierarchy
  const breadcrumbs = useMemo(() => {
    if (!tool) return [];
    return [
      { name: 'Home', path: '/' },
      ...(category ? [{ name: category.name, path: `/category/${category.slug}` }] : []),
      { name: tool.name, path: tool.route },
    ];
  }, [tool, category]);

  // Handle SEO metadata dynamically (including noindex on 404)
  useSEO({
    title: tool ? tool.name : 'Tool Not Found',
    description: tool ? tool.shortDescription : 'The requested utility was not found.',
    path: tool ? tool.route : window.location.pathname,
    robots: tool ? 'index, follow' : 'noindex, nofollow',
    keywords: tool ? tool.keywords : undefined,
    breadcrumbs: tool ? breadcrumbs : undefined,
    structuredData: tool ? generateSoftwareApplicationSchema(tool) : undefined,
  });

  // Track tool view in GA4 safely without personal data
  useEffect(() => {
    if (tool) {
      trackToolView(tool.id, tool.categoryId);
    }
  }, [tool]);

  // Non-file input state for tools like QR code generator or text tools
  const [textInput, setTextInput] = useState<string>('');

  // Graceful 404 / Unknown Tool fallback
  if (!tool) {
    const popularTools = getPopularTools().slice(0, 3);

    return (
      <div
        id="tool-not-found-page"
        className="w-full flex flex-col items-center justify-center py-12 text-center animate-fade-in"
      >
        <div className="max-w-lg w-full p-8 rounded-3xl glass-panel bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-7 h-7" aria-hidden="true" />
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Tool Not Found
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
            We couldn't locate a utility with identifier{' '}
            <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-slate-900 dark:text-slate-100">
              "{activeSlug}"
            </code>
            . It may have been moved or is currently being prepared.
          </p>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 transition-all shadow-md shadow-sky-600/20 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to All Tools</span>
          </Link>

          {/* Popular tools recommendations */}
          <div className="text-left border-t border-slate-200/70 dark:border-slate-800/80 pt-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              Popular Utilities You Might Need
            </h2>
            <div className="space-y-2.5">
              {popularTools.map((popTool) => (
                <Link
                  key={popTool.id}
                  to={popTool.route}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/70 dark:border-slate-700/70 transition-all text-xs font-semibold text-slate-900 dark:text-white"
                >
                  <span>{popTool.name}</span>
                  <span className="text-sky-600 dark:text-sky-400 font-normal text-[11px]">
                    Open &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Derive input mode from tool metadata
  const isFileInput =
    tool.supportedInputs.includes('image') ||
    tool.supportedInputs.includes('pdf') ||
    tool.supportedInputs.includes('file');

  const inputMode: ToolInputMode = isFileInput ? 'files' : 'custom';

  // Derive accepted extensions based on tool ID/type
  const acceptedExtensions = useMemo(() => {
    if (tool.id === 'jpg-to-pdf') return ['.jpg', '.jpeg'];
    if (tool.id === 'pdf-to-jpg') return ['.pdf'];
    if (tool.id === 'image-converter' || tool.id === 'image-compressor') {
      return ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif'];
    }
    return [];
  }, [tool.id]);

  const acceptedMimeTypes = useMemo(() => {
    if (tool.id === 'jpg-to-pdf') return ['image/jpeg'];
    if (tool.id === 'pdf-to-jpg') return ['application/pdf'];
    if (tool.id === 'image-converter' || tool.id === 'image-compressor') {
      return ['image/*'];
    }
    return [];
  }, [tool.id]);

  return (
    <div
      id={`tool-page-${tool.id}`}
      className={`w-full flex flex-col space-y-10 sm:space-y-12 lg:space-y-14 pb-12 animate-fade-in ${className}`}
    >
      {/* 1. Tool Header (Breadcrumb, icon, name, description, privacy badge) */}
      <ToolHeader tool={tool} />

      {/* Safe Ad Placement: Separated above workspace */}
      <AdSlot placement="tool-before-workspace" />

      {/* 2. Primary Shared Workspace */}
      <ToolWorkspace
        toolId={tool.id}
        inputMode={inputMode}
        acceptedExtensions={acceptedExtensions}
        acceptedMimeTypes={acceptedMimeTypes}
        maxFileSizeMb={tool.maxFileSizeMb || 50}
        allowMultiple={tool.id !== 'pdf-to-jpg'}
        dropzoneTitle={`Upload files for ${tool.name}`}
        dropzoneSubtitle="Processed locally in your browser. Never uploaded to a server."
        processButtonText={`Process with ${tool.name}`}
        onProcess={() => {
          trackProcessingStart(tool.id, isFileInput ? 'files' : 'text');
        }}
        onReset={() => {
          trackToolReset(tool.id);
        }}
        onFilesChange={(files) => {
          if (files.length > 0) {
            const totalBytes = files.reduce((acc, f) => acc + f.size, 0);
            trackFileUpload(tool.id, files.length, totalBytes, files[0]?.type);
          }
        }}
        // Custom non-file input for tools like QR Code Generator
        customInput={
          !isFileInput ? (
            <div className="space-y-4">
              <label
                htmlFor="custom-tool-text-input"
                className="block text-xs sm:text-sm font-bold text-slate-900 dark:text-white"
              >
                Enter Content or URL:
              </label>
              <textarea
                id="custom-tool-text-input"
                rows={4}
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Type or paste text, URL, WiFi credentials..."
                className="w-full p-4 rounded-xl glass-panel bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 resize-y"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Non-file tool input foundation ready.
              </p>
            </div>
          ) : undefined
        }
      />

      {/* Safe Ad Placement: Separated below workspace */}
      <AdSlot placement="tool-after-workspace" />

      {/* 3. How to Use Workflow Steps */}
      <HowToUse toolName={tool.name} />

      {/* 4. Related Tools from the Central Registry */}
      <RelatedTools currentTool={tool} />

      {/* 5. Tool FAQ */}
      <ToolFAQ toolName={tool.name} />

      {/* 6. Semantic Technical & Privacy Disclosures (No SEO keyword stuffing) */}
      <ToolSEOContent
        toolName={tool.name}
        data={{
          introduction: tool.longDescription || tool.shortDescription,
          useCases: [
            `Direct ${tool.name} transformations entirely in client memory`,
            'Zero account or payment requirements',
            'No watermark or quality penalties',
          ],
          supportedFormats:
            acceptedExtensions.length > 0
              ? acceptedExtensions.map((e) => e.toUpperCase())
              : ['Standard text and web payloads'],
          limitations: [
            `Max recommended file size is ${tool.maxFileSizeMb || 50} MB per item`,
            'Processing speed correlates directly with client CPU capability',
          ],
          privacyInfo:
            'Data remains in volatile browser memory. When you close or refresh this tab, all inputs and outputs are immediately cleared.',
        }}
      />
    </div>
  );
}
