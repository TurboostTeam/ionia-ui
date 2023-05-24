import type { Meta } from "@storybook/react";
import { type FC } from "react";

import { DateSinglePicker } from "./DateSinglePicker";

const meta = {
  title: "Form/DateSinglePicker",
  component: DateSinglePicker,
  tags: ["autodocs"],
} satisfies Meta<typeof DateSinglePicker>;

export default meta;

export const Controlled: FC = () => {
  return (
    <DateSinglePicker
      onChange={(res) => {
        console.log(res);
      }}
    />
  );
};
