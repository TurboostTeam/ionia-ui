import { defineConfig } from "father";

export default defineConfig({
  esm: {
    transformer: "swc",
    output: "lib",
    ignores: ["**/*.stories.*"],
  },
});
