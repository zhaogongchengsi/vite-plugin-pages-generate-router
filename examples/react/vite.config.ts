import { defineConfig, normalizePath } from "vite";
import react from "@vitejs/plugin-react";

import { pageGenerateRouter } from "../../dist/index.mjs";

export default defineConfig({
  plugins: [
    react(),
    pageGenerateRouter({
      generateDir: "./src/pages",
      routerType: "react",
      defaultFile: "inedx.tsx"
    }),
  ],
});
