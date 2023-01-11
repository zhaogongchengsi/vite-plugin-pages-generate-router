# vite-plugin-page-generate-router

## Generate routing table according to specified folder

The current plugin converts folders into vue-router routes by default

---

# Use

```sh
npm i vite-plugin-pages-generate-router -D
pnpm add vite-plugin-pages-generate-router -D
```

```ts
// vite.config.ts
import {
  type Transform,
  pageGenerateRouter,
} from 'vite-plugin-pages-generate-router'

export default defineConfig(() => {
  return {
    plugins: [
      pageGenerateRouter({
        // Specified routing directory
        generateDir: './src/views',
        /**
         * Customized conversion
         */
        // transform: () => {} as Transform
      }),
    ],
  }
})
```

```ts
import pagerouter from 'page-router'
const modules = import.meta.glob('../views/**/*.vue')
export type Modules = Record<string, () => Promise<unknown>>
function specModuels(modules: Modules, prefix: string | RegExp) {
  const moduleMap = new Map<string, Modules>()
  for (const [name, module] of Object.entries(modules))
    moduleMap.set(name.replace(prefix, ''), module)
  return moduleMap
}

export function replacementComponents(routers: any, modules: Modules) {
  const _modules = specModuels(modules, '../views')
  return routers.map((router: { component: any; children: string | any[] }) => {
    const module = _modules.get(router.component)
    if (module) {
      router.component = module
    }
    else {
      // Not found
      delete router.component
    }
    if (router.children && router.children.length > 0)
      router.children = replacementComponents(router.children, modules)

    return router
  })
}

const routers = replacementComponents(pageRouters, modules)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Other routes
    {
      component: RootView,
      path: '/',
      name: 'root',
    },
    ...routers,
  ],
})
app.use(router)
```

---

# Options

```ts
interface Options {
  generateDir: string
  root?: string
  settingFile?: string
  defaultIndex?: string
  name?: string
  transform?: Transform
}
```

#### generateDir

- type: string
- required ✔

Generate the destination folder for the route

#### root

- type: string
- required ✖
- default: process.cwd()

Root directory

#### settingFile

- type: string
- required ✖
- default: setting.json

Root directory

#### defaultIndex

- type: string
- required ✖
- default: index

The name of the front-end component file that renders the page

#### name

- type: string
- required ✖
- default: page-router

[Vite virtual](https://cn.vitejs.dev/guide/api-plugin.html#virtual-modules-convention) module id

#### transform

- type: ```(
    dir:Current folder, 
    files: Files under the current folder, 
    setting: Configuration information, 
    options: Final configuration options
    ) => 
        Custom-routing-information```
- required ✖
- default: 转换为 [vue-router](https://router.vuejs.org/) [RouteRecordRaw](https://router.vuejs.org/zh/api/#routerecordraw)

Function to convert routing profiles to custom routing information


## Generate the destination folder for the route

[![NPM version](https://img.shields.io/npm/v/vite-plugin-pages-generate-router?color=a1b858&label=vite-plugin-pages-generate-router)](https://www.npmjs.com/package/vite-plugin-pages-generate-router)

## License

[MIT](./LICENSE) License © 2023 [zhaogongchengsi](https://github.com/zhaogongchengsi)
