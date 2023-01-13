import { resolve } from 'path'
import { describe, expect, it } from 'vitest'
import { folderScan, travel } from '../src/utils'
import { createVueTransform } from '../src/config'

describe('pageGenerateRouter', () => {
  it('transform', async () => {
    const target = resolve(__dirname, 'pages')
    const modules = await folderScan(target)

    const routerPage = await travel(modules, createVueTransform({
      settingFile: 'setting.json',
      defaultIndex: 'index.vue',
      targetDir: target,
    }))

    expect(routerPage).toMatchInlineSnapshot(`
      [
        {
          "children": [
            {
              "children": [],
              "component": "/about/detail/index.vue",
              "meta": {
                "title": "详情",
              },
              "name": "详情",
              "path": "/about/detail",
            },
          ],
          "component": "/about/index.vue",
          "meta": {
            "title": "关于我们",
          },
          "name": "关于我们",
          "path": "/about",
        },
        {
          "children": [],
          "component": "/home/index.vue",
          "meta": {
            "title": "首页",
          },
          "name": "home",
          "path": "/home-page",
        },
      ]
    `)
  })
})
