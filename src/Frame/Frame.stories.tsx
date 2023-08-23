import type { Meta } from "@storybook/react";
import { type FC, useCallback, useState } from "react";

import { Card } from "../Card";
import { Dropdown } from "../Dropdown";
import { Navigation } from "../Navigation";
import { Page } from "../Page";
import { TopBar } from "../TopBar";
import { TopBarUserMenu } from "../TopBarUserMenu";
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
            userMenu={
              <Dropdown
                activator={
                  <TopBarUserMenu
                    avatar="https://avatars.githubusercontent.com/u/20628079"
                    name="张三"
                  />
                }
                sections={[
                  {
                    items: [{ content: "帮助中心" }, { content: "更改日志" }],
                  },
                  {
                    title: "user@example.com",
                    items: [{ content: "管理账户" }, { content: "登出" }],
                  },
                ]}
              />
            }
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
