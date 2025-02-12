import { type FC } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible";

export default {
  title: "Atoms 原子组件/Layout 布局/Collapsible 折叠",
  component: Collapsible,
};

const Template: FC = () => (
  <Collapsible>
    <CollapsibleTrigger>点击我</CollapsibleTrigger>
    <CollapsibleContent>
      <p>这里是可折叠的内容！</p>
    </CollapsibleContent>
  </Collapsible>
);

export const Default = Template.bind({});

export const WithCustomContent: FC = () => (
  <Collapsible>
    <CollapsibleTrigger>自定义内容触发器</CollapsibleTrigger>
    <CollapsibleContent>
      <p>这是自定义内容的折叠部分。</p>
    </CollapsibleContent>
  </Collapsible>
);
