<template>
  <div class="position-relative">
    <div @click="isHourTouched = !isHourTouched">
      <div
        class="d-flex align-items-center fw-bold border p-2 custom_date mb-2"
      >
        <p class="border-end my-0 px-2">
          <span v-for="week in weekDays" :key="week">{{ weeks[week] }},</span>
        </p>
        <p class="my-0 mx-2">
          {{ startHour ? startHour : "00:00" }} -
          {{ finishHour ? finishHour : "00:00" }}
        </p>
        <span class="triangle mx-2"></span>
        <span
          @click.stop="$emit('minusDate', qty)"
          class="bg-danger text-light rounded-circle"
        >
          x
        </span>
      </div>
    </div>
    <!-- hours dd -->
    <div v-if="isHourTouched" class="hours-dd">
      <p>Выберите дни недели</p>
      <div class="weekDays-selector">
        <input
          v-model="weekDays"
          value="1"
          type="checkbox"
          id="weekday-mon"
          class="weekday"
        />
        <label for="weekday-mon">Пн</label>
        <input
          v-model="weekDays"
          value="2"
          type="checkbox"
          id="weekday-tue"
          class="weekday"
        />
        <label for="weekday-tue">Вт</label>
        <input
          v-model="weekDays"
          value="3"
          type="checkbox"
          id="weekday-wed"
          class="weekday"
        />
        <label for="weekday-wed">Ср</label>
        <input
          v-model="weekDays"
          value="4"
          type="checkbox"
          id="weekday-thu"
          class="weekday"
        />
        <label for="weekday-thu">Чт</label>
        <input
          v-model="weekDays"
          value="5"
          type="checkbox"
          id="weekday-fri"
          class="weekday"
        />
        <label for="weekday-fri">Пт</label>
        <input
          v-model="weekDays"
          value="6"
          type="checkbox"
          id="weekday-sat"
          class="weekday"
        />
        <label for="weekday-sat">Сб</label>
        <input
          v-model="weekDays"
          value="7"
          type="checkbox"
          id="weekday-sun"
          class="weekday"
        />
        <label for="weekday-sun">Вс</label>
      </div>
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
        <button @click="cencel" class="btn btn-outline-white">Отмена</button>
        <button @click="saveHours" class="btn">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script>
import VueTimepicker from "vue3-timepicker/src/VueTimepicker.vue";
export default {
  props: ["qty"],
  emits: ["updateHours", "minusDate"],
  components: {
    VueTimepicker,
  },
  data() {
    return {
      isHourTouched: false,
      startHour: "",
      finishHour: "",
      weekDays: [],
      weeks: ["not", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
    };
  },
  methods: {
    saveHours() {
      let a = this.startHour.includes("HH");
      let b = this.startHour.includes("mm");
      let c = this.finishHour.includes("HH");
      let d = this.finishHour.includes("mm");
      if (
        !this.weekDays.length ||
        !this.startHour ||
        !this.finishHour ||
        a ||
        b ||
        c ||
        d
      )
        return;
      this.$emit("updateHours", {
        start_date: this.startHour,
        finish_date: this.finishHour,
        week: this.weekDays,
        qty: this.qty,
      });
      this.isHourTouched = false;
    },
    cencel() {
      (this.isHourTouched = false),
        (this.startHour = ""),
        (this.finishHour = ""),
        (this.weekDays = []);
    },
  },
};
</script>

<style scoped>
.custom_date {
  cursor: pointer;
  border-radius: 8px;
}
.hours-dd {
  position: absolute;
  left: -30%;
  top: 105%;
  min-width: 400px;
  background: #fff;
  border-radius: 10px;
  z-index: 10;
  padding: 1rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
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
.triangle {
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #016bd4;
}
/* week */
.weekDays-selector {
  display: flex;
  justify-content: space-between;
}
.weekDays-selector input {
  display: none !important;
}
.weekDays-selector input[type="checkbox"] + label {
  display: inline-block;
  border-radius: 6px;
  font-size: 12px;
  background: #d9d9d9;
  color: #fff;
  height: 40px;
  width: 40px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
}
.weekDays-selector input[type="checkbox"]:checked + label {
  background: #016bd4;
  color: #ffffff;
}
span.rounded-circle {
  padding: 0 8px 2px;
  transition: background 0.2s ease;
}
span.rounded-circle:hover {
  background: #e45c69 !important;
}
</style>
