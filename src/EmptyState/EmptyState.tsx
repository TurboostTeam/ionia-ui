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
        <div className="mx-auto h-12 w-12 text-secondary-foreground">
          {icon}
        </div>
      )}

      {typeof title !== "undefined" && (
        <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
          {title}
        </h3>
      )}

      {typeof description !== "undefined" && (
        <p className="mt-1 text-sm text-description">{description}</p>
      )}
    </div>
  );
};
