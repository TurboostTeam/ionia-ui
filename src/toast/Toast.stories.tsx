import type { Meta } from "@storybook/react";
import { type FC } from "react";

import { Button } from "../button";
import { Provider } from "../provider";
import { toast } from "./Toast";

const meta = {
  title: "Feedback/Toast",
  tags: ["autodocs"],
} satisfies Meta<typeof toast>;

export default meta;

export const Dynamic: FC = () => {
  return (
    <Provider>
      <Button
        onClick={() => {
          toast.success("message");
        }}
      >
        Toast
      </Button>
    </Provider>
  );
};
