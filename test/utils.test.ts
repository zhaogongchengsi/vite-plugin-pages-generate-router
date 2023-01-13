import { resolve } from 'path'
import { describe, expect, it } from 'vitest'
import type { FileTree } from '../src/utils/index'
import { folderScan, readJson, targetDirExist, travel, travelSync } from '../src/utils/index'

describe('utils', () => {
  it('targetDirExist', async () => {
    const path = resolve(__dirname, 'pages/setting.json')
    const notPaht = resolve(__dirname, 'pages/index.ts')
    const res = await targetDirExist(path)
    const res2 = await targetDirExist(notPaht)
    expect(res).toBe(true)
    expect(res2).toBe(false)
  })

  it('folderScan', async () => {
    const path = resolve(__dirname, 'pages')
    const res = await folderScan(path)
    expect(res.length).toBe(2)
  })

  it('readJson', async () => {
    const file = resolve(__dirname, 'pages/setting.json')
    const res = await readJson<{ title: string; index: string }>(file)
    expect(res).toEqual({
      title: '首页',
      index: 'index.vue',
    })
  })

  it('travel list', async () => {
    const tree = [{ num: 1 }, { num: 2 }]
    const res = await travel(tree, ({ num }) => {
      return { num: num + 1 }
    })

    expect(res).toEqual([{ num: 2 }, { num: 3 }])
  })

  it('travel tree', async () => {
    const tree = [{ num: 1, children: [{ num: 2, children: [{ num: 3 }] }] }, { num: 2 }]
    const res = await travel(tree, ({ num }) => {
      return { num: num + 1 }
    })
    expect(res).toEqual([{ num: 2, children: [{ num: 3, children: [{ num: 4 }] }] }, { num: 3 }])
  })

  it('travel tree Sync', () => {
    const tree = [{ num: 1, children: [{ num: 2, children: [{ num: 3 }] }] }, { num: 2 }]
    const res = travelSync(tree, ({ num }) => {
      return { num: num + 1 }
    })
    expect(res).toEqual([{ num: 2, children: [{ num: 3, children: [{ num: 4 }] }] }, { num: 3 }])
  })

  it('Traverse the file tree', async () => {
    const tree: FileTree = [
      {
        path: '/',
        files: [],
        children: [
          {
            path: '/home',
            files: [],
          },
          {
            path: '/about',
            files: [],
            children: [
              {
                path: 'datiles',
                files: [],
              },
            ],
          },
        ],
      },
      {
        path: 'login',
        files: [],
      },
    ]
    const newTree = await travel(tree, (node) => {
      return {
        path: `${node.path}-${1}`,
        files: node.files,
      }
    })

    expect(newTree).toStrictEqual([
      {
        path: '/-1',
        files: [],
        children: [
          {
            path: '/home-1',
            files: [],
          },
          {
            path: '/about-1',
            files: [],
            children: [
              {
                path: 'datiles-1',
                files: [],
              },
            ],
          },
        ],
      },
      {
        path: 'login-1',
        files: [],
      },
    ])
  })

  it('Traverse the file tree (async)', () => {
    const tree: FileTree = [
      {
        path: '/',
        files: [],
        children: [
          {
            path: '/home',
            files: [],
          },
          {
            path: '/about',
            files: [],
            children: [
              {
                path: 'datiles',
                files: [],
              },
            ],
          },
        ],
      },
      {
        path: 'login',
        files: [],
      },
    ]
    const newTree = travelSync(tree, (node) => {
      return {
        path: `${node.path}-${1}`,
        files: node.files,
      }
    })

    expect(newTree).toStrictEqual([
      {
        path: '/-1',
        files: [],
        children: [
          {
            path: '/home-1',
            files: [],
          },
          {
            path: '/about-1',
            files: [],
            children: [
              {
                path: 'datiles-1',
                files: [],
              },
            ],
          },
        ],
      },
      {
        path: 'login-1',
        files: [],
      },
    ])
  })
})
