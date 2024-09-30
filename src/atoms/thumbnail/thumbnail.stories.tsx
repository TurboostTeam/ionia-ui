import type { Meta } from "@storybook/react";
import { type FC } from "react";

import { Thumbnail, ThumbnailImage, ThumbnailPreview } from ".";

const meta = {
  title: "Atoms 原子组件/Base 基础/Thumbnail 缩略图",
  component: Thumbnail,
} satisfies Meta<typeof Thumbnail>;

export default meta;

export const Base: FC = () => {
  return (
    <Thumbnail>
      <ThumbnailImage
        alt="image"
        src="https://avatars.githubusercontent.com/u/6771141?v=4"
      />
      <ThumbnailPreview
        alt="preview"
        src="https://avatars.githubusercontent.com/u/6771141?v=4"
      />
    </Thumbnail>
  );
};
