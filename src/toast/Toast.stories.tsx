import type { Meta, StoryObj } from "@storybook/react";
import { type FC } from "react";

import { Button } from "../button";
import { Provider } from "../provider";
import { Toast } from "./Toast";
import { toast } from "./toast.util";

const meta = {
  title: "Feedback/Toast",
  component: Toast,
  tags: ["autodocs"],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "message",
  },
};

export const Dynamic: FC = () => {
  return (
    <Provider>
      <Button
        onClick={() => {
          toast("message");
        }}
      >
        Toast
      </Button>
    </Provider>
  );
};
