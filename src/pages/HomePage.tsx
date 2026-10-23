import { useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css"; 

// আপনার রিয়েল টুলসহ ডাটা (স্ক্রিনশটের স্টাইলে)
const toolsData = [
  { 
    id: 1, 
    title: "CV Builder", 
    desc: "Create a professional CV easily with live preview and multiple templates.", 
    category: "documents", 
    icon: "📄", 
    color: "red",
    path: "/tools/cv-builder" 
  },
  { 
    id: 2, 
    title: "Visiting Card", 
    desc: "Design a stunning visiting card directly in your browser.", 
    category: "design", 
    icon: "🪪", 
    color: "orange",
    path: "/tools/visiting-card" 
  },
  { 
    id: 3, 
    title: "Photo QR", 
    desc: "Convert your photos into high-quality QR codes instantly.", 
    category: "qr", 
    icon: "📱", 
    color: "green",
    path: "/tools/photo-qr" 
  },
  // নিচের গুলো ডামি, যাতে iLovePDF এর মত গ্রিড পূর্ণ দেখায় (পরে এগুলোতে আসল টুল বসাতে পারবেন)
  { 
    id: 4, 
    title: "Merge PDF", 
    desc: "Combine PDFs in the order you want with the easiest PDF merger available.", 
    category: "organize", 
    icon: "↘↖", 
    color: "red",
    path: "#" 
  },
  { 
    id: 5, 
    title: "Split PDF", 
    desc: "Separate one page or a whole set for easy conversion into independent PDF files.", 
    category: "organize", 
    icon: "↘↖", 
    color: "orange",
    path: "#" 
  },
  { 
    id: 6, 
    title: "Compress PDF", 
    desc: "Reduce file size while optimizing for maximal PDF quality.", 
    category: "optimize", 
    icon: "⤡⤢", 
    color: "green",
    path: "#" 
  }
];

// স্ক্রিনশটের মত ফিল্টার
const filters = ["All", "Workflows", "Organize PDF", "Optimize PDF", "Convert PDF", "Edit PDF", "PDF Security", "PDF Intelligence"];

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState("All");

  // ফিল্টারিং লজিক
  const filteredTools = activeFilter === "All"
    ? toolsData
    : toolsData.filter(tool => tool.category.toLowerCase() === activeFilter.toLowerCase().split(" ")[0]);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <h1>Every tool you need to work with PDFs in one place</h1>
        <p>
          Every tool you need to use PDFs, at your fingertips. All are 100% FREE and easy to use! 
          Merge, split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks.
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
