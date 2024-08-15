import { type FC, useCallback } from "react";
import { twMerge } from "tailwind-merge";

type BadgePlacement = "top-left" | "top-right" | "bottom-left" | "bottom-right";
type BadgeColor =
  | "gray"
  | "red"
  | "yellow"
  | "green"
  | "blue"
  | "indigo"
  | "purple"
  | "pink";

export interface TopBarUserMenuProps {
  name: string;
  avatar?: string;
  badge?: {
    color?: BadgeColor;
    placement?: BadgePlacement;
    content?: string;
  };
}

export const TopBarUserMenu: FC<TopBarUserMenuProps> = ({
  name,
  avatar,
  badge,
}) => {
  const getBadgePosition = useCallback((placement: BadgePlacement) => {
    switch (placement) {
      case "top-left":
        return "top-0 left-0 -translate-x-1/2 -translate-y-1/2";
      case "top-right":
        return "top-0 right-0 translate-x-1/2 -translate-y-1/2";
      case "bottom-left":
        return "bottom-0 left-0 -translate-x-1/2 translate-y-1/2";
      case "bottom-right":
        return "bottom-0 right-0 translate-x-1/2 translate-y-1/2";
      default:
        return "top-0 right-0 translate-x-1/2 -translate-y-1/2";
    }
  }, []);

  const getBadgeColor = useCallback((color: BadgeColor) => {
    switch (color) {
      case "blue":
        return "bg-blue-500";
      case "green":
        return "bg-green-500";
      case "gray":
        return "bg-gray-500";
      case "indigo":
        return "bg-indigo-500";
      case "pink":
        return "bg-pink-500";
      case "purple":
        return "bg-purple-500";
      case "red":
        return "bg-red-500";
      case "yellow":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  }, []);

  return (
    <div className="flex cursor-pointer items-center justify-center gap-1 rounded p-0.5 text-sm hover:bg-gray-100">
      <div className="max-w-[theme(spacing.40)] truncate px-2">{name}</div>

      <div className="relative h-7 w-7 rounded bg-gray-300">
        {typeof avatar !== "undefined" ? (
          <img alt={name} src={avatar} />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            {name.slice(0, 1)}
          </div>
        )}

        {typeof badge !== "undefined" && (
          <span
            className={twMerge(
              "absolute  text-white text-xs bg-red-500 rounded-full",
              getBadgePosition(badge?.placement ?? "top-right"),
              typeof badge.content !== "undefined" ? "p-0.5" : "p-1",
              getBadgeColor(badge?.color ?? "gray"),
            )}
          >
            {badge.content}
          </span>
        )}
      </div>
    </div>
  );
};
