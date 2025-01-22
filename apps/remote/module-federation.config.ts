import type { ModuleFederationOptions } from "@module-federation/rsbuild-plugin";
import { dependencies } from "./package.json";

export const mfConfig: ModuleFederationOptions = {
  name: "remote",
  exposes: {
    "./routes": "./src/routes",
  },
  shared: {
    ...dependencies,
    react: {
      singleton: true,
      requiredVersion: dependencies.react
    },
    "react-dom": {
      singleton: true,
      requiredVersion: dependencies["react-dom"]
    }
  }
};
