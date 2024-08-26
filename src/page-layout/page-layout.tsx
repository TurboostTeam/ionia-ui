import { type FC, type PropsWithChildren } from "react";

export const PageLayout: FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex flex-wrap gap-4">{children}</div>;
};
