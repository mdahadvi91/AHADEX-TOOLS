import type { Template } from "../types";
import { template01 } from "./template-01";
import { template02 } from "./template-02";
import { template03 } from "./template-03";
import { template04 } from "./template-04";
import { template05 } from "./template-05";
import { template06 } from "./template-06";
import { template07 } from "./template-07";
import { template08 } from "./template-08";
import { template09 } from "./template-09";
import { template10 } from "./template-10";
import { template11 } from "./template-11";
import { template12 } from "./template-12";
import { template13 } from "./template-13";
import { template14 } from "./template-14";
import { template15 } from "./template-15";
import { template16 } from "./template-16";
import { template17 } from "./template-17";
import { template18 } from "./template-18";
import { template19 } from "./template-19";
import { template20 } from "./template-20";

export const TEMPLATES: Template[] = [
  template01,
  template02,
  template03,
  template04,
  template05,
  template06,
  template07,
  template08,
  template09,
  template10,
  template11,
  template12,
  template13,
  template14,
  template15,
  template16,
  template17,
  template18,
  template19,
  template20,
];

export const TEMPLATE_COUNT = TEMPLATES.length;

export function getTemplate(id: string): Template {
  return TEMPLATES.find((t) => t.id === id) ?? TEMPLATES[0];
}

export const TEMPLATE_CATEGORIES: Template["category"][] = [
  "luxury",
  "corporate",
  "minimal",
  "creative",
  "technology",
  "elegant",
  "dark",
  "light",
  "nature",
];
