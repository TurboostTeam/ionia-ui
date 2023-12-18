import { type FC } from "react";
import { twMerge } from "tailwind-merge";

import { type ActionProps } from "../Action";
import { Button } from "../Button";
import { Popover, type PopoverProps } from "../Popover";

export interface DropdownSectionProps {
  className?: string;
  title?: string;
  items: ActionProps[];
}

export interface DropdownProps extends PopoverProps {
  sections: DropdownSectionProps[];
}

export const Dropdown: FC<DropdownProps> = ({
  className,
  sections,
  ...props
}) => {
  return (
    <Popover {...props}>
      <div
        className={twMerge("flex flex-col cursor-default divide-y", className)}
      >
        {sections.map((section, sectionIndex) => {
          return (
            <div className="p-2" key={sectionIndex}>
              {typeof section.title !== "undefined" && (
                <div className="p-2 text-sm font-semibold">{section.title}</div>
              )}

              <div className="flex flex-col gap-1">
                {section.items.map(
                  ({ content, onAction, ...itemProps }, itemIndex) => {
                    return (
                      <Button
                        ghost
                        key={itemIndex}
                        onClick={onAction}
                        {...itemProps}
                      >
                        {content}
                      </Button>
                    );
                  },
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Popover>
  );
};
