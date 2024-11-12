import type { Meta, StoryObj } from "@storybook/react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from ".";

const meta = {
  title: "Atoms 原子组件/Layout 布局/Tabs 选项卡",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs className="w-[400px]" defaultValue="account">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">账户</TabsTrigger>
        <TabsTrigger value="password">密码</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="p-4">
          <h3 className="text-lg font-medium">账户设置</h3>
          <p className="text-muted-foreground text-sm">
            在这里管理你的账户设置和偏好。
          </p>
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="p-4">
          <h3 className="text-lg font-medium">修改密码</h3>
          <p className="text-muted-foreground text-sm">
            更新你的密码以保护账户安全。
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const ThreeTabs: Story = {
  render: () => (
    <Tabs className="w-[400px]" defaultValue="tab1">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="tab1">选项1</TabsTrigger>
        <TabsTrigger value="tab2">选项2</TabsTrigger>
        <TabsTrigger value="tab3">选项3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div className="p-4">选项1的内容</div>
      </TabsContent>
      <TabsContent value="tab2">
        <div className="p-4">选项2的内容</div>
      </TabsContent>
      <TabsContent value="tab3">
        <div className="p-4">选项3的内容</div>
      </TabsContent>
    </Tabs>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Tabs className="w-[400px]" defaultValue="active">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="active">激活</TabsTrigger>
        <TabsTrigger disabled value="disabled">
          禁用
        </TabsTrigger>
        <TabsTrigger value="pending">待定</TabsTrigger>
      </TabsList>
      <TabsContent value="active">
        <div className="p-4">激活状态的内容</div>
      </TabsContent>
      <TabsContent value="disabled">
        <div className="p-4">禁用状态的内容</div>
      </TabsContent>
      <TabsContent value="pending">
        <div className="p-4">待定状态的内容</div>
      </TabsContent>
    </Tabs>
  ),
};
