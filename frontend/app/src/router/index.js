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
      props: true,
      component: () => import("../views/PanelView.vue"),
    },
  ],
});

export default router;
