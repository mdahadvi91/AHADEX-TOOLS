import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import { CV_TEMPLATES, SAMPLE_CV_DATA } from "../data";
import { TemplatePreview } from "./TemplatePreview";

interface TemplatePreviewModalProps {
  isOpen: boolean;
  templateId: string | null;
  onClose: () => void;
  onUseTemplate: () => void;
}

export function TemplatePreviewModal({ isOpen, templateId, onClose, onUseTemplate }: TemplatePreviewModalProps) {
  if (!isOpen || !templateId) return null;

  const template = CV_TEMPLATES.find((t) => t.id === templateId);
  if (!template) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[80] flex flex-col h-[100dvh] bg-black/90 backdrop-blur-md">
          
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-black/80 to-transparent shrink-0 relative z-10">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-black text-white">{template.name}</h2>
              <p className="text-xs sm:text-sm text-white/70 capitalize mt-1">{template.category} Template</p>
            </div>
            <button onClick={onClose} className="p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
          </div>

          {/* Preview Area (Scrollable) */}
          {/* pb-32 gives enough space so the CV doesn't hide under the fixed button */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden flex justify-center p-4 pb-32 sm:pb-40">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="origin-top w-full max-w-[900px] flex justify-center my-auto"
            >
              {/* 
                We use a wrapper with a specific width (210mm is A4) 
                and scale it using Tailwind. 
              */}
              <div className="origin-top w-[210mm] h-[297mm] scale-[0.45] sm:scale-[0.7] md:scale-[0.9] shrink-0 shadow-2xl bg-white">
                 <TemplatePreview Template={template.Component} data={SAMPLE_CV_DATA} scale={1} />
              </div>
            </motion.div>
          </div>

          {/* Sticky Bottom Action Bar */}
          <div className="fixed bottom-0 left-0 right-0 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] bg-gradient-to-t from-black via-black/90 to-transparent z-20">
            <div className="max-w-md mx-auto">
              <button
                onClick={onUseTemplate}
                className="w-full py-4 rounded-full bg-silk-rose text-white font-bold text-lg shadow-[0_10px_30px_-10px_rgba(216,139,154,0.5)] hover:bg-silk-wine-deep transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                Use This Template
              </button>
            </div>
          </div>
          
        </div>
      )}
    </AnimatePresence>
  );
}
