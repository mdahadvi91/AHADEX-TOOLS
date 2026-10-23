import { ATSCleanline } from "./templates/ATSCleanline";
import { EditorialColumn } from "./templates/EditorialColumn";
import { ExecutiveElite } from "./templates/ExecutiveElite";
import { MinimalSignature } from "./templates/MinimalSignature";
import type { CVData } from "./types";

export const SAMPLE_CV_DATA: CVData = {
  personal: {
    fullName: "Md. Ahadvi",
    jobTitle: "Software Engineer",
    email: "ahadvi@gmail.com",
    phone: "+880 123 456 789",
    website: "www.ahadex.fun",
    location: "Dhaka, Bangladesh",
    photoDataUrl: null,
    photoEnabled: false,
  },
  summary: "Passionate software engineer with 5+ years of experience building scalable web applications.",
  experience: [
    { company: "Tech Corp", position: "Senior Developer", year: "2020 - Present" },
    { company: "Web Solutions", position: "Junior Developer", year: "2018 - 2020" }
  ],
  education: [
    { institution: "University of Dhaka", degree: "BSc in Computer Science", year: "2014 - 2018" }
  ],
  skills: ["JavaScript", "React", "Node.js", "TypeScript", "Tailwind CSS"],
  languages: ["English", "Bengali"],
  hobbies: ["Coding", "Reading"],
  settings: {
    templateId: "cv-ats-cleanline",
    pageSize: "A4",
    fontFamily: "sans",
    fontSize: 11,
    photoEnabled: false,
  }
};

export const CV_TEMPLATES = [
  {
    id: "cv-ats-cleanline",
    name: "ATS Cleanline",
    nameBn: "এটিএস ক্লিনলাইন",
    category: "Professional",
    Component: ATSCleanline,
    description: "A clean, single-column layout designed for maximum ATS compatibility.", // 🚨 Perfect removed
  },
  {
    id: "cv-editorial-column",
    name: "Editorial Column",
    nameBn: "এডিটোরিয়াল কলাম",
    category: "Creative",
    Component: EditorialColumn,
    description: "A modern two-column layout well-suited for creative roles and marketing.", // 🚨 Perfect removed
  },
  {
    id: "cv-executive-elite",
    name: "Executive Elite",
    nameBn: "এক্সিকিউটিভ এলিট",
    category: "Corporate",
    Component: ExecutiveElite,
    description: "A bold navy sidebar layout well-suited for senior management and corporate roles.", // 🚨 Perfect removed
  },
  {
    id: "cv-minimal-signature",
    name: "Minimal Signature",
    nameBn: "মিনিমাল সিগনেচার",
    category: "Minimal",
    Component: MinimalSignature,
    description: "A minimalist, elegant design designed for clarity and readability.", // 🚨 Perfect removed
  }
];

export function getCVTemplate(id: string) {
  return CV_TEMPLATES.find((t) => t.id === id) || CV_TEMPLATES[0];
}
