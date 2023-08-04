import type { Meta } from "@storybook/react";
import { type FC, useState } from "react";

import { Button } from "../Button";
import { Modal } from "./Modal";

const meta = {
  title: "Feedback 反馈/Modal 模态框",
  component: Modal,
  tags: ["autodocs"],
} satisfies Meta<typeof Modal>;

export default meta;

export const Controlled: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        onClick={() => {
          setOpen(!open);
        }}
      >
        open modal
      </Button>

      <Modal
        open={open}
        primaryAction={{
          content: "ok",
        }}
        secondaryActions={[
          {
            content: "cancel",
          },
        ]}
        title="标题"
        onClose={() => {
          setOpen(!open);
        }}
      >
        内容
      </Modal>
    </div>
  );
};
