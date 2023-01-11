import { createRouter, createWebHistory } from "vue-router";
import { asyncComponents } from "./utils";
import RootView from "@/views/index.vue";

// @ts-ignore
import pageRouters from "page-router";
import type { App } from "vue";
// @ts-ignore
const modules = import.meta.glob("../views/**/*.vue");

export function createAppRouter(app: App) {
  const routers = asyncComponents(pageRouters, modules);
  const router = createRouter({
    // @ts-ignore
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        component: RootView,
        path: "/",
        name: "root",
      },
      ...routers,
    ],
  });
  app.use(router);
}
