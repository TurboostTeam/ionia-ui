import {
  defineConfig,
  moduleTools,
  type PartialBuildConfig,
} from "@modern-js/module-tools";

const commonBuildConfig: PartialBuildConfig = {
  buildType: "bundleless",
  input: ["src", "!**/*.stories.*"],
  dts: false,
};

export default defineConfig({
  plugins: [moduleTools()],
  buildConfig: [
    {
      ...commonBuildConfig,
      format: "cjs",
      target: "es6",
      outDir: "./dist/lib",
    },
    {
      ...commonBuildConfig,
      format: "esm",
      target: "es6",
      outDir: "./dist/es",
    },
    {
      ...commonBuildConfig,
      outDir: "./dist/types",
      dts: {
        only: true,
        tsconfigPath: "./tsconfig.build.json",
      },
    },
  ],
});
