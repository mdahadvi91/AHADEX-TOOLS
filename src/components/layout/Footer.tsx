import { Link } from "react-router-dom";
import { Logo } from "@components/common/Logo";
import { useLanguage } from "@contexts/LanguageContext";

export function Footer() {
  const year = new Date().getFullYear();
  const { t } = useLanguage();

  const sections = [
    {
      title: t.footer.tools,
      links: [
        { to: "/tools", label: t.footer.allTools },
        { to: "/categories/image", label: t.footer.imageTools },
        { to: "/categories/pdf", label: t.footer.pdfTools },
        { to: "/categories/qr", label: t.footer.qrTools },
      ],
    },
    {
      title: t.footer.company,
      links: [
        { to: "/about", label: t.nav.about },
        { to: "/contact", label: t.nav.contact },
      ],
    },
    {
      title: t.footer.legal,
      links: [
        { to: "/privacy", label: t.footer.privacy },
        { to: "/terms", label: t.footer.terms },
      ],
    },
  ];

  return (
    <footer className="relative mt-24 border-t border-silk-rose/20 bg-gradient-to-b from-transparent to-silk-sand/20 dark:to-dark-surface/40 transition-colors duration-500">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Logo size="md" />
            <p className="mt-5 max-w-sm text-sm text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
              {t.footer.tagline}
            </p>
          </div>

          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="font-display text-sm uppercase tracking-widest font-semibold text-silk-wine dark:text-silk-rose mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-light-textSecondary dark:text-dark-textSecondary hover:text-silk-rose transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-silk-rose/15 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-light-textSecondary/70 dark:text-dark-textSecondary/70">
            © {year} AHADEX Tools. {t.footer.copyright}
          </p>
          <p className="text-xs text-light-textSecondary/70 dark:text-dark-textSecondary/70">
            ahadex.fun
          </p>
        </div>
      </div>
    </footer>
  );
}
