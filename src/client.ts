import { travel, travelSync } from './travel'

export type Module = () => Promise<unknown>
export type Modules = Record<string, Module>

/**
 * @param modules import.meta.glob
 *
 *  see: https://cn.vitejs.dev/guide/features.html#glob-import
 * @param prefix Path prefix that needs to be removed
 *
 * ```const modules = import.meta.glob("../src/xxxx ");
 *    specModuels(modules, '../src')
 * ```
 * @returns ```Map<string, () => Promise<unknown>>```
 */
export function specModuels(modules: Modules, prefix: string | RegExp) {
  const moduleMap = new Map<string, Module>()
  for (const [name, module] of Object.entries(modules))
    moduleMap.set(name.replace(prefix, ''), module)
  return moduleMap
}

export { travel, travelSync }
