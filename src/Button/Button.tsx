import { type ReactElement } from "react";
import { tv, type VariantProps } from "tailwind-variants";

import { Icon } from "../Icon";
import { Spinner } from "../Spinner";
import { type SVGComponent } from "../types/SVGComponent";
import { forwardRef } from "../utils";

// eslint-disable-next-line react-refresh/only-export-components
export const button = tv({
  slots: {
    root: "relative  cursor-pointer rounded",
    buttonSpinnerWarp:
      "absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]",
    buttonSpinner: "text-slate-500",
    contentWarp: "flex w-full items-center justify-center gap-1",
    text: "text-center",
  },
  variants: {
    variant: {
      primary: {
        root: "bg-primary text-primary hover:bg-primary/80",
      },
      secondary: {
        root: "border bg-secondary text-secondary hover:bg-muted",
      },
      destructive: {
        root: "bg-destructive text-destructive hover:bg-destructive/80",
      },

      outline: { root: "border bg-transparent text-default" },
      ghost: { root: "bg-transparent text-default hover:bg-muted" },
      link: {
        root: "bg-transparent text-link underline-offset-4 hover:text-link/60",
      },
    },
    size: {
      sm: {
        root: "rounded px-3 py-1.5 text-xs font-normal",
      },
      md: { root: "rounded-md px-3 py-2 text-sm font-medium" },
      lg: { root: "rounded-lg px-6 py-3 text-sm font-semibold" },
    },
    block: {
      true: { root: "w-full" },
    },
    rounded: {
      true: { root: "rounded-full" },
    },

    loading: {
      true: { root: "border bg-muted text-transparent hover:bg-muted" },
    },
    disabled: {
      true: { root: "pointer-events-none cursor-not-allowed opacity-50" },
    },
  },
  defaultVariants: {
    variant: "secondary",
    size: "md",
  },
  compoundVariants: [
    {
      variant: "link",
      loading: true,
      class: { root: "animate-pulse border-none bg-transparent text-link/60" },
    },
    {
      variant: ["primary", "secondary", "destructive", "outline", "ghost"],
      loading: true,
      class: {
        contentWarp: "text-transparent",
      },
    },
  ],
});

type ButtonVariants = VariantProps<typeof button>;

export interface ButtonProps extends ButtonVariants {
  block?: boolean;

  icon?: SVGComponent;

  type?: "button" | "reset" | "submit";
}

export const Button = forwardRef<ButtonProps, "button">(
  (props, ref): ReactElement => {
    const {
      as: Component = "button",
      children,
      icon,
      disabled = false,
      loading = false,
      type = "button",
    } = props;

    const { root, buttonSpinnerWarp, buttonSpinner, contentWarp, text } =
      button(props);

    return (
      <Component
        className={root()}
        disabled={disabled || loading}
        ref={ref}
        type={type}
        {...props}
      >
        {loading && props.variant !== "link" && (
          <span className={buttonSpinnerWarp()}>
            <Spinner className={buttonSpinner()} size={props.size} />
          </span>
        )}

        <span className={contentWarp()}>
          {typeof icon !== "undefined" && <Icon as={icon} size={props.size} />}

          {typeof children !== "undefined" && (
            <span className={text()}>{children}</span>
          )}
        </span>
      </Component>
    );
  },
);
