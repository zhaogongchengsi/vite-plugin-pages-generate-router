import { resolve } from 'path'
import type { FileNode } from './utils'
import { pathResolu, pick, readJson } from './utils'
export interface TransformOptions {
  settingFile?: string
  defaultIndex?: string
  targetDir: string
}

const ROUTER_VUE_KEYS = [
  'path',
  'name',
  'redirect',
  'alias',
  'props',
  'sensitive',
  'strict',
]

const ROUTER_REACR_KEYS = [
  'path',
  'name',
  'redirect',
  'element',
  'alias',
  'props',
  'sensitive',
  'strict',
]

const vueDefauleConfig: TransformOptions = {
  settingFile: 'setting.json',
  defaultIndex: 'index.vue',
  targetDir: process.cwd(),
}

const reactDefauleConfig: TransformOptions = {
  settingFile: 'setting.json',
  defaultIndex: 'index.tsx',
  targetDir: process.cwd(),
}

export function createVueTransform(options?: TransformOptions) {
  const { settingFile, defaultIndex, targetDir } = Object.assign(vueDefauleConfig, options)
  return async ({ path }: FileNode) => {
    const settingPath = resolve(path, settingFile!)
    const setting = await readJson<{ index: string }>(settingPath)
    const entry = resolve(path, setting?.index || defaultIndex!)

    const { componentPath, name, routerPath } = pathResolu(targetDir, path, entry)
    const [router, meta] = pick<any, any>(setting, ROUTER_VUE_KEYS)

    return {
      name,
      path: routerPath,
      ...router,
      component: componentPath,
      meta,
    }
  }
}

export function createReactTransform(options?: TransformOptions) {
  const { settingFile, defaultIndex, targetDir } = Object.assign(reactDefauleConfig, options)
  return async ({ path }: FileNode) => {
    const settingPath = resolve(path, settingFile!)
    const setting = await readJson<{ index: string }>(settingPath)
    const entry = resolve(path, setting?.index || defaultIndex!)

    const { componentPath, name, routerPath } = pathResolu(targetDir, path, entry)
    const [router, meta] = pick<any, any>(setting, ROUTER_REACR_KEYS)

    return {
      name,
      path: routerPath,
      ...router,
      meta,
      element: componentPath,
    }
  }
}
