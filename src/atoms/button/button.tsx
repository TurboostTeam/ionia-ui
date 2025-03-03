import omit from "lodash-es/omit";
import { type ReactElement } from "react";
import { tv, type VariantProps } from "tailwind-variants";

import { Spinner } from "../../spinner";
import { forwardRef } from "../../utils";

export const button = tv({
  slots: {
    root: "relative cursor-pointer rounded",
    buttonSpinnerWarp:
      "absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]",
    buttonSpinner: "",
    contentWarp: "flex w-full items-center justify-center gap-1",
    text: "text-center",
  },
  variants: {
    variant: {
      primary: {
        root: "bg-fill-primary text-fill-primary hover:bg-fill-primary-hover",
        buttonSpinner: "text-fill-primary",
      },
      secondary: {
        root: "border bg-fill-secondary text-default hover:bg-fill-secondary-hover",
        buttonSpinner: "text-default",
      },
      destructive: {
        root: "bg-fill-destructive text-fill-destructive hover:bg-fill-destructive-hover",
        buttonSpinner: "text-fill-destructive",
      },
      outline: {
        root: "border bg-transparent text-default",
        buttonSpinner: "text-default",
      },
      ghost: {
        root: "bg-fill-transparent text-default hover:bg-fill-transparent-hover",
        buttonSpinner: "text-default",
      },
      link: {
        root: "bg-transparent text-link underline-offset-4 hover:text-link-hover active:text-link-active",
      },
    },
    size: {
      sm: { root: "rounded p-1.5 text-xs font-normal" },
      md: { root: "rounded-md p-2 text-sm font-medium" },
      lg: { root: "rounded-lg p-3 text-sm font-semibold" },
    },
    block: {
      true: { root: "w-full" },
    },
    rounded: {
      true: { root: "rounded-full" },
    },
    loading: {
      true: {
        root: "pointer-events-none cursor-auto border text-transparent",
      },
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
      class: {
        root: "animate-pulse border-none bg-transparent text-link/60",
      },
    },
    {
      variant: ["primary", "secondary", "destructive", "outline", "ghost"],
      loading: true,
      class: {
        root: "opacity-50",
        contentWarp: "text-transparent",
      },
    },
  ],
});

export interface ButtonProps extends VariantProps<typeof button> {
  classNames?: {
    root?: string;
  };

  block?: boolean;

  type?: "button" | "reset" | "submit";
}

export const Button = forwardRef<ButtonProps, "button">(
  (props, ref): ReactElement => {
    const {
      as: Component = "button",
      children,
      disabled = false,
      loading = false,
      type = "button",
      classNames,
      rounded = false,
      block = false,
    } = props;

    const { root, buttonSpinnerWarp, buttonSpinner, contentWarp, text } =
      button(props);

    return (
      <Component
        className={root({ class: classNames?.root })}
        disabled={disabled || loading}
        ref={ref}
        type={type}
        {...omit(props, ["classNames"])}
        block={block ? "true" : !block ? "false" : undefined}
        loading={loading ? "true" : !loading ? "false" : undefined}
        rounded={rounded ? "true" : !rounded ? "false" : undefined}
      >
        {loading && props.variant !== "link" && (
          <span className={buttonSpinnerWarp()}>
            <Spinner className={buttonSpinner()} size={props.size} />
          </span>
        )}

        <span className={contentWarp()}>
          {typeof children !== "undefined" && (
            <span className={text()}>{children}</span>
          )}
        </span>
      </Component>
    );
  },
);
