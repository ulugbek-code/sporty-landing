import "bootstrap/dist/css/bootstrap.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router.js";
import store from "./store/index.js";
import BaseDropDown from "./components/BaseDropDown.vue";
// import YmapPlugin from "vue-yandex-maps";

// const settings = {
//   apiKey: "456787f4-294f-4b71-9233-05be8554dd23",
//   lang: "ru_RU",
//   coordorder: "latlong",
//   enterprise: false,
//   version: "2.1",
// };

const app = createApp(App);
app.use(router);
app.use(store);
app.component("base-drop-down", BaseDropDown);
// app.use(YmapPlugin, settings);
app.mount("#app");

import "bootstrap/dist/js/bootstrap.js";
