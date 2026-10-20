import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Upload, Check, User, Phone, Link as LinkIcon, X } from "lucide-react";
import type { CVData } from "../types";
import { getCVTemplate } from "../data";
import { TemplatePreview } from "./TemplatePreview";

interface AutoEditWizardProps {
  isOpen: boolean;
  onClose: () => void;
  data: CVData;
  templateId: string;
  onFinish: (finalData: CVData) => void;
}

export function AutoEditWizard({ isOpen, onClose, data, templateId, onFinish }: AutoEditWizardProps) {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<CVData>(data);

  const template = getCVTemplate(templateId);

  const updatePersonal = (field: keyof typeof draft.personal, value: string) => {
    setDraft((prev) => ({
      ...prev,
      personal: { ...prev.personal, [field]: value }
    }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else onFinish(draft);
  };

  const steps = [
    { title: "Upload Photo", icon: Upload },
    { title: "Basic Info", icon: User },
    { title: "Contact Details", icon: Phone },
    { title: "Social Links", icon: LinkIcon },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-light-surface dark:bg-dark-surface w-full h-full sm:h-[90vh] sm:max-w-6xl sm:rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden relative">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 z-50 p-2 bg-black/10 hover:bg-black/20 rounded-full transition-colors">
          <X className="w-5 h-5 text-light-text dark:text-dark-text" />
        </button>

        {/* LEFT: Form Side */}
        <div className="w-full md:w-1/2 flex flex-col h-[55vh] md:h-full border-b md:border-b-0 md:border-r border-silk-rose/20 bg-white dark:bg-dark-surface z-10">
          {/* Progress Bar */}
          <div className="p-6 border-b border-silk-rose/10 bg-white/50 dark:bg-dark-surface/50">
            <div className="flex items-center justify-between mb-4">
              {steps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${i <= step ? 'bg-silk-rose text-white' : 'bg-silk-rose/10 text-silk-rose/50'}`}>
                      {i < step ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-light-textSecondary dark:text-dark-textSecondary hidden sm:block">{s.title}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Area */}
          <div className="flex-1 p-6 overflow-y-auto">
            <AnimatePresence mode="wait">
              {/* Step 0: Photo */}
              {step === 0 && (
                <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                  <h2 className="text-xl font-serif font-black text-light-text dark:text-dark-text">Let's start with a photo</h2>
                  <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">Upload a professional photo. (Optional)</p>
                  <input 
                    type="file" accept="image/*" 
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => updatePersonal("photoDataUrl", reader.result as string);
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="block w-full text-sm text-silk-rose file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-silk-rose/10 file:text-silk-rose hover:file:bg-silk-rose/20"
                  />
                  {draft.personal.photoDataUrl && (
                    <div className="mt-4 p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 flex items-center gap-3">
                      <Check className="w-5 h-5 text-emerald-500" />
                      <span className="text-sm font-bold text-emerald-700">Photo uploaded successfully!</span>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Step 1: Basic Info */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                  <h2 className="text-xl font-serif font-black text-light-text dark:text-dark-text">What's your name?</h2>
                  <input type="text" placeholder="Full Name" value={draft.personal.fullName} onChange={(e) => updatePersonal("fullName", e.target.value)} className="w-full p-3 rounded-xl border border-silk-rose/20 bg-white dark:bg-dark-surface text-light-text dark:text-dark-text focus:border-silk-rose outline-none" />
                  <input type="text" placeholder="Professional Title (e.g. Data Scientist)" value={draft.personal.jobTitle} onChange={(e) => updatePersonal("jobTitle", e.target.value)} className="w-full p-3 rounded-xl border border-silk-rose/20 bg-white dark:bg-dark-surface text-light-text dark:text-dark-text focus:border-silk-rose outline-none" />
                  <input type="text" placeholder="Location (e.g. New York, NY)" value={draft.personal.location} onChange={(e) => updatePersonal("location", e.target.value)} className="w-full p-3 rounded-xl border border-silk-rose/20 bg-white dark:bg-dark-surface text-light-text dark:text-dark-text focus:border-silk-rose outline-none" />
                </motion.div>
              )}

              {/* Step 2: Contact */}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                  <h2 className="text-xl font-serif font-black text-light-text dark:text-dark-text">How can employers reach you?</h2>
                  <input type="email" placeholder="Email Address" value={draft.personal.email} onChange={(e) => updatePersonal("email", e.target.value)} className="w-full p-3 rounded-xl border border-silk-rose/20 bg-white dark:bg-dark-surface text-light-text dark:text-dark-text focus:border-silk-rose outline-none" />
                  <input type="tel" placeholder="Phone Number" value={draft.personal.phone} onChange={(e) => updatePersonal("phone", e.target.value)} className="w-full p-3 rounded-xl border border-silk-rose/20 bg-white dark:bg-dark-surface text-light-text dark:text-dark-text focus:border-silk-rose outline-none" />
                </motion.div>
              )}

              {/* Step 3: Links */}
              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                  <h2 className="text-xl font-serif font-black text-light-text dark:text-dark-text">Add your links (Optional)</h2>
                  <input type="url" placeholder="LinkedIn URL" value={draft.personal.linkedin} onChange={(e) => updatePersonal("linkedin", e.target.value)} className="w-full p-3 rounded-xl border border-silk-rose/20 bg-white dark:bg-dark-surface text-light-text dark:text-dark-text focus:border-silk-rose outline-none" />
                  <input type="url" placeholder="GitHub / Portfolio URL" value={draft.personal.website} onChange={(e) => updatePersonal("website", e.target.value)} className="w-full p-3 rounded-xl border border-silk-rose/20 bg-white dark:bg-dark-surface text-light-text dark:text-dark-text focus:border-silk-rose outline-none" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Navigation */}
          <div className="p-4 border-t border-silk-rose/10 bg-white/50 dark:bg-dark-surface/50 flex justify-between">
            <button 
              onClick={() => step > 0 ? setStep(step - 1) : onClose()} 
              className="px-4 py-2 text-sm font-bold text-light-textSecondary dark:text-dark-textSecondary hover:text-silk-rose transition-colors"
            >
              {step === 0 ? "Cancel" : "Back"}
            </button>
            <button 
              onClick={handleNext} 
              className="px-6 py-2 rounded-full bg-silk-rose text-white text-sm font-bold shadow-lg hover:bg-silk-wine-deep transition-colors flex items-center gap-2"
            >
              {step === 3 ? "Finish & Edit" : "Next"} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* RIGHT: Live Preview Side */}
        <div className="w-full md:w-1/2 bg-silk-rose/5 h-[45vh] md:h-full flex items-center justify-center p-2 sm:p-6 overflow-y-auto relative">
          <div className="w-full max-w-[280px] sm:max-w-sm shadow-2xl rounded-lg overflow-hidden border border-silk-rose/10 origin-center transition-transform hover:scale-105">
            <TemplatePreview Template={template.Component} data={draft} scale={1} />
          </div>
        </div>

      </div>
    </div>
  );
}
