import { resolve } from 'path'
import { describe, expect, it } from 'vitest'
import { generateRouter } from '../src/index'
import { folderScan } from '../src/utils'

describe('pageGenerateRouter', () => {
  it('generateRouter', async () => {
    const target = resolve(__dirname, 'pages')
    const modules = await folderScan(target)

    const res = await generateRouter(modules, {
      settingFile: 'setting.json',
      targetDir: target,
      defaultIndex: 'index.vue',
    })

    expect(res).toMatchInlineSnapshot(`
      [
        {
          "children": [
            {
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
