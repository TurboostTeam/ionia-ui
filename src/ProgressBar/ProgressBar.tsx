/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { type FC, useEffect, useState } from "react";
import { tv } from "tailwind-variants";

export const progressBar = tv({
  slots: {
    root: "left-0 top-0",
    bar: "fixed z-100 h-0.5 w-full bg-fill-primary shadow-[0_0_10px_var(--bg-fill-primary-default),0_0_5px_var(--bg-fill-primary-default)]",
  },
  variants: {},
});

export const ProgressBar: FC = () => {
  const [progress, setProgress] = useState(0);
  const [animating, setAnimating] = useState(false);

  const { root, bar } = progressBar();

  useEffect(() => {
    if (progress >= 99 || animating) {
      return;
    }

    requestAnimationFrame(() => {
      const step = Math.max((99 - progress) / 10, 1);
      setAnimating(true);
      setProgress(progress + step);
    });
  }, [progress, animating]);

  const customStyles = {
    transform: `scaleX(${Math.floor(progress) / 100})`,
  };

  return (
    <div className={root()}>
      <div
        className={bar()}
        style={{
          ...customStyles,
          transformOrigin: "0",
          transitionDuration: "500ms",
        }}
        onTransitionEnd={() => {
          setAnimating(false);
        }}
      />
    </div>
  );
};
