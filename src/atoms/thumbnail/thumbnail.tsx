import * as DialogPrimitive from "@radix-ui/react-dialog";
import { type ComponentPropsWithoutRef, type FC } from "react";

export interface ThumbnailProps
  extends Omit<
    ComponentPropsWithoutRef<typeof DialogPrimitive.Root>,
    "onOpenChange"
  > {
  onClose?: ComponentPropsWithoutRef<
    typeof DialogPrimitive.Root
  >["onOpenChange"];
}

export const Thumbnail: FC<ThumbnailProps> = (props) => (
  <DialogPrimitive.Root {...props} onOpenChange={props.onClose} />
);
