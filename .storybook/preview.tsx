import "../src/styles.css";

import type { Preview } from "@storybook/react";
import { AppProvider } from "../src";
import React, { FC } from "react";

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
