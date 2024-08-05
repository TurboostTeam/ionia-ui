import { type FC, useEffect, useState } from "react";
import { tv } from "tailwind-variants";

// eslint-disable-next-line react-refresh/only-export-components
export const progressBar = tv({
  slots: {
    root: "fixed left-0 top-0 z-100 h-[3px] w-full",
    bar: "transformOrigin-0 h-full w-full bg-fill-primary",
  },
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
