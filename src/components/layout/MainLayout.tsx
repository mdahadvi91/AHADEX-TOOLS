import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import MobileMenu from './MobileMenu';
import { initGA, usePageTracking } from '@/src/lib/analytics';

export interface MainLayoutProps {
  children?: React.ReactNode;
  hideLeftSidebar?: boolean;
  hideRightSidebar?: boolean;
}

/**
 * Main Application Shell for AHADEX TOOLS.
 * Composes Header, responsive Sidebars, content outlet, Footer, and mobile navigation drawer.
 */
export default function MainLayout({
  children,
  hideLeftSidebar = false,
  hideRightSidebar = false,
}: MainLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Safely initialize analytics once without blocking UI rendering
  useEffect(() => {
    initGA();
  }, []);

  // Track page navigation changes
  usePageTracking();

  // MainLayout sidebars configuration
  const shouldHideRight = hideRightSidebar;

  return (
    <div className="min-h-screen flex flex-col surface-page text-slate-900 dark:text-slate-100 overflow-x-hidden">
      {/* Global Header */}
      <Header
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      {/* Main Responsive Grid / Flex Body */}
      <div className="flex-1 w-full layout-container py-6 flex gap-6 items-start">
        {/* Desktop Left Sidebar (Navigation & Categories) */}
        {!hideLeftSidebar && (
          <div className="hidden lg:block sticky top-20 shrink-0">
            <LeftSidebar className="w-56 xl:w-64" />
          </div>
        )}

        {/* Dynamic Main Content Shell */}
        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 min-w-0 w-full focus:outline-none"
        >
          {children ?? <Outlet />}
        </main>

        {/* Desktop Right Sidebar (Utilities & Settings) */}
        {!shouldHideRight && (
          <div className="hidden lg:block sticky top-20 shrink-0">
            <RightSidebar className="w-56 xl:w-64" />
          </div>
        )}
      </div>

      {/* Global Footer */}
      <Footer />

      {/* Mobile Menu Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </div>
  );
}
