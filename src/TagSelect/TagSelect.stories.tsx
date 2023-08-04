import type { Meta } from "@storybook/react";
import { type FC, useCallback, useState } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";

import { Button } from "../Button";
import { TagSelect } from "./TagSelect";

const meta = {
  title: "Form 表单/TagSelect 标签选择器",
  component: TagSelect,
} satisfies Meta<typeof TagSelect>;

export default meta;

export const TagMode: FC = () => {
  const { control, handleSubmit, setValue } = useForm();

  const onSubmit: SubmitHandler<{ tags?: string[] }> = useCallback(
    async (input) => {
      console.log(input);
    },
    [],
  );

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="tags"
        render={({ field }) => {
          return (
            <TagSelect
              helpText="This is a description"
              label="Tag Select"
              mode="tag"
              options={[
                { label: "a", value: "a" },
                { label: "b", value: "b" },
              ]}
              {...field}
            />
          );
        }}
      />

      <Button type="submit">submit</Button>
      <Button
        onClick={() => {
          setValue("tags", ["a", "b", "c", "d", "e"]);
        }}
      >
        set value
      </Button>
    </form>
  );
};

let timeout: ReturnType<typeof setTimeout> | null;

export const MultipleMode: FC = () => {
  const { control, handleSubmit } = useForm();

  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([
    { label: "a", value: "a" },
    { label: "b", value: "b" },
  ]);

  const onSubmit: SubmitHandler<{ tags?: string[] }> = useCallback(
    async (input) => {
      console.log(input);
    },
    [],
  );

  const handleSearch = useCallback(
    (val: string) => {
      if (timeout != null) {
        clearTimeout(timeout);
        timeout = null;
      }

      setLoading(true);

      timeout = setTimeout(() => {
        setLoading(false);

        setOptions([...options, { label: val, value: val }]);
      }, 1000);
    },
    [options],
  );

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="tags"
        render={({ field }) => {
          return (
            <TagSelect
              helpText="This is a description"
              label="Tag Select"
              loading={loading}
              maxLength={10}
              mode="multiple"
              options={options}
              placeholder="123"
              onSearch={handleSearch}
              {...field}
            />
          );
        }}
      />

      <Button type="submit">submit</Button>
    </form>
  );
};
