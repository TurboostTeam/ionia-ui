import type { Meta } from "@storybook/react";
import { type FC } from "react";

import { DateSinglePicker } from "./DateSinglePicker";

const meta = {
  title: "Form 表单/DateSinglePicker 日期单独选择器",
  component: DateSinglePicker,
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
