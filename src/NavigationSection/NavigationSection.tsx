import { type FC } from "react";
import { tv } from "tailwind-variants";

import { Icon } from "../Icon";
import { type SVGComponent } from "../types/SVGComponent";
import { NavigationItem, type NavigationItemProps } from "./NavigationItem";

// eslint-disable-next-line react-refresh/only-export-components
export const navigationSection = tv({
  slots: {
    title:
      "flex h-7 cursor-default items-center justify-between px-2 py-1 text-xs text-muted",
    titleContent: "pl-2",
    list: "flex flex-col gap-1",
  },
  variants: {
    isAction: {
      true: "cursor-pointer",
    },
  },
});
export interface NavigationSectionActionProps {
  icon: SVGComponent;
  onAction: () => void;
}

export interface NavigationSectionProps {
  title?: string;
  action?: NavigationSectionActionProps;
  items: NavigationItemProps[];
}

export const NavigationSection: FC<NavigationSectionProps> = ({
  title,
  action,
  items,
}) => {
  const isAction = typeof action !== "undefined";

  const {
    title: navigationSectionTitle,
    titleContent,
    list,
  } = navigationSection({
    isAction,
  });

  return (
    <div className="">
      {(typeof title !== "undefined" || typeof action !== "undefined") && (
        <div className={navigationSectionTitle()} onClick={action?.onAction}>
          <div className={titleContent()}>{title}</div>

          {typeof action?.icon !== "undefined" && (
            <Icon as={action.icon} size="sm" />
          )}
        </div>
      )}

      <ul className={list()}>
        {items.map((item, index) => {
          return <NavigationItem key={index} {...item} />;
        })}
      </ul>
    </div>
  );
};
