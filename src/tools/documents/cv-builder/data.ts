import type { CVData, CVTemplateMeta } from "./types";
import { ATSCleanline } from "./templates/ATSCleanline";
import { ExecutiveMonolith } from "./templates/ExecutiveMonolith";
import { EditorialColumn } from "./templates/EditorialColumn";
import { MidnightGrid } from "./templates/MidnightGrid";
import { Architect } from "./templates/Architect";
import { CreativePoster } from "./templates/CreativePoster";
import { NordicBalance } from "./templates/NordicBalance";
import { DataPulse } from "./templates/DataPulse";
import { Timeline } from "./templates/Timeline";
import { PortfolioFrame } from "./templates/PortfolioFrame";
import { ConsultantBrief } from "./templates/ConsultantBrief";
import { SplitIdentity } from "./templates/SplitIdentity";
import { MinimalSignature } from "./templates/MinimalSignature";
import { TechMatrix } from "./templates/TechMatrix";
import { HumanStory } from "./templates/HumanStory";
import { Blueprint } from "./templates/Blueprint";
import { MonochromeClassic } from "./templates/MonochromeClassic";
import { CareerMap } from "./templates/CareerMap";
import { ModernCardstack } from "./templates/ModernCardstack";
import { FutureHorizon } from "./templates/FutureHorizon";
import {
  DEFAULT_FONT_SIZE, DEFAULT_PAGE_MARGIN, DEFAULT_SECTION_SPACING,
} from "./constants";

export const CV_TEMPLATES: CVTemplateMeta[] = [
  { id: "cv-ats-cleanline", name: "ATS Cleanline", nameBn: "ATS ক্লিনলাইন", category: "ats", description: "Extremely clean, single-column, ATS-friendly layout.", descriptionBn: "অত্যন্ত পরিষ্কার, ATS-বান্ধব।", Component: ATSCleanline },
  { id: "cv-executive-monolith", name: "Executive Monolith", nameBn: "এক্সিকিউটিভ মনোলিথ", category: "executive", description: "Premium executive layout with identity rail.", descriptionBn: "প্রিমিয়াম এক্সিকিউটিভ লেআউট।", Component: ExecutiveMonolith },
  { id: "cv-editorial-column", name: "Editorial Column", nameBn: "এডিটোরিয়াল কলাম", category: "editorial", description: "Magazine-inspired asymmetric layout.", descriptionBn: "ম্যাগাজিন-অনুপ্রাণিত।", Component: EditorialColumn },
  { id: "cv-midnight-grid", name: "Midnight Grid", nameBn: "মিডনাইট গ্রিড", category: "modern", description: "Modular grid with bold colored header band.", descriptionBn: "মডুলার গ্রিড।", Component: MidnightGrid },
  { id: "cv-architect", name: "Architect", nameBn: "আর্কিটেক্ট", category: "technical", description: "Precise grid, numbered sections.", descriptionBn: "নির্ভুল গ্রিড।", Component: Architect },
  { id: "cv-creative-poster", name: "Creative Poster", nameBn: "ক্রিয়েটিভ পোস্টার", category: "creative", description: "Bold portfolio-style layout.", descriptionBn: "বোল্ড পোর্টফোলিও।", Component: CreativePoster },
  { id: "cv-nordic-balance", name: "Nordic Balance", nameBn: "নর্ডিক ব্যালেন্স", category: "minimal", description: "Scandinavian calm, soft blocks.", descriptionBn: "স্ক্যান্ডিনেভিয়ান শান্ত।", Component: NordicBalance },
  { id: "cv-data-pulse", name: "Data Pulse", nameBn: "ডেটা পালস", category: "technical", description: "Dashboard-inspired with metric cards.", descriptionBn: "ড্যাশবোর্ড স্টাইল।", Component: DataPulse },
  { id: "cv-timeline", name: "Timeline", nameBn: "টাইমলাইন", category: "editorial", description: "Central vertical timeline.", descriptionBn: "কেন্দ্রীয় টাইমলাইন।", Component: Timeline },
  { id: "cv-portfolio-frame", name: "Portfolio Frame", nameBn: "পোর্টফোলিও ফ্রেম", category: "creative", description: "Portfolio-first with project cards.", descriptionBn: "পোর্টফোলিও-প্রধান।", Component: PortfolioFrame },
  { id: "cv-consultant-brief", name: "Consultant Brief", nameBn: "কনসালট্যান্ট ব্রিফ", category: "executive", description: "Consulting-report aesthetic.", descriptionBn: "কনসাল্টিং রিপোর্ট।", Component: ConsultantBrief },
  { id: "cv-split-identity", name: "Split Identity", nameBn: "স্প্লিট আইডেন্টিটি", category: "modern", description: "Split-screen identity panel.", descriptionBn: "স্প্লিট-স্ক্রিন প্যানেল।", Component: SplitIdentity },
  { id: "cv-minimal-signature", name: "Minimal Signature", nameBn: "মিনিমাল সিগনেচার", category: "minimal", description: "Luxury minimalist with script.", descriptionBn: "লাক্সারি মিনিমাল।", Component: MinimalSignature },
  { id: "cv-tech-matrix", name: "Tech Matrix", nameBn: "টেক ম্যাট্রিক্স", category: "technical", description: "Developer dashboard with code labels.", descriptionBn: "ডেভেলপার ড্যাশবোর্ড।", Component: TechMatrix },
  { id: "cv-human-story", name: "Human Story", nameBn: "হিউম্যান স্টোরি", category: "editorial", description: "Warm narrative profile layout.", descriptionBn: "উষ্ণ ন্যারেটিভ লেআউট।", Component: HumanStory },
  { id: "cv-blueprint", name: "Blueprint", nameBn: "ব্লুপ্রিন্ট", category: "technical", description: "Technical blueprint with numbered modules.", descriptionBn: "টেকনিক্যাল ব্লুপ্রিন্ট।", Component: Blueprint },
  { id: "cv-monochrome-classic", name: "Monochrome Classic", nameBn: "মনোক্রোম ক্লাসিক", category: "academic", description: "Black-and-white with serif headings.", descriptionBn: "সাদা-কালো সেরিফ।", Component: MonochromeClassic },
  { id: "cv-career-map", name: "Career Map", nameBn: "ক্যারিয়ার ম্যাপ", category: "executive", description: "Career journey with milestone timeline.", descriptionBn: "ক্যারিয়ার যাত্রা ম্যাপ।", Component: CareerMap },
  { id: "cv-modern-cardstack", name: "Modern Cardstack", nameBn: "মডার্ন কার্ডস্ট্যাক", category: "modern", description: "Layered card sections with subtle shadows.", descriptionBn: "লেয়ারড কার্ড সেকশন।", Component: ModernCardstack },
  { id: "cv-future-horizon", name: "Future Horizon", nameBn: "ফিউচার হরাইজন", category: "creative", description: "Futuristic professional with glowing accents.", descriptionBn: "ভবিষ্যত-মুখী প্রফেশনাল।", Component: FutureHorizon },
];

