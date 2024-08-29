import type { Meta } from "@storybook/react";
import { type FC } from "react";

import { Card } from "./card";
import { CardContent } from "./card-content";
import { CardFooter } from "./card-footer";
import { CardHeader } from "./card-header";
import { CardTitle } from "./card-title";

export default {
  title: "Atoms 原子组件/Layout 布局/Card 卡片",
  component: Card,
  parameters: {
    backgrounds: {
      default: "gray",
      values: [{ name: "gray", value: "rgb(249, 250, 251)" }],
    },
  },
} satisfies Meta<typeof Card>;

export const Default: FC = (args) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};
