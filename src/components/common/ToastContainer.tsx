import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Info } from "lucide-react";
import { registerToast } from "@lib/toast";

type ToastType = "success" | "error" | "info";

interface ToastData {
  id: number;
  message: string;
  type: ToastType;
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    registerToast((msg, type) => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message: msg, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    });
  }, []);

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-[999] flex flex-col items-center gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg text-sm font-bold text-white ${
              t.type === "success" ? "bg-emerald-600" : t.type === "error" ? "bg-red-600" : "bg-silk-rose"
            }`}
          >
            {t.type === "success" && <CheckCircle2 className="w-4 h-4" />}
            {t.type === "error" && <XCircle className="w-4 h-4" />}
            {t.type === "info" && <Info className="w-4 h-4" />}
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
