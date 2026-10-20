import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, User, FileText, Briefcase, GraduationCap, Plus, Trash2, X } from "lucide-react";
import imageCompression from "browser-image-compression";
import type { CVData, CVExperience, CVEducation } from "../types";
import { getCVTemplate } from "../data";
import { TemplatePreview } from "./TemplatePreview";

interface AutoEditWizardProps {
  isOpen: boolean;
  onClose: () => void;
  data: CVData;
  templateId: string;
  onFinish: (finalData: CVData) => void;
}

const DEGREES = ["SSC", "HSC", "Diploma", "B.Sc", "B.A", "M.Sc", "M.A", "MBA", "PhD", "Other"];

export function AutoEditWizard({ isOpen, onClose, data, templateId, onFinish }: AutoEditWizardProps) {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<CVData>(data);
  const [isCompressing, setIsCompressing] = useState(false);

  const template = getCVTemplate(templateId);

  const updatePersonal = (field: keyof typeof draft.personal, value: string) => {
    setDraft((prev) => ({
      ...prev,
      personal: { ...prev.personal, [field]: value }
    }));
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsCompressing(true);
      // Compress the image so it fits in sessionStorage easily
      const options = {
        maxSizeMB: 0.08, // 80KB
        maxWidthOrHeight: 300,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, options);
      const reader = new FileReader();
      reader.onloadend = () => {
        setDraft((prev) => ({
          ...prev,
          personal: { ...prev.personal, photoDataUrl: reader.result as string },
          settings: { ...prev.settings, photoEnabled: true }
        }));
        setIsCompressing(false);
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error(error);
      alert("Failed to compress image. Please try a smaller image.");
      setIsCompressing(false);
    }
  };

  // --- EXPERIENCE HANDLERS ---
  const addExperience = () => {
    const newExp: CVExperience = {
      id: crypto.randomUUID(), company: "", position: "", location: "",
      startDate: "", endDate: "", current: false, bullets: []
    };
    setDraft((prev) => ({ ...prev, experience: [...prev.experience, newExp] }));
  };

  const updateExperience = (id: string, field: keyof CVExperience, value: any) => {
    setDraft((prev) => ({
      ...prev,
      experience: prev.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    }));
  };

  const removeExperience = (id: string) => {
    setDraft((prev) => ({ ...prev, experience: prev.experience.filter(exp => exp.id !== id) }));
  };

  // --- EDUCATION HANDLERS ---
  const addEducation = () => {
    const newEdu: CVEducation = {
      id: crypto.randomUUID(), institution: "", degree: "B.Sc", field: "",
      location: "", startDate: "", endDate: "", description: ""
    };
    setDraft((prev) => ({ ...prev, education: [...prev.education, newEdu] }));
  };

  const updateEducation = (id: string, field: keyof CVEducation, value: any) => {
    setDraft((prev) => ({
      ...prev,
      education: prev.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu)
    }));
  };

  const removeEducation = (id: string) => {
    setDraft((prev) => ({ ...prev, education: prev.education.filter(edu => edu.id !== id) }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else onFinish(draft);
  };

  const steps = [
    { title: "Profile", icon: User },
    { title: "Summary", icon: FileText },
    { title: "Experience", icon: Briefcase },
    { title: "Education", icon: GraduationCap },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-light-surface dark:bg-dark-surface w-full h-full sm:h-[90vh] sm:max-w-6xl sm:rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden relative">
        
        <button onClick={onClose} className="absolute top-4 right-4 z-50 p-2 bg-black/10 hover:bg-black/20 rounded-full transition-colors">
          <X className="w-5 h-5 text-light-text dark:text-dark-text" />
        </button>

        {/* LEFT: Form Side */}
        <div className="w-full md:w-1/2 flex flex-col h-[55vh] md:h-full border-b md:border-b-0 md:border-r border-silk-rose/20 bg-white dark:bg-dark-surface z-10">
          
          {/* Progress Bar */}
          <div className="p-4 sm:p-6 border-b border-silk-rose/10 bg-white/50 dark:bg-dark-surface/50">
            <div className="flex items-center justify-between">
              {steps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors ${i <= step ? 'bg-silk-rose text-white shadow-lg' : 'bg-silk-rose/10 text-silk-rose/50'}`}>
                      {i < step ? <Check className="w-4 h-4 sm:w-5 sm:h-5" /> : <Icon className="w-4 h-4 sm:w-5 sm:h-5" />}
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-light-textSecondary dark:text-dark-textSecondary hidden sm:block">{s.title}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Area */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
            <AnimatePresence mode="wait">
              {/* Step 0: Profile */}
              {step === 0 && (
                <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                  <h2 className="text-xl font-serif font-black text-light-text dark:text-dark-text">Personal Details</h2>
                  
                  <div>
                    <label className="text-xs font-bold text-light-textSecondary dark:text-dark-textSecondary mb-1 block">Photo (Optional)</label>
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} className="block w-full text-sm text-silk-rose file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-silk-rose/10 file:text-silk-rose hover:file:bg-silk-rose/20" />
                    {isCompressing && <p className="text-xs text-silk-rose mt-1">Compressing image...</p>}
                    {draft.personal.photoDataUrl && !isCompressing && (
                      <div className="mt-2 flex items-center gap-2">
                        <img src={draft.personal.photoDataUrl} alt="Preview" className="w-10 h-10 rounded-full object-cover border border-silk-rose/30" />
                        <span className="text-xs text-emerald-500 font-bold">Photo uploaded successfully!</span>
                      </div>
                    )}
                  </div>

                  <input type="text" placeholder="Full Name" value={draft.personal.fullName} onChange={(e) => updatePersonal("fullName", e.target.value)} className="w-full p-3 rounded-xl border border-silk-rose/20 bg-transparent text-light-text dark:text-dark-text focus:border-silk-rose outline-none" />
                  <input type="text" placeholder="Professional Title" value={draft.personal.jobTitle} onChange={(e) => updatePersonal("jobTitle", e.target.value)} className="w-full p-3 rounded-xl border border-silk-rose/20 bg-transparent text-light-text dark:text-dark-text focus:border-silk-rose outline-none" />
                  <input type="email" placeholder="Email Address" value={draft.personal.email} onChange={(e) => updatePersonal("email", e.target.value)} className="w-full p-3 rounded-xl border border-silk-rose/20 bg-transparent text-light-text dark:text-dark-text focus:border-silk-rose outline-none" />
                  <input type="tel" placeholder="Phone Number" value={draft.personal.phone} onChange={(e) => updatePersonal("phone", e.target.value)} className="w-full p-3 rounded-xl border border-silk-rose/20 bg-transparent text-light-text dark:text-dark-text focus:border-silk-rose outline-none" />
                  <input type="text" placeholder="Location (City, Country)" value={draft.personal.location} onChange={(e) => updatePersonal("location", e.target.value)} className="w-full p-3 rounded-xl border border-silk-rose/20 bg-transparent text-light-text dark:text-dark-text focus:border-silk-rose outline-none" />
                </motion.div>
              )}

              {/* Step 1: Summary */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                  <h2 className="text-xl font-serif font-black text-light-text dark:text-dark-text">Professional Summary</h2>
                  <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">We've generated a summary based on your profession. You can edit it below.</p>
                  <textarea 
                    value={draft.summary} 
                    onChange={(e) => setDraft({ ...draft, summary: e.target.value })}
                    rows={6}
                    className="w-full p-3 rounded-xl border border-silk-rose/20 bg-transparent text-light-text dark:text-dark-text focus:border-silk-rose outline-none resize-none"
                  />
                </motion.div>
              )}

              {/* Step 2: Experience */}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                  <h2 className="text-xl font-serif font-black text-light-text dark:text-dark-text">Work Experience</h2>
                  
                  {draft.experience.map((exp, index) => (
                    <div key={exp.id} className="p-4 rounded-xl border border-silk-rose/20 relative space-y-3 bg-silk-rose/5">
                      <button onClick={() => removeExperience(exp.id)} className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-500/10 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <h3 className="text-xs font-bold text-silk-rose uppercase">Experience {index + 1}</h3>
                      <input type="text" placeholder="Company Name" value={exp.company} onChange={(e) => updateExperience(exp.id, "company", e.target.value)} className="w-full p-2.5 text-sm rounded-lg border border-silk-rose/20 bg-white dark:bg-dark-surface outline-none" />
                      <input type="text" placeholder="Job Title" value={exp.position} onChange={(e) => updateExperience(exp.id, "position", e.target.value)} className="w-full p-2.5 text-sm rounded-lg border border-silk-rose/20 bg-white dark:bg-dark-surface outline-none" />
                      <div className="grid grid-cols-2 gap-2">
                        <input type="text" placeholder="Start (e.g. 2020-01)" value={exp.startDate} onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)} className="w-full p-2.5 text-sm rounded-lg border border-silk-rose/20 bg-white dark:bg-dark-surface outline-none" />
                        <input type="text" placeholder="End (or empty)" value={exp.endDate} onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)} className="w-full p-2.5 text-sm rounded-lg border border-silk-rose/20 bg-white dark:bg-dark-surface outline-none" />
                      </div>
                    </div>
                  ))}

                  <button onClick={addExperience} className="w-full py-3 rounded-xl border-2 border-dashed border-silk-rose/40 text-silk-rose font-bold text-sm hover:bg-silk-rose/5 transition-colors flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" /> Add Experience
                  </button>
                </motion.div>
              )}

              {/* Step 3: Education */}
              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                  <h2 className="text-xl font-serif font-black text-light-text dark:text-dark-text">Education</h2>
                  
                  {draft.education.map((edu, index) => (
                    <div key={edu.id} className="p-4 rounded-xl border border-silk-rose/20 relative space-y-3 bg-silk-rose/5">
                      <button onClick={() => removeEducation(edu.id)} className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-500/10 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <h3 className="text-xs font-bold text-silk-rose uppercase">Education {index + 1}</h3>
                      
                      <select value={edu.degree} onChange={(e) => updateEducation(edu.id, "degree", e.target.value)} className="w-full p-2.5 text-sm rounded-lg border border-silk-rose/20 bg-white dark:bg-dark-surface outline-none">
                        {DEGREES.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>

                      <input type="text" placeholder="Institution / University Name" value={edu.institution} onChange={(e) => updateEducation(edu.id, "institution", e.target.value)} className="w-full p-2.5 text-sm rounded-lg border border-silk-rose/20 bg-white dark:bg-dark-surface outline-none" />
                      
                      <div className="grid grid-cols-2 gap-2">
                        <input type="text" placeholder="Start Year" value={edu.startDate} onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)} className="w-full p-2.5 text-sm rounded-lg border border-silk-rose/20 bg-white dark:bg-dark-surface outline-none" />
                        <input type="text" placeholder="End Year" value={edu.endDate} onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)} className="w-full p-2.5 text-sm rounded-lg border border-silk-rose/20 bg-white dark:bg-dark-surface outline-none" />
                      </div>
                    </div>
                  ))}

                  <button onClick={addEducation} className="w-full py-3 rounded-xl border-2 border-dashed border-silk-rose/40 text-silk-rose font-bold text-sm hover:bg-silk-rose/5 transition-colors flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" /> Add Education
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Navigation */}
          <div className="p-4 border-t border-silk-rose/10 bg-white/50 dark:bg-dark-surface/50 flex justify-between">
            <button onClick={() => step > 0 ? setStep(step - 1) : onClose()} className="px-4 py-2 text-sm font-bold text-light-textSecondary dark:text-dark-textSecondary hover:text-silk-rose transition-colors">
              {step === 0 ? "Cancel" : "Back"}
            </button>
            <button onClick={handleNext} disabled={isCompressing} className="px-6 py-2 rounded-full bg-silk-rose text-white text-sm font-bold shadow-lg hover:bg-silk-wine-deep transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
              {step === 3 ? "Finish & Preview" : "Next"} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* RIGHT: Live Preview Side */}
        <div className="w-full md:w-1/2 bg-silk-rose/5 h-[45vh] md:h-full flex items-center justify-center p-2 sm:p-6 overflow-y-auto relative">
          <div className="w-full max-w-[280px] sm:max-w-sm shadow-2xl rounded-lg overflow-hidden border border-silk-rose/10 origin-center flex justify-center">
            <TemplatePreview Template={template.Component} data={draft} scale={0.35} />
          </div>
        </div>

      </div>
    </div>
  );
}
