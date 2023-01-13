import { access, constants, readFile, readdir, stat } from 'fs/promises'
import { posix, resolve } from 'path'
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
export function normalizePath(path: string): string {
  const reg = /\\/g
  return posix.normalize(isWindows ? path.replace(reg, '/') : path)
}

export async function travel<T>(tree: T[], cb: (node: T) => any, opt: { subNodeName: string } = { subNodeName: 'children' }) {
  const { subNodeName } = opt
  const newTree: T[] = []

  for await (const node of tree) {
    const newNode = await Promise.resolve(cb(node))

    const subNode = Reflect.get(node as any, subNodeName)
    if (subNode)
      newNode[subNodeName] = await travel(subNode, cb, opt)

    newTree.push(newNode)
  }

  return newTree
}

export function travelSync <T>(tree: T[], cb: (node: T) => any, opt: { subNodeName: string } = { subNodeName: 'children' }) {
  const { subNodeName } = opt
  return tree.map((node) => {
    const newNode = cb(node)

    const subNode = Reflect.get(node as any, subNodeName)
    if (subNode)
      newNode[subNodeName] = travelSync(subNode, cb, opt)

    return newNode
  })
}
