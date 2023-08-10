import { AnimatePresence, motion } from "framer-motion";
import { type FC, useEffect, useState } from "react";

import { type ToastProps } from "./ToastProps";

export const Toast: FC<ToastProps> = ({ content, duration = 5000 }) => {
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (duration !== null) {
      const timer = setTimeout(() => {
        setActive(false);
      }, duration);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [duration, setActive]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          animate={{ opacity: 1 }}
          className="rounded-md bg-gray-800 px-3 py-2 text-sm text-white shadow md:py-3"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
        >
          <span>{content}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
