/* ============================================================
 * AHADEX Tools — Author profiles
 * ------------------------------------------------------------
 * Single source of truth for who writes the content on this
 * site. Every blog post references one of these by id. The
 * author page and blog post schema both pull from here.
 * ============================================================ */

export interface Author {
  /** Stable identifier used in blog data and URLs. */
  id: string;
  /** Full display name. */
  name: string;
  /** Short role line, e.g. "Founder & Developer". */
  role: string;
  /** One-paragraph bio used in cards and the author page. */
  bio: string;
  /** Bengali bio used when the page is rendered in Bengali. */
  bioBn: string;
  /** Optional location string. */
  location?: string;
  /** Optional email for contact. */
  email?: string;
  /** Optional external profiles. */
  sameAs?: string[];
}

export const authors: Record<string, Author> = {
  "mohammad-ahad": {
    id: "mohammad-ahad",
    name: "Mohammad Ahad",
    role: "Founder & Developer",
    bio:
      "Mohammad Ahad is the founder of AHADEX Tools and the developer behind every browser-based utility on this site. He builds free, private, client-side tools for everyday digital work — image conversion, PDF handling, developer helpers — and writes the technical guides that accompany them. Based in Dubai, UAE.",
    bioBn:
      "মোহাম্মদ আহাদ AHADEX Tools-এর প্রতিষ্ঠাতা এবং এই সাইটের প্রতিটি ব্রাউজার-বেইজড টুলের ডেভেলপার। তিনি দৈনন্দিন ডিজিটাল কাজের জন্য ফ্রি, প্রাইভেট, ক্লায়েন্ট-সাইড টুল তৈরি করেন — ইমেজ কনভার্সন, PDF হ্যান্ডলিং, ডেভেলপার হেল্পার — এবং সেগুলোর সাথে থাকা টেকনিক্যাল গাইড লেখেন। দুবাই, সংযুক্ত আরব আমিরাতে অবস্থিত।",
    location: "Dubai, United Arab Emirates",
    email: "mdahadvi91@gmail.com",
    sameAs: [
      "https://github.com/mdahadvi91",
    ],
  },
};

/** Default author for content that does not specify one. */
export const DEFAULT_AUTHOR_ID = "mohammad-ahad";

/** Lookup helper. Returns the default author if the id is unknown. */
export function getAuthor(id?: string): Author {
  if (id && authors[id]) return authors[id];
  return authors[DEFAULT_AUTHOR_ID];
}
