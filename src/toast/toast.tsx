import { AnimatePresence, motion } from "framer-motion";
import { type FC, useEffect, useState } from "react";

export interface ToastProps {
  id?: string;
  content: string;
  duration?: number | null;
  onDismiss?: () => void;
}

export const Toast: FC<ToastProps> = ({
  id,
  content,
  duration = 5000,
  onDismiss,
}) => {
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (duration !== null) {
      const timer = setTimeout(() => {
        setActive(false);
        onDismiss?.();
      }, duration);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [duration, onDismiss, setActive]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          animate={{ opacity: 1 }}
          className="rounded-md bg-gray-800 px-3 py-2 text-sm text-white shadow md:py-3"
          exit={{ opacity: 0 }}
          id={id}
          initial={{ opacity: 0 }}
        >
          <span>{content}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
