import type { Meta } from "@storybook/react";
import { type FC, useState } from "react";

import { Button } from "../Button";
import { Toast } from "./Toast";
import { useToast } from "./useToast";

const meta: Meta<typeof Toast> = {
  title: "Feedback 反馈/Toast 提示",
};

export default meta;

export const Default: FC = () => {
  return (
    <div className="h-72 bg-gray-100">
      <Toast content="message" duration={null} />
    </div>
  );
};

export const Call: FC = () => {
  const toast = useToast();
  const [index, setIndex] = useState(1);

  return (
    <Button
      onClick={() => {
        setIndex((value) => value + 1);
        toast({ content: `提示消息 ${index}` });
      }}
    >
      显示提示
    </Button>
  );
};
