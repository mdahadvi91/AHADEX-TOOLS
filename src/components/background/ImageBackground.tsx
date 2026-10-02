import { useTheme } from "@contexts/ThemeContext";

export function ImageBackground() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-20 overflow-hidden pointer-events-none bg-silk-cream dark:bg-dark-bg"
    >
      <img
        src="/images/backgrounds/tools-bg.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
        style={{ opacity: isDark ? 0.55 : 0.15 }}
        loading="eager"
        draggable={false}
      />
      {/* Readability overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-silk-cream/40 via-transparent to-silk-cream/50 dark:from-dark-bg/50 dark:via-transparent dark:to-dark-bg/60" />
    </div>
  );
}
