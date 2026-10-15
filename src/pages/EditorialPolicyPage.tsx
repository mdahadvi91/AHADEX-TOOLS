import { motion } from "framer-motion";
import { BookOpen, Mail } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { AdSenseSlot } from "@components/ads/AdSenseSlot";

export default function EditorialPolicyPage() {
  const { language } = useLanguage();
  const bn = language === "bn";

  const content = bn
    ? {
        title: "এডিটোরিয়াল পলিসি",
        updated: "সর্বশেষ আপডেট: অক্টোবর ২০২৬",
        intro:
          "AHADEX Tools-এ প্রকাশিত প্রতিটি লেখা প্রকাশের আগে কঠোর এডিটোরিয়াল স্ট্যান্ডার্ড অনুসরণ করে যাচাই করা হয়। এই পেজে ব্যাখ্যা করা হয়েছে কীভাবে কনটেন্ট তৈরি, রিভিউ ও আপডেট করা হয়।",
        sections: [
          {
            h: "আমাদের প্রতিশ্রুতি",
            p: "প্রতিটি আর্টিকেল সঠিক, সময়োপযোগী এবং পাঠকের জন্য সত্যিকারের উপকারী হওয়ার লক্ষ্যে লেখা হয়। আমরা এমন কোনো কনটেন্ট প্রকাশ করি না যা মিথ্যা, বিভ্রান্তিকর বা ক্ষতিকর।",
          },
          {
            h: "লেখার প্রক্রিয়া",
            p: "প্রতিটি আর্টিকেল প্রথমে একটি টপিক ব্রিফ দিয়ে শুরু হয় — লক্ষ্য পাঠক, সার্চ ইন্টেন্ট এবং মূল প্রশ্ন নির্ধারণ করা হয়। তারপর গবেষণা, লেখা, সম্পাদনা ও প্রুফরিডিং-এর মধ্য দিয়ে যায়। প্রতিটি দাবি যাচাই করা হয় এবং সম্ভব হলে অফিসিয়াল সোর্স রেফারেন্স দেওয়া হয়।",
          },
          {
            h: "রিভিউ ও আপডেট",
            p: "প্রকাশের পর নিয়মিত রিভিউ করা হয়। নতুন তথ্য, বদলে যাওয়া প্রযুক্তি বা পাঠকের ফিডব্যাক অনুযায়ী আপডেট করা হয়। প্রতিটি পেজে 'সর্বশেষ আপডেট' তারিখ উল্লেখ থাকে যাতে পাঠক জানতে পারেন কনটেন্ট কতটা সাম্প্রতিক।",
          },
          {
            h: "কে কনটেন্ট লেখেন",
            p: "AHADEX Tools একটি স্বাধীনভাবে তৈরি প্রকল্প। এই সাইটের প্রতিটি আর্টিকেল সাইটের ডেভেলপার মোহাম্মদ আহাদ নিজে রিসার্চ, লেখা, সম্পাদনা ও রিভিউ করেন। আলাদা কোনো এডিটোরিয়াল টিম নেই, এবং কোনো বেনামী লেখকের নামে কনটেন্ট প্রকাশিত হয় না। রিসার্চ বা প্রথম খসড়ার জন্য AI-সহায়ক টুল ব্যবহার করা হতে পারে, তবে প্রকাশের আগে প্রতিটি দাবি নিজের টেস্ট রানের মাধ্যমে ম্যানুয়ালি যাচাই করা হয়।",
          },
          {
            h: "বিজ্ঞাপন ও স্পন্সরশিপ",
            p: "আমরা Google AdSense এবং নির্দিষ্ট প্রোডাক্ট-রিলেটেড অ্যাফিলিয়েট লিংকের মাধ্যমে আয় করি। বিজ্ঞাপনদাতা বা স্পন্সর কখনো আমাদের কনটেন্টের বিষয়বস্তু, রেটিং বা সিদ্ধান্তকে প্রভাবিত করে না। প্রতিটি অ্যাফিলিয়েট লিংক স্পষ্টভাবে চিহ্নিত থাকে।",
          },
          {
            h: "AI-সহায়ক কনটেন্ট",
            p: "আমরা আধুনিক টুল ব্যবহার করে কনটেন্ট তৈরিতে সহায়তা নিই, তবে প্রতিটি আর্টিকেল মানুষের সম্পাদনা, যাচাই এবং চূড়ান্ত অনুমোদনের মধ্য দিয়ে যায়। AI কখনো নিজে থেকে কিছু প্রকাশ করে না — প্রতিটি শব্দ একজন মানুষের দায়িত্ব।",
          },
          {
            h: "ত্রুটি জানান",
            p: "যদি কোনো আর্টিকেলে ভুল, বিভ্রান্তিকর বা অসম্পূর্ণ তথ্য খুঁজে পান, তাহলে আমাদের জানান। আমরা ৪৮ ঘন্টার মধ্যে যাচাই করব এবং প্রয়োজনে সংশোধন করব।",
          },
        ],
        contact: "এডিটোরিয়াল সংক্রান্ত প্রশ্ন বা সংশোধনের অনুরোধ:",
      }
    : {
        title: "Editorial Policy",
        updated: "Last updated: October 2026",
        intro:
          "Every article published on AHADEX Tools is verified against strict editorial standards before publication. This page explains how content is researched, reviewed, and updated.",
        sections: [
          {
            h: "Our commitment",
            p: "Every article is written to be accurate, current, and genuinely useful to the reader. We do not publish content that is misleading, fabricated, or harmful.",
          },
          {
            h: "The writing process",
            p: "Each article starts with a topic brief — target reader, search intent, and core questions. Then it goes through research, writing, editing, and proofreading. Every claim is verified, and we cite official sources where possible.",
          },
          {
            h: "Review and updates",
            p: "Content is reviewed regularly after publication. It is updated based on new information, technology changes, and reader feedback. Every page shows a 'last updated' date so readers know how current it is.",
          },
          {
            h: "Who writes the content",
            p: "AHADEX Tools is an independently developed project. Every article on this site is researched, written, edited, and reviewed by the site's developer, Mohammad Ahad. There is no separate editorial team or anonymous author pool. AI-assisted tools may be used for research or first-draft support, but every claim is manually verified against our own test runs before publication.",
          },
          {
            h: "Advertising and sponsorship",
            p: "We earn revenue through Google AdSense and select product-related affiliate links. Advertisers or sponsors never influence our content's subject matter, ratings, or decisions. Every affiliate link is clearly disclosed.",
          },
          {
            h: "AI-assisted content",
            p: "AI-assisted tools may be used for research or first-draft support, but every article is manually edited, fact-checked against our own test runs, and finalised by the site's developer before publication. AI never publishes content autonomously, and no claim goes live without being verified.",
          },
          {
            h: "Report an error",
            p: "If you find an error, misleading, or incomplete statement in any article, please let us know. We will verify within 48 hours and correct it if necessary.",
          },
        ],
        contact: "Editorial questions or correction requests:",
      };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="w-11 h-11 rounded-2xl bg-silk-rose/15 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-silk-rose" />
          </span>
          <h1 className="font-serif font-black text-3xl sm:text-4xl text-light-text dark:text-dark-text">
            {content.title}
          </h1>
        </div>
        <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary mb-8">
          {content.updated}
        </p>

        <p className="text-[14px] sm:text-[15px] text-light-textSecondary dark:text-dark-textSecondary leading-relaxed mb-8">
          {content.intro}
        </p>

        <div className="space-y-6">
          {content.sections.map((s, i) => (
            <motion.section
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 + i * 0.05 }}
            >
              <h2 className="font-serif font-bold text-lg sm:text-xl text-light-text dark:text-dark-text mb-2">
                {s.h}
              </h2>
              <p className="text-[13px] sm:text-[14px] text-lightTextSecondary dark:text-dark-textSecondary leading-relaxed">
                {s.p}
              </p>
            </motion.section>
          ))}
        </div>

        <div className="mt-10 p-5 rounded-2xl bg-silk-rose/5 border border-silk-rose/20 flex items-start gap-3">
          <Mail className="w-5 h-5 text-silk-rose shrink-0 mt-0.5" />
          <div>
            <p className="text-[13px] font-semibold text-light-text dark:text-dark-text mb-1">
              {content.contact}
            </p>
            <a
              href="mailto:mdahadvi91@gmail.com"
              className="text-[13px] text-silk-wine dark:text-silk-rose-soft hover:underline"
            >
              mdahadvi91@gmail.com
            </a>
          </div>
        </div>
      </motion.div>
      <AdSenseSlot slot="IN_ARTICLE" label="Advertisement" />
    </div>
  );
}
