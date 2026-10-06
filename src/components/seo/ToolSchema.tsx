import { useEffect } from "react";
import { APP_CONFIG } from "@constants/config";

interface ToolSchemaProps {
  toolId: string;
  name: string;
  description: string;
  path: string;
  faqs?: { question: string; answer: string }[];
  howToSteps?: { title: string; description: string }[];
}

export function ToolSchema({
  toolId,
  name,
  description,
  path,
  faqs,
  howToSteps,
}: ToolSchemaProps) {
  useEffect(() => {
    if (typeof document === "undefined") return;

    const id = `ahadex-tool-schema-${toolId}`;
    const existing = document.getElementById(id);
    if (existing) existing.remove();

    const fullUrl = `${APP_CONFIG.url}${path}`;
    const graph: Record<string, unknown>[] = [
      {
        "@type": "BreadcrumbList",
        "@id": `${fullUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: APP_CONFIG.url },
          { "@type": "ListItem", position: 2, name: "Tools", item: `${APP_CONFIG.url}/tools` },
          { "@type": "ListItem", position: 3, name, item: fullUrl },
        ],
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${fullUrl}#app`,
        name,
        description,
        url: fullUrl,
        applicationCategory: "WebApplication",
        operatingSystem: "Any (Browser)",
        browserRequirements: "Requires JavaScript",
        isAccessibleForFree: true,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        publisher: {
          "@type": "Organization",
          name: APP_CONFIG.name,
          url: APP_CONFIG.url,
        },
      },
    ];

    if (faqs && faqs.length > 0) {
      graph.push({
        "@type": "FAQPage",
        "@id": `${fullUrl}#faq`,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.answer,
          },
        })),
      });
    }

    if (howToSteps && howToSteps.length > 0) {
      graph.push({
        "@type": "HowTo",
        "@id": `${fullUrl}#howto`,
        name: `How to use ${name}`,
        step: howToSteps.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.title,
          text: s.description,
        })),
      });
    }

    const schema = {
      "@context": "https://schema.org",
      "@graph": graph,
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [toolId, name, description, path, faqs, howToSteps]);

  return null;
}
