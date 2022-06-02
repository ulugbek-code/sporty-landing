import "bootstrap/dist/css/bootstrap.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router.js";
import store from "./store/index.js";
import BaseDropDown from "./components/BaseDropDown.vue";

const app = createApp(App);
app.use(router);
app.use(store);
app.component("base-drop-down", BaseDropDown);
app.mount("#app");

import "bootstrap/dist/js/bootstrap.js";
