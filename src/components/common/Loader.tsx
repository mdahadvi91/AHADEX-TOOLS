import { motion } from "framer-motion";

/* ============================================================
 * Loader — premium full-page loading state
 * Shown during lazy route loading (Suspense fallback)
 * ============================================================ */

export function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-silk-cream/85 dark:bg-dark-bg/85 backdrop-blur-xl">
      {/* Ambient background orbs */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.span
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 0.55, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(216,139,154,0.45) 0%, transparent 65%)",
            filter: "blur(70px)",
          }}
        />
        <motion.span
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.15 }}
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(201,150,103,0.45) 0%, transparent 65%)",
            filter: "blur(70px)",
          }}
        />
      </div>

      <div className="relative flex flex-col items-center gap-6">
        {/* Logo mark with pulse rings */}
        <div className="relative">
          {/* Pulsing rings */}
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: [0, 0.4, 0],
                scale: [0.8, 1.6, 2.1],
              }}
              transition={{
                duration: 2.4,
                delay: i * 0.6,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className="absolute inset-0 rounded-[28px] border-2 border-silk-rose/50"
            />
          ))}

          {/* Logo hexagon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-[24px] flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, #D88B9A 0%, #C99667 50%, #8B3A4F 100%)",
              boxShadow:
                "0 20px 50px -16px rgba(139,58,79,0.55), inset 0 1px 0 rgba(255,255,255,0.35)",
            }}
          >
            <svg viewBox="0 0 40 40" className="w-9 h-9 sm:w-11 sm:h-11">
              <path
                d="M20 4 L34 12 L34 28 L20 36 L6 28 L6 12 Z"
                fill="rgba(255,255,255,0.95)"
              />
              <path
                d="M20 12 L13 28 L16.5 28 L18 24 L22 24 L23.5 28 L27 28 L20 12 Z M18.8 21 L21.2 21 L20 16.5 L18.8 21 Z"
                fill="#8B3A4F"
              />
            </svg>
          </motion.div>
        </div>

        {/* Animated dots */}
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0.3, y: 0 }}
              animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
              transition={{
                duration: 1.2,
                delay: i * 0.15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1.5 h-1.5 rounded-full bg-silk-rose"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
