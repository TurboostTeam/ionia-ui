import { type FC, type ReactNode } from "react";

export interface PageProps {
  title: string;
  children?: ReactNode;
  primaryButton?: ReactNode;
  secondaryButtons?: ReactNode[];
}

export const Page: FC<PageProps> = ({
  title,
  children,
  primaryButton,
  secondaryButtons = [],
}) => {
  return (
    <div className="p-6">
      <div className="mb-6 md:flex md:items-center md:justify-between">
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
