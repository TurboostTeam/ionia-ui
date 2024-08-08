import { type FC } from "react";
import { tv } from "tailwind-variants";

import { useAppProviderProps } from "../AppProvider";
import { Badge } from "../Badge";
import { useNavigationProps } from "../Navigation";
import { type SVGComponent } from "../types/SVGComponent";
import {
  NavigationItemChildrenItem,
  type NavigationItemChildrenItemProps,
} from "./NavigationItemChildrenItem";

export interface NavigationItemProps {
  href?: string;
  exactMatch?: boolean;
  excludePaths?: string[];
  selected?: boolean;
  label: string;
  icon?: SVGComponent;
  onAction?: () => void;
  badge?: string;
  classNames?: {
    itemLink?: string;
  };
  children?: NavigationItemChildrenItemProps[];
}

// eslint-disable-next-line react-refresh/only-export-components
export const navigationItem = tv({
  slots: {
    root: "px-2",
    itemLink:
      "flex h-8 w-full items-center gap-2 rounded pl-2 pr-1 text-sm text-nav ",
    itemIcon: "h-5 w-5",
    itemLabel: "flex-1 font-semibold",
    itemChildrenList: "flex flex-col gap-1",
  },
  variants: {
    itemActive: {
      true: { itemLink: "bg-nav-surface text-nav-active " },
    },
    isHref: {
      true: {
        itemLink:
          "cursor-pointer hover:bg-nav-surface-hover hover:text-nav-hover",
      },
    },
  },
  compoundVariants: [
    {
      itemActive: true,
      isHref: true,
      class: {
        itemLink: "hover:bg-nav-surface-hover hover:text-nav-hover",
      },
    },
  ],
});

export const NavigationItem: FC<NavigationItemProps> = ({
  label,
  icon: Icon,
  href,
  exactMatch = false,
  excludePaths = [],
  selected = false,
  onAction,
  badge,
  children,
  classNames,
}) => {
  const { location } = useNavigationProps();
  const { linkComponent: Link } = useAppProviderProps();
  const { root, itemLink, itemIcon, itemLabel, itemChildrenList } =
    navigationItem();

  const itemActive =
    selected ||
    (typeof href !== "undefined" &&
      !excludePaths.includes(href) &&
      (exactMatch ? href === location : location.startsWith(href)));

  const isHref = typeof href !== "undefined";

  return (
    <li className={root()}>
      <Link
        className={itemLink({
          itemActive,
          isHref,
          class: classNames?.itemLink,
        })}
        href={href}
        onClick={onAction}
      >
        {typeof Icon !== "undefined" && <Icon className={itemIcon()} />}
        <div className={itemLabel()}>{label}</div>
        {typeof badge !== "undefined" && <Badge rounded>{badge}</Badge>}
      </Link>
      {typeof children !== "undefined" && (
        <ul className={itemChildrenList()}>
          {children.map((item, index) => {
            return <NavigationItemChildrenItem key={index} {...item} />;
          })}
        </ul>
      )}
    </li>
  );
};
