import { type FC, type SVGProps } from "react";
import { twMerge } from "tailwind-merge";

export interface SpinnerProps extends SVGProps<SVGSVGElement> {
  size?: keyof typeof sizeMap;
}

const sizeMap = {
  xs: twMerge(`h-3 w-3`),
  sm: twMerge(`h-4 w-4`),
  md: twMerge(`h-5 w-5`),
  lg: twMerge(`h-6 w-6`),
  xl: twMerge(`h-7 w-7`),
  "2xl": twMerge(`h-8 w-8`),
  "3xl": twMerge(`h-9 w-9`),
  "4xl": twMerge(`h-10 w-10`),
  "5xl": twMerge(`h-11 w-11`),
};

/**
 * 按钮组件
 */
export const Spinner: FC<SpinnerProps> = ({
  size = "md",
  className,
  ...props
}) => {
  return (
    <svg
      className={twMerge(
        "animate-spin text-indigo-600",
        sizeMap[size],
        className
      )}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        fill="currentColor"
      />
    </svg>
  );
};
