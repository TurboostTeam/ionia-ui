import { type MouseEvent, type MouseEventHandler, useCallback } from "react";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

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

export const BadgeStyle = tv({
  slots: {
    baseBadge:
      "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset",
    removeButton: "group relative -mr-1 h-3.5 w-3.5",
    removeIconColor: "h-3.5 w-3.5",
  },
  variants: {
    color: {
      gray: {
        baseBadge: "r bg-gray-50 text-gray-600 ring-gray-500/10 ",
        removeButton: "hover:bg-gray-500/20",
        removeIconColor: "stroke-gray-700/50 group-hover:stroke-gray-700/75",
      },
      red: {
        baseBadge: "r bg-red-50 text-red-700 ring-red-600/10 ",
        removeButton: "hover:bg-red-600/20",
        removeIconColor: "stroke-red-700/50 group-hover:stroke-red-700/75",
      },
      yellow: {
        baseBadge: "bg-yellow-50 text-yellow-800 ring-yellow-600/20",
        removeButton: "hover:bg-yellow-600/20",
        removeIconColor:
          "stroke-yellow-800/50 group-hover:stroke-yellow-800/75",
      },
      green: {
        baseBadge: "bg-green-50 text-green-700 ring-green-600/20",
        removeButton: "hover:bg-green-600/20",
        removeIconColor: "stroke-green-800/50 group-hover:stroke-green-800/75",
      },
      blue: {
        baseBadge: "bg-blue-50 text-blue-700 ring-blue-700/10",
        removeButton: "hover:bg-blue-600/20",
        removeIconColor: "stroke-blue-800/50 group-hover:stroke-blue-800/75",
      },
      indigo: {
        baseBadge: "bg-indigo-50 text-indigo-700 ring-indigo-700/10",
        removeButton: "hover:bg-fill-primary/20",
        removeIconColor:
          "stroke-indigo-700/50 group-hover:stroke-indigo-700/75",
      },
      purple: {
        baseBadge: "bg-purple-50 text-purple-700 ring-purple-700/10",
        removeButton: "hover:bg-purple-600/20",
        removeIconColor:
          "stroke-purple-700/50 group-hover:stroke-purple-700/75",
      },
      pink: {
        baseBadge: "bg-pink-50 text-pink-700 ring-pink-700/10",
        removeButton: "hover:bg-pink-600/20",
        removeIconColor: "stroke-pink-800/50 group-hover:stroke-pink-800/75",
      },
    },
    disabled: {
      true: {
        removeButton: "cursor-not-allowed hover:bg-transparent",
      },
    },
    rounded: {
      true: {
        baseBadge: "rounded-full",
        removeButton: "rounded-full",
      },
      false: {
        baseBadge: "rounded-md",
        removeButton: "rounded-sm",
      },
    },
  },
});

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
    ref,
  ) => {
    const handleRemove = useCallback(
      (event: MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        onRemove?.(event);
      },
      [onRemove],
    );

    const { baseBadge, removeButton, removeIconColor } = BadgeStyle({
      color,
      disabled,
      rounded,
    });

    return (
      <span
        className={twMerge(
          baseBadge(),
          typeof onClick !== "undefined" && "cursor-pointer",
          className,
        )}
        ref={ref}
        onClick={onClick}
        {...props}
      >
        {children}

        {typeof onRemove !== "undefined" && (
          <button
            className={removeButton()}
            disabled={disabled}
            type="button"
            onClick={(event) => {
              if (!disabled) {
                handleRemove(event);
              }
            }}
          >
            <span className="sr-only">Remove</span>
            <svg className={removeIconColor()} viewBox="0 0 14 14">
              <path d="M4 4l6 6m0-6l-6 6" />
            </svg>
            <span className="absolute -inset-1" />
          </button>
        )}
      </span>
    );
  },
);
