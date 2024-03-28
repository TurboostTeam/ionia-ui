import type { Meta } from "@storybook/react";
import { type FC, useCallback, useState } from "react";
import {
  BiChevronRight,
  BiCodeAlt,
  BiConversation,
  BiGitPullRequest,
  BiHome,
  BiServer,
  BiUser,
} from "react-icons/bi";

import { Button } from "../Button";
import { ButtonGroup } from "../ButtonGroup";
import { Card } from "../Card";
import { Drawer } from "../Drawer";
import { Dropdown } from "../Dropdown";
import { Navigation } from "../Navigation";
import { NavigationSection } from "../NavigationSection";
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

  const [drawerActive, setDrawerActive] = useState(false);

  const toggleMobileNavigationActive = useCallback(() => {
    setMobileNavigationActive(
      (mobileNavigationActive) => !mobileNavigationActive,
    );
  }, []);

  return (
    <div className="h-full w-full bg-gray-50">
      <Frame
        navigation={
          <Navigation location={window.location.hash}>
            <NavigationSection
              items={[
                {
                  href: "#/",
                  exactMatch: true,
                  label: "概览",
                  icon: BiHome,
                },
                {
                  href: "#/code",
                  label: "仓库",
                  icon: BiCodeAlt,
                },
                {
                  href: "#/issues",
                  label: "议题",
                  icon: BiConversation,
                },
                {
                  href: "#/pull-requests",
                  label: "合并请求",
                  icon: BiGitPullRequest,
                },
              ]}
            />
            <NavigationSection
              items={[
                {
                  href: "#/members",
                  label: "成员",
                  icon: BiUser,
                },
                {
                  href: "#/deployments",
                  label: "部署",
                  icon: BiServer,
                },
              ]}
              title="管理"
            />
            <NavigationSection
              action={{
                icon: BiChevronRight,
                onAction: () => {},
              }}
              items={[
                {
                  label: "Example App 1",
                },
                {
                  label: "Example App 2",
                },
              ]}
              title="应用"
            />
          </Navigation>
        }
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
        <Page primaryAction={{ content: "创建" }} title="页面">
          <Card className="h-72">
            <Button
              onClick={() => {
                setDrawerActive(true);
              }}
            >
              打开抽屉
            </Button>
          </Card>
          <Drawer
            footer={
              <ButtonGroup className="justify-end">
                <Button
                  onClick={() => {
                    setDrawerActive(false);
                  }}
                >
                  取消
                </Button>
                <Button
                  primary
                  onClick={() => {
                    setDrawerActive(false);
                  }}
                >
                  确定
                </Button>
              </ButtonGroup>
            }
            open={drawerActive}
            title="抽屉标题"
            onClose={() => {
              setDrawerActive(false);
            }}
          >
            内容
          </Drawer>
        </Page>
      </Frame>
    </div>
  );
};
