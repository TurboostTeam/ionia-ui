import * as React from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { twMerge } from "tailwind-merge";

import { Button } from "../button";
import { useCarousel } from "./carousel-context";

export const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button> & {
    className?: string;
    variant?: React.ComponentProps<typeof Button>["variant"];
    size?: React.ComponentProps<typeof Button>["size"];
  }
>(({ className, variant = "secondary", size = "md", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      rounded
      classNames={{
        root: twMerge(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal"
            ? "-left-12 top-1/2 -translate-y-1/2"
            : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
          className,
        ),
      }}
      disabled={!canScrollPrev}
      ref={ref}
      size={size}
      variant={variant}
      onClick={scrollPrev}
      {...props}
    >
      <AiOutlineLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
});

CarouselPrevious.displayName = "CarouselPrevious";
