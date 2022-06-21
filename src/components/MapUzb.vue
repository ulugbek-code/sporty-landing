<template>
  <yandex-map :settings="settings" :coords="coords" :zoom="10" @click="onClick">
    <ymap-marker
      marker-id="123"
      :coords="coords"
      :marker-events="['click']"
    ></ymap-marker>
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
      this.coords = e.get("coords");
      this.$emit("sendCoords", this.coords);
    },
  },
};
</script>

<style scoped>
.ymap-container {
  height: 600px;
}
/*  <ymap-marker 
      marker-type="circle"
      :coords="[54.62896654088406, 39.731893822753904]"
      circle-radius="1600"
      hint-content="Hint content 1"
      :marker-fill="{color: '#000000', opacity: 0.4}"
      :marker-stroke="{color: '#ff0000', width: 5}"
      :balloon="{header: 'header', body: 'body', footer: 'footer'}"
    ></ymap-marker>
    <ymap-marker
      :coords="[41.62896654088406, 69.731893822753904]"
    ></ymap-marker>
    <ymap-marker
      :coords="[41.62896654088406, 66.731893822753904]"
    ></ymap-marker>
    <ymap-marker
      :coords="[42.62896654088406, 67.731893822753904]"
    ></ymap-marker>
    <ymap-marker
      :coords="[43.62896654088406, 68.731893822753904]"
    ></ymap-marker> */
</style>
