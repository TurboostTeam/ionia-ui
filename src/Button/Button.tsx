import { type ReactElement } from "react";
import * as React from "react";
import { twMerge } from "tailwind-merge";

import { Icon } from "../Icon";
import { Spinner } from "../Spinner";
import { type SVGComponent } from "../types/SVGComponent";
import { forwardRef } from "../utils";

export interface ButtonProps {
  primary?: boolean;

  destructive?: boolean;

  ghost?: boolean;

  block?: boolean;

  link?: boolean;

  icon?: SVGComponent;

  rounded?: boolean;

  disabled?: boolean;

  loading?: boolean;

  size?: "sm" | "md" | "lg";

  type?: "button" | "reset" | "submit";
}

const sizeMap = {
  sm: twMerge(`px-3 py-1.5 text-xs font-normal`),
  md: twMerge(`px-3 py-2 text-sm font-medium`),
  lg: twMerge(`px-6 py-3 text-sm font-semibold`),
};

const linkSizeMap = {
  sm: twMerge(`-mx-3 -my-1.5`),
  md: twMerge(`-mx-3 -my-2`),
  lg: twMerge(`-mx-6 -my-3`),
};

const withoutContentSizeMap = {
  sm: twMerge(`p-1.5`),
  md: twMerge(`p-2`),
  lg: twMerge(`p-3`),
};

export const Button = forwardRef<ButtonProps, "button">(
  (
    {
      as,
      children,
      icon,
      primary = false,
      destructive = false,
      ghost = false,
      link = false,
      block = false,
      rounded = false,
      disabled = false,
      loading = false,
      size = "md",
      className,
      type = "button",
      ...props
    },
    ref,
  ): ReactElement => {
    const Component = as ?? "button";

    return (
      <Component
        className={twMerge(
          // 基本类
          `relative cursor-pointer`,
          sizeMap[size],
          typeof children === "undefined" && withoutContentSizeMap[size],
          link && linkSizeMap[size],
          link
            ? `font-normal text-indigo-600 hover:text-indigo-400`
            : `shadow-sm`,
          link && destructive && `text-red-600 hover:text-red-400`,
          // 默认和加载
          !link &&
            ((!primary && !destructive) ||
              (primary && destructive) ||
              loading) &&
            `bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400`,
          // 主要
          !link &&
            !loading &&
            primary &&
            !destructive &&
            `bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400`,
          // 危险
          !link &&
            !loading &&
            !primary &&
            destructive &&
            `bg-red-600 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:bg-red-400`,
          // 透明
          ghost &&
            `bg-transparent text-gray-900 hover:bg-gray-100 ring-0 shadow-none`,
          // 其他
          block && `block w-full`,
          rounded ? `rounded-full` : `rounded-md`,
          disabled && "cursor-not-allowed",
          disabled && link && "text-indigo-400",
          disabled && link && destructive && "text-red-400",
          loading && link && "animate-pulse text-indigo-400",
          loading && link && destructive && "text-red-400",
          className,
        )}
        disabled={disabled || loading}
        ref={ref}
        type={type}
        {...props}
      >
        {loading && !link && (
          <span className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
            <Spinner className="text-slate-500" size={size} />
          </span>
        )}

        <span
          className={twMerge(
            `flex w-full justify-center items-center gap-1`,
            loading && !link && `text-transparent`,
          )}
        >
          {typeof icon !== "undefined" && <Icon as={icon} size={size} />}

          {typeof children !== "undefined" && (
            <span className="text-center">{children}</span>
          )}
        </span>
      </Component>
    );
  },
);
