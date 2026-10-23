import { useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css"; 

// 🚨 আপনার আসল ৩টি টুল
const toolsData = [
  { 
    id: 1, 
    title: "CV Builder", 
    desc: "Create a professional, ATS-compatible CV with live preview and multiple templates.", 
    category: "documents", 
    icon: "📄", 
    color: "red",
    path: "/tools/cv-builder" 
  },
  { 
    id: 2, 
    title: "Visiting Card", 
    desc: "Design a stunning business card directly in your browser with custom logos and QR codes.", 
    category: "design", 
    icon: "🪪", 
    color: "orange",
    path: "/tools/visiting-card" 
  },
  { 
    id: 3, 
    title: "Photo QR", 
    desc: "Convert your photos into scannable QR codes instantly. Add links, WiFi, or contacts.", 
    category: "qr", 
    icon: "📱", 
    color: "green",
    path: "/tools/photo-qr" 
  }
];

// 🚨 ফিল্টার ক্যাটাগরি (আপনার ৩টি টুল অনুযায়ী)
const filters = ["All", "Documents", "Design", "QR Tools"];

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState("All");

  // ফিল্টারিং লজিক
  const filteredTools = activeFilter === "All"
    ? toolsData
    : toolsData.filter(tool => tool.category.toLowerCase() === activeFilter.toLowerCase());

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <h1>Free, Private Browser-Based Tools</h1>
        <p>
          Every tool you need for everyday tasks, right at your fingertips. 
          All are 100% FREE and easy to use! Your files stay on your device — 
          nothing is uploaded to any server.
        </p>
      </section>

      {/* Filter Buttons */}
      <nav className="filter-nav">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`filter-btn ${activeFilter === filter ? "active" : ""}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
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
