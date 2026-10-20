import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Edit3, X } from "lucide-react";

interface BuildModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (mode: "auto" | "manual") => void;
}

export function BuildModeModal({ isOpen, onClose, onSelect }: BuildModeModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-full max-w-md bg-light-surface dark:bg-dark-surface rounded-3xl shadow-2xl border border-silk-rose/20 overflow-hidden p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-serif font-black text-xl text-light-text dark:text-dark-text">How to proceed?</h2>
              <button onClick={onClose} className="p-1.5 rounded-full hover:bg-silk-rose/10 transition-colors">
                <X className="w-5 h-5 text-light-textSecondary dark:text-dark-textSecondary" />
              </button>
            </div>
            
            <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary mb-6">
              Choose how you want to build your CV. You can always change details later.
            </p>

            <div className="space-y-3">
              <button
                onClick={() => onSelect("auto")}
                className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-silk-rose/30 bg-silk-rose/5 hover:border-silk-rose/60 hover:bg-silk-rose/10 transition-all text-left"
              >
                <div className="w-12 h-12 rounded-full bg-silk-rose/20 flex items-center justify-center shrink-0">
                  <Sparkles className="w-6 h-6 text-silk-rose" />
                </div>
                <div>
                  <h3 className="font-bold text-light-text dark:text-dark-text">Auto Edit (Guided)</h3>
                  <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary mt-0.5">Step-by-step form with live preview. Fastest way.</p>
                </div>
              </button>

              <button
                onClick={() => onSelect("manual")}
                className="w-full flex items-center gap-4 p-4 rounded-2xl border border-silk-rose/20 bg-white dark:bg-dark-surface hover:border-silk-rose/50 transition-all text-left"
              >
                <div className="w-12 h-12 rounded-full bg-silk-rose/10 flex items-center justify-center shrink-0">
                  <Edit3 className="w-6 h-6 text-light-textSecondary dark:text-dark-textSecondary" />
                </div>
                <div>
                  <h3 className="font-bold text-light-text dark:text-dark-text">Manual Edit</h3>
                  <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary mt-0.5">Go straight to the advanced editor.</p>
                </div>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
