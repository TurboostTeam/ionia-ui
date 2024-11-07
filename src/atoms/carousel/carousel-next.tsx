import * as React from "react";
import { AiOutlineRight } from "react-icons/ai";
import { twMerge } from "tailwind-merge";

import { Button } from "../button";
import { useCarousel } from "./carousel-context";

export const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button> & {
    className?: string;
    variant?: React.ComponentProps<typeof Button>["variant"];
    size?: React.ComponentProps<typeof Button>["size"];
  }
>(({ className, size = "md", variant = "secondary", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      rounded
      classNames={{
        root: twMerge(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal"
            ? "-right-12 top-1/2 -translate-y-1/2"
            : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
          className,
        ),
      }}
      disabled={!canScrollNext}
      ref={ref}
      size={size}
      variant={variant}
      onClick={scrollNext}
      {...props}
    >
      <AiOutlineRight className="h-4 w-4" />
      {/* <span className="sr-only">Next slide</span> */}
    </Button>
  );
});

CarouselNext.displayName = "CarouselNext";
