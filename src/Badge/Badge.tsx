import { type MouseEvent, type MouseEventHandler, useCallback } from "react";
import { twMerge } from "tailwind-merge";

import { forwardRef } from "../utils";

export interface BadgeProps {
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

  disabled?: boolean;

  onRemove?: MouseEventHandler<HTMLSpanElement>;
}

const badgeColorMap = {
  gray: twMerge("r bg-gray-50 text-gray-600 ring-gray-500/10 "),
  red: twMerge("r bg-red-50 text-red-700 ring-red-600/10 "),
  yellow: twMerge("bg-yellow-50 text-yellow-800 ring-yellow-600/20"),
  green: twMerge("bg-green-50 text-green-700 ring-green-600/20"),
  blue: twMerge("bg-blue-50 text-blue-700 ring-blue-700/10"),
  indigo: twMerge("bg-indigo-50 text-indigo-700 ring-indigo-700/10"),
  purple: twMerge("bg-purple-50 text-purple-700 ring-purple-700/10"),
  pink: twMerge("bg-pink-50 text-pink-700 ring-pink-700/10"),
};

const badgeRemoveButtonColorMap = {
  gray: twMerge("hover:bg-gray-500/20"),
  red: twMerge("hover:bg-red-600/20"),
  yellow: twMerge("hover:bg-yellow-600/20"),
  green: twMerge("hover:bg-green-600/20"),
  blue: twMerge("hover:bg-blue-600/20"),
  indigo: twMerge("hover:bg-indigo-600/20"),
  purple: twMerge("hover:bg-purple-600/20"),
  pink: twMerge("hover:bg-pink-600/20"),
};

const badgeRemoveIconColorMap = {
  gray: twMerge("stroke-gray-700/50 group-hover:stroke-gray-700/75"),
  red: twMerge("stroke-red-700/50 group-hover:stroke-red-700/75"),
  yellow: twMerge("stroke-yellow-800/50 group-hover:stroke-yellow-800/75"),
  green: twMerge("stroke-green-800/50 group-hover:stroke-green-800/75"),
  blue: twMerge("stroke-blue-800/50 group-hover:stroke-blue-800/75"),
  indigo: twMerge("stroke-indigo-700/50 group-hover:stroke-indigo-700/75"),
  purple: twMerge("stroke-violet-700/50 group-hover:stroke-violet-700/75"),
  pink: twMerge("stroke-pink-800/50 group-hover:stroke-pink-800/75"),
};

/**
 * 标记组件
 */
export const Badge = forwardRef<BadgeProps, "span">(
  (
    {
      children,
      color = "gray",
      rounded = false,
      onClick,
      onRemove,
      className,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const handleRemove = useCallback(
      (event: MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        onRemove?.(event);
      },
      [onRemove]
    );

    return (
      <span
        className={twMerge(
          "inline-flex items-center  px-2 py-1 text-xs font-medium ring-1 ring-inset",
          rounded ? "rounded-full" : "rounded-md",
          typeof onClick !== "undefined" && "cursor-pointer",
          badgeColorMap[color],
          className
        )}
        ref={ref}
        onClick={onClick}
        {...props}
      >
        {children}

        {typeof onRemove !== "undefined" && (
          <button
            className={twMerge(
              "group relative -mr-1 h-3.5 w-3.5",
              rounded ? "rounded-full" : "rounded-sm",
              !disabled
                ? badgeRemoveButtonColorMap[color]
                : "cursor-not-allowed"
            )}
            disabled={disabled}
            type="button"
            onClick={(event) => {
              if (!disabled) {
                handleRemove(event);
              }
            }}
          >
            <span className="sr-only">Remove</span>
            <svg
              className={twMerge("h-3.5 w-3.5", badgeRemoveIconColorMap[color])}
              viewBox="0 0 14 14"
            >
              <path d="M4 4l6 6m0-6l-6 6" />
            </svg>
            <span className="absolute -inset-1" />
          </button>
        )}
      </span>
    );
  }
);
