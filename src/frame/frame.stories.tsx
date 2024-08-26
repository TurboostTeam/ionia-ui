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

import { Button } from "@/button";
import { ButtonGroup } from "@/button-group";
import { Card } from "@/card";
import { Drawer } from "@/drawer";
import { Dropdown } from "@/dropdown";
import { Modal } from "@/modal";
import { Navigation } from "@/navigation";
import { NavigationSection } from "@/navigation-section";
import { Page } from "@/page";
import { TopBar } from "@/top-bar";
import { TopBarUserMenu } from "@/top-bar-user-menu";

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
  const [modalActive, setModalActive] = useState(false);

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
            closable={false}
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
                  variant="primary"
                  onClick={() => {
                    setDrawerActive(false);
                  }}
                >
                  确定
                </Button>
              </ButtonGroup>
            }
            open={drawerActive}
            onClose={() => {
              setDrawerActive(false);
            }}
          >
            <Button
              variant="primary"
              onClick={() => {
                setModalActive(true);
              }}
            >
              打开模态框
            </Button>
            <Modal
              open={modalActive}
              primaryAction={{
                content: "确定",
                onAction: () => {
                  setModalActive(false);
                },
              }}
              title="模态框标题"
              onClose={() => {
                setModalActive(false);
              }}
            >
              内容
            </Modal>
          </Drawer>
        </Page>
      </Frame>
    </div>
  );
};
