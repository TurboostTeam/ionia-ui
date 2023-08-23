import type { Meta } from "@storybook/react";
import { type FC, useCallback, useState } from "react";

import { Card } from "../Card";
import { Navigation } from "../Navigation";
import { Page } from "../Page";
import { TopBar } from "../TopBar";
import { Frame } from "./";

export default {
  title: "Layout 布局/Frame 框架",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Frame>;

export const Default: FC = () => {
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);

  const toggleMobileNavigationActive = useCallback(() => {
    setMobileNavigationActive(
      (mobileNavigationActive) => !mobileNavigationActive,
    );
  }, []);

  return (
    <div className="h-full w-full bg-gray-50">
      <Frame
        navigation={<Navigation />}
        showMobileNavigation={mobileNavigationActive}
        topBar={
          <TopBar
            showNavigationToggle
            userMenu={{
              name: "张三",
              avatar: "https://avatars.githubusercontent.com/u/20628079?v=4",
            }}
            onNavigationToggle={toggleMobileNavigationActive}
          />
        }
        onNavigationDismiss={toggleMobileNavigationActive}
      >
        <Page title="页面">
          <Card className="h-72" />
        </Page>
      </Frame>
    </div>
  );
};
