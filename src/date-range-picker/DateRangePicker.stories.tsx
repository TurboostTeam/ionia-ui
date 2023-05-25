import type { Meta } from "@storybook/react";
import { type FC } from "react";

import { DateRangePicker } from "./DateRangePicker";

const meta = {
  title: "Form/DateRangePicker",
  component: DateRangePicker,
  tags: ["autodocs"],
} satisfies Meta<typeof DateRangePicker>;

export default meta;

const today = new Date(new Date().setHours(0, 0, 0, 0));
const yesterday = new Date(
  new Date(new Date().setDate(today.getDate() - 1)).setHours(0, 0, 0, 0)
);

export const Controlled: FC = () => {
  return (
    <DateRangePicker
      presetRange={[
        {
          title: "Today",
          range: [today, today],
        },
        {
          title: "Yesterday",
          range: [yesterday, yesterday],
        },
        {
          title: "Last 7 days",
          range: [
            new Date(
              new Date(new Date().setDate(today.getDate() - 7)).setHours(
                0,
                0,
                0,
                0
              )
            ),
            yesterday,
          ],
        },
      ]}
      range={[yesterday, today]}
      onChange={(res) => {
        console.log(res);
      }}
    />
  );
};
