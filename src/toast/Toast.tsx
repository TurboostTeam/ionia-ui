import { XMarkIcon } from "@heroicons/react/24/outline";
import { type FC, type ReactNode } from "react";

export interface ToastProps {
  children?: ReactNode;
  onDismiss?: () => void;
}

export const Toast: FC<ToastProps> = ({ children, onDismiss }) => {
  return (
    <div className="inline-block">
      <div className="flex w-auto items-center justify-between gap-1 rounded-lg bg-gray-800 p-3 text-sm text-gray-50 shadow-lg">
        <div>{children}</div>

        <XMarkIcon
          className="-mr-1 h-4 w-4 cursor-pointer"
          onClick={() => {
            onDismiss?.();
          }}
        />
      </div>
    </div>
  );
};
