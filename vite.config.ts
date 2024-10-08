import * as path from "path";
import { defineConfig } from "vite";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "signalsjs",
      formats: ["es"],
      fileName: (format) => `index.${format}.js`,
    },
  },
  plugins: [
    wasm(),
    topLevelAwait(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  optimizeDeps: {
    exclude: ["@syntect/wasm"],
  },
});
