import { useEffect } from "react";
import type { Author } from "@data/authors";

const SITE_URL = "https://ahadex.fun";

interface AuthorSchemaProps {
  author: Author;
}

/**
 * AuthorSchema injects the author's JSON-LD Person schema.
 * Runs client-side like the other schema components.
 * For crawler-visible schema see functions/_middleware.ts.
 */
export function AuthorSchema({ author }: AuthorSchemaProps) {
  useEffect(() => {
    if (typeof document === "undefined") return;

    /* SSR-first guard — see ToolSchema.tsx for the rationale. */
    if (document.querySelector('[data-ssr-schema="true"]')) return;

    const id = "ahadex-author-schema";
    document.getElementById(id)?.remove();

    const graph: Record<string, unknown>[] = [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/about/author/${author.id}#person`,
        name: author.name,
        jobTitle: author.role,
        description: author.bio,
        url: `${SITE_URL}/about/author/${author.id}`,
        ...(author.location && {
          address: { "@type": "PostalAddress", addressLocality: author.location },
        }),
        ...(author.sameAs && { sameAs: author.sameAs }),
        worksFor: {
          "@type": "Organization",
          name: "AHADEX Tools",
          url: SITE_URL,
        },
      },
    ];

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": graph,
    });
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [author]);

  return null;
}
