import { type FC } from "react";
import { tv } from "tailwind-variants";

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
  const badgeVariants = tv({
    base: "absolute rounded-full text-xs text-white",
    variants: {
      color: {
        blue: "bg-blue-500",
        green: "bg-green-500",
        gray: "bg-gray-500",
        indigo: "bg-indigo-500",
        pink: "bg-pink-500",
        purple: "bg-purple-500",
        red: "bg-red-500",
        yellow: "bg-yellow-500",
      },
      placement: {
        "top-left": "left-0 top-0 -translate-x-1/2 -translate-y-1/2",
        "top-right": "right-0 top-0 -translate-y-1/2 translate-x-1/2",
        "bottom-left": "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
        "bottom-right": "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
      },
      content: {
        true: "p-0.5",
        false: "p-1",
      },
    },
    defaultVariants: {
      color: "gray",
      placement: "top-right",
    },
  });

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
            className={badgeVariants({
              color: badge.color,
              placement: badge.placement,
              content: typeof badge.content !== "undefined",
            })}
          >
            {badge.content}
          </span>
        )}
      </div>
    </div>
  );
};
