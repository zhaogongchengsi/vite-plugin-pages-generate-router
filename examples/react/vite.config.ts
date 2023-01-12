import { defineConfig, normalizePath } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

import { pageGenerateRouter } from "../../dist/index.mjs";

export default defineConfig({
  plugins: [
    react(),
    pageGenerateRouter({
      generateDir: "./src/pages",
      defaultIndex: "index.jsx",
      transform(dir: string, files: string[], setting: any, options) {
        const entry = resolve(dir, setting.index || options.defaultIndex);
        const target = normalizePath(options.targetDir);
        // 页面的根目录
        // const newdir = normalizePath(dir);
        // const path = newdir.replace(target, "");
        const componentPath = normalizePath(entry).replace(target, "");

        return {
          path: setting.path,
          name: setting.name,
          title: setting.title,
          element: componentPath,
        };
      },
    }),
  ],
});
