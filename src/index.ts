import { isAbsolute, resolve } from 'path'
import {
  travel,
  travelSync,
} from './travel'
import type { FileNode } from './utils/index'
import {
  folderScan,
  targetDirExist,
} from './utils/index'
import type { TransformOptions } from './config'
import { createReactTransform, createVueTransform } from './config'

export interface PageGenerateOptions {
  generateDir: string
  root?: string
  defaultIndex?: string
  name?: string
  transform?: Transform
  routerType?: routerType
}

export type routerType = 'vue' | 'react'

export interface GenerateRouterOptons {
  targetDir: string
  settingFile: string
  defaultIndex: string
}

export type Transform = (options?: TransformOptions) => (fileNode: FileNode) => Promise<any>

const VIRTUAL_MODULEID = 'page-router'
const PLUGIN_NAME = 'vite-plugin-page-generate-router'

export function createDefaultTransform(type?: routerType) {
  switch (type) {
    case 'vue':
      return createVueTransform
    case 'react':
      return createReactTransform
    default:
      return createVueTransform
  }
}

export async function pageGenerateRouter(options: PageGenerateOptions) {
  const root: string
    = options.root && isAbsolute(options.root || '')
      ? options.root
      : process.cwd()

  const target = resolve(root, options.generateDir ?? '')
  const virtualModuleId = options?.name || VIRTUAL_MODULEID
  const resolvedVirtualModuleId = `\0${virtualModuleId}`

  const transform = options.transform ? options.transform() : createDefaultTransform(options.routerType)({ ...options, targetDir: target })

  return {
    name: PLUGIN_NAME,
    resolveId(id: string) {
      if (id === virtualModuleId)
        return resolvedVirtualModuleId
    },

    async load(id: string) {
      if (id !== resolvedVirtualModuleId)
        return
      if (!await targetDirExist(target))
        return 'export default []'

      const modules = await folderScan(target)
      const res = await travel(modules, transform)
      return `export default ${JSON.stringify(res || [])}`
    },
  }
}

export { travel, travelSync }
