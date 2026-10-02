import { Link } from "react-router-dom";
import { Github, Mail, Heart } from "lucide-react";
import { Logo } from "@components/common/Logo";
import { useLanguage } from "@contexts/LanguageContext";
import { APP_CONFIG } from "@constants/config";

export function Footer() {
  const year = new Date().getFullYear();
  const { t } = useLanguage();

  const sections = [
    {
      title: t.footer.tools,
      links: [
        { to: "/tools", label: t.footer.allTools },
      ],
    },
    {
      title: t.footer.company,
      links: [
        { to: "/about", label: t.nav.about },
        { to: "/contact", label: t.nav.contact },
        { to: APP_CONFIG.github, label: "GitHub", external: true },
      ],
    },
    {
      title: t.footer.legal,
      links: [
        { to: "/privacy", label: t.footer.privacy },
        { to: "/terms", label: t.footer.terms },
        { to: "/disclaimer", label: t.footer.disclaimer },
        { to: "/cookie-policy", label: "Cookies" },
        { to: "/accessibility", label: t.footer.accessibility },
      ],
    },
  ];

  return (
    <footer className="relative mt-24 border-t border-silk-rose/20 bg-gradient-to-b from-transparent to-silk-sand/20 dark:to-dark-surface/40 transition-colors duration-500">
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-silk-rose/60 to-transparent"
      />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-10">
          <div className="col-span-2 md:col-span-1">
            <Logo size="md" />
            <p className="mt-5 text-sm text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
              {t.footer.tagline}
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={APP_CONFIG.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-xl bg-silk-rose/10 border border-silk-rose/25 flex items-center justify-center text-silk-wine dark:text-silk-rose-soft hover:bg-silk-rose/20 hover:-translate-y-0.5 transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${APP_CONFIG.email}`}
                aria-label="Email"
                className="w-9 h-9 rounded-xl bg-silk-rose/10 border border-silk-rose/25 flex items-center justify-center text-silk-wine dark:text-silk-rose-soft hover:bg-silk-rose/20 hover:-translate-y-0.5 transition-all"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="font-display text-xs uppercase tracking-[0.2em] font-bold text-silk-wine dark:text-silk-rose mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) =>
                  "external" in link && link.external ? (
                    <li key={link.to}>
                      <a
                        href={link.to}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-light-textSecondary dark:text-dark-textSecondary hover:text-silk-rose transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ) : (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="text-sm text-light-textSecondary dark:text-dark-textSecondary hover:text-silk-rose transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-silk-rose/15 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-light-textSecondary/70 dark:text-dark-textSecondary/70">
            © {year} AHADEX Tools. {t.footer.copyright}
          </p>
          <div className="flex items-center gap-2 text-xs text-light-textSecondary/70 dark:text-dark-textSecondary/70">
            {t.footer.madeWith}
            <Heart className="w-3.5 h-3.5 text-silk-rose fill-current" />
            {t.footer.forWeb}
          </div>
        </div>
      </div>
    </footer>
  );
}
