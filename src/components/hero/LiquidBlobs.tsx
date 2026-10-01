export function LiquidBlobs() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-[10] overflow-hidden pointer-events-none"
    >
      {/* Rose blob — top left */}
      <div
        className="absolute -top-[30%] -left-[20%] w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] opacity-60"
        style={{
          background:
            "radial-gradient(circle at 40% 40%, rgba(216,139,154,0.55) 0%, rgba(216,139,154,0.15) 40%, transparent 70%)",
          filter: "blur(60px)",
          animation: "hero-blob-1 22s ease-in-out infinite",
        }}
      />

      {/* Gold blob — right */}
      <div
        className="absolute top-[20%] -right-[15%] w-[70vw] h-[70vw] max-w-[700px] max-h-[700px] opacity-50"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(201,150,103,0.55) 0%, rgba(201,150,103,0.15) 40%, transparent 70%)",
          filter: "blur(70px)",
          animation: "hero-blob-2 28s ease-in-out infinite",
        }}
      />

      {/* Wine blob — bottom */}
      <div
        className="absolute -bottom-[25%] left-[25%] w-[75vw] h-[75vw] max-w-[750px] max-h-[750px] opacity-40"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(139,58,79,0.45) 0%, rgba(139,58,79,0.15) 40%, transparent 70%)",
          filter: "blur(80px)",
          animation: "hero-blob-3 32s ease-in-out infinite",
        }}
      />
    </div>
  );
}
