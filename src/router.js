import { createRouter, createWebHistory } from "vue-router";

import HomePage from "./views/HomePage.vue";
const PartnerForm = () => import("./views/PartnerForm.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomePage },
    { path: "/partners", component: PartnerForm },
  ],
});

export default router;
