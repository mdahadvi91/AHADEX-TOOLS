import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center px-6 py-16 overflow-hidden">
      {/* Petals background */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        <span className="absolute top-0 left-[10%] text-3xl animate-petal-drift" style={{ animationDelay: "0s" }}>🌸</span>
        <span className="absolute top-0 left-[35%] text-2xl animate-petal-drift" style={{ animationDelay: "3s" }}>🌺</span>
        <span className="absolute top-0 left-[65%] text-2xl animate-petal-drift" style={{ animationDelay: "6s" }}>🌸</span>
        <span className="absolute top-0 left-[85%] text-3xl animate-petal-drift" style={{ animationDelay: "9s" }}>🌺</span>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto stagger-children">
        <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-br from-silk-rose to-silk-wine-deep flex items-center justify-center shadow-silk-medium animate-soft-pulse">
          <span className="text-white font-display font-bold text-3xl">A</span>
        </div>

        <h1 className="font-display font-black text-hero text-light-text dark:text-dark-text text-balance">
          <span className="text-silk-gradient dark:text-silk-gradient-dark">AHADEX</span>
          <br />
          <span className="font-script text-silk-rose text-4xl sm:text-5xl md:text-6xl block mt-2">Tools</span>
        </h1>

        <p className="mt-8 text-lg sm:text-xl text-light-textSecondary dark:text-dark-textSecondary max-w-2xl mx-auto leading-relaxed">
          42 free, fast and private online tools — crafted like a living magazine.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/tools"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-silk-rose to-silk-wine-deep text-white font-medium shadow-silk-medium hover:shadow-silk-deep hover-lift transition-all"
          >
            Explore All Tools
          </Link>
          <Link
            to="/about"
            className="px-8 py-4 rounded-full border-2 border-silk-rose/40 text-silk-rose font-medium hover:bg-silk-rose/10 transition-all"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}
