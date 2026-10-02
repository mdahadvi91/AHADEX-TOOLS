import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@lib/cn";

/**
 * Global fixed back button.
 * - Hidden on home page ("/")
 * - Uses browser history if available, otherwise navigates to home
 * - Fixed position: below header, respects left sidebar on desktop
 */
export function BackButton() {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide on home
  if (location.pathname === "/") return null;

  const handleBack = () => {
    // If we have history, go back; otherwise go home
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <AnimatePresence>
      <motion.button
        key="global-back-button"
        type="button"
        onClick={handleBack}
        aria-label="Go back"
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -8 }}
        transition={{ duration: 0.25 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "fixed z-40",
          // Vertical: below header (header ~64-72px + margin)
          "top-[84px] lg:top-[92px]",
          // Horizontal: 12px on mobile, 16px after sidebar on desktop
          "left-3 lg:left-[276px]",
          // Shape & style
          "inline-flex items-center justify-center",
          "w-10 h-10 sm:w-11 sm:h-11 rounded-full",
          "bg-white/85 dark:bg-dark-surface/85 backdrop-blur-xl",
          "border border-silk-rose/30 hover:border-silk-rose/60",
          "text-silk-wine dark:text-silk-rose-soft",
          "shadow-[0_4px_20px_-6px_rgba(139,58,79,0.35)]",
          "hover:shadow-[0_8px_28px_-6px_rgba(139,58,79,0.5)]",
          "transition-all duration-300"
        )}
      >
        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.2} />
      </motion.button>
    </AnimatePresence>
  );
}
