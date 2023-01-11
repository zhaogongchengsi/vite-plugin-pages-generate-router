import { URL, fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// @ts-expect-error
import { pageGenerateRouter } from "../../dist/index.mjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    pageGenerateRouter({
      generateDir: "./src/views",
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
