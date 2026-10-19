import { motion } from "framer-motion";
import { Briefcase, Camera, Zap, Code } from "lucide-react";

interface PresetSelectorProps {
  onSelect: (presetKey: string) => void;
}

const PRESET_META = [
  { id: "data-scientist", label: "Data Scientist", icon: Briefcase },
  { id: "photographer", label: "Photographer", icon: Camera },
  { id: "electrician", label: "Electrician", icon: Zap },
  { id: "software-engineer", label: "Software Engineer", icon: Code },
];

export function PresetSelector({ onSelect }: PresetSelectorProps) {
  return (
    <div className="mb-8 p-6 rounded-3xl bg-silk-rose/5 border border-silk-rose/20">
      <div className="text-center mb-6">
        <h3 className="font-serif font-black text-xl text-light-text dark:text-dark-text mb-1">
          Start with a Smart Preset
        </h3>
        <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary">
          Select your profession to auto-fill your CV with relevant skills and summaries.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {PRESET_META.map((preset) => {
          const Icon = preset.icon;
          return (
            <motion.button
              key={preset.id}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(preset.id)}
              className="flex flex-col items-center justify-center gap-3 p-4 rounded-2xl bg-white dark:bg-dark-surface border border-silk-rose/10 hover:border-silk-rose/40 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-silk-rose/10 flex items-center justify-center">
                <Icon className="w-6 h-6 text-silk-rose" />
              </div>
              <span className="text-xs font-bold text-light-text dark:text-dark-text text-center">
                {preset.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
