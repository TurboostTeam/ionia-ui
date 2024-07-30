import { Popover as HeadlessPopover } from "@headlessui/react";
import {
  type FC,
  Fragment,
  type PropsWithChildren,
  type ReactElement,
  useState,
} from "react";
import { usePopper } from "react-popper";
import { twMerge } from "tailwind-merge";

export interface PopoverProps {
  activator: ReactElement;
  className?: string;
  placement?:
    | "auto"
    | "auto-start"
    | "auto-end"
    | "top"
    | "top-start"
    | "top-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "right"
    | "right-start"
    | "right-end"
    | "left"
    | "left-start"
    | "left-end";
}

export const Popover: FC<PropsWithChildren<PopoverProps>> = ({
  activator,
  className,
  children,
  placement,
}) => {
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
    null,
  );

  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
  });

  return (
    <HeadlessPopover as={Fragment}>
      <HeadlessPopover.Button as={Fragment} ref={setReferenceElement}>
        {activator}
      </HeadlessPopover.Button>

      <HeadlessPopover.Panel
        className="z-[1010]"
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
      >
        <div className="m-2">
          <div className={twMerge("rounded-md bg-surface shadow", className)}>
            {children}
          </div>
        </div>
      </HeadlessPopover.Panel>
    </HeadlessPopover>
  );
};
