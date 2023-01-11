import { resolve } from 'path'
import { describe, expect, it } from 'vitest'
import { folderScan, readJson, targetDirExist } from '../src/utils/index'

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
})
