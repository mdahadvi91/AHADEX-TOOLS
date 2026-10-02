export interface FAQItem {
  question: string;
  answer: string;
}

export const homeFaqs: FAQItem[] = [
  {
    question: "Is AHADEX Tools really free?",
    answer:
      "Yes — every tool is 100% free with no hidden limits, no sign-ups, and no subscriptions. The site is supported by non-intrusive advertising.",
  },
  {
    question: "Are my files safe?",
    answer:
      "Absolutely. All tools run directly in your browser using modern web APIs. Your files are never uploaded to our servers, never stored, and never tracked.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No account needed. Just open the site, pick a tool, and use it. Your theme and language preferences are stored locally in your browser.",
  },
  {
    question: "How many tools are available?",
    answer:
      "We currently offer  across six categories: Image, PDF, QR & Barcode, Text, Developer, and Calculators. More tools are added regularly.",
  },
  {
    question: "Does it work on mobile?",
    answer:
      "Yes — AHADEX Tools is fully responsive and works on phones, tablets, and desktops. All tools are touch-friendly.",
  },
  {
    question: "Is there an app?",
    answer:
      "You can install AHADEX Tools as a Progressive Web App (PWA) from your browser menu. It works offline for most tools.",
  },
];

export const contactFaqs: FAQItem[] = [
  {
    question: "How fast will I get a reply?",
    answer:
      "We aim to reply within 24–48 hours. Complex questions might take a little longer.",
  },
  {
    question: "How do I report a bug?",
    answer:
      "Email us with a short description, the tool name, and your browser/device. Screenshots help a lot.",
  },
  {
    question: "Can I suggest a new tool?",
    answer:
      "Absolutely! We love tool suggestions. Send us your idea and the use case — if it fits our privacy-first philosophy, we'll consider building it.",
  },
  {
    question: "Do you offer business partnerships?",
    answer:
      "For business or sponsorship enquiries, email us and mention 'Partnership' in the subject line.",
  },
];
