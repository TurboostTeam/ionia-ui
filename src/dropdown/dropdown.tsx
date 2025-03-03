import { type FC, type ReactNode } from "react";

import { type ActionProps } from "../action";
import { Button } from "../button";
import { Popover, type PopoverProps } from "../popover";

export interface DropdownSectionProps {
  className?: string;
  title?: string;
  items: ActionProps[];
  menuRender?: (menu: JSX.Element) => ReactNode;
}

export interface DropdownProps extends PopoverProps {
  sections: DropdownSectionProps[];
}

export const Dropdown: FC<DropdownProps> = ({ sections, ...props }) => {
  return (
    <Popover {...props}>
      <div className="flex cursor-default flex-col">
        {sections.map((section, sectionIndex) => {
          const menu = (
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
          );

          return (
            <div key={sectionIndex}>
              {typeof section.title !== "undefined" && (
                <div className="text-sm font-semibold">{section.title}</div>
              )}

              {typeof section?.menuRender !== "undefined"
                ? section.menuRender(menu)
                : menu}

              {/* Divider - only show between sections */}
              {sectionIndex < sections.length - 1 && <hr className="my-2" />}
            </div>
          );
        })}
      </div>
    </Popover>
  );
};
