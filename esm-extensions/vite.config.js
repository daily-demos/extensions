// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/core.ts"),
      name: "core",
      // the proper extensions will be added
      fileName: "core.js",
    },
  },
});
