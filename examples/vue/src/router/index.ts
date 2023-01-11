import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/Home/index.vue";
// @ts-ignore
import routers from "page-router";
// @ts-ignore
const modules = import.meta.glob("../views/**/*.vue");

// Transformed routing table
console.log(routers, modules);

const router = createRouter({
  // @ts-ignore
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
  ],
});

export default router;
