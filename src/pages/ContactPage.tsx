import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Mail,
  Phone,
  Clock,
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useLanguage } from "@contexts/LanguageContext";
import { cn } from "@lib/cn";
import { AdsterraNativeBanner } from "@components/ads/AdsterraNativeBanner";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const CONTACT_EMAIL = "mdahadvi91@gmail.com";
const CONTACT_PHONE_DISPLAY = "+971 50 797 5837";
const CONTACT_PHONE_RAW = "+971507975837";
const WHATSAPP_URL = "https://wa.me/971507975837";

export default function ContactPage() {
  const { t } = useLanguage();
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "general",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const subjects = [
    { value: "general", label: t.contact.formSubjectGeneral },
    { value: "bug", label: t.contact.formSubjectBug },
    { value: "feature", label: t.contact.formSubjectFeature },
    { value: "partnership", label: t.contact.formSubjectPartnership },
  ];

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (form.name.trim().length < 2) next.name = t.contact.formErrorName;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = t.contact.formErrorEmail;
    if (form.message.trim().length < 20) next.message = t.contact.formErrorMessage;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSending(true);
    try {
      const subjectLine = `[${form.subject}] from ${form.name}`;
      const body = `${form.message}\n\n—\nReply to: ${form.email}`;
      const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
        subjectLine
      )}&body=${encodeURIComponent(body)}`;

      window.location.href = mailto;
      setSubmitted(true);
      setForm({ name: "", email: "", subject: "general", message: "" });
    } catch {
      setErrors({ message: t.contact.formErrorGeneric });
    } finally {
      setSending(false);
    }
  };

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const info = [
    {
      Icon: Mail,
      label: t.contact.infoEmail,
      value: CONTACT_EMAIL,
      href: `mailto:${CONTACT_EMAIL}`,
    },
    {
      Icon: Phone,
      label: "Phone / WhatsApp",
      value: CONTACT_PHONE_DISPLAY,
      href: WHATSAPP_URL,
      external: true,
    },
    {
      Icon: Clock,
      label: t.contact.infoResponse,
      value: t.contact.infoResponseValue,
      href: null,
    },
    {
      Icon: MessageSquare,
      label: t.contact.infoLanguages,
      value: t.contact.infoLanguagesValue,
      href: null,
    },
  ];

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
      {/* HERO */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-20">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-50"
            style={{
              background:
                "radial-gradient(circle, rgba(216,139,154,0.35) 0%, transparent 65%)",
              filter: "blur(70px)",
            }}
          />
          <div
            className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full opacity-40"
            style={{
              background:
                "radial-gradient(circle, rgba(201,150,103,0.35) 0%, transparent 65%)",
              filter: "blur(70px)",
            }}
          />
        </div>

        <div className="relative max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-dark-surface/60 backdrop-blur-xl border border-silk-rose/25 text-silk-wine dark:text-silk-rose mb-8"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-[10px] font-medium tracking-[0.25em] uppercase">
              {t.contact.heroEyebrow}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-bold tracking-tight leading-[1.05] text-light-text dark:text-dark-text text-[clamp(2.25rem,5vw,4rem)]"
          >
            <span className="block">{t.contact.heroTitle}</span>
            <span className="block mt-2 font-script text-silk-rose text-[1.1em]">
              {t.contact.heroTitle2}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 text-base sm:text-lg text-light-textSecondary dark:text-dark-textSecondary leading-relaxed max-w-2xl"
          >
            {t.contact.heroSubtitle}
          </motion.p>
        </div>
      </section>

      {/* INFO CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {info.map(({ Icon, label, value, href, external }, i) => {
          const content = (
            <>
              <span className="inline-flex w-11 h-11 rounded-2xl bg-silk-rose/15 border border-silk-rose/25 items-center justify-center mb-3">
                <Icon className="w-5 h-5 text-silk-rose" />
              </span>
              <p className="text-[10px] uppercase tracking-[0.2em] text-silk-wine/60 dark:text-silk-rose/50 font-semibold mb-1">
                {label}
              </p>
              <p className="text-sm font-medium text-light-text dark:text-dark-text break-all">
                {value}
              </p>
            </>
          );

          const wrapper = cn(
            "flex flex-col p-5 rounded-3xl h-full",
            "bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl",
            "border border-silk-rose/15",
            href && "hover:border-silk-rose/40 hover:-translate-y-1 transition-all duration-300"
          );

          return (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
            >
              {href ? (
                <a
                  href={href}
                  className={wrapper}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {content}
                </a>
              ) : (
                <div className={wrapper}>{content}</div>
              )}
            </motion.div>
          );
        })}
      </section>

      {/* FORM */}
      <section className="mb-16">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-silk-rose animate-soft-pulse" />
            <p className="text-[11px] uppercase tracking-[0.3em] text-silk-wine/70 dark:text-silk-rose/60 font-semibold">
              {t.contact.formEyebrow}
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="p-8 rounded-3xl bg-silk-rose/5 border border-silk-rose/30 text-center"
                role="status"
              >
                <div className="w-16 h-16 rounded-full bg-silk-rose/15 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-silk-rose" />
                </div>
                <h2 className="font-display text-2xl font-bold text-light-text dark:text-dark-text mb-2">
                  {t.contact.successTitle}
                </h2>
                <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary mb-6">
                  {t.contact.successDesc}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-sm font-medium text-silk-rose hover:text-silk-wine transition-colors"
                >
                  {t.contact.successAgain}
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                noValidate
                className="space-y-5"
              >
                <Field id="contact-name" label={t.contact.formName} error={errors.name}>
                  <input
                    id="contact-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder={t.contact.formNamePlaceholder}
                    autoComplete="name"
                    maxLength={60}
                    className={inputClass(!!errors.name)}
                  />
                </Field>

                <Field id="contact-email" label={t.contact.formEmail} error={errors.email}>
                  <input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder={t.contact.formEmailPlaceholder}
                    autoComplete="email"
                    className={inputClass(!!errors.email)}
                  />
                </Field>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-sm font-medium text-light-text dark:text-dark-text mb-2"
                  >
                    {t.contact.formSubject}
                  </label>
                  <select
                    id="contact-subject"
                    value={form.subject}
                    onChange={(e) => update("subject", e.target.value)}
                    className={cn(
                      "w-full h-12 px-4 rounded-xl",
                      "bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl",
                      "border border-silk-rose/20 focus:border-silk-rose/50",
                      "text-light-text dark:text-dark-text",
                      "outline-none transition-all"
                    )}
                  >
                    {subjects.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium text-light-text dark:text-dark-text mb-2"
                  >
                    {t.contact.formMessage}
                  </label>
                  <textarea
                    id="contact-message"
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    rows={6}
                    maxLength={1000}
                    placeholder={t.contact.formMessagePlaceholder}
                    className={cn(inputClass(!!errors.message), "h-auto py-3 resize-y")}
                  />
                  <div className="mt-2 flex items-center justify-between">
                    {errors.message ? (
                      <p className="text-xs text-silk-rose flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.message}
                      </p>
                    ) : (
                      <span />
                    )}
                    <span className="text-xs text-light-textSecondary/60 dark:text-dark-textSecondary/60 font-mono">
                      1000 - {form.message.length} {t.contact.formCharsLeft}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className={cn(
                    "inline-flex items-center gap-2 h-12 px-7 rounded-full",
                    "bg-gradient-to-r from-silk-rose to-silk-wine-deep text-white font-medium",
                    "shadow-silk-medium hover:shadow-silk-deep hover:-translate-y-0.5",
                    "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0",
                    "transition-all duration-300"
                  )}
                >
                  {sending ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      {t.contact.formSending}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {t.contact.formSubmit}
                    </>
                  )}
                </button>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-xs text-light-textSecondary/70 dark:text-dark-textSecondary/70">
                  <p>
                    Email:{" "}
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-silk-rose hover:underline"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </p>
                  <p>
                    Phone:{" "}
                    <a
                      href={`tel:${CONTACT_PHONE_RAW}`}
                      className="text-silk-rose hover:underline"
                    >
                      {CONTACT_PHONE_DISPLAY}
                    </a>
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-20">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-silk-rose animate-soft-pulse" />
            <p className="text-[11px] uppercase tracking-[0.3em] text-silk-wine/70 dark:text-silk-rose/60 font-semibold">
              {t.contact.faqEyebrow}
            </p>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl leading-[1.1] tracking-tight text-light-text dark:text-dark-text mb-8">
            {t.contact.faqTitle}{" "}
            <span className="font-script text-silk-rose text-[1.1em]">
              {t.contact.faqTitle2}
            </span>
          </h2>

          <div className="space-y-3">
            {t.contact.faqs.map((faq, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={cn(
                  "group rounded-2xl overflow-hidden",
                  "bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl",
                  "border border-silk-rose/15 hover:border-silk-rose/35",
                  "transition-all duration-300"
                )}
              >
                <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between gap-4 font-display font-semibold text-sm sm:text-base text-light-text dark:text-dark-text">
                  {faq.question}
                  <span className="shrink-0 w-6 h-6 rounded-full bg-silk-rose/15 flex items-center justify-center text-silk-rose group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5 text-sm text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
                  {faq.answer}
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-light-text dark:text-dark-text mb-2"
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-2 text-xs text-silk-rose flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5" />
          {error}
        </p>
      )}
          <AdsterraNativeBanner />
    </div>
  );
}

function inputClass(hasError: boolean): string {
  return cn(
    "w-full h-12 px-4 rounded-xl",
    "bg-white/70 dark:bg-dark-surface/70 backdrop-blur-xl",
    "text-light-text dark:text-dark-text",
    "placeholder:text-light-textSecondary/50 dark:placeholder:text-dark-textSecondary/40",
    "outline-none transition-all",
    hasError
      ? "border border-silk-rose/60 focus:border-silk-rose"
      : "border border-silk-rose/20 focus:border-silk-rose/50"
  );
}
