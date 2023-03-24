import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/panel/:tab?",
      name: "Panel",
      props: (route) => ({ tab: route.params.tab || "team" }),
      component: () => import("../views/PanelView.vue"),
    },
    {
      path: "/oauth",
      name: "Auth",
      component: () => import("@/views/AuthView.vue"),
    },
  ],
});

export default router;
