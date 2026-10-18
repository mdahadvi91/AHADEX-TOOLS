import { AdSenseSlot } from "@components/ads/AdSenseSlot";
import { ToolsShowcase } from "@components/tools/ToolsShowcase";
import { HowItWorks } from "@components/home/HowItWorks";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { tools } from "@data/tools";

/**
 * ToolsIndexPage — the tool directory.
 * Distinct from HomePage: this page is the complete, searchable
 * catalogue of every tool with filters, search, and the full grid.
 * The marketing narrative (brand story, featured picks, why AHADEX)
 * lives on the homepage.
 */
export default function ToolsIndexPage() {
  const { language } = useLanguage();
  const bn = language === "bn";

  return (
    <>
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary hover:text-silk-rose transition-colors mb-5 sm:mb-7"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {bn ? "হোম" : "Home"}
        </Link>

        {/* Compact header */}
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-8 sm:mb-12"
        >
          <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-silk-wine dark:text-silk-rose-soft mb-3">
            {bn ? "টুল ডিরেক্টরি" : "Tool directory"}
          </p>
          <h1 className="font-serif font-black text-[2rem] leading-[1.1] sm:text-4xl lg:text-5xl tracking-tight text-light-text dark:text-dark-text mb-4">
            {bn ? (
              <>
                সব <span className="text-silk-rose">{tools.length}টি</span> টুল
              </>
            ) : (
              <>
                All <span className="text-silk-rose">{tools.length}</span> tools
              </>
            )}
          </h1>
          <p className="text-[14px] sm:text-base text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
            {bn
              ? "ছবি, PDF, টেক্সট, ডেভেলপার, QR কোড এবং ডিজাইন — সব টুল এক জায়গায়। সার্চ দিয়ে দ্রুত খুঁজুন, অথবা ক্যাটাগরি অনুযায়ী ব্রাউজ করুন।"
              : "Image, PDF, text, developer, QR, and design — every tool in one place. Search to find one quickly, or browse by category."}
          </p>
        </motion.header>
      </div>

      {/* Full showcase — hero + search + full grid */}
      <ToolsShowcase />

      {/* Ad after content */}
      <div className="max-w-5xl mx-auto px-4 mb-8">
        <AdSenseSlot slot="HEADER" label="Advertisement" />
      </div>

      {/* How to choose guide */}
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <h2 className="font-serif font-black text-2xl sm:text-3xl text-light-text dark:text-dark-text mb-6">
            {bn ? "কোন টুল কখন ব্যবহার করবেন" : "Which tool to use when"}
          </h2>
          <div className="space-y-4 text-[14px] sm:text-[15px] text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
            <p>
              <strong className="text-light-text dark:text-dark-text">
                {bn ? "ছবি নিয়ে কাজ করছেন?" : "Working with images?"}
              </strong>{" "}
              {bn
                ? "নতুন ফরম্যাট দরকার হলে Image Converter, ফাইল ছোট করতে হলে Image Compressor, সঠিক মাপে আনতে হলে Image Resizer।"
                : "Use Image Converter for a different format, Image Compressor to shrink file size, or Image Resizer to hit exact dimensions."}
            </p>
            <p>
              <strong className="text-light-text dark:text-dark-text">
                {bn ? "PDF নিয়ে কাজ করছেন?" : "Working with PDFs?"}
              </strong>{" "}
              {bn
                ? "একাধিক PDF জোড়া লাগাতে Merge PDF, পেজ আলাদা করতে Split PDF, ছবি থেকে PDF বানাতে Image to PDF।"
                : "Combine files with Merge PDF, extract pages with Split PDF, or build a PDF from images with Image to PDF."}
            </p>
            <p>
              <strong className="text-light-text dark:text-dark-text">
                {bn ? "ডেটা বা টেক্সট?" : "Working with data or text?"}
              </strong>{" "}
              {bn
                ? "JSON ফরম্যাট করতে JSON Formatter, শব্দ সংখ্যা জানতে Word Counter, অক্ষর সীমা জানতে Character Counter।"
                : "Format JSON with JSON Formatter, count words with Word Counter, or check platform limits with Character Counter."}
            </p>
          </div>
        </motion.section>
      </div>


      {/* Category Breakdown */}
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-t border-silk-rose/10">
        <motion.section 
          initial={{ opacity: 0, y: 12 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.5 }} 
          className="max-w-3xl"
        >
          <h2 className="font-serif font-black text-2xl sm:text-3xl text-light-text dark:text-dark-text mb-6">
            {bn ? "ক্যাটাগরি অনুযায়ী ব্রাউজ করুন" : "Browse by category"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[14px] sm:text-[15px] text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
            <div>
              <h3 className="font-bold text-light-text dark:text-dark-text mb-2">🖼️ Image Tools</h3>
              <p>Compress, resize, crop, and convert images (JPG, PNG, WebP) without losing quality. All image processing happens locally in your browser.</p>
            </div>
            <div>
              <h3 className="font-bold text-light-text dark:text-dark-text mb-2">📄 PDF Tools</h3>
              <p>Merge, split, rotate, and convert PDFs to text or images. Our PDF tools are 100% free, privacy-first, and require no signup.</p>
            </div>
            <div>
              <h3 className="font-bold text-light-text dark:text-dark-text mb-2">💻 Developer Tools</h3>
              <p>Format JSON, encode Base64, generate UUIDs, and URLs. Essential utilities for developers that run entirely client-side.</p>
            </div>
            <div>
              <h3 className="font-bold text-light-text dark:text-dark-text mb-2">✍️ Text & Design</h3>
              <p>Count words, convert text case, generate QR codes, and design visiting cards. Fast, lightweight, and private.</p>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Tools Page FAQ */}
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-t border-silk-rose/10">
        <motion.section 
          initial={{ opacity: 0, y: 12 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.5 }} 
          className="max-w-3xl"
        >
          <h2 className="font-serif font-black text-2xl sm:text-3xl text-light-text dark:text-dark-text mb-6">
            {bn ? "সাধারণ জিজ্ঞাসা" : "Frequently Asked Questions"}
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-[16px] text-light-text dark:text-dark-text mb-2">Are all these tools free to use?</h3>
              <p className="text-[14px] sm:text-[15px] text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">Yes, every single tool on AHADEX is 100% free. There are no hidden fees, no premium tiers, and no watermarks on your output files.</p>
            </div>
            <div>
              <h3 className="font-bold text-[16px] text-light-text dark:text-dark-text mb-2">Do I need to create an account?</h3>
              <p className="text-[14px] sm:text-[15px] text-lightTextSecondary dark:text-dark-textSecondary leading-relaxed">No. You can use any tool instantly without creating an account, providing an email, or signing up. Just open the tool and start working.</p>
            </div>
            <div>
              <h3 className="font-bold text-[16px] text-light-text dark:text-dark-text mb-2">Is my data safe when I upload a file?</h3>
              <p className="text-[14px] sm:text-[15px] text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">Absolutely. Unlike other websites, we do not upload your files to a server. All processing happens entirely inside your web browser using modern web APIs.</p>
            </div>
            <div>
              <h3 className="font-bold text-[16px] text-light-text dark:text-dark-text mb-2">Can I use these tools on my mobile phone?</h3>
              <p className="text-[14px] sm:text-[15px] text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">Yes. The entire site is fully responsive and designed to work flawlessly on iOS (Safari) and Android (Chrome) devices.</p>
            </div>
          </div>
        </motion.section>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <HowItWorks />
      </div>

    </>
  );
}
