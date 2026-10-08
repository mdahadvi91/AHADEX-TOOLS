import { motion } from "framer-motion";
import { Sparkles, Calendar, Mail, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { AdSenseSlot } from "@components/ads/AdSenseSlot";
import { cn } from "@lib/cn";

export interface TrustSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface TrustPageContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
  contactEmail: string;
  sections: TrustSection[];
}

interface TrustPageLayoutProps {
  content: TrustPageContent;
  icon?: "shield" | "document" | "alert" | "access" | "cookie";
}

const ICON_MAP = {
  shield: Shield,
  document: Sparkles,
  alert: Sparkles,
  access: Sparkles,
  cookie: Sparkles,
};

export function TrustPageLayout({
  content,
  icon = "shield",
}: TrustPageLayoutProps) {
  const Icon = ICON_MAP[icon];

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
      {/* HERO */}
      <section className="relative overflow-hidden pt-12 pb-12 sm:pt-16 sm:pb-16">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-40"
            style={{
              background:
                "radial-gradient(circle, rgba(216,139,154,0.3) 0%, transparent 65%)",
              filter: "blur(70px)",
            }}
          />
        </div>

        <div className="relative max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-dark-surface/60 backdrop-blur-xl border border-silk-rose/25 text-silk-wine dark:text-silk-rose mb-8"
          >
            <Icon className="w-3.5 h-3.5" />
            <span className="text-[10px] font-medium tracking-[0.25em] uppercase">
              {content.eyebrow}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-bold tracking-tight leading-[1.05] text-light-text dark:text-dark-text text-[clamp(2rem,5vw,3.5rem)]"
          >
            {content.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-5 text-base sm:text-lg text-light-textSecondary dark:text-dark-textSecondary leading-relaxed"
          >
            {content.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-light-textSecondary/80 dark:text-dark-textSecondary/80"
          >
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {content.lastUpdated}
            </span>
            <a
              href={`mailto:${content.contactEmail}`}
              className="inline-flex items-center gap-1.5 hover:text-silk-rose transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              {content.contactEmail}
            </a>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div
        aria-hidden="true"
        className="h-px w-full bg-gradient-to-r from-transparent via-silk-rose/40 to-transparent"
      />

      {/* CONTENT */}
      <article className="py-12 lg:py-16 max-w-3xl">
        <div className="space-y-10">
          {content.sections.map((section, index) => (
            <motion.section
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.03 }}
            >
              <h2 className="font-display font-bold text-xl sm:text-2xl text-light-text dark:text-dark-text tracking-tight mb-4">
                {section.heading}
              </h2>

              {section.paragraphs?.map((p, i) => (
                <p
                  key={i}
                  className="text-base text-light-textSecondary dark:text-dark-textSecondary leading-relaxed mb-3 last:mb-0"
                >
                  {p}
                </p>
              ))}

              {section.bullets && section.bullets.length > 0 && (
                <ul className="mt-3 space-y-2.5">
                  {section.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-base text-light-textSecondary dark:text-dark-textSecondary leading-relaxed"
                    >
                      <span
                        className="shrink-0 mt-2.5 w-1.5 h-1.5 rounded-full bg-silk-rose"
                        aria-hidden="true"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.section>
          ))}
        </div>

        {/* Footer links */}
        <div
          aria-hidden="true"
          className="my-12 h-px w-full bg-gradient-to-r from-transparent via-silk-rose/30 to-transparent"
        />

        <nav
          aria-label="Legal pages"
          className="flex flex-wrap gap-x-6 gap-y-2 text-sm"
        >
          <LegalLink to="/privacy">Privacy Policy</LegalLink>
          <LegalLink to="/terms">Terms of Service</LegalLink>
          <LegalLink to="/disclaimer">Disclaimer</LegalLink>
          <LegalLink to="/cookie-policy">Cookie Policy</LegalLink>
          <LegalLink to="/accessibility">Accessibility</LegalLink>
          <LegalLink to="/contact" accent>
            Contact us →
          </LegalLink>
        </nav>
      </article>

      <AdSenseSlot slot="IN_ARTICLE" label="Advertisement" />
    </div>
  );
}

function LegalLink({
  to,
  children,
  accent,
}: {
  to: string;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "transition-colors",
        accent
          ? "text-silk-rose hover:text-silk-wine font-medium"
          : "text-light-textSecondary dark:text-dark-textSecondary hover:text-silk-rose"
      )}
    >
      {children}
    </Link>
  );
}
