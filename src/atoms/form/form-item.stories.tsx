import type { Meta } from "@storybook/react";
import { type FC } from "react";

import { Input } from "../input";
import { FormDescription } from "./form-description";
import { FormItem } from "./form-item";
import { FormLabel } from "./form-label";

const meta = {
  title: "Atoms 原子组件/Form 表单/FormItem 表单项",
  component: FormItem,
} satisfies Meta<typeof FormItem>;

export default meta;

export const Base: FC = () => {
  return (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <Input />
      <FormDescription>Please enter your e-mail address</FormDescription>
    </FormItem>
  );
};
