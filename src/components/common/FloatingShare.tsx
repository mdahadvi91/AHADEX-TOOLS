import { Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { showToast } from "@lib/toast";

export function FloatingShare() {
  const handleShare = async () => {
    const shareData = {
      title: document.title,
      text: "Check out this free, private tool on AHADEX!",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (e) {
        // User cancelled
      }
    } else {
      // Fallback: copy URL
      try {
        await navigator.clipboard.writeText(window.location.href);
        showToast("Link copied to clipboard!", "success");
      } catch {
        showToast("Could not copy link", "error");
      }
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleShare}
      aria-label="Share this tool"
      className="fixed bottom-24 right-6 z-40 w-11 h-11 rounded-full bg-white/90 dark:bg-dark-surface/90 backdrop-blur-md border border-silk-rose/30 text-silk-rose shadow-lg hover:bg-silk-rose hover:text-white transition-all flex items-center justify-center"
    >
      <Share2 className="w-5 h-5" />
    </motion.button>
  );
}
