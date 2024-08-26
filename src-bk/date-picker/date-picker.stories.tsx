import type { Meta, StoryObj } from "@storybook/react";

import { DatePicker } from "./DatePicker";

const meta = {
  title: "Form 表单/DatePicker 日期选择器",
  component: DatePicker,
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    month: 5,
    year: 2023,
  },
};

export const Ranged: Story = {
  args: {
    month: 5,
    year: 2023,
    allowRange: true,
    selected: {
      start: new Date(2023, 5, 1),
      end: new Date(2023, 5, 7),
    },
  },
};

export const MultiMonthRanged: Story = {
  args: {
    month: 5,
    year: 2023,
    allowRange: true,
    multiMonth: true,
    selected: {
      start: new Date(2023, 5, 1),
      end: new Date(2023, 6, 7),
    },
  },
};

export const DisabledDateRanged: Story = {
  args: {
    month: 5,
    year: 2023,
    disableDatesAfter: new Date(2023, 6, 7),
    allowRange: true,
    multiMonth: true,
    selected: {
      start: new Date(2023, 5, 1),
      end: new Date(2023, 6, 7),
    },
  },
};

export const DisableSpecificDateRanged: Story = {
  args: {
    month: 5,
    year: 2023,
    disableSpecificDates: [new Date(2023, 5, 5)],
    allowRange: true,
    multiMonth: true,
    selected: {
      start: new Date(2023, 5, 1),
      end: new Date(2023, 6, 7),
    },
  },
};
