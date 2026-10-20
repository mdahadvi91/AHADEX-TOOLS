import { Link } from "react-router-dom";
import { ArrowRight, Mail } from "lucide-react";
import { motion } from "framer-motion";

interface AuthorBioProps {
  name: string;
  bio: string;
  authorId: string;
  avatarUrl?: string;
}

export function AuthorBio({ name, bio, authorId, avatarUrl }: AuthorBioProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mt-14 pt-10 border-t border-silk-rose/20"
    >
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-silk-rose/8 via-silk-gold/5 to-transparent border border-silk-rose/20">
        <div className="flex items-start gap-5 flex-wrap">
          {/* Avatar */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-gradient-to-br from-silk-rose to-silk-wine-deep text-white flex items-center justify-center shrink-0 shadow-lg">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl font-black tracking-wider">{initials}</span>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-[200px]">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-silk-rose mb-1">
              Written by
            </p>
            <h3 className="font-serif font-black text-xl text-light-text dark:text-dark-text mb-2">
              {name}
            </h3>
            <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary leading-relaxed mb-4">
              {bio}
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <Link
                to={`/about/author/${authorId}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-silk-rose text-white text-xs font-bold shadow-md hover:bg-silk-wine-deep transition-all"
              >
                View Full Profile <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/60 dark:bg-dark-surface/60 border border-silk-rose/20 text-silk-rose text-xs font-bold hover:bg-silk-rose/10 transition-all"
              >
                <Mail className="w-3.5 h-3.5" /> Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
