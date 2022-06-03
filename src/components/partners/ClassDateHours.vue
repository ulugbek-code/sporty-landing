<template>
  <p class="my-2">Часы работы с</p>
  <div>
    <vue-timepicker
      v-model="startHour"
      hour-label="час"
      minute-label="минута"
      input-width="100%"
      placeholder="Дата начала"
      close-on-complete
    ></vue-timepicker>
  </div>
  <p class="my-2">Часы работы до</p>
  <div class="mb-4">
    <vue-timepicker
      v-model="finishHour"
      hour-label="час"
      minute-label="минута"
      input-width="100%"
      placeholder="Дата окончания"
      close-on-complete
    ></vue-timepicker>
  </div>
  <div class="hours-action d-flex justify-content-between">
    <button @click="cancel" class="btn btn-outline-white">Отмена</button>
    <button @click="saveDate" class="btn">Сохранить</button>
  </div>
</template>

<script>
import VueTimepicker from "vue3-timepicker/src/VueTimepicker.vue";
export default {
  emits: ["cancel", "saveDate"],
  components: {
    VueTimepicker,
  },
  data() {
    return {
      startHour: "",
      finishHour: "",
    };
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    reset() {
      this.startHour = "";
      this.finishHour = "";
    },
    saveDate() {
      let a = this.startHour.includes("HH");
      let b = this.startHour.includes("mm");
      let c = this.finishHour.includes("HH");
      let d = this.finishHour.includes("mm");
      if (!this.startHour || !this.finishHour || a || b || c || d) return;
      this.$emit("saveDate", {
        start: this.startHour,
        finish: this.finishHour,
      });
    },
  },
};
</script>

<style scoped>
.hours-action button {
  padding: 12px 20px;
  font-size: 14px;
  width: 46%;
}
.hours-action button:first-child {
  border: 1px solid #9d9d9d;
  color: #9d9d9d;
}
.hours-action button:last-child {
  border: 1px solid#016BD4;
  background: #016bd4;
  color: #fff;
}
</style>
