import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { forwardRef } from "react";
import { tv } from "tailwind-variants";

export const avatarFallback = tv({
  base: "bg-muted flex h-full w-full items-center justify-center rounded-full",
});

export const AvatarFallback = forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>((props, ref) => (
  <AvatarPrimitive.Fallback
    {...props}
    className={avatarFallback(props)}
    ref={ref}
  />
));
