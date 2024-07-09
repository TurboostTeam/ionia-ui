import type { Meta } from "@storybook/react";
import { type FC } from "react";

import { DateRangeComparisonPicker } from "./DateRangeComparisonPicker";

const meta = {
  title: "Form 表单/DateRangeComparisonPicker 日期范围选择器",
  component: DateRangeComparisonPicker,
} satisfies Meta<typeof DateRangeComparisonPicker>;

export default meta;

export const Controlled: FC = () => {
  return <DateRangeComparisonPicker />;
};
