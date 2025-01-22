import type { ModuleFederationOptions } from "@module-federation/rsbuild-plugin";
import { dependencies } from "./package.json";

export const mfConfig: ModuleFederationOptions = {
  name: "host",
  remotes: {
    remote: "remote@http://localhost:3001/mf-manifest.json"
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
