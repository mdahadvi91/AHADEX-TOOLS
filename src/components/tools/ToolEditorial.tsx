import { motion } from "framer-motion";
import { tools } from "@data/tools";

interface ToolEditorialProps {
  toolId: string;
}

/**
 * ToolEditorial — renders unique editorial article sections for a tool.
 * Different from Features/HowTo/FAQ because these are free-form
 * article sections written specifically for one tool. Silent no-op
 * when the tool has no editorialContent.
 *
 * Placed right after the Hero and before Features, so the reader
 * encounters tool-specific editorial content first.
 */
export function ToolEditorial({ toolId }: ToolEditorialProps) {
  const tool = tools.find((t) => t.id === toolId);
  const sections = tool?.editorialContent;

  if (!sections || sections.length === 0) return null;

  return (
    <div className="mx-auto max-w-3xl mt-12 mb-10 space-y-10">
      {sections.map((section, i) => (
        <motion.article
          key={i}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="prose-editorial"
        >
          <h2 className="font-serif font-black text-2xl sm:text-[28px] leading-[1.2] tracking-[-0.02em] text-light-text dark:text-dark-text mb-4">
            {section.heading}
          </h2>
          <div
            className="text-[15px] sm:text-[16px] text-light-textSecondary dark:text-dark-textSecondary leading-[1.75] [&>p]:mb-4 [&>p:last-child]:mb-0 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ul]:mb-4 [&>h3]:font-serif [&>h3]:font-bold [&>h3]:text-lg [&>h3]:text-light-text [&>h3]:dark:text-dark-text [&>h3]:mt-6 [&>h3]:mb-2 [&>table]:w-full [&>table]:text-sm [&>table]:border-collapse [&>th]:border [&>th]:border-silk-rose/20 [&>th]:p-2 [&>th]:text-left [&>td]:border [&>td]:border-silk-rose/20 [&>td]:p-2 [&>strong]:text-light-text [&>strong]:dark:text-dark-text"
            dangerouslySetInnerHTML={{ __html: section.body }}
          />
        </motion.article>
      ))}
    </div>
  );
}
