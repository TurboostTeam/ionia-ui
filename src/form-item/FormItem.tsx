import {
  type DetailedHTMLProps,
  type FC,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { twMerge } from "tailwind-merge";

export interface FormItemProps
  extends Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    "value" | "onChange"
  > {
  children?: ReactNode;
  className?: string;
  label?: string;
  helpText?: string;
  error?: string;
}

export const FormItem: FC<FormItemProps> = ({
  children,
  className,
  label,
  helpText,
  error,
  ...props
}) => {
  return (
    <div className="w-full" {...props}>
      {typeof label !== "undefined" && (
        <label
          className={twMerge(
            "block font-medium leading-6 text-gray-900 text-sm",
            className
          )}
          htmlFor={label}
        >
          {label}
        </label>
      )}

      <div className={twMerge(typeof label !== "undefined" && "mt-2")}>
        {children}
      </div>

      {(typeof error !== "undefined" || typeof helpText !== "undefined") && (
        <p
          className={twMerge(
            `mt-2 text-sm`,
            typeof error !== "undefined" && `text-red-600`,
            typeof error === "undefined" &&
              typeof helpText !== "undefined" &&
              `text-gray-500`
          )}
        >
          {error ?? helpText}
        </p>
      )}
    </div>
  );
};
