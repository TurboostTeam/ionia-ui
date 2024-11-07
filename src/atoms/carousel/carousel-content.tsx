import * as React from "react";
import { twMerge } from "tailwind-merge";

import { useCarousel } from "./carousel-context";

export const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div className="overflow-hidden" ref={carouselRef}>
      <div
        className={twMerge(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className,
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});

CarouselContent.displayName = "CarouselContent";
