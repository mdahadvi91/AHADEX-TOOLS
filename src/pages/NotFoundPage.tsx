import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Home, Grid3x3, ArrowRight, Ghost } from "lucide-react";
import { tools } from "@data/tools";
import { getToolEmoji } from "@components/common/toolEmojis";
import { getToolTranslation } from "@i18n/toolTranslations";
import { useLanguage } from "@contexts/LanguageContext";
import { trackEvent } from "@lib/analytics";
import { cn } from "@lib/cn";

const POPULAR_COUNT = 4;

export default function NotFoundPage() {
  const { language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  // Track 404 visit
  useEffect(() => {
    trackEvent("conversion_error" as never, {
      tool_id: "404",
      reason: location.pathname,
    });
  }, [location.pathname]);

  // Top tools by search volume
  const popularTools = useMemo(() => {
    return [...tools]
      .sort((a, b) => (b.searchVolume ?? 0) - (a.searchVolume ?? 0))
      .slice(0, POPULAR_COUNT);
  }, []);

  // Live search suggestions
  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return tools
      .filter((t) => {
        const translated = getToolTranslation(t.id, language, {
          name: t.name,
          description: t.description,
        });
        return (
          translated.name.toLowerCase().includes(q) ||
          translated.description.toLowerCase().includes(q) ||
          t.keywords.some((k) => k.toLowerCase().includes(q))
        );
      })
      .slice(0, 6);
  }, [query, language]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (suggestions.length === 1) {
      navigate(suggestions[0].path);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center px-4 sm:px-6 py-16 overflow-hidden">
      {/* Ambient rose glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(216,139,154,0.35) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative w-full max-w-3xl text-center">
        {/* Ghost + 404 */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center justify-center gap-2 mb-2"
        >
          <Ghost className="w-5 h-5 text-silk-rose/70" />
          <span className="text-[11px] uppercase tracking-[0.3em] font-semibold text-silk-wine/70 dark:text-silk-rose-soft/70">
            {language === "bn" ? "হারিয়ে গেছে" : "Lost in the silk"}
          </span>
        </motion.div>

        {/* Big 404 */}
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif font-black text-[120px] sm:text-[180px] leading-none tracking-[-0.04em] bg-gradient-to-br from-silk-rose via-silk-wine to-silk-gold bg-clip-text text-transparent select-none"
        >
          404
        </motion.p>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-serif font-bold text-2xl sm:text-3xl text-light-text dark:text-dark-text tracking-tight"
        >
          {language === "bn" ? (
            <>
              পেজটি খুঁজে পাওয়া যায়নি{" "}
              <span className="font-script text-silk-rose text-[1.1em]">
                দুঃখিত
              </span>
            </>
          ) : (
            <>
              This page floated away{" "}
              <span className="font-script text-silk-rose text-[1.1em]">
                we're sorry
              </span>
            </>
          )}
        </motion.h1>

        <p className="mt-3 text-[13px] sm:text-sm text-light-textSecondary dark:text-dark-textSecondary max-w-md mx-auto leading-relaxed">
          {language === "bn"
            ? "আপনি যে পেজটি খুঁজছেন সেটি নেই, অথবা সরিয়ে ফেলা হয়েছে। নিচের টুলগুলো দেখুন বা সার্চ করুন।"
            : "The page you're looking for doesn't exist or has moved. Try searching for a tool below."}
        </p>

        {/* Search box */}
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative mt-8 max-w-lg mx-auto"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-silk-rose pointer-events-none" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              language === "bn"
                ? "টুল খুঁজুন..."
                : "Search for a tool..."
            }
            className={cn(
              "w-full h-12 pl-11 pr-4 rounded-full",
              "bg-white/80 dark:bg-dark-surface/80 backdrop-blur-xl",
              "border border-silk-rose/25 focus:border-silk-rose/60",
              "text-sm text-light-text dark:text-dark-text",
              "placeholder:text-light-textSecondary/60 dark:placeholder:text-dark-textSecondary/50",
              "outline-none transition-all"
            )}
          />
        </motion.form>

        {/* Live suggestions */}
        {suggestions.length > 0 && (
          <div className="mt-3 max-w-lg mx-auto rounded-2xl bg-white/90 dark:bg-dark-surface/90 backdrop-blur-xl border border-silk-rose/25 shadow-silk-soft overflow-hidden">
            {suggestions.map((t) => {
              const translated = getToolTranslation(t.id, language, {
                name: t.name,
                description: t.description,
              });
              return (
                <Link
                  key={t.id}
                  to={t.path}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-silk-rose/10 transition-colors border-b border-silk-rose/10 last:border-0"
                >
                  <span className="text-xl shrink-0">{getToolEmoji(t.id)}</span>
                  <span className="flex-1 min-w-0 text-left">
                    <span className="block text-[13px] font-semibold text-light-text dark:text-dark-text truncate">
                      {translated.name}
                    </span>
                    <span className="block text-[11px] text-light-textSecondary dark:text-dark-textSecondary truncate">
                      {translated.description}
                    </span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-silk-rose shrink-0" />
                </Link>
              );
            })}
          </div>
        )}

        {/* Quick actions */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-silk-rose to-silk-wine-deep text-white text-sm font-semibold shadow-silk-medium hover:shadow-silk-deep hover:-translate-y-0.5 transition-all"
          >
            <Home className="w-4 h-4" />
            {language === "bn" ? "হোমে যান" : "Go Home"}
          </Link>
          <Link
            to="/tools"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/25 text-sm font-semibold text-silk-wine dark:text-silk-rose-soft hover:bg-silk-rose/15 transition-all"
          >
            <Grid3x3 className="w-4 h-4" />
            {language === "bn" ? "সব টুল" : "Browse Tools"}
          </Link>
        </motion.div>

        {/* Popular tools */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-14"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] font-semibold text-silk-wine/60 dark:text-silk-rose-soft/60 mb-4">
            {language === "bn" ? "জনপ্রিয় টুল" : "Popular tools"}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {popularTools.map((t) => {
              const translated = getToolTranslation(t.id, language, {
                name: t.name,
                description: t.description,
              });
              return (
                <Link
                  key={t.id}
                  to={t.path}
                  className="group flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl border border-silk-rose/20 hover:border-silk-rose/50 hover:-translate-y-1 transition-all"
                >
                  <span className="text-2xl sm:text-3xl">{getToolEmoji(t.id)}</span>
                  <span className="font-serif font-bold text-[12px] sm:text-[13px] text-center leading-tight text-light-text dark:text-dark-text group-hover:text-silk-rose transition-colors">
                    {translated.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
