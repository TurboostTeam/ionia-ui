import type { Meta } from "@storybook/react";
import { type FC, useState } from "react";

import { Button } from "../Button";
import { Modal } from "./Modal";
import page from "./Modal.mdx";

const meta = {
  title: "Feedback 反馈/Modal 模态框",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page,
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;

export const Default: FC = (args) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        onClick={() => {
          setOpen(!open);
        }}
      >
        打开模态框
      </Button>

      <Modal
        open={open}
        primaryAction={{
          content: "确定",
        }}
        secondaryActions={[
          {
            content: "取消",
          },
        ]}
        title="标题"
        onClose={() => {
          setOpen(!open);
        }}
        {...args}
      >
        内容
      </Modal>
    </div>
  );
};
