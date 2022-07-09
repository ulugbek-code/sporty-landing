<template>
  <div v-if="isClassTrue" @click.stop="" class="position-relative">
    <div class="hours-dd">
      <p>Выберите дни недели</p>
      <div class="weekDays-selector">
        <div
          @click="setTab(week)"
          v-for="week in weeks"
          :key="week"
          :class="selected === week ? 'active' : ''"
        >
          {{ week }}
        </div>
      </div>
      <class-date-tab
        :eachId="classId"
        :isEqualTab="selected === 'Пн'"
        :week="1"
        :day="filterAllDates(1)"
        @updateDate="changeDates"
        @deleteDate="deleteDate"
        @closeTab="closing"
      ></class-date-tab>
      <class-date-tab
        :eachId="classId"
        :isEqualTab="selected === 'Вт'"
        :week="2"
        :day="filterAllDates(2)"
        @updateDate="changeDates"
        @deleteDate="deleteDate"
        @closeTab="closing"
      ></class-date-tab>
      <class-date-tab
        :eachId="classId"
        :isEqualTab="selected === 'Ср'"
        :week="3"
        :day="filterAllDates(3)"
        @updateDate="changeDates"
        @deleteDate="deleteDate"
        @closeTab="closing"
      ></class-date-tab>
      <class-date-tab
        :eachId="classId"
        :isEqualTab="selected === 'Чт'"
        :week="4"
        :day="filterAllDates(4)"
        @updateDate="changeDates"
        @deleteDate="deleteDate"
        @closeTab="closing"
      ></class-date-tab>
      <class-date-tab
        :eachId="classId"
        :isEqualTab="selected === 'Пт'"
        :week="5"
        :day="filterAllDates(5)"
        @updateDate="changeDates"
        @deleteDate="deleteDate"
        @closeTab="closing"
      ></class-date-tab>
      <class-date-tab
        :eachId="classId"
        :isEqualTab="selected === 'Сб'"
        :week="6"
        :day="filterAllDates(6)"
        @updateDate="changeDates"
        @deleteDate="deleteDate"
        @closeTab="closing"
      ></class-date-tab>
      <class-date-tab
        :eachId="classId"
        :isEqualTab="selected === 'Вс'"
        :week="7"
        :day="filterAllDates(7)"
        @updateDate="changeDates"
        @deleteDate="deleteDate"
        @closeTab="closing"
      ></class-date-tab>
    </div>
  </div>
</template>

<script>
import ClassDateTab from "./ClassDateTab.vue";
export default {
  props: ["all", "classId", "isClassTrue"],
  emits: ["updateD", "delDate", "close-opening"],
  components: {
    ClassDateTab,
  },
  data() {
    return {
      selected: "",
      startHour: "",
      finishHour: "",
      weekDays: [],
      weeks: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
    };
  },
  methods: {
    filterAllDates(day) {
      return this.all?.find((each) => each.week[0] == day);
    },
    changeDates(val) {
      this.$emit("updateD", val);
    },
    deleteDate(val) {
      this.$emit("delDate", val);
    },
    closing() {
      this.$emit("close-opening");
    },
    setTab(val) {
      this.selected = val;
    },
  },
};
</script>

<style scoped>
.hours-dd {
  position: absolute;
  left: 0%;
  top: 8px;
  min-width: 400px;
  background: #fff;
  border-radius: 10px;
  z-index: 10;
  padding: 1rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

/* week */
.weekDays-selector {
  display: flex;
  justify-content: space-between;
}
.weekDays-selector div {
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
  transition: all 0.2s ease;
}
.weekDays-selector div.active {
  background: #016bd4;
  color: #ffffff;
}
@media screen and (max-width: 576px) {
  .hours-dd {
    min-width: 345px;
  }
}
@media screen and (max-width: 390px) {
  .hours-dd {
    left: -2.5%;
  }
}
</style>
