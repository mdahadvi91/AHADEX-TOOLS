import { useEffect } from "react";
import { APP_CONFIG } from "@constants/config";
import { tools } from "@data/tools";

export function HomeSchema() {
  useEffect(() => {
    if (typeof document === "undefined") return;

    const existing = document.getElementById("ahadex-home-schema");
    if (existing) existing.remove();

    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": `${APP_CONFIG.url}#website`,
          url: APP_CONFIG.url,
          name: APP_CONFIG.name,
          description: APP_CONFIG.description,
          inLanguage: ["en", "bn"],
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${APP_CONFIG.url}/tools?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        },
        {
          "@type": "Organization",
          "@id": `${APP_CONFIG.url}#organization`,
          name: APP_CONFIG.name,
          url: APP_CONFIG.url,
          logo: {
            "@type": "ImageObject",
            url: `${APP_CONFIG.url}/android-chrome-512x512.png`,
            width: 512,
            height: 512,
          },
          sameAs: [
            APP_CONFIG.github,
            "https://twitter.com/ahadex_tools",
          ],
        },
        {
          "@type": "ItemList",
          "@id": `${APP_CONFIG.url}#toollist`,
          name: "AHADEX Tools — Free Online Utilities",
          numberOfItems: tools.length,
          itemListElement: tools.slice(0, 20).map((tool, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${APP_CONFIG.url}${tool.path}`,
            name: tool.name,
          })),
        },
      ],
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "ahadex-home-schema";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
}
