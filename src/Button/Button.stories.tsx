import {
  ArrowUturnLeftIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import type { Meta } from "@storybook/react";
import { type FC } from "react";

import { Button } from "./Button";
import page from "./Button.mdx";

export default {
  title: "Base 基础/Button 按钮",
  component: Button,
  parameters: {
    docs: {
      page,
    },
  },
} satisfies Meta<typeof Button>;

export const Default: FC = (args) => {
  return <Button {...args}>默认按钮</Button>;
};

export const Primary: FC = (args) => {
  return (
    <Button primary {...args}>
      主要按钮
    </Button>
  );
};

export const Destructive: FC = (args) => {
  return (
    <Button destructive {...args}>
      破坏按钮
    </Button>
  );
};

export const Link: FC = (args) => {
  return (
    <Button link {...args}>
      链接按钮
    </Button>
  );
};

export const DestructiveLink: FC = (args) => {
  return (
    <Button destructive link {...args}>
      破坏链接按钮
    </Button>
  );
};

export const Small: FC = (args) => {
  return (
    <Button size="sm" {...args}>
      小按钮
    </Button>
  );
};

export const Middle: FC = (args) => {
  return (
    <Button size="md" {...args}>
      中按钮
    </Button>
  );
};

export const Large: FC = (args) => {
  return (
    <Button size="lg" {...args}>
      大按钮
    </Button>
  );
};

export const SmallWithRounded: FC = (args) => {
  return (
    <Button rounded size="sm" {...args}>
      小圆角按钮
    </Button>
  );
};

export const MiddleWithRounded: FC = (args) => {
  return (
    <Button rounded size="md" {...args}>
      中圆角按钮
    </Button>
  );
};

export const LargeWithRounded: FC = (args) => {
  return (
    <Button rounded size="lg" {...args}>
      大圆角按钮
    </Button>
  );
};

export const Block: FC = (args) => {
  return (
    <Button block {...args}>
      块级按钮
    </Button>
  );
};

export const SmallIcon: FC = (args) => {
  return <Button icon={ArrowUturnLeftIcon} size="sm" {...args} />;
};

export const MiddleIcon: FC = (args) => {
  return <Button icon={ArrowUturnLeftIcon} {...args} />;
};

export const LargeIcon: FC = (args) => {
  return <Button icon={ArrowUturnLeftIcon} size="lg" {...args} />;
};

export const IconWithContent: FC = (args) => {
  return (
    <Button icon={DocumentDuplicateIcon} {...args}>
      复制
    </Button>
  );
};

export const DefaultWithDisabled: FC = (args) => {
  return (
    <Button disabled {...args}>
      默认禁用按钮
    </Button>
  );
};

export const PrimaryWithDisabled: FC = (args) => {
  return (
    <Button disabled primary {...args}>
      主要禁用按钮
    </Button>
  );
};

export const DestructiveWithDisabled: FC = (args) => {
  return (
    <Button destructive disabled {...args}>
      破坏禁用按钮
    </Button>
  );
};

export const LinkWithDisabled: FC = (args) => {
  return (
    <Button disabled link {...args}>
      链接禁用按钮
    </Button>
  );
};

export const DestructiveLinkWithDisabled: FC = (args) => {
  return (
    <Button destructive disabled link {...args}>
      破坏链接禁用按钮
    </Button>
  );
};

export const DefaultWithLoading: FC = (args) => {
  return (
    <Button loading size="sm" {...args}>
      默认加载按钮
    </Button>
  );
};

export const PrimaryWithLoading: FC = (args) => {
  return (
    <Button loading primary {...args}>
      主要加载按钮
    </Button>
  );
};

export const DestructiveWithLoading: FC = (args) => {
  return (
    <Button destructive loading size="lg" {...args}>
      破坏加载按钮
    </Button>
  );
};

export const LinkWithLoading: FC = (args) => {
  return (
    <Button link loading {...args}>
      链接加载按钮
    </Button>
  );
};

export const DestructiveLinkWithLoading: FC = (args) => {
  return (
    <Button destructive link loading {...args}>
      破坏链接禁用按钮
    </Button>
  );
};
