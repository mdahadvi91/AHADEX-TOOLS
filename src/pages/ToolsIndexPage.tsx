import { Link } from "react-router-dom";
import { useLanguage } from "@contexts/LanguageContext";

export default function ToolsIndexPage() {
  const { language } = useLanguage();
  const bn = language === "bn";

  const tools = [
    {
      id: "cv-builder",
      title: bn ? "সিভি বিল্ডার" : "CV Builder",
      desc: bn
        ? "পেশাদার, ATS-বান্ধব সিভি তৈরি করুন লাইভ প্রিভিউ এবং একাধিক টেমপ্লেটের মাধ্যমে।"
        : "Create a professional, ATS-compatible CV with live preview and multiple templates.",
      icon: "📄",
      path: "/tools/cv-builder",
      color: "bg-red-50 border-red-100",
    },
    {
      id: "visiting-card",
      title: bn ? "ভিজিটিং কার্ড" : "Visiting Card",
      desc: bn
        ? "আপনার ব্রাউজারেই কাস্টম লোগো ও কিউআর কোডসহ সুন্দর বিজনেস কার্ড ডিজাইন করুন।"
        : "Design a stunning business card directly in your browser with custom logos and QR codes.",
      icon: "🪪",
      path: "/tools/visiting-card",
      color: "bg-orange-50 border-orange-100",
    },
    {
      id: "photo-qr",
      title: bn ? "ফটো কিউআর" : "Photo QR",
      desc: bn
        ? "আপনার ছবিকে স্ক্যানযোগ্য কিউআর কোডে রূপান্তর করুন। লিংক, ওয়াইফাই বা কন্টাক্ট যোগ করুন।"
        : "Convert your photos into scannable QR codes instantly. Add links, WiFi, or contacts.",
      icon: "📱",
      path: "/tools/photo-qr",
      color: "bg-green-50 border-green-100",
    },
  ];

  return (
    <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8 py-16">
      
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
          {bn ? "আমাদের সব টুলস" : "All Our Tools"}
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          {bn
            ? "প্রতিদিনের কাজের জন্য প্রয়োজনীয় সব টুল, একদম আপনার হাতের মুঠোয়। আপনার ফাইল আপনার ডিভাইসেই থাকে — কোনো সার্ভারে আপলোড হয় না।"
            : "Every tool you need for everyday tasks, right at your fingertips. Your files stay on your device — nothing is uploaded to any server."}
        </p>
      </section>

      {/* Tools Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            to={tool.path}
            className="group block p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-red-500 hover:shadow-lg transition-all duration-300"
          >
            <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${tool.color} text-3xl mb-4`}>
              {tool.icon}
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-red-600 transition-colors">
              {tool.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {tool.desc}
            </p>
          </Link>
        ))}
      </section>

      {/* Info Section */}
      <section className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          {bn
            ? "আরও টুল আসছে। সব টুল ১০০% ফ্রি, কোনো অ্যাকাউন্ট বা সাইন-আপের প্রয়োজন নেই।"
            : "More tools are on the way. All tools are 100% free, with no accounts or sign-ups required."}
        </p>
      </section>

    </div>
  );
}
