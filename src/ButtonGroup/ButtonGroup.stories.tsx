import type { Meta } from "@storybook/react";
import { type FC } from "react";

import { Button } from "../Button";
import { ButtonGroup } from "./ButtonGroup";
import page from "./ButtonGroup.mdx";

export default {
  title: "Base 基础/ButtonGroup 按钮组",
  component: ButtonGroup,
  parameters: {
    docs: {
      page,
    },
  },
} satisfies Meta<typeof ButtonGroup>;

export const Default: FC = (args) => {
  return (
    <ButtonGroup {...args}>
      <Button>Cancel</Button>
      <Button primary>Save</Button>
    </ButtonGroup>
  );
};
