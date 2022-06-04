<template>
  <div v-if="isEqualTab">
    <button
      @click="makeVisibleDate"
      v-if="!isDateVisible"
      class="btn btn-more p-2 px-4"
    >
      {{ dates.length ? "Добавить еще часы" : "Добавить занятие" }}
    </button>
    <template v-if="isDateVisible">
      <div class="my-3">
        <div v-for="date in dates" :key="date" class="my-1 fw-bold">
          <span class=""><img src="../../assets/clock.svg" alt="" /></span>
          {{ date.start_date }} - {{ date.finish_date }}
          <span @click="removeTime(date)" class="text-danger float-end"
            >Удалить</span
          >
        </div>
      </div>
      <class-date-hours @saveDate="savingDate" @cancel="cancelBtn">
      </class-date-hours>
    </template>
  </div>
</template>

<script>
import ClassDateHours from "./ClassDateHours.vue";
export default {
  props: ["isEqualTab", "week"],
  components: {
    ClassDateHours,
  },
  data() {
    return {
      isDateVisible: false,
    };
  },
  computed: {
    dates() {
      return this.$store.getters.eachWeekDates.filter(
        (day) => day.week.join() == this.week
      );
    },
  },
  methods: {
    removeTime(date) {
      this.$store.commit("removeEachWeekDates", date);
    },
    savingDate(val) {
      let a = {
        week: [this.week],
        start_date: val.start,
        finish_date: val.finish,
      };
      this.$store.commit("getEachWeekDates", a);
    },
    cancelBtn() {
      this.isDateVisible = false;
      this.$emit("closeOpening");
    },
    makeVisibleDate() {
      this.isDateVisible = true;
    },
  },
};
</script>

<style scoped>
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
  width: 30px;
}
span.text-danger {
  font-size: 13px;
  cursor: pointer;
}
</style>
