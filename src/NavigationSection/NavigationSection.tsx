import { type FC } from "react";
import { twMerge } from "tailwind-merge";

import { useAppProviderProps } from "../AppProvider";
import { Badge } from "../Badge";
import { Icon } from "../Icon";
import { useNavigationProps } from "../Navigation";
import { type SVGComponent } from "../types/SVGComponent";

export interface NavigationItemProps {
  href?: string;
  exactMatch?: boolean;
  excludePaths?: string[];
  selected?: boolean;
  label: string;
  icon?: SVGComponent;
  onAction?: () => void;
  badge?: string;
}

export const NavigationItem: FC<NavigationItemProps> = ({
  label,
  icon: Icon,
  href,
  exactMatch = false,
  excludePaths = [],
  selected = false,
  onAction,
  badge,
}) => {
  const { location } = useNavigationProps();
  const { linkComponent: Link } = useAppProviderProps();

  const active =
    selected ||
    (typeof href !== "undefined" &&
      !excludePaths.includes(href) &&
      (exactMatch ? href === location : location.startsWith(href)));

  return (
    <li className="px-2">
      <Link
        className={twMerge(
          "flex h-8 w-full cursor-pointer items-center gap-2 rounded pl-2 pr-1 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
          active && "bg-gray-50 text-indigo-600",
        )}
        href={href}
        onClick={onAction}
      >
        {typeof Icon !== "undefined" && <Icon className="h-5 w-5" />}
        <div className="flex-1 font-semibold">{label}</div>

        {typeof badge !== "undefined" && <Badge rounded>{badge}</Badge>}
      </Link>
    </li>
  );
};

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
  return (
    <div className="">
      {(typeof title !== "undefined" || typeof action !== "undefined") && (
        <div
          className={twMerge(
            "flex h-7 cursor-default items-center px-2 py-1 text-xs text-gray-600 justify-between",
            typeof action !== "undefined" && "cursor-pointer",
          )}
          onClick={action?.onAction}
        >
          <div className="pl-2">{title}</div>

          {typeof action?.icon !== "undefined" && (
            <Icon as={action.icon} size="sm" />
          )}
        </div>
      )}

      <ul className="flex flex-col gap-1">
        {items.map((item, index) => {
          return <NavigationItem key={index} {...item} />;
        })}
      </ul>
    </div>
  );
};
