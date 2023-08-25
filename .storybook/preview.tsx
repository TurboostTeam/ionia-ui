import "../src/index.css";

import type { Preview } from "@storybook/react";
import { AppProvider } from "../src";
import { FC } from "react";

export default {
  decorators: [
    (Story: FC) => (
      <AppProvider>
        <Story />
      </AppProvider>
    ),
  ],
  parameters: {
    // actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
} satisfies Preview;
