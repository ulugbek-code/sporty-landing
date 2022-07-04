<template>
  <div class="position-relative">
    <div @click="isHourTouched = !isHourTouched">
      <div
        class="d-flex align-items-center justify-content-end fw-bold border p-2 custom_date mb-2"
      >
        <p class="border-end my-0 px-2">
          <span v-for="week in weekDays" :key="week">{{ weeks[week] }},</span>
        </p>
        <p class="my-0 mx-2">
          {{
            startH && startM ? `${startH}:${startM}` : startH ? startH : "00:00"
          }}
          -
          {{
            finishH && finishM
              ? `${finishH}:${finishM}`
              : finishH
              ? finishH
              : "00:00"
          }}
        </p>
        <div class="d-flex align-items-center">
          <span
            class="triangle mx-2"
            :class="isHourTouched ? 'open-t' : ''"
          ></span>
          <span
            @click.stop="$emit('minusDate', qty)"
            class="bg-danger text-light rounded-circle"
          >
            x
          </span>
        </div>
      </div>
    </div>
    <!-- hours dd  position absolute made!-->
    <div v-if="isHourTouched" class="hours-dd position-absolute">
      <h6>Выберите дни недели</h6>
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
      <div class="d-flex justify-content-between mt-2">
        <div>
          <h6 class="my-2">Часы работы с</h6>
          <div class="input-wrap">
            <input
              v-model="startH"
              type="text"
              maxlength="2"
              placeholder="ЧЧ"
              id="startHH"
            />
            <input
              v-model="startM"
              type="text"
              maxlength="2"
              placeholder="ММ"
              id="startMM"
            />
          </div>
        </div>
        <div>
          <h6 class="my-2">Часы работы до</h6>
          <div class="input-wrap mb-4">
            <input
              v-model="finishH"
              type="text"
              maxlength="2"
              placeholder="ЧЧ"
              id="finishHH"
            />
            <input
              v-model="finishM"
              type="text"
              maxlength="2"
              placeholder="ММ"
              id="finishMM"
            />
          </div>
        </div>
      </div>
      <div class="hours-action d-flex justify-content-between mt-2">
        <button @click="cencel" class="btn btn-outline-white">Отмена</button>
        <button @click="saveHours" class="btn" :disabled="canSave">
          Сохранить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["qty"],
  emits: ["updateHours", "minusDate"],
  data() {
    return {
      isHourTouched: false,
      //
      startH: "",
      startM: "",
      finishH: "",
      finishM: "",
      weekDays: [],
      weeks: ["not", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
    };
  },
  computed: {
    canSave() {
      return (
        !this.weekDays.length ||
        !this.startH ||
        !this.startM ||
        !this.finishH ||
        this.finishM.length != 2
      );
    },
  },
  methods: {
    saveHours() {
      this.$emit("updateHours", {
        start_date: `${this.startH}:${this.startM}`,
        finish_date: `${this.finishH}:${this.finishM}`,
        week: this.weekDays,
        qty: this.qty,
      });
      this.isHourTouched = false;
    },
    cencel() {
      (this.isHourTouched = false), (this.startH = "");
      this.startM = "";
      this.finishH = "";
      this.finishM = "";
      this.weekDays = [];
    },
  },
  watch: {
    startH(val) {
      if (isNaN(this.startH[0])) this.startH = "";
      if (val < 0) this.startH = Math.abs(this.startH);
      if (val.length == 2 && this.startM.length == 2) {
        document.getElementById("finishHH").focus();
      } else if (val.length == 2 && !this.startM.length) {
        document.getElementById("startMM").focus();
      }
    },
    startM(val) {
      if (isNaN(this.startM[0])) this.startM = "";
      if (val < 0) this.startM = Math.abs(this.startM);
      if (val.length == 2 && this.startH.length == 2) {
        document.getElementById("finishHH").focus();
      } else if (val.length == 2 && this.startH.length != 2) {
        document.getElementById("startHH").focus();
      }
    },
    finishH(val) {
      if (isNaN(this.finishH[0])) this.finishH = "";
      if (val < 0) this.finishH = Math.abs(this.finishH);
      if (val.length == 2) {
        document.getElementById("finishMM").focus();
      }
    },
    finishM(val) {
      if (isNaN(this.finishM[0])) this.finishM = "";
      if (val < 0) this.finishM = Math.abs(this.finishM);
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
  position: relative;
  min-width: 320px;
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
  transition: all 0.2s ease;
}
.triangle.open-t {
  transform: rotate(180deg);
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
  height: 34px;
  width: 34px;
  line-height: 34px;
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
p {
  font-size: 13px;
}
.btn {
  border-radius: 6px;
}
/*  */
.input-wrap input {
  background: #f5f5f5;
  border: none;
  width: 60px;
  height: 36px;
  outline: none;
  text-align: center;
}
.input-wrap input:first-child {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-right: 1px solid #9d9d9d;
}
.input-wrap input:nth-child(2) {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>
