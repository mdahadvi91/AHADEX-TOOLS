import { useParams, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Github } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { authors } from "@data/authors";

const SITE_URL = "https://ahadex.fun";

export default function AuthorPage() {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const bn = language === "bn";

  const author = id && authors[id] ? authors[id] : null;

  /* ── JSON-LD Person schema ── */
  useEffect(() => {
    if (!author || typeof document === "undefined") return;

    /* SSR-first guard — middleware already injects canonical schema. */
    if (document.querySelector('[data-ssr-schema="true"]')) return;

    const schemaId = "ahadex-author-page-schema";
    document.getElementById(schemaId)?.remove();

    const schema = {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      mainEntity: {
        "@type": "Person",
        "@id": `${SITE_URL}/about/author/${author.id}#person`,
        name: author.name,
        jobTitle: author.role,
        description: author.bio,
        url: `${SITE_URL}/about/author/${author.id}`,
        ...(author.location && {
          address: {
            "@type": "PostalAddress",
            addressLocality: author.location,
          },
        }),
        ...(author.sameAs && { sameAs: author.sameAs }),
        worksFor: {
          "@type": "Organization",
          name: "AHADEX Tools",
          url: SITE_URL,
        },
      },
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = schemaId;
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    // Also update page title + meta
    document.title = `${author.name} — ${author.role} | AHADEX Tools`;
    let metaDesc = document.head.querySelector<HTMLMetaElement>(
      'meta[name="description"]'
    );
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", author.bio);

    let canonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute(
      "href",
      `${SITE_URL}/about/author/${author.id}`
    );

    return () => {
      script.remove();
    };
  }, [author]);

  if (!author) {
    return <Navigate to="/404" replace />;
  }
return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <div className="flex items-start gap-5 mb-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-silk-rose via-silk-rose-deep to-silk-wine flex items-center justify-center text-white font-black text-3xl shrink-0">
            {author.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-silk-wine dark:text-silk-rose-soft mb-2">
              {bn ? "লেখক প্রোফাইল" : "Author profile"}
            </p>
            <h1 className="font-serif font-black text-3xl sm:text-4xl text-light-text dark:text-dark-text mb-2">
              {author.name}
            </h1>
            <p className="text-[15px] font-medium text-silk-wine dark:text-silk-rose-soft">
              {author.role}
            </p>
          </div>
        </div>

        <p className="text-[15px] text-light-textSecondary dark:text-dark-textSecondary leading-relaxed mb-5">
          {bn ? author.bioBn : author.bio}
        </p>

        <div className="flex flex-wrap items-center gap-3 text-[12px] text-light-textSecondary dark:text-dark-textSecondary">
          {author.location && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {author.location}
            </span>
          )}
          {author.email && (
            <a
              href={`mailto:${author.email}`}
              className="inline-flex items-center gap-1.5 hover:text-silk-wine dark:hover:text-silk-rose-soft transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              {author.email}
            </a>
          )}
          {author.sameAs?.map((url) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-silk-wine dark:hover:text-silk-rose-soft transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              {url.replace("https://", "")}
            </a>
          ))}
        </div>
      </motion.header>
    </article>
  );
}
