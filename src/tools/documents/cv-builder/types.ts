/* ============================================================
 * CV Builder — Type System
 * ============================================================ */

export type CVPageSize = "A4" | "Letter";

export type CVTemplateCategory =
  | "ats"
  | "executive"
  | "editorial"
  | "creative"
  | "technical"
  | "minimal"
  | "academic"
  | "modern";

/* ------------------------------------------------------------
 * CV DATA MODEL
 * ------------------------------------------------------------ */

export interface CVPersonal {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  photoDataUrl: string | null;
}

export interface CVExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;  // YYYY-MM
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface CVEducation {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface CVSkill {
  id: string;
  name: string;
  level: number; // 1-5; 0 means no level
}

export interface CVProject {
  id: string;
  name: string;
  role: string;
  description: string;
  url: string;
  tech: string;
}

export interface CVCertification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url: string;
}

export interface CVLanguage {
  id: string;
  name: string;
  level: string;
}

export interface CVAward {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
}

export interface CVVolunteer {
  id: string;
  organization: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface CVReference {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
}

export interface CVSettings {
  templateId: string;
  accentColor: string;
  fontFamily: string;
  fontSize: number;        // pt
  sectionSpacing: number;  // mm
  pageMargin: number;      // mm
  pageSize: CVPageSize;
  photoEnabled: boolean;
  photoShape: "circle" | "square" | "rounded";
  showIcons: boolean;
}

export interface CVData {
  personal: CVPersonal;
  summary: string;
  experience: CVExperience[];
  education: CVEducation[];
  skills: CVSkill[];
  projects: CVProject[];
  certifications: CVCertification[];
  languages: CVLanguage[];
  awards: CVAward[];
  volunteer: CVVolunteer[];
  references: CVReference[];
  settings: CVSettings;
}

/* ------------------------------------------------------------
 * TEMPLATE INTERFACES
 * ------------------------------------------------------------ */

export interface CVTemplateProps {
  data: CVData;
}

export interface CVTemplateMeta {
  id: string;
  name: string;
  nameBn: string;
  category: CVTemplateCategory;
  description: string;
  descriptionBn: string;
  Component: React.ComponentType<CVTemplateProps>;
}
