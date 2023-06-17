import { DocumentIcon } from "@heroicons/react/24/outline";
import { type FC, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export interface EmptyStateProps {
  icon?: ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export const EmptyState: FC<EmptyStateProps> = ({
  icon = <DocumentIcon />,
  title,
  description,
  className,
}) => {
  return (
    <div className={twMerge("text-center", className)}>
      {typeof icon !== "undefined" && (
        <div className="mx-auto h-12 w-12 text-gray-400">{icon}</div>
      )}

      {typeof title !== "undefined" && (
        <h3 className="mt-2 text-sm font-semibold text-gray-900">{title}</h3>
      )}

      {typeof description !== "undefined" && (
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
};
