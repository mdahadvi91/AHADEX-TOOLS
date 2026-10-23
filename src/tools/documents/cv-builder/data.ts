import { ATSCleanline } from "./templates/ATSCleanline";
import { EditorialColumn } from "./templates/EditorialColumn";
import { ExecutiveElite } from "./templates/ExecutiveElite";
import { MinimalSignature } from "./templates/MinimalSignature";
import type { CVData } from "./types";

export const SAMPLE_CV_DATA: CVData = {
  personal: {
    fullName: "Alex Morgan",
    jobTitle: "Software Engineer",
    email: "alex@example.com",
    phone: "",
    location: "Dhaka, Bangladesh",
    website: "",
    linkedin: "",
    github: "",
    photoDataUrl: null,
  },

  summary:
    "Software engineer with experience building web applications and working with modern JavaScript technologies.",

  experience: [
    {
      id: "exp-1",
      company: "Tech Company",
      position: "Software Developer",
      location: "Dhaka, Bangladesh",
      startDate: "2020-01",
      endDate: "",
      current: true,
      bullets: [
        "Developed and maintained web application features.",
        "Worked with a team to improve application quality and usability.",
      ],
    },
    {
      id: "exp-2",
      company: "Web Solutions",
      position: "Junior Developer",
      location: "Dhaka, Bangladesh",
      startDate: "2018-01",
      endDate: "2019-12",
      current: false,
      bullets: [
        "Assisted with website development and maintenance.",
      ],
    },
  ],

  education: [
    {
      id: "edu-1",
      institution: "University of Dhaka",
      degree: "Bachelor of Science",
      field: "Computer Science",
      location: "Dhaka, Bangladesh",
      startDate: "2014-01",
      endDate: "2018-12",
      description: "",
    },
  ],

  skills: [
    { id: "skill-1", name: "JavaScript", level: 4 },
    { id: "skill-2", name: "React", level: 4 },
    { id: "skill-3", name: "Node.js", level: 3 },
    { id: "skill-4", name: "TypeScript", level: 3 },
    { id: "skill-5", name: "CSS", level: 4 },
  ],

  projects: [],
  certifications: [],

  languages: [
    { id: "lang-1", name: "English", level: "Professional" },
    { id: "lang-2", name: "Bengali", level: "Native" },
  ],

  awards: [],
  volunteer: [],
  references: [],
  hobbies: ["Coding", "Reading"],

  settings: {
    templateId: "cv-ats-cleanline",
    accentColor: "#2563eb",
    fontFamily: "sans",
    fontSize: 11,
    sectionSpacing: 6,
    pageMargin: 15,
    pageSize: "A4",
    photoEnabled: false,
    photoShape: "circle",
    showIcons: true,
  },
};

export const CV_TEMPLATES = [
  {
    id: "cv-ats-cleanline",
    name: "ATS Cleanline",
    nameBn: "এটিএস ক্লিনলাইন",
    category: "Professional",
    Component: ATSCleanline,
    description:
      "A clean, single-column layout designed for ATS compatibility.",
  },
  {
    id: "cv-editorial-column",
    name: "Editorial Column",
    nameBn: "এডিটোরিয়াল কলাম",
    category: "Creative",
    Component: EditorialColumn,
    description:
      "A modern two-column layout for creative and marketing roles.",
  },
  {
    id: "cv-executive-elite",
    name: "Executive Elite",
    nameBn: "এক্সিকিউটিভ এলিট",
    category: "Corporate",
    Component: ExecutiveElite,
    description:
      "A navy sidebar layout for senior management and corporate roles.",
  },
  {
    id: "cv-minimal-signature",
    name: "Minimal Signature",
    nameBn: "মিনিমাল সিগনেচার",
    category: "Minimal",
    Component: MinimalSignature,
    description:
      "A minimalist layout focused on clarity and readability.",
  },
];

export function getCVTemplate(id: string) {
  return CV_TEMPLATES.find((t) => t.id === id) || CV_TEMPLATES[0];
}
