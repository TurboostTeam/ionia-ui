import {
  defineConfig,
  moduleTools,
  type PartialBuildConfig,
} from "@modern-js/module-tools";

const commonBuildConfig: PartialBuildConfig = {
  buildType: "bundleless",
  input: ["src", "!**/*.stories.*"],
  dts: {
    tsconfigPath: "./tsconfig.build.json",
  },
};

export default defineConfig({
  plugins: [moduleTools()],
  buildConfig: [
    {
      ...commonBuildConfig,
      format: "cjs",
      target: "es6",
      outDir: "./lib",
    },
    {
      ...commonBuildConfig,
      format: "esm",
      target: "es6",
      outDir: "./esm",
    },
  ],
});
