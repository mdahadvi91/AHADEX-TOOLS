import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import { TEMPLATES } from "../templates";
import { renderSide } from "../shared/renderer";
import { DEFAULT_USER_DATA } from "../types";
import { getCardSizeFromId } from "../shared/sizes";
import { getToolEmoji } from "@components/common/toolEmojis";
import { Hero } from "../Hero";
import { HowTo } from "../HowTo";
import { Features } from "../Features";
import { FAQ } from "../FAQ";
import { PrivacyNote } from "../PrivacyNote";
import type { Template } from "../types";

const RELATED_TOOLS = [
  {
    to: "/tools/cv-builder",
    toolId: "cv-builder",
    titleEn: "CV / Resume Builder",
    titleBn: "সিভি / রেজুমে বিল্ডার",
    descEn: "Build a professional CV with 20 templates",
    descBn: "২০টি টেমপ্লেটে পেশাদার সিভি",
    accent: "#8B9DC7",
  },
  {
    to: "/tools/photo-qr",
    toolId: "photo-qr",
    titleEn: "Photo QR Code",
    titleBn: "ফটো QR কোড",
    descEn: "Add a scannable QR to any photo",
    descBn: "যেকোনো ছবিতে QR যোগ করুন",
    accent: "#C99667",
  },
];

export function Gallery() {
  const { language } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
      <Hero />

      <section id="templates" className="pb-12 sm:pb-16">
        <div className="mb-6 sm:mb-10 text-center max-w-2xl mx-auto">
          <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-light-text dark:text-dark-text">
            {language === "bn" ? "টেমপ্লেট বেছে নিন" : "Choose a template"}
          </h2>
          <p className="mt-2 sm:mt-3 text-xs sm:text-base text-light-textSecondary dark:text-dark-textSecondary">
            {language === "bn"
              ? `${TEMPLATES.length}টি প্রিমিয়াম ডিজাইন — সামনে ও পিছনে`
              : `${TEMPLATES.length} premium designs — front & back`}
          </p>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
        >
          {TEMPLATES.map((tpl) => (
            <TemplateCard
              key={tpl.id}
              template={tpl}
              onSelect={() => navigate(`/tools/visiting-card/edit/${tpl.id}`)}
            />
          ))}
        </motion.div>
      </section>

      <HowTo />
      <Features />
      <PrivacyNote />
      <FAQ />

      {/* RELATED TOOLS */}
      <section className="py-10 sm:py-14 pb-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display font-black text-xl sm:text-2xl text-light-text dark:text-dark-text mb-6 text-center">
            {language === "bn"
              ? "অন্য যেসব টুল ভালো লাগতে পারে"
              : "Other tools you may like"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {RELATED_TOOLS.map((t) => (
              <Link
                key={t.to}
                to={t.to}
                className={cn(
                  "group flex items-center gap-3 p-4 rounded-2xl",
                  "bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl",
                  "border border-silk-rose/15 hover:border-silk-rose/50",
                  "hover:-translate-y-0.5 transition-all"
                )}
              >
                <span
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border text-xl sm:text-2xl"
                  style={{
                    backgroundColor: `${t.accent}15`,
                    borderColor: `${t.accent}40`,
                  }}
                >
                  {getToolEmoji(t.toolId)}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-semibold text-sm text-light-text dark:text-dark-text leading-tight">
                    {language === "bn" ? t.titleBn : t.titleEn}
                  </p>
                  <p className="text-[11px] text-light-textSecondary dark:text-dark-textSecondary mt-0.5">
                    {language === "bn" ? t.descBn : t.descEn}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-silk-rose shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function TemplateCard({
  template,
  onSelect,
}: {
  template: Template;
  onSelect: () => void;
}) {
  const { language } = useLanguage();
  const frontRef = useRef<HTMLCanvasElement>(null);
  const backRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  const size = getCardSizeFromId("standard");
  const W = Math.round(size.widthPx * 0.38);
  const H = Math.round(size.heightPx * 0.38);

  useEffect(() => {
    let cancelled = false;
    async function go() {
      try {
        if (frontRef.current) {
          const ctx = frontRef.current.getContext("2d");
          if (ctx) {
            await renderSide({
              ctx, template, side: "front", userData: DEFAULT_USER_DATA, W, H,
            });
          }
        }
        if (backRef.current) {
          const ctx = backRef.current.getContext("2d");
          if (ctx) {
            await renderSide({
              ctx, template, side: "back", userData: DEFAULT_USER_DATA, W, H,
            });
          }
        }
        if (!cancelled) setReady(true);
      } catch { /* ignore */ }
    }
    void go();
    return () => { cancelled = true; };
  }, [template, W, H]);

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ y: -3 }}
      className={cn(
        "group relative flex flex-col items-stretch gap-2.5 p-3 rounded-2xl text-left",
        "bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl",
        "border border-silk-rose/20 hover:border-silk-rose/50",
        "shadow-silk-soft hover:shadow-silk-deep",
        "transition-all duration-500"
      )}
    >
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <div className="flex items-center gap-1">
            <span className="px-1.5 py-0.5 rounded-full bg-silk-rose text-white text-[7px] font-bold uppercase tracking-wider">
              {language === "bn" ? "সামনে" : "Front"}
            </span>
          </div>
          <div className="relative w-full overflow-hidden rounded-md bg-white shadow-sm" style={{ aspectRatio: `${W} / ${H}` }}>
            <canvas ref={frontRef} width={W} height={H} className="w-full h-full block" />
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-1">
            <span className="px-1.5 py-0.5 rounded-full bg-silk-wine-deep text-white text-[7px] font-bold uppercase tracking-wider">
              {language === "bn" ? "পিছনে" : "Back"}
            </span>
          </div>
          <div className="relative w-full overflow-hidden rounded-md bg-white shadow-sm" style={{ aspectRatio: `${W} / ${H}` }}>
            <canvas ref={backRef} width={W} height={H} className="w-full h-full block" />
          </div>
        </div>
      </div>
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm rounded-2xl pointer-events-none">
          <span className="w-5 h-5 rounded-full border-2 border-silk-rose/40 border-t-silk-rose animate-spin" />
        </div>
      )}
      <div className="flex items-center justify-between gap-2 pt-1">
        <div className="min-w-0">
          <h3 className="font-display font-bold text-sm text-light-text dark:text-dark-text leading-tight truncate">
            {language === "bn" ? template.nameBn : template.name}
          </h3>
          <p className="text-[10px] text-light-textSecondary dark:text-dark-textSecondary capitalize mt-0.5">
            {template.category}
          </p>
        </div>
        <span className="shrink-0 w-6 h-6 rounded-full bg-silk-rose/10 border border-silk-rose/25 flex items-center justify-center text-silk-rose text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
          →
        </span>
      </div>
    </motion.button>
  );
}
