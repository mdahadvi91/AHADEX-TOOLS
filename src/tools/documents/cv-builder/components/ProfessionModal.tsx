import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search } from "lucide-react";

const PROFESSION_NAMES = {
  "accountant": "Accountant", "nurse": "Registered Nurse", "teacher": "Teacher",
  "graphic-designer": "Graphic Designer", "mechanical-engineer": "Mechanical Engineer",
  "sales-manager": "Sales Manager", "chef": "Chef", "web-developer": "Web Developer",
  "marketing-specialist": "Marketing Specialist", "hr-manager": "HR Manager",
  "civil-engineer": "Civil Engineer", "architect": "Architect", "lawyer": "Lawyer",
  "dentist": "Dentist", "plumber": "Plumber", "data-analyst": "Data Analyst",
  "ux-designer": "UX/UI Designer", "project-manager": "Project Manager",
  "content-writer": "Content Writer", "pharmacist": "Pharmacist",
  "financial-analyst": "Financial Analyst", "mechanic": "Auto Mechanic",
  "social-media-manager": "Social Media Manager", "customer-service": "Customer Service",
  "sales-associate": "Sales Associate", "flight-attendant": "Flight Attendant",
  "construction-worker": "Construction Worker", "fitness-trainer": "Personal Trainer",
  "photographer": "Photographer", "electrician": "Electrician",
  "software-engineer": "Software Engineer", "data-scientist": "Data Scientist"
};

interface ProfessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (profession: string | null) => void;
}

export function ProfessionModal({ isOpen, onClose, onSelect }: ProfessionModalProps) {
  const [search, setSearch] = useState("");

  const filtered = Object.entries(PROFESSION_NAMES).filter(([_, label]) =>
    label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg bg-light-surface dark:bg-dark-surface rounded-3xl shadow-2xl border border-silk-rose/20 overflow-hidden flex flex-col max-h-[85vh]"
          >
            {/* Header */}
            <div className="p-5 border-b border-silk-rose/10 flex items-center justify-between bg-white/50 dark:bg-dark-surface/50">
              <div>
                <h2 className="font-serif font-black text-xl text-light-text dark:text-dark-text">Choose Your Profession</h2>
                <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary mt-1">We'll pre-fill your CV with relevant data.</p>
              </div>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-silk-rose/10 transition-colors">
                <X className="w-5 h-5 text-light-textSecondary dark:text-dark-textSecondary" />
              </button>
            </div>

            {/* Search */}
            <div className="p-4 border-b border-silk-rose/10">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-light-textSecondary dark:text-dark-textSecondary" />
                <input
                  type="text" placeholder="Search profession (e.g., Nurse, Developer)..." value={search} onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/80 dark:bg-dark-surface/80 border border-silk-rose/20 text-sm text-light-text dark:text-dark-text outline-none focus:border-silk-rose/50"
                />
              </div>
            </div>

            {/* List */}
            <div className="p-4 overflow-y-auto grid grid-cols-2 gap-2">
              <button
                onClick={() => onSelect(null)}
                className="col-span-2 p-3 rounded-xl border border-silk-rose/20 bg-silk-rose/5 hover:bg-silk-rose/10 text-sm font-bold text-silk-rose transition-colors flex items-center justify-center gap-2"
              >
                Start from Scratch (Empty CV)
              </button>

              {filtered.map(([key, label]) => (
                <button
                  key={key} onClick={() => onSelect(key)}
                  className="p-3 rounded-xl border border-silk-rose/10 bg-white/50 dark:bg-dark-surface/50 hover:border-silk-rose/40 hover:bg-silk-rose/5 text-sm font-medium text-light-text dark:text-dark-text text-left transition-all"
                >
                  {label}
                </button>
              ))}
              {filtered.length === 0 && (
                <p className="col-span-2 text-center text-sm text-light-textSecondary dark:text-dark-textSecondary py-4">
                  No profession found.
                </p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
