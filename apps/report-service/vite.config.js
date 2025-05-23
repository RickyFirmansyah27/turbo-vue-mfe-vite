import { defineConfig } from "vite";
import vue2 from "@vitejs/plugin-vue2";
import { federation } from "@module-federation/vite";
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig({
  plugins: [
    vue2(),
    federation({
      name: "reportService",
      filename: "remoteEntry.js",
      exposes: {
        "./AssetList": "./src/views/AssetList.vue",
      },
      shared: ["vue"],
    }),
    topLevelAwait(),
  ],
  server: {
    port: 3001,
    cors: true,
  },
  build: {
    target: "esnext",
    minify: false,
  },
  preview: {
    port: 3001,
  },
});
