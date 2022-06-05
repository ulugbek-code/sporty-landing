<template>
  <yandex-map :settings="settings" :coords="coords" :zoom="10" @click="onClick">
    <ymap-marker marker-id="123" :coords="coords"></ymap-marker>
  </yandex-map>
</template>

<script>
import { yandexMap, ymapMarker } from "vue-yandex-maps";
export default {
  components: { yandexMap, ymapMarker },
  emits: ["sendCoords"],
  data() {
    return {
      settings: {
        apiKey: "456787f4-294f-4b71-9233-05be8554dd23",
        lang: "ru_RU",
        coordorder: "latlong",
        enterprise: false,
        version: "2.1",
      },
      coords: [41.3106176, 69.2518912],
    };
  },
  methods: {
    onClick(e) {
      if (e) this.coords = e.get("coords");
      this.$emit("sendCoords", this.coords);
    },
  },
};
</script>

<style scoped>
.ymap-container {
  height: 600px;
}
</style>
