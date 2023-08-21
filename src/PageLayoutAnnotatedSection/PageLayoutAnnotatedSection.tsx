import { type FC, type PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

export interface PageLayoutAnnotatedSectionProps {
  title?: string;
  description?: string;
}

export const PageLayoutAnnotatedSection: FC<
  PropsWithChildren<PageLayoutAnnotatedSectionProps>
> = ({ title, description, children }) => {
  return (
    <div className={twMerge(`flex flex-1 basis-full min-w-0 gap-4 flex-wrap`)}>
      <div className="min-w-0 flex-[1] basis-full py-5 md:basis-0">
        <h2 className="text-base font-semibold">{title}</h2>
        <div className="mt-4 text-sm text-gray-500">
          <p>{description}</p>
        </div>
      </div>

      <div className="min-w-[51%] flex-[2] basis-full md:basis-0">
        {children}
      </div>
    </div>
  );
};
