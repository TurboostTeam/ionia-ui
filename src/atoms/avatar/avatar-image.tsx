import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { forwardRef } from "react";
import { tv } from "tailwind-variants";

export const avatarImage = tv({
  base: "aspect-square h-full w-full",
});

export const AvatarImage = forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>((props, ref) => (
  <AvatarPrimitive.Image {...props} className={avatarImage(props)} ref={ref} />
));
