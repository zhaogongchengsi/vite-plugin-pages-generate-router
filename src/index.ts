import { isAbsolute, resolve } from 'path'
import type { FileNode } from './utils/index'
import {
  folderScan,
  travel,
  travelSync,
} from './utils/index'
import type { TransformOptions } from './config'
import { createVueTransform } from './config'

export interface PageGenerateOptions {
  generateDir: string
  root?: string
  defaultIndex?: string
  name?: string
  transform?: Transform
}

export interface GenerateRouterOptons {
  targetDir: string
  settingFile: string
  defaultIndex: string
}

export interface PageSetting {
  title?: string
  index: string
  path: string
  name?: string
  component?: string
  [key: string]: any
}

export type Transform = (options?: TransformOptions) => (fileNode: FileNode) => Promise<any>

const VIRTUAL_MODULEID = 'page-router'
const PLUGIN_NAME = 'vite-plugin-page-generate-router'

export function pick<T, Y>(obj: any, keys: string[]): [T, Y] {
  const _setting = JSON.parse(JSON.stringify(obj))
  const newObj: any = {}
  const other: any = {}

  for (const [key, value] of Object.entries(_setting)) {
    if (keys.includes(key))
      newObj[key] = value
    else
      other[key] = value
  }
  return [newObj, other]
}

export async function pageGenerateRouter(options: PageGenerateOptions) {
  const root: string
    = options.root && isAbsolute(options.root || '')
      ? options.root
      : process.cwd()

  const target = resolve(root, options.generateDir ?? '')
  const virtualModuleId = options?.name || VIRTUAL_MODULEID
  const resolvedVirtualModuleId = `\0${virtualModuleId}`

  let transform = createVueTransform({
    targetDir: target,
  })

  if (options.transform)
    transform = options.transform()

  return {
    name: PLUGIN_NAME,
    resolveId(id: string) {
      if (id === virtualModuleId)
        return resolvedVirtualModuleId
    },

    async load(id: string) {
      if (id !== resolvedVirtualModuleId)
        return

      const modules = await folderScan(target)
      const res = await travel(modules, transform)
      return `export default ${JSON.stringify(res || [])}`
    },
  }
}

export { travel, travelSync }
