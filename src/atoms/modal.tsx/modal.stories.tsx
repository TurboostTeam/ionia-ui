import type { Meta } from "@storybook/react";
import { type FC, useState } from "react";

import { Button } from "../button";
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalOverlay,
  ModalPortal,
  ModalTitle,
  ModalTrigger,
} from ".";

const meta: Meta<typeof Modal> = {
  title: "Atoms 原子组件/Overlay 叠层/Modal 模态框",
  component: Modal,
};

export default meta;

export const Base: FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <Modal open={open} onClose={setOpen}>
      <ModalTrigger>
        <button
          onClick={() => {
            setOpen(true);
          }}
        >
          Open Modal
        </button>
      </ModalTrigger>
      <ModalPortal>
        <ModalOverlay />
        <ModalContent>
          <ModalClose />
          <ModalTitle>Title</ModalTitle>
          <ModalDescription>Description</ModalDescription>
          <ModalFooter>
            <Button
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button>Confirm</Button>
          </ModalFooter>
        </ModalContent>
      </ModalPortal>
    </Modal>
  );
};
