import type { Meta } from "@storybook/react";
import type { FC } from "react";

import { Button } from "../button";
import {
  Popover,
  PopoverArrow,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from ".";

const meta: Meta<typeof Popover> = {
  title: "Atoms 原子组件/Form 表单/Popover 选择器",
  component: Popover,
};

export default meta;

export const Base: FC = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button>Open</Button>
      </PopoverTrigger>
      <PopoverContent
        className="border-none"
        side="bottom"
        style={{
          boxShadow:
            "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
        }}
      >
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Dimensions</h4>
          <p className="text-muted-foreground text-sm">
            Set the dimensions for the layer.
          </p>
        </div>

        <PopoverClose>
          <Button>Close</Button>
        </PopoverClose>
        <PopoverArrow className="fill-white" />
      </PopoverContent>
    </Popover>
  );
};
