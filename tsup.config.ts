import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src",
    "!**/*.d.ts",
    "!**/*.stories.tsx",
    "!**/*.mdx",
    "!**/*.spec.ts",
  ],
  clean: true,
  target: "es2019",
  format: ["cjs", "esm"],
  banner: { js: '"use client";' },
});
