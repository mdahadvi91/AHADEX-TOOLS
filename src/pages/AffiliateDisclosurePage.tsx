import { motion } from "framer-motion";
import { Handshake, Mail } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { AdsterraNativeBanner } from "@components/ads/AdsterraNativeBanner";

export default function AffiliateDisclosurePage() {
  const { language } = useLanguage();
  const bn = language === "bn";

  const content = bn
    ? {
        title: "অ্যাফিলিয়েট ডিসক্লোজার",
        updated: "সর্বশেষ আপডেট: অক্টোবর ২০২৫",
        intro:
          "AHADEX Tools (ahadex.fun) স্বচ্ছতা ও বিশ্বাসের ওপর দাঁড়িয়ে আছে। এই পেজে আমরা ব্যাখ্যা করছি কীভাবে আমরা কিছু লিংক থেকে কমিশন পাই — এবং কেন এটি আপনার জন্য কোনো বাড়তি খরচ নয়।",
        sections: [
          {
            h: "আমরা কী করি",
            p: "আমাদের ওয়েবসাইটের কিছু পেজে আমরা তৃতীয় পক্ষের প্রোডাক্ট বা সার্ভিসের লিংক যুক্ত করি। আপনি যদি সেই লিংকে ক্লিক করে কিছু কিনেন, তাহলে আমরা একটি ছোট কমিশন পাই — কিন্তু আপনার দাম অপরিবর্তিত থাকে।",
          },
          {
            h: "কোন প্রোগ্রামে অংশ নিই",
            p: "আমরা Amazon Associates, Impact, ShareASale, CJ, এবং সরাসরি ব্র্যান্ড অ্যাফিলিয়েট প্রোগ্রামে অংশ নিই। প্রতিটি লিংকের সাথে 'sponsored' অ্যাট্রিবিউট যোগ করা থাকে।",
          },
          {
            h: "আমাদের প্রতিশ্রুতি",
            p: "আমরা শুধু সেই প্রোডাক্ট সুপারিশ করি যেগুলো সত্যিই আপনার কাজে আসতে পারে। কোনো কোম্পানির কাছ থেকে টাকা নিয়ে আমরা মিথ্যা রিভিউ বা অসৎ সুপারিশ করি না।",
          },
          {
            h: "আপনার কী করা উচিত",
            p: "কেনার আগে সবসময় দাম, রিভিউ, এবং শর্তাদি যাচাই করুন। আমরা প্রোডাক্টের গুণমান বা ডেলিভারির জন্য দায়ী নই — সেটি বিক্রেতার দায়িত্ব।",
          },
          {
            h: "AdSense ও অন্যান্য বিজ্ঞাপন",
            p: "Google AdSense ছাড়াও আমরা অন্যান্য ডিসপ্লে বিজ্ঞাপন দেখাই। বিজ্ঞাপনদাতা কী দেখাবেন তা আমরা নিয়ন্ত্রণ করি না, তবে আমরা অশ্লীল বা প্রতারণামূলক বিজ্ঞাপন ব্লক করার চেষ্টা করি।",
          },
        ],
        contact: "কোনো প্রশ্ন থাকলে যোগাযোগ করুন:",
      }
    : {
        title: "Affiliate Disclosure",
        updated: "Last updated: October 2025",
        intro:
          "AHADEX Tools (ahadex.fun) is built on transparency and trust. This page explains how we earn commissions from some links — and why it costs you nothing extra.",
        sections: [
          {
            h: "What we do",
            p: "Some pages on our website include links to third-party products or services. If you click one of those links and make a purchase, we may earn a small commission — but your price stays exactly the same.",
          },
          {
            h: "Programs we participate in",
            p: "We participate in Amazon Associates, Impact, ShareASale, CJ, and direct brand affiliate programs. Every affiliate link is marked with the 'sponsored' attribute.",
          },
          {
            h: "Our commitment",
            p: "We only recommend products that are genuinely useful for the task at hand. We do not accept money to post fake reviews or dishonest recommendations.",
          },
          {
            h: "What you should do",
            p: "Always verify prices, reviews, and terms before purchasing. We are not responsible for product quality or delivery — that is the seller's responsibility.",
          },
          {
            h: "AdSense & other ads",
            p: "In addition to Google AdSense, we display other third-party display ads. We do not control what advertisers show, but we work to block obscene or deceptive ads.",
          },
        ],
        contact: "Questions? Reach out at:",
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
            <Handshake className="w-5 h-5 text-silk-rose" />
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-light-text dark:text-dark-text">
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
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
            >
              <h2 className="font-display font-bold text-lg sm:text-xl text-light-text dark:text-dark-text mb-2">
                {s.h}
              </h2>
              <p className="text-[13px] sm:text-[14px] text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
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
      <AdsterraNativeBanner />
    </div>
  );
}
