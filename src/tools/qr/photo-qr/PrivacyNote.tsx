import { Shield } from "lucide-react";

interface PrivacyNoteProps {
  text: string;
}

export function PrivacyNote({ text }: PrivacyNoteProps) {
  return (
    <div className="rounded-2xl bg-silk-rose/5 border border-silk-rose/20 p-4 sm:p-5 flex items-start gap-3 mb-12">
      <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-silk-rose shrink-0 mt-0.5" />
      <p className="text-[13px] sm:text-sm text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
        {text}
      </p>
    </div>
  );
}
