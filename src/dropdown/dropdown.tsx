import { type FC } from "react";
import { twMerge } from "tailwind-merge";

import { type ActionProps } from "../action";
import { Button } from "../button";
import { Popover, type PopoverProps } from "../popover";

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
                        key={itemIndex}
                        variant="ghost"
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
