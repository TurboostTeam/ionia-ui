import { Popover as HeadlessPopover } from "@headlessui/react";
import {
  type FC,
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
    <HeadlessPopover>
      <HeadlessPopover.Button
        as="div"
        className="inline-block"
        ref={setReferenceElement}
      >
        {activator}
      </HeadlessPopover.Button>

      <HeadlessPopover.Panel
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
      >
        <div className="m-2">
          <div className={twMerge("rounded-md bg-white shadow-md", className)}>
            {children}
          </div>
        </div>
      </HeadlessPopover.Panel>
    </HeadlessPopover>
  );
};
