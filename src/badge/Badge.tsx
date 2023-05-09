import clsx from "clsx";
import { type FC, type MouseEventHandler, useCallback } from "react";

import { type HTMLProps } from "../common";

export interface BadgeProps extends HTMLProps<"span"> {
  color?:
    | "gray"
    | "red"
    | "yellow"
    | "green"
    | "blue"
    | "indigo"
    | "purple"
    | "pink";

  rounded?: boolean;

  onRemove?: MouseEventHandler<HTMLSpanElement>;
}

const badgeColorMap = {
  gray: clsx("bg-gray-50 text-gray-600 ring-gray-500/10"),
  red: clsx("bg-red-50 text-red-700 ring-red-600/10"),
  yellow: clsx("bg-yellow-50 text-yellow-800 ring-yellow-600/20"),
  green: clsx("bg-green-50 text-green-700 ring-green-600/20"),
  blue: clsx("bg-blue-50 text-blue-700 ring-blue-700/10"),
  indigo: clsx("bg-indigo-50 text-indigo-700 ring-indigo-700/10"),
  purple: clsx("bg-purple-50 text-purple-700 ring-purple-700/10"),
  pink: clsx("bg-pink-50 text-pink-700 ring-pink-700/10"),
};

const badgeRemoveButtonColorMap = {
  gray: clsx("hover:bg-gray-500/20"),
  red: clsx("hover:bg-red-600/20"),
  yellow: clsx("hover:bg-yellow-600/20"),
  green: clsx("hover:bg-green-600/20"),
  blue: clsx("hover:bg-blue-600/20"),
  indigo: clsx("hover:bg-indigo-600/20"),
  purple: clsx("hover:bg-purple-600/20"),
  pink: clsx("hover:bg-pink-600/20"),
};

const badgeRemoveIconColorMap = {
  gray: clsx("stroke-gray-700/50 group-hover:stroke-gray-700/75"),
  red: clsx("stroke-red-700/50 group-hover:stroke-red-700/75"),
  yellow: clsx("stroke-yellow-800/50 group-hover:stroke-yellow-800/75"),
  green: clsx("stroke-green-800/50 group-hover:stroke-green-800/75"),
  blue: clsx("stroke-blue-800/50 group-hover:stroke-blue-800/75"),
  indigo: clsx("stroke-indigo-700/50 group-hover:stroke-indigo-700/75"),
  purple: clsx("stroke-violet-700/50 group-hover:stroke-violet-700/75"),
  pink: clsx("stroke-pink-800/50 group-hover:stroke-pink-800/75"),
};

/**
 * 标记组件
 */
export const Badge: FC<BadgeProps> = ({
  children,
  color = "gray",
  rounded = false,
  onClick,
  onRemove,
  className,
  ...props
}) => {
  const handleRemove = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation();
      onRemove?.(event);
    },
    [onRemove]
  );

  return (
    <span
      className={clsx(
        "inline-flex items-center  px-2 py-1 text-xs font-medium ring-1 ring-inset",
        rounded ? "rounded-full" : "rounded-md",
        typeof onClick !== "undefined" && "cursor-pointer",
        badgeColorMap[color],
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}

      {typeof onRemove !== "undefined" && (
        <button
          className={clsx(
            "group relative -mr-1 h-3.5 w-3.5",
            rounded ? "rounded-full" : "rounded-sm",
            badgeRemoveButtonColorMap[color]
          )}
          type="button"
          onClick={handleRemove}
        >
          <span className="sr-only">Remove</span>
          <svg
            className={clsx("h-3.5 w-3.5", badgeRemoveIconColorMap[color])}
            viewBox="0 0 14 14"
          >
            <path d="M4 4l6 6m0-6l-6 6" />
          </svg>
          <span className="absolute -inset-1" />
        </button>
      )}
    </span>
  );
};
