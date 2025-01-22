import { defineConfig, type RsbuildPlugin } from "@rsbuild/core";
import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";
import { pluginReact } from "@rsbuild/plugin-react";
import { mfConfig } from "./module-federation.config";
import { withZephyr } from "zephyr-rspack-plugin";

export const zephyrRsbuildPlugin = (): RsbuildPlugin => ({
  name: "zephyr-rsbuild-plugin",
  setup: (api) => {
    api.modifyRspackConfig(async (rspackConfig, { mergeConfig }) => {
      const zephyrConfig = await withZephyr()(rspackConfig);
      mergeConfig(zephyrConfig);
    });
  }
});

export default defineConfig({
  tools: {
    rspack: {
      output: {
        publicPath: "auto"
      }
    }
  },
  server: {
    port: 3002
  },
  plugins: [pluginReact(), pluginModuleFederation(mfConfig), zephyrRsbuildPlugin()]
});
