# vite-plugin-page-generate-router

## Generate routing table according to specified folder

The current plugin converts folders into vue-router routes by default

# Use

```sh
npm i vite-plugin-pages-generate-router -D
pnpm add vite-plugin-pages-generate-router -D
```

```ts
// vite.config.ts
import {
  pageGenerateRouter,
  type Transform,
} from "vite-plugin-pages-generate-router";

export default defineConfig(() => {
  return {
    plugins: [
      pageGenerateRouter({
        // Specified routing directory
        generateDir: "./src/views",
        /**
         * Customized conversion
         */
        // transform: () => {} as Transform
      }),
    ],
  };
});
```

```ts
// @ts-ignore
import routers from "page-router";

// Transformed routing table
console.log(routers);

```

[![NPM version](https://img.shields.io/npm/v/vite-plugin-pages-generate-router?color=a1b858&label=vite-plugin-pages-generate-router)](https://www.npmjs.com/package/vite-plugin-pages-generate-router)

## License

[MIT](./LICENSE) License © 2022 [zhaogongchengsi](https://github.com/zhaogongchengsi)
