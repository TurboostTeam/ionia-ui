import type { Meta } from "@storybook/react";
import { type FC } from "react";

import { SingleDatePicker } from "./SingleDatePicker";

const meta = {
  title: "Form/SingleDatePicker",
  component: SingleDatePicker,
  tags: ["autodocs"],
} satisfies Meta<typeof SingleDatePicker>;

export default meta;

export const Controlled: FC = () => {
  return (
    <SingleDatePicker
      onChange={(res) => {
        console.log(res);
      }}
    />
  );
};
