import { type FC, type PropsWithChildren } from "react";

import { PageLayoutSection } from "../page-layout-section";

export interface PageLayoutAnnotatedSectionProps {
  title?: string;
  description?: string;
}

export const PageLayoutAnnotatedSection: FC<
  PropsWithChildren<PageLayoutAnnotatedSectionProps>
> = ({ title, description, children }, ref) => (
  <>
    <PageLayoutSection variant="secondary">
      <h2 className="text-base font-semibold">{title}</h2>
      <p className="mt-4 text-sm text-description">{description}</p>
    </PageLayoutSection>
    <PageLayoutSection variant="primary">{children}</PageLayoutSection>
  </>
);
