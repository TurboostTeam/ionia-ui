import type { Meta } from "@storybook/react";
import { type FC } from "react";

import { Button } from "../button";
import { ButtonGroup } from "./button-group";
import page from "./button-group.mdx";

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
      <Button variant="primary">Save</Button>
    </ButtonGroup>
  );
};
