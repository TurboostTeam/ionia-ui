import type { Meta } from "@storybook/react";
import { type FC, useState } from "react";

import { Input } from "./Input";
import page from "./Input.mdx";

export default {
  title: "Form 表单/Input 输入框",
  component: Input,
  parameters: {
    backgrounds: {
      default: "gray",
      values: [{ name: "gray", value: "rgb(249, 250, 251)" }],
    },
    docs: {
      page,
    },
  },
} satisfies Meta<typeof Input>;

export const Default: FC = (args) => {
  const [value, setValue] = useState("");
  return (
    <Input
      placeholder="you@example.com"
      value={value}
      onChange={(e) => {
        setValue(e);
      }}
    />
  );
};

export const Label: FC = (args) => {
  const [value, setValue] = useState("");
  return (
    <Input
      label="Email"
      placeholder="you@example.com"
      value={value}
      onChange={(e) => {
        setValue(e);
      }}
    />
  );
};

export const HelpText: FC = (args) => {
  const [value, setValue] = useState("");
  return (
    <Input
      helpText="Please enter your email address"
      label="Email"
      placeholder="you@example.com"
      value={value}
      onChange={(e) => {
        setValue(e);
      }}
    />
  );
};

export const Error: FC = (args) => {
  const [value, setValue] = useState("");
  return (
    <Input
      error="Email is required"
      helpText="Please enter your email address"
      label="Email"
      placeholder="you@example.com"
      value={value}
      onChange={(e) => {
        setValue(e);
      }}
    />
  );
};

export const Disabled: FC = (args) => {
  const [value, setValue] = useState("");
  return (
    <Input
      disabled
      label="Email"
      placeholder="you@example.com"
      value={value}
      onChange={(e) => {
        setValue(e);
      }}
    />
  );
};

export const Prefix: FC = (args) => {
  const [value, setValue] = useState("");
  return (
    <Input
      label="Price"
      prefix="$"
      value={value}
      onChange={(e) => {
        setValue(e);
      }}
    />
  );
};

export const Suffix: FC = (args) => {
  const [value, setValue] = useState("");
  return (
    <Input
      label="Price"
      suffix="USD"
      value={value}
      onChange={(e) => {
        setValue(e);
      }}
    />
  );
};

export const ClearButton: FC = (args) => {
  const [value, setValue] = useState("");
  return (
    <Input
      clearButton
      label="Price"
      value={value}
      onChange={(e) => {
        setValue(e);
      }}
    />
  );
};

export const ShowCharacterCount: FC = (args) => {
  const [value, setValue] = useState("");
  return (
    <Input
      showCharacterCount
      label="Price"
      maxLength={5}
      value={value}
      onChange={(e) => {
        setValue(e);
      }}
    />
  );
};

export const AllAttribute: FC = (args) => {
  const [value, setValue] = useState("");
  return (
    <Input
      clearButton
      showCharacterCount
      error="Email is required"
      helpText="Please enter your email address"
      label="Price"
      maxLength={5}
      prefix="$"
      suffix="USD"
      value={value}
      onChange={(e) => {
        setValue(e);
      }}
    />
  );
};
