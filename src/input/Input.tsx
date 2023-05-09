import clsx from "clsx";
import {
  type DetailedHTMLProps,
  type FC,
  type InputHTMLAttributes,
} from "react";

export interface InputProps
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    "size"
  > {
  label?: string;

  helperText?: string;

  error?: string;

  disabled?: boolean;

  size?: "md" | "lg";
}

const sizeMap = {
  md: clsx(`py-1.5 text-sm`),
  lg: clsx(`py-2.5 text-sm`),
};

/**
 * 按钮组件
 */
export const Input: FC<InputProps> = ({
  children,
  label,
  helperText,
  error,
  disabled = false,
  size = "md",
  className,
  ...props
}) => {
  return (
    <div>
      {typeof label !== "undefined" && (
        <label
          className="block text-sm font-medium leading-6 text-gray-900"
          htmlFor={label}
        >
          {label}
        </label>
      )}

      <div className={clsx(typeof label !== "undefined" && "mt-2")}>
        <input
          className={clsx(
            "block w-full rounded-md border-0 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6",
            typeof error === "undefined"
              ? `text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600`
              : `text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500`,
            sizeMap[size],
            className
          )}
          disabled={disabled}
          type="text"
          {...props}
        />
      </div>

      {(typeof error !== "undefined" || typeof helperText !== "undefined") && (
        <p
          className={clsx(
            `mt-2 text-sm`,
            typeof error !== "undefined" && `text-red-600`,
            typeof error === "undefined" &&
              typeof helperText !== "undefined" &&
              `text-gray-500`
          )}
        >
          {error ?? helperText}
        </p>
      )}
    </div>
  );
};
