export type Modules = Record<string, () => Promise<unknown>>;

export async function specModuels(modules: Modules, prefix: string | RegExp) {
  const moduleMap = new Map<string, any>();
  for await (const [name, module] of Object.entries(modules)) {
    const element: any = await module();

    moduleMap.set(name.replace(prefix, ""), element.default);
  }
  return moduleMap;
}

export function replacemComponents(routers: any, modules: any) {
  return routers.map((router: { element: any; children: string | any[] }) => {
    const Module = modules.get(router.element);
    if (Module) {
      router.element = <Module />;
    } else {
      // Not found
      //   delete router.element;
    }
    if (router.children && router.children.length > 0)
      router.children = replacemComponents(router.children, modules);
    return router;
  });
}
