export type Modules = Record<string, () => Promise<unknown>>

function specModuels(modules: Modules, prefix: string | RegExp) {
  const moduleMap = new Map<string, Modules>()
  // @ts-expect-error
  for (const [name, module] of Object.entries(modules))
    moduleMap.set(name.replace(prefix, ''), module)

  return moduleMap
}

export function asyncComponents(routers: any, modules: Modules) {
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
      router.children = asyncComponents(router.children, modules)

    return router
  })
}
