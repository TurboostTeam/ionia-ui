import type { Meta } from "@storybook/react";
import { type FC } from "react";
import { Controller, useForm } from "react-hook-form";

import { CheckboxGroup } from "../CheckboxGroup";
import { Input } from "../Input";
import { RadioGroup } from "../RadioGroup";
import { Switch } from "../Switch";
import { Form } from "./Form";

const meta = {
  title: "Form/Form",
  component: Form,
  tags: ["autodocs"],
} satisfies Meta<typeof Form>;

export default meta;

export const Controlled: FC = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      enable: true,
      username: "",
      password: "",
      sex: "male",
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
    </Form>
  );
};
