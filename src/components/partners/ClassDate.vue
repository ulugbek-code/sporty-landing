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
        @closeOpening="closing"
        @triggerDate="trigDate"
      ></class-date-tab>
      <class-date-tab
        :eachId="classId"
        :isEqualTab="selected === 'Вт'"
        :week="2"
        @closeOpening="closing"
        @triggerDate="trigDate"
      ></class-date-tab>
      <class-date-tab
        :eachId="classId"
        :isEqualTab="selected === 'Ср'"
        :week="3"
        @closeOpening="closing"
        @triggerDate="trigDate"
      ></class-date-tab>
      <class-date-tab
        :eachId="classId"
        :isEqualTab="selected === 'Чт'"
        :week="4"
        @closeOpening="closing"
        @triggerDate="trigDate"
      ></class-date-tab>
      <class-date-tab
        :eachId="classId"
        :isEqualTab="selected === 'Пт'"
        :week="5"
        @closeOpening="closing"
        @triggerDate="trigDate"
      ></class-date-tab>
      <class-date-tab
        :eachId="classId"
        :isEqualTab="selected === 'Сб'"
        :week="6"
        @closeOpening="closing"
        @triggerDate="trigDate"
      ></class-date-tab>
      <class-date-tab
        :eachId="classId"
        :isEqualTab="selected === 'Вс'"
        :week="7"
        @closeOpening="closing"
        @triggerDate="trigDate"
      ></class-date-tab>
      <!--  -->
    </div>
  </div>
</template>

<script>
import ClassDateTab from "./ClassDateTab.vue";
export default {
  props: ["classId", "isClassTrue"],
  emits: ["changeClassDate", "close-opening"],
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
    trigDate() {
      this.$emit("changeClassDate");
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
  left: -7%;
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
    left: 0;
  }
}
</style>
