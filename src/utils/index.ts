import { access, constants, readFile, readdir, stat } from 'fs/promises'
import { parse, posix, resolve } from 'path'
import os from 'os'

export async function targetDirExist(path: string) {
  try {
    await access(path, constants.R_OK | constants.W_OK)
    return true
  }
  catch {
    return false
  }
}

export type FileTree = FileNode[]

export interface FileNode {
  path: string
  children?: FileTree
  files: string[]
}

export async function scanFile(path: string) {
  const files = await readdir(path)
  const resultFile: string[] = []
  for await (const file of files) {
    const newDir = resolve(path, file)
    const fileStat = await stat(newDir)
    if (fileStat.isFile())
      resultFile.push(newDir)
  }
  return resultFile
}

export async function folderScan(path: string) {
  const files = await readdir(path)
  const results: FileNode[] = []
  for await (const file of files) {
    const newPath = resolve(path, file)
    const filestat = await stat(newPath)
    if (filestat.isDirectory()) {
      results.push({
        path: newPath,
        children: await folderScan(newPath),
        files: await scanFile(newPath),
      })
    }
  }
  return results
}

export async function readJson<T>(path: string): Promise<T> {
  const fileText = await readFile(path)
  return JSON.parse(fileText.toString() || '{}')
}

const isWindows = os.platform() === 'win32'

function unification(id: string) {
  const reg = /\\/g
  return id.replace(reg, '/')
}

export function normalizePath(id: string): string {
  return posix.normalize(isWindows ? unification(id) : id)
}

export function pathResolu(target: string, currentPath: string, entry: string) {
  // user/admin/src/login/index.vue
  // |    root     |    page      |
  // |    root     |   component  |
  // |    root     |    path   |
  // |    root     |     |name |

  const targetDir = normalizePath(target)
  const newdir = normalizePath(currentPath)
  const componentPath = normalizePath(entry).replace(targetDir, '')
  const routerPath = newdir.replace(targetDir, '')
  const { name } = parse(entry)
  return {
    componentPath,
    routerPath,
    name,
  }
}
