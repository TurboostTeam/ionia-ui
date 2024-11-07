import * as React from "react";

import { type CarouselContextProps } from "./types";

export const CarouselContext = React.createContext<CarouselContextProps | null>(
  null,
);

export function useCarousel(): CarouselContextProps {
  const context = React.useContext(CarouselContext);

  if (context == null) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}
