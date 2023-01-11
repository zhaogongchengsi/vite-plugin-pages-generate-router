import { createRouter, createWebHistory } from 'vue-router'
import pageRouters from 'page-router'
import type { App } from 'vue'
import { asyncComponents } from './utils'
import RootView from '@/views/index.vue'

// @ts-expect-error
// @ts-expect-error
const modules = import.meta.glob('../views/**/*.vue')

export function createAppRouter(app: App) {
  const routers = asyncComponents(pageRouters, modules)
  const router = createRouter({
    // @ts-expect-error
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        component: RootView,
        path: '/',
        name: 'root',
      },
      ...routers,
    ],
  })
  app.use(router)
}
