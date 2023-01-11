import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
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
      // @ts-ignore
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
