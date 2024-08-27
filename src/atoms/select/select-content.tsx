import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import * as SelectPrimitive from "@radix-ui/react-select";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import { tv, type VariantProps } from "tailwind-variants";

const selectContent = tv({
  slots: {
    root: "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-surface text-default shadow-md",
    viewport: "p-1",
    scrollUpButton: "",
    scrollDownButton: "",
  },
  variants: {
    position: {
      "item-aligned": {},
      popper: {
        root: "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        viewport:
          "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
      },
    },
  },
  defaultVariants: {
    position: "popper",
  },
});

export interface SelectContentProps
  extends ComponentPropsWithoutRef<typeof SelectPrimitive.Content>,
    VariantProps<typeof selectContent> {}

export const SelectContent = forwardRef<
  ElementRef<typeof SelectPrimitive.Content>,
  SelectContentProps
>((props, ref) => {
  const { className, children, position = "popper" } = props;
  const { root, viewport, scrollUpButton, scrollDownButton } =
    selectContent(props);

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={root({ className })}
        position={position}
        ref={ref}
        {...props}
      >
        <SelectPrimitive.ScrollUpButton className={scrollUpButton()}>
          <ChevronUpIcon />
        </SelectPrimitive.ScrollUpButton>

        <SelectPrimitive.Viewport className={viewport()}>
          {children}
        </SelectPrimitive.Viewport>

        <SelectPrimitive.ScrollDownButton className={scrollDownButton()}>
          <ChevronDownIcon />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
});
