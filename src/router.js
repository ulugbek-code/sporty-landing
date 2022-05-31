import { createRouter, createWebHistory } from "vue-router";

import HomePage from "./views/HomePage.vue";
const PartnerForm = () => import("./views/PartnerForm.vue");
const ClientForm = () => import("./views/ClientForm.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomePage },
    { path: "/partners", component: PartnerForm },
    { path: "/clients", component: ClientForm },
  ],
});

export default router;
