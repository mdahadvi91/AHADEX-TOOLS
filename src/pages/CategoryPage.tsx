import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { AnimatedBackButton, AdSlot } from '@/src/components/common';
import { getCategoryBySlug, getCategoryById } from '@/src/data/categories';
import { useSEO } from '@/src/lib/seo';

export default function CategoryPage() {
  const { category: categorySlug = '' } = useParams<{ category: string }>();

  const category = useMemo(() => {
    return getCategoryBySlug(categorySlug) || getCategoryById(categorySlug);
  }, [categorySlug]);

  const breadcrumbs = useMemo(() => [
    { name: 'Home', path: '/' },
    { name: category?.name || categorySlug, path: `/category/${category?.slug || categorySlug}` },
  ], [category, categorySlug]);

  useSEO({
    title: category ? category.name : 'Category Not Found',
    description: category ? category.description : 'Explore free client-side online tools by category.',
    path: `/category/${category?.slug || categorySlug}`,
    robots: category ? 'index, follow' : 'noindex, nofollow',
    breadcrumbs,
  });

  return (
    <div
      id="ahadex-category-page"
      className="w-full flex flex-col items-center justify-center py-8 text-center animate-fade-in"
    >
      <div className="max-w-md w-full p-8 rounded-2xl glass-panel text-center">
        <div className="flex justify-start mb-6">
          <AnimatedBackButton fallbackPath="/" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Category: <span className="capitalize text-sky-600 dark:text-sky-400">{category?.name || categorySlug}</span>
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          {category?.description || 'Modular tools for this category will be mounted here in future phases.'}
        </p>
      </div>

      {/* Safe Category Ad Placement */}
      <AdSlot placement="category" className="max-w-md w-full" />
    </div>
  );
}
