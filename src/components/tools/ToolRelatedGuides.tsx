import { Link } from "react-router-dom";
import { guides } from "@data/guides";
import { ArrowRight, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export function ToolRelatedGuides({ toolId }: { toolId: string }) {
  // Find guides where this tool is listed in relatedTools
  const relatedGuides = guides.filter(g => g.relatedTools.includes(toolId));
  
  if (relatedGuides.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 max-w-3xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="w-5 h-5 text-silk-rose" />
        <h2 className="font-serif font-black text-2xl text-light-text dark:text-dark-text">Related Workflows & Guides</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {relatedGuides.map((guide, i) => (
          <motion.div key={guide.slug} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
            <Link to={`/guides/${guide.slug}`} className="group block h-full p-5 rounded-xl border border-silk-rose/20 hover:border-silk-rose/50 bg-light-surface dark:bg-dark-surface transition-all">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{guide.emoji}</span>
                <h3 className="font-bold text-[15px] leading-tight text-light-text dark:text-dark-text group-hover:text-silk-rose transition-colors">{guide.title}</h3>
              </div>
              <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary mb-4 line-clamp-2">{guide.excerpt}</p>
              <span className="text-silk-rose text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                Read guide <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
