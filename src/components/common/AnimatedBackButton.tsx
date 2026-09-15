import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export interface AnimatedBackButtonProps {
  label?: string;
  fallbackPath?: string;
  className?: string;
  showIconOnlyOnMobile?: boolean;
}

/**
 * Reusable universal back button foundation.
 * Safely handles history traversal or navigates to fallback path.
 */
export default function AnimatedBackButton({
  label = 'Back',
  fallbackPath = '/',
  className = '',
  showIconOnlyOnMobile = false,
}: AnimatedBackButtonProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallbackPath);
    }
  };

  return (
    <button
      type="button"
      id="ahadex-universal-back-btn"
      onClick={handleBack}
      aria-label="Go back to previous page"
      className={`btn-base btn-secondary text-xs sm:text-sm font-medium transition-all group ${className}`}
    >
      <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
      <span className={showIconOnlyOnMobile ? 'hidden sm:inline' : 'inline'}>{label}</span>
    </button>
  );
}
