import type { Meta } from "@storybook/react";
import { type FC, useState } from "react";

import { Button } from "@/button";

import { Modal } from "./modal";
import page from "./Modal.mdx";
import { useModal } from "./use-modal";

export default {
  title: "Overlay 叠层/Modal 模态框",
  component: Modal,
  parameters: {
    docs: {
      page,
    },
  },
} satisfies Meta<typeof Modal>;

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
          onAction: () => {
            setOpen(!open);
          },
        }}
        secondaryActions={[
          {
            content: "取消",
            onAction: () => {
              setOpen(!open);
            },
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

export const Hook: FC = (args) => {
  const modal = useModal();

  return (
    <div>
      <Button
        onClick={() => {
          const close = modal({
            title: "标题",
            content: "内容",
            primaryAction: {
              content: "确定",
              onAction: () => {
                close();
              },
            },
          });
        }}
      >
        打开模态框
      </Button>
    </div>
  );
};

export const Large: FC = (args) => {
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
          onAction: () => {
            setOpen(!open);
          },
        }}
        secondaryActions={[
          {
            content: "取消",
            onAction: () => {
              setOpen(!open);
            },
          },
        ]}
        size="lg"
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

export const Small: FC = (args) => {
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
          onAction: () => {
            setOpen(!open);
          },
        }}
        secondaryActions={[
          {
            content: "取消",
            onAction: () => {
              setOpen(!open);
            },
          },
        ]}
        size="sm"
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

export const WithPrimaryAction: FC = (args) => {
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
          onAction: () => {
            setOpen(!open);
          },
        }}
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

export const WithPrimaryAndSecondaryActions: FC = (args) => {
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
          onAction: () => {
            setOpen(!open);
          },
        }}
        secondaryActions={[
          {
            content: "取消",
            onAction: () => {
              setOpen(!open);
            },
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

export const WithoutATitle: FC = (args) => {
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
          onAction: () => {
            setOpen(!open);
          },
        }}
        secondaryActions={[
          {
            content: "取消",
            onAction: () => {
              setOpen(!open);
            },
          },
        ]}
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
