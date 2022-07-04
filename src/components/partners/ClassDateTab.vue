<template>
  <div v-if="isEqualTab">
    <div v-if="!isSaved" class="d-flex justify-content-between mt-3">
      <div class="start">
        <p>Часы работы с</p>
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
      <div class="finish">
        <p>Часы работы до</p>
        <div class="input-wrap">
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
    <div v-else class="mt-3">
      <div class="start-p d-flex justify-content-between">
        <p>Часы работы с</p>
        <p>Часы работы до</p>
      </div>
      <div class="finish-p d-flex justify-content-evenly align-items-center">
        <p class="my-2">{{ startH }}:{{ startM }}</p>
        -
        <p class="my-2">{{ finishH }}:{{ finishM }}</p>
        <span @click="reset"
          ><img src="../../assets/vector.svg" alt="" class="img-fluid"
        /></span>
      </div>
    </div>
    <div class="actions d-flex justify-content-between mt-5">
      <button @click="$emit('closeTab')" class="btn btn-outline-secondary">
        Отмена
      </button>
      <button @click="saveDate" class="btn btn-primary" :disabled="canSave">
        Сохранить
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["day", "eachId", "isEqualTab", "week"],
  emits: ["closeTab", "updateDate", "deleteDate"],
  data() {
    return {
      isDateVisible: false,
      isSaved: false,
      startH: this.day ? this.day.start_date.slice(0, 2) : "",
      startM: this.day ? this.day.start_date.slice(3, 5) : "",
      finishH: this.day ? this.day.finish_date.slice(0, 2) : "",
      finishM: this.day ? this.day?.finish_date?.slice(3, 5) : "",
    };
  },
  computed: {
    canSave() {
      return (
        !this.startH ||
        !this.startM ||
        !this.finishH ||
        this.finishM.length != 2
      );
    },
  },
  methods: {
    saveDate() {
      this.isSaved = true;
      let startDate, finishDate;
      startDate = `${this.startH}:${this.startM}`;
      finishDate = `${this.finishH}:${this.finishM}`;
      this.$emit("updateDate", {
        id: this.eachId,
        week: [this.week],
        start_date: startDate,
        finish_date: finishDate,
      });
    },
    reset() {
      this.isSaved = false;
      this.startH = "";
      this.startM = "";
      this.finishH = "";
      this.finishM = "";
      this.$emit("deleteDate", {
        id: this.eachId,
        week: [this.week],
      });
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
input {
  background: #f5f5f5;
  border: none;
  width: 60px;
  height: 36px;
  outline: none;
  text-align: center;
}
input:first-child {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-right: 1px solid #9d9d9d;
}
input:nth-child(2) {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
p {
  color: #1b1b1d;
  margin-bottom: 8px;
}
button,
.start,
.finish,
.start-p p {
  width: 45%;
}
/*  */
.btn-more {
  width: 100%;
  background: transparent;
  border: 2px dashed #dee2e6;
  margin: 16px 0;
  border-radius: 8px;
  font-size: 14px;
  color: #9d9d9d;
  transition: all 0.2s ease;
}
.btn-more:active {
  background: #dee2e6;
  color: #fff;
}
span img {
  width: 15px;
}
span.text-danger {
  font-size: 13px;
  cursor: pointer;
}
.finish-p {
  background: #f5f5f5;
  border-radius: 5px;
}
.finish-p span {
  position: absolute;
  right: 7%;
  width: 20px;
  cursor: pointer;
}
</style>
