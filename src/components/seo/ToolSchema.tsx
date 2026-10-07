import { useEffect } from "react";
import { useLanguage } from "@contexts/LanguageContext";
import { tools } from "@data/tools";
import { getToolTranslation } from "@i18n/toolTranslations";

const SITE_URL = "https://ahadex.fun";
const SITE_NAME = "AHADEX Tools";

interface ToolSchemaProps {
  toolId: string;
}

export function ToolSchema({ toolId }: ToolSchemaProps) {
  const { language } = useLanguage();

  useEffect(() => {
    if (typeof document === "undefined") return;

    const tool = tools.find((t) => t.id === toolId);
    if (!tool) return;

    const translated = getToolTranslation(toolId, language, {
      name: tool.name,
      description: tool.description,
    });

    const canonical = `${SITE_URL}${tool.path}`;
    const ogImage = tool.seo.ogImage.startsWith("http")
      ? tool.seo.ogImage
      : `${SITE_URL}${tool.seo.ogImage}`;

    // ── Build @graph ──
    const graph: Record<string, unknown>[] = [
      // SoftwareApplication (rich result)
      {
        "@type": "SoftwareApplication",
        "@id": `${canonical}#app`,
        name: translated.name,
        description: tool.seo.description,
        url: canonical,
        applicationCategory: "WebApplication",
        operatingSystem: "Any (Browser)",
        browserRequirements: "Requires JavaScript",
        isAccessibleForFree: true,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        image: ogImage,
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
        featureList: tool.features.map((f) => f.title),
      },
      // BreadcrumbList
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Tools",
            item: `${SITE_URL}/tools`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: translated.name,
            item: canonical,
          },
        ],
      },
    ];

    // FAQPage (if there are FAQs)
    if (tool.faq.length > 0) {
      graph.push({
        "@type": "FAQPage",
        "@id": `${canonical}#faq`,
        mainEntity: tool.faq.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.answer,
          },
        })),
      });
    }

    // HowTo (if there are steps)
    if (tool.howTo.length > 0) {
      graph.push({
        "@type": "HowTo",
        "@id": `${canonical}#howto`,
        name: `How to use ${translated.name}`,
        step: tool.howTo.map((s) => ({
          "@type": "HowToStep",
          position: s.step,
          name: s.title,
          text: s.description,
        })),
      });
    }

    const schema = {
      "@context": "https://schema.org",
      "@graph": graph,
    };

    // Remove any previous injection
    const id = `ahadex-schema-${toolId}`;
    document.getElementById(id)?.remove();

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [toolId, language]);

  return null;
}
