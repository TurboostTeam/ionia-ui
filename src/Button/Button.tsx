import { type ReactElement } from "react";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

import { Icon } from "../Icon";
import { Spinner } from "../Spinner";
import { type SVGComponent } from "../types/SVGComponent";
import { forwardRef } from "../utils";

export interface ButtonProps {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "link"
    | "destructive";

  danger?: boolean;

  block?: boolean;

  icon?: SVGComponent;

  rounded?: boolean;

  disabled?: boolean;

  loading?: boolean;

  size?: "sm" | "md" | "lg";

  type?: "button" | "reset" | "submit";
}

export const ButtonStyle = tv({
  base: "relative  cursor-pointer rounded  ",
  variants: {
    variant: {
      primary: "bg-primary text-primary hover:bg-primary/80",
      secondary: "border bg-secondary text-secondary hover:bg-muted",
      destructive: "bg-destructive text-destructive hover:bg-destructive/80",
      outline: "border bg-transparent text-default",
      ghost: "bg-transparent text-default hover:bg-muted",
      link: "bg-transparent text-link underline-offset-4 hover:text-link/60",
    },
    size: {
      sm: "rounded px-3 py-1.5 text-xs font-normal",
      md: "rounded-md px-3 py-2 text-sm font-medium",
      lg: "rounded-lg px-6 py-3 text-sm font-semibold",
    },
    block: {
      true: "w-full",
    },
    rounded: {
      true: "rounded-full",
    },

    loading: {
      true: "border bg-muted text-transparent hover:bg-muted",
    },
    disabled: {
      true: "pointer-events-none cursor-not-allowed opacity-50",
    },
  },
  compoundVariants: [
    {
      variant: "link",
      loading: true,
      class: "animate-pulse border-none bg-transparent text-link/60",
    },
  ],
});

export const Button = forwardRef<ButtonProps, "button">(
  (
    {
      as,
      children,
      icon,
      variant = "secondary",
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
          ButtonStyle({
            size,
            variant,
            block,
            rounded,
            disabled,
            loading,
          }),
          className,
        )}
        disabled={disabled || loading}
        ref={ref}
        type={type}
        {...props}
      >
        {loading && variant !== "link" && (
          <span className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
            <Spinner className="text-slate-500" size={size} />
          </span>
        )}

        <span
          className={twMerge(
            `flex w-full justify-center items-center gap-1`,
            loading && variant !== "link" && `text-transparent`,
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
