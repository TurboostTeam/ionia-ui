import { type FC, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export interface PageProps {
  title: string;
  fullWidth?: boolean;
  children?: ReactNode;
  primaryButton?: ReactNode;
  secondaryButtons?: ReactNode[];
}

export const Page: FC<PageProps> = ({
  title,
  fullWidth = false,
  children,
  primaryButton,
  secondaryButtons = [],
}) => {
  return (
    <div className={twMerge(`p-4 mx-auto`, !fullWidth && `max-w-5xl`)}>
      <div className="mb-4 md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        </div>

        <div className="mt-4 flex md:ml-4 md:mt-0">
          {secondaryButtons}
          {primaryButton}
        </div>
      </div>

      <div>{children}</div>
    </div>
  );
};