export const CV_TEMPLATE_COUNT = CV_TEMPLATES.length;

export function getCVTemplate(id: string): CVTemplateMeta {
  return CV_TEMPLATES.find((t) => t.id === id) ?? CV_TEMPLATES[0];
}

export const SAMPLE_CV_DATA: CVData = {
  personal: { fullName: "Imran Hossain", jobTitle: "Software Engineer", email: "imran@example.com", phone: "+880 1700 000000", location: "Dhaka, Bangladesh", website: "imranhossain.dev", linkedin: "linkedin.com/in/imranhossain", github: "github.com/imranhossain", photoDataUrl: null },
  summary: "Software engineer with 5 years of experience building web applications, internal tools, and API integrations. Focused on shipping reliable, maintainable code and improving developer workflows.",
  experience: [
    { id: "exp-1", company: "CloudBridge", position: "Software Engineer", location: "Dhaka", startDate: "2021-01", endDate: "", current: true, bullets: ["Developed production web applications using React and TypeScript.", "Improved API response handling and reduced error rate by 30%.", "Mentored two junior developers on code review practices."] },
    { id: "exp-2", company: "ByteWorks", position: "Junior Developer", location: "Dhaka", startDate: "2019-06", endDate: "2020-12", current: false, bullets: ["Built internal dashboards for operations teams.", "Wrote integration tests for core payment flows."] },
  ],
  education: [{ id: "edu-1", institution: "Dhaka University", degree: "BSc", field: "Computer Science", location: "Dhaka", startDate: "2015", endDate: "2019", description: "" }],
  skills: [
    { id: "sk-1", name: "JavaScript", level: 5 }, { id: "sk-2", name: "TypeScript", level: 5 },
    { id: "sk-3", name: "React", level: 5 }, { id: "sk-4", name: "Node.js", level: 4 },
    { id: "sk-5", name: "SQL", level: 4 }, { id: "sk-6", name: "Git", level: 5 },
  ],
  projects: [{ id: "pr-1", name: "Atlas Dashboard", role: "Lead Developer", description: "Reusable dashboard component library for internal tools.", url: "github.com/imran/atlas", tech: "React · TypeScript · REST API" }],
  certifications: [],
  languages: [{ id: "lang-1", name: "English", level: "Fluent" }, { id: "lang-2", name: "Bangla", level: "Native" }],
  awards: [], volunteer: [], references: [],
  settings: { templateId: "cv-ats-cleanline", accentColor: "#334155", fontFamily: "Inter", fontSize: DEFAULT_FONT_SIZE, sectionSpacing: DEFAULT_SECTION_SPACING, pageMargin: DEFAULT_PAGE_MARGIN, pageSize: "A4", photoEnabled: false, photoShape: "circle", showIcons: false },
};

export const EMPTY_CV_DATA: CVData = {
  personal: { fullName: "", jobTitle: "", email: "", phone: "", location: "", website: "", linkedin: "", github: "", photoDataUrl: null },
  summary: "", experience: [], education: [], skills: [], projects: [], certifications: [], languages: [], awards: [], volunteer: [], references: [],
  settings: { templateId: "cv-ats-cleanline", accentColor: "#334155", fontFamily: "Inter", fontSize: DEFAULT_FONT_SIZE, sectionSpacing: DEFAULT_SECTION_SPACING, pageMargin: DEFAULT_PAGE_MARGIN, pageSize: "A4", photoEnabled: false, photoShape: "circle", showIcons: false },
};
