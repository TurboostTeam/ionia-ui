import * as DialogPrimitive from "@radix-ui/react-dialog";
import { type FC } from "react";
import { AiOutlineClose } from "react-icons/ai";

export interface ThumbnailPreviewProps {
  src: string;
  alt: string;
}

export const ThumbnailPreview: FC<ThumbnailPreviewProps> = ({ src, alt }) => {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50" />
      <DialogPrimitive.Close className="absolute right-[10px] top-[10px] z-50 inline-flex h-11 w-11 cursor-pointer appearance-none items-center justify-center rounded-full bg-black/55 text-fill-primary hover:bg-surface-hover focus:shadow-md focus:outline-none focus-visible:outline-none">
        <AiOutlineClose className="cursor-pointer" />
      </DialogPrimitive.Close>
      <DialogPrimitive.Content className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 overflow-hidden border bg-surface shadow-lg duration-200 sm:rounded-lg">
        <img alt={alt} className="h-auto w-full" src={src} />
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
};
