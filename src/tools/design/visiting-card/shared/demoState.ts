import type { Template, CardSideState, TextField } from "../types";
import { FONT_SIZE } from "./constants";

/* ============================================================
 * DEMO STATE — for template previews
 * ============================================================ */

export function buildDemoState(template: Template): CardSideState {
  const fields: TextField[] = [
    {
      id: "name",
      label: "Full Name",
      labelBn: "পুরো নাম",
      placeholder: "Jane Doe",
      placeholderBn: "করিম আহমেদ",
      value: "Jane Doe",
      fontSize: FONT_SIZE.name,
      fontWeight: 800,
      color: template.palette.text,
    },
    {
      id: "title",
      label: "Job Title",
      labelBn: "পদবি",
      placeholder: "Product Designer",
      placeholderBn: "প্রোডাক্ট ডিজাইনার",
      value: "Product Designer",
      fontSize: FONT_SIZE.title,
      fontWeight: 500,
      color: template.palette.sub,
    },
    {
      id: "company",
      label: "Company",
      labelBn: "প্রতিষ্ঠান",
      placeholder: "Ahadex Studio",
      placeholderBn: "আহাদেক্স স্টুডিও",
      value: "Ahadex Studio",
      fontSize: FONT_SIZE.company,
      fontWeight: 600,
      color: template.palette.text,
    },
  ];

  return {
    templateId: template.id,
    fields,
    palette: { ...template.palette },
    logo: null,
    photo: null,
    fontFamily: template.fontFamily,
  };
}
