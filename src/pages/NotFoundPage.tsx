import React from 'react';
import { Link } from 'react-router-dom';
import { AnimatedBackButton } from '@/src/components/common';
import { useSEO } from '@/src/lib/seo';

export default function NotFoundPage() {
  useSEO({
    title: 'Page Not Found (404)',
    description: 'The requested page does not exist on AHADEX TOOLS.',
    robots: 'noindex, nofollow',
  });

  return (
    <div
      id="ahadex-not-found-page"
      className="w-full flex flex-col items-center justify-center py-12 text-center animate-fade-in"
    >
      <div className="max-w-md w-full p-8 rounded-2xl glass-panel text-center">
        <div className="flex justify-start mb-4">
          <AnimatedBackButton fallbackPath="/" />
        </div>
        <h1 className="text-5xl font-extrabold text-sky-600 dark:text-sky-400 mb-2">404</h1>
        <p className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-1">Page Not Found</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          The requested path does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="btn-base btn-primary text-xs sm:text-sm"
        >
          Return to Platform Home
        </Link>
      </div>
    </div>
  );
}
