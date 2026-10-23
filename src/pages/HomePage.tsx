import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@contexts/LanguageContext";
import "./HomePage.css"; 

export default function HomePage() {
  const { language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("All");

  // 🚨 টুলের ডাটা এখন ভাষা অনুযায়ী পরিবর্তিত হবে
  const toolsData = [
    { 
      id: 1, 
      title: language === "bn" ? "সিভি বিল্ডার" : "CV Builder", 
      desc: language === "bn" 
        ? "পেশাদার, ATS-বান্ধব সিভি তৈরি করুন লাইভ প্রিভিউ এবং একাধিক টেমপ্লেটের মাধ্যমে।" 
        : "Create a professional, ATS-compatible CV with live preview and multiple templates.", 
      category: "documents", 
      icon: "📄", 
      color: "red",
      path: "/tools/cv-builder" 
    },
    { 
      id: 2, 
      title: language === "bn" ? "ভিজিটিং কার্ড" : "Visiting Card", 
      desc: language === "bn" 
        ? "আপনার ব্রাউজারেই কাস্টম লোগো ও কিউআর কোডসহ সুন্দর বিজনেস কার্ড ডিজাইন করুন।" 
        : "Design a stunning business card directly in your browser with custom logos and QR codes.", 
      category: "design", 
      icon: "🪪", 
      color: "orange",
      path: "/tools/visiting-card" 
    },
    { 
      id: 3, 
      title: language === "bn" ? "ফটো কিউআর" : "Photo QR", 
      desc: language === "bn" 
        ? "আপনার ছবিকে স্ক্যানযোগ্য কিউআর কোডে রূপান্তর করুন। লিংক, ওয়াইফাই বা কন্টাক্ট যোগ করুন।" 
        : "Convert your photos into scannable QR codes instantly. Add links, WiFi, or contacts.", 
      category: "qr", 
      icon: "📱", 
      color: "green",
      path: "/tools/photo-qr" 
    }
  ];

  // 🚨 ফিল্টার বাটনগুলোও এখন দ্বিভাষিক
  const filters = [
    { id: "All", label: language === "bn" ? "সব" : "All" },
    { id: "documents", label: language === "bn" ? "ডকুমেন্টস" : "Documents" },
    { id: "design", label: language === "bn" ? "ডিজাইন" : "Design" },
    { id: "qr", label: language === "bn" ? "কিউআর টুলস" : "QR Tools" },
  ];

  // ফিল্টারিং লজিক
  const filteredTools = activeFilter === "All"
    ? toolsData
    : toolsData.filter(tool => tool.category === activeFilter);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <h1>
          {language === "bn" ? "ফ্রি, প্রাইভেট ব্রাউজার-ভিত্তিক টুলস" : "Free, Private Browser-Based Tools"}
        </h1>
        <p>
          {language === "bn" 
            ? "প্রতিদিনের কাজের জন্য প্রয়োজনীয় সব টুল, একদম আপনার হাতের মুঠোয়। সবকিছু ১০০% ফ্রি এবং ব্যবহার করা সহজ! আপনার ফাইল আপনার ডিভাইসেই থাকে — কোনো সার্ভারে আপলোড হয় না।"
            : "Every tool you need for everyday tasks, right at your fingertips. All are 100% FREE and easy to use! Your files stay on your device — nothing is uploaded to any server."}
        </p>
      </section>

      {/* Filter Buttons */}
      <nav className="filter-nav">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`filter-btn ${activeFilter === filter.id ? "active" : ""}`}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </nav>

      {/* Tools Grid */}
      <section className="tools-grid">
        {filteredTools.map((tool) => (
          <Link to={tool.path} key={tool.id} className="tool-card-link">
            <div className="tool-card">
              <div className={`tool-icon ${tool.color}`}>
                {tool.icon}
              </div>
              <h3>{tool.title}</h3>
              <p>{tool.desc}</p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
