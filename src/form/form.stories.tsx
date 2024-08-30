import type { Meta } from "@storybook/react";
import { type FC } from "react";
import { Controller, useForm } from "react-hook-form";

import { CheckboxGroup } from "../checkbox-group";
import { Input } from "../input";
import { RadioGroup } from "../radio-group";
import { Select } from "../select";
import { Switch } from "../switch";
import { Form } from "./form";

const meta = {
  title: "Form 表单/Form 表单",
  component: Form,
} satisfies Meta<typeof Form>;

export default meta;

export const Controlled: FC = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      enable: true,
      username: "",
      password: "",
      sex: "male",
      select: "banana",
      hobby: ["basketball"],
    },
  });

  return (
    <Form
      onSubmit={() => {
        void handleSubmit((variables) => {
          console.log("variables", variables);
        });
      }}
    >
      <Controller
        control={control}
        name="enable"
        render={({ field, fieldState }) => {
          return (
            <Switch
              checked={field.value}
              error={fieldState.error?.message}
              label="启用"
              /* eslint-disable-next-line react/jsx-handler-names */
              onChange={field.onChange}
            />
          );
        }}
      />

      <Controller
        control={control}
        name="username"
        render={({ field, fieldState }) => {
          return (
            <Input
              error={fieldState.error?.message}
              label="用户名"
              type="text"
              {...field}
            />
          );
        }}
      />

      <Controller
        control={control}
        name="password"
        render={({ field, fieldState }) => {
          return (
            <Input
              error={fieldState.error?.message}
              label="密码"
              type="password"
              {...field}
            />
          );
        }}
      />

      <Controller
        control={control}
        name="select"
        render={({ field, fieldState }) => {
          return (
            <Select
              error={fieldState.error?.message}
              label="选择"
              options={[
                { label: "苹果", value: "apple" },
                { label: "香蕉", value: "banana" },
              ]}
              {...field}
            />
          );
        }}
      />

      <Controller
        control={control}
        name="sex"
        render={({ field, fieldState }) => {
          return (
            <RadioGroup
              error={fieldState.error?.message}
              label="性别"
              options={[
                { label: "男", value: "male" },
                { label: "女", value: "female" },
              ]}
              {...field}
            />
          );
        }}
      />

      <Controller
        control={control}
        name="hobby"
        render={({ field, fieldState }) => {
          return (
            <CheckboxGroup
              error={fieldState.error?.message}
              label="爱好"
              options={[
                { label: "篮球", value: "basketball" },
                { label: "跑步", value: "running" },
              ]}
              {...field}
            />
          );
        }}
      />
      <button type="submit">提交</button>
    </Form>
  );
};
