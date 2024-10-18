import type { Meta } from "@storybook/react";
import type { FC } from "react";

import { Button } from "../button";
import { Popover, PopoverContent, PopoverTrigger } from ".";

const meta: Meta<typeof Popover> = {
  title: "Atoms 原子组件/Overlay 叠层/Popover 弹出窗口",
  component: Popover,
};

export default meta;

export const Base: FC = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button>Open</Button>
      </PopoverTrigger>
      <PopoverContent side="bottom">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Dimensions</h4>
          <p className="text-muted-foreground text-sm">
            Set the dimensions for the layer.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
};
