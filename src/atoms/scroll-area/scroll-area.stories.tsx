import type { Meta } from "@storybook/react";
import { type FC } from "react";

import { ScrollArea, ScrollBar } from ".";

const meta: Meta<typeof ScrollArea> = {
  title: "Atoms 原子组件/Base 基础/ScrollArea 滚动轴",
  component: ScrollArea,
};

export default meta;

export const Default: FC = () => {
  const works = [
    {
      artist: "Ornella Binni",
    },
    {
      artist: "Tom Byrom",
    },
    {
      artist: "Vladimir Malyavko",
    },
  ];
  return (
    <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {works.map((artwork) => (
          <figure className="shrink-0" key={artwork.artist}>
            <div className="w-48 overflow-hidden rounded-md">
              <div className="aspect-[3/4] h-fit w-fit object-cover">
                {artwork.artist}
              </div>
            </div>
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`,
);

export const Base: FC = () => {
  return (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {tags.map((tag) => (
          <div className="text-sm" key={tag}>
            {tag}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
