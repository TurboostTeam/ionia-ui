import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { forwardRef } from "react";
import { tv } from "tailwind-variants";

export const avatar = tv({
  base: "relative flex size-10 shrink-0 overflow-hidden rounded-full",
});

export const Avatar = forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>((props, ref) => (
  <AvatarPrimitive.Root {...props} className={avatar(props)} ref={ref} />
));
