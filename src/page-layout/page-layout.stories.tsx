import type { Meta } from "@storybook/react";
import { type FC } from "react";

import { Card } from "../card";
import { Page } from "../page";
import { PageLayoutAnnotatedSection } from "../page-layout-annotated-section";
import { PageLayoutSection } from "../page-layout-section";
import { PageLayout } from "./page-layout";
import page from "./page-layout.mdx";

export default {
  title: "Layout 布局/PageLayout 页面布局",
  component: PageLayout,
  parameters: {
    docs: {
      page,
    },
  },
} satisfies Meta<typeof PageLayout>;

export const OneColumn: FC = (args) => {
  return (
    <div className="bg-gray-50">
      <Page>
        <PageLayout>
          <PageLayoutSection>
            <Card title="Online store dashboard">
              <p>View a summary of your online store’s performance.</p>
            </Card>
          </PageLayoutSection>
        </PageLayout>
      </Page>
    </div>
  );
};

export const TwoColumns: FC = (args) => {
  return (
    <div className="bg-gray-50">
      <Page>
        <PageLayout>
          <PageLayoutSection>
            <Card title="Order details">
              <p>
                Use to follow a normal section with a secondary section to
                create a 2/3 + 1/3 layout on detail pages (such as individual
                product or order pages). Can also be used on any page that needs
                to structure a lot of content. This layout stacks the columns on
                small screens.
              </p>
            </Card>
          </PageLayoutSection>

          <PageLayoutSection secondary>
            <Card title="Tags">
              <p>Add tags to your order.</p>
            </Card>
          </PageLayoutSection>
        </PageLayout>
      </Page>
    </div>
  );
};

export const Annotated: FC = (args) => {
  return (
    <div className="bg-gray-50">
      <Page>
        <PageLayout>
          <PageLayoutAnnotatedSection
            description="Your customers will use this information to contact you."
            title="Store details"
          >
            <Card>
              <p>
                Use to follow a normal section with a secondary section to
                create a 2/3 + 1/3 layout on detail pages (such as individual
                product or order pages). Can also be used on any page that needs
                to structure a lot of content. This layout stacks the columns on
                small screens.
              </p>
            </Card>
          </PageLayoutAnnotatedSection>
        </PageLayout>
      </Page>
    </div>
  );
};
