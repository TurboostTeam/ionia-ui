import { defineConfig } from "father";

export default defineConfig({
  esm: {
    output: "lib",
    ignores: ["**/*.stories.*", "**/*.css"],
  },
});
