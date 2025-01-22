import { createBrowserRouter, type RouteObject } from "react-router";
import {
  loadRemote,
  getInstance,
  registerRemotes
} from "@module-federation/enhanced/runtime";
import App from "./App";

const router = createBrowserRouter([{ path: "/", element: <App /> }], {
  async patchRoutesOnNavigation({ patch, path }) {
    // This is where you can add routes dynamically
    // For example, you can load a JSON file with routes and add them here
    const instance = getInstance();
    if (!instance) {
      throw new Error("Instance not found");
    }

    const {
      options: { remotes }
    } = instance;
    const remote = remotes.find((remote) => {
      return path.includes(remote.name);
    });
    if (remote) {
      const module = await loadRemote<{ default: RouteObject[] }>(
        `${remote.name}/routes`
      );
      if (!module) {
        throw new Error("Module not found");
      }
      patch("0", module.default);
    } else {
      // fetch remote from zephyr
      // how do I mount a remote to the host without redeploying the host?
      // we're stuck here, how do we get this info `http://localhost:3003/remoteEntry.js` from zephyr?
      const remoteName = path.split("/")[1];
      console.log("REMOTE NAME", remoteName);
      await registerRemotes([
        {
          name: remoteName,
          entry:
            "https://t-latest-shane-swalker-dev-dynamic-remote-mf-dynamic--15ebd4-ze.firstry.dev/mf-manifest.json"
        }
      ]);
      // const instance = getInstance();
      // console.log("INSTANCE", instance);
      const module = await loadRemote("dynamicRemote/routes");

      console.log("MODULE", module);

      // const zephyrRemote = await getZephyrRemote(auth, {org, project, "/settings"})
      // registerRemotes(zephyrRemote);
      //@ts-expect-error - yea yea
      patch("0", module.default);
    }
  }
});
export default router;
