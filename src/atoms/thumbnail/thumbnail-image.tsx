import * as DialogPrimitive from "@radix-ui/react-dialog";
import { type FC } from "react";

export interface ThumbnailImageProps {
  src: string;
  alt: string;
}

export const ThumbnailImage: FC<ThumbnailImageProps> = ({ src, alt }) => {
  return (
    <DialogPrimitive.Trigger>
      <img
        alt={alt}
        className="h-32 w-32 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
        src={src}
      />
    </DialogPrimitive.Trigger>
  );
};
