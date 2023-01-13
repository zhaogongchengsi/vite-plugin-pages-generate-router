import { parse, resolve } from 'path'
import type { FileNode } from './utils'
import { normalizePath, readJson } from './utils'
import { pick } from '.'

export interface TransformOptions {
  settingFile?: string
  defaultIndex?: string
  targetDir: string
}

const ROUTER_KEYS = [
  'path',
  'name',
  'redirect',
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

export function createVueTransform(options?: TransformOptions) {
  const { settingFile, defaultIndex, targetDir } = Object.assign(vueDefauleConfig, options)
  return async ({ path }: FileNode) => {
    const settingPath = resolve(path, settingFile!)
    const setting = await readJson<{ index: string }>(settingPath)
    const entry = resolve(path, setting?.index || defaultIndex!)

    // user/admin/src/login/index.vue
    // |    root     |    page      |
    // |    root     |   component  |
    //      root     |    path   |
    //      root           |name |

    // 根目录
    const target = normalizePath(targetDir)
    // 页面的根目录
    const newdir = normalizePath(path)
    const routerPath = newdir.replace(target, '')
    const { name } = parse(entry)
    const componentPath = normalizePath(entry).replace(target, '')
    const [router, meta] = pick<any, any>(setting, ROUTER_KEYS)

    return {
      name,
      path: routerPath,
      ...router,
      component: componentPath,
      meta,
    }
  }
}
