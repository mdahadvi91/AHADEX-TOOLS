import { motion } from "framer-motion";
import { toolFieldNotes } from "@data/tool-field-notes";

interface ToolFieldNoteProps {
  toolId: string;
}

/**
 * ToolFieldNote — "From our own testing" callout.
 * Renders the tool's field note if one is defined. Silent no-op
 * otherwise, so it is safe to mount on every tool page.
 */
export function ToolFieldNote({ toolId }: ToolFieldNoteProps) {
  const note = toolFieldNotes[toolId];
  if (!note) return null;

  return (
    <motion.aside
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="my-10 rounded-2xl border border-silk-rose/30 bg-gradient-to-br from-silk-rose/5 via-transparent to-silk-wine/5 dark:from-silk-rose/10 dark:to-silk-wine/10 backdrop-blur-xl overflow-hidden"
    >
      <div className="px-5 sm:px-7 py-3.5 border-b border-silk-rose/20 flex items-center gap-2.5">
        <span className="text-lg">🧪</span>
        <p className="text-[11px] font-black uppercase tracking-[0.15em] text-silk-wine dark:text-silk-rose-soft">
          From our own testing
        </p>
      </div>
      <div className="px-5 sm:px-7 py-6">
        <h2 className="font-serif font-black text-xl sm:text-2xl text-light-text dark:text-dark-text mb-4">
          {note.title}
        </h2>
        <ul className="space-y-3">
          {note.items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-[14px] sm:text-[15px] text-light-textSecondary dark:text-dark-textSecondary leading-relaxed"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-silk-rose mt-2.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.aside>
  );
}
