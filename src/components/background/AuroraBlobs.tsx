import { cn } from "@lib/cn";

export function AuroraBlobs({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "fixed inset-0 -z-20 overflow-hidden pointer-events-none",
        "bg-silk-cream dark:bg-dark-bg",
        className
      )}
    >
      {/* Rose blob — top left */}
      <div
        className="absolute -top-[30%] -left-[15%] w-[70vw] h-[70vw] rounded-full opacity-50 dark:opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(216,139,154,0.55) 0%, rgba(216,139,154,0) 60%)",
          filter: "blur(60px)",
          animation: "blob-drift-1 25s ease-in-out infinite",
        }}
      />

      {/* Gold blob — top right */}
      <div
        className="absolute -top-[20%] right-[-10%] w-[60vw] h-[60vw] rounded-full opacity-40 dark:opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(201,150,103,0.55) 0%, rgba(201,150,103,0) 60%)",
          filter: "blur(70px)",
          animation: "blob-drift-2 30s ease-in-out infinite",
        }}
      />

      {/* Wine blob — bottom center */}
      <div
        className="absolute bottom-[-30%] left-[20%] w-[80vw] h-[80vw] rounded-full opacity-35 dark:opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(139,58,79,0.45) 0%, rgba(139,58,79,0) 60%)",
          filter: "blur(80px)",
          animation: "blob-drift-3 35s ease-in-out infinite",
        }}
      />

      {/* Blush blob — middle right */}
      <div
        className="absolute top-[40%] right-[10%] w-[50vw] h-[50vw] rounded-full opacity-30 dark:opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(232,180,184,0.5) 0%, rgba(232,180,184,0) 60%)",
          filter: "blur(60px)",
          animation: "blob-drift-4 28s ease-in-out infinite",
        }}
      />

      {/* Grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />
    </div>
  );
}
