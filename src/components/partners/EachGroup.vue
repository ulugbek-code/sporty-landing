<template>
  <div @click="closeVisibility">
    <div class="mb-3">
      <div class="position-relative">
        <h4 class="fw-bold mt-3">Группа {{ parseInt(index) + 1 }}</h4>
        <hr id="line" />
        <span
          v-if="index !== 0"
          @click="$emit('delete-group', gr.id)"
          class="delete-level"
          >Удалить группу</span
        >
      </div>
      <p class="fw-bold mb-2">Название группы</p>
      <input
        v-model.lazy="name"
        type="text"
        class="form-control border"
        :class="isError && !name ? 'border-danger' : ''"
        placeholder="Название группы"
      />
    </div>
    <div class="mb-3">
      <p class="fw-bold mb-2">Количество учащихся в группе</p>
      <input
        v-model="current_students_number"
        @input="convertS()"
        type="number"
        class="form-control border"
        :class="isError && !current_students_number ? 'border-danger' : ''"
        placeholder="Введите количество учащихся"
      />
    </div>
    <div class="mb-3">
      <p class="fw-bold mb-2">Количество свободных мест в группе</p>
      <input
        v-model="limit"
        @input="convertF()"
        type="number"
        class="form-control border"
        :class="isError && !limit ? 'border-danger' : ''"
        placeholder="Введите количество свободных мест в группе"
      />
    </div>
    <div class="mb-3">
      <p class="fw-bold mb-2">Длительность</p>
      <div class="input-group mb-3">
        <input
          v-model="duration"
          type="number"
          @input="convertD()"
          class="form-control border"
          :class="isError && !duration ? 'border-danger' : ''"
          placeholder="Длительность"
        />
        <span class="input-group-text">МИНУТА</span>
      </div>
    </div>
    <div class="mb-3">
      <p class="fw-bold mb-2">Статус группы</p>
      <base-drop-down
        :options="[
          { id: 'open', name: 'Идет набор' },
          { id: 'waiting', name: 'Курс начался' },
          { id: 'full', name: 'Набор закрыт' },
        ]"
        :isError="isError"
        @input="getStatus"
        default="Не выбрано"
      ></base-drop-down>
    </div>
    <div class="mb-3">
      <p class="fw-bold mb-2">Вид занятий</p>
      <base-drop-down
        :options="[
          { id: 'individual', name: 'Индивидуальные' },
          { id: 'group', name: 'Групповые' },
        ]"
        :isError="isError"
        @input="getType"
        default="Не выбрано"
      ></base-drop-down>
    </div>
    <div class="mb-3">
      <button
        @click.stop="classVisible = !classVisible"
        class="btn-map2"
        :class="isError && !level_date.length ? 'bg-danger' : ''"
      >
        Добавить расписание
      </button>
      <class-date
        :classId="gr.id"
        :all="gr.level_date"
        :isClassTrue="classVisible"
        @delDate="deleteDates"
        @updateD="getDates"
        @close-opening="classVisible = false"
      ></class-date>
    </div>
  </div>
</template>

<script>
import ClassDate from "./ClassDate.vue";

export default {
  props: ["gr", "index", "isError"],
  emits: ["sendDates", "delete-group", "updateGroup"],
  components: {
    ClassDate,
  },
  data() {
    return {
      classVisible: false,
      name: this.gr.name,
      current_students_number: this.gr.current_students_number,
      limit: this.gr.limit,
      status: this.gr.status,
      type: this.gr.type,
      level_date: this.gr.level_date,
      duration: this.gr.duration,
    };
  },
  computed: {
    isClassDateChanged() {
      return this.$store.getters.getClassDateChanges;
    },
  },
  methods: {
    closeVisibility() {
      if (this.classVisible) this.classVisible = false;
    },
    deleteDates(val) {
      this.level_date = this.level_date.filter(
        (date) => date.week[0] != val.week[0]
      );
      this.$emit("sendDates", { id: this.gr.id, value: this.level_date });
    },
    getDates(val) {
      let found;
      found = this.level_date.find((d) => d.week[0] == val.week[0]);
      if (!found) {
        this.level_date.push(val);
      } else {
        this.level_date = this.level_date.map((each) => {
          if (each.week[0] == val.week[0]) {
            return val;
          } else {
            return each;
          }
        });
      }
      this.$emit("sendDates", { id: this.gr.id, value: this.level_date });
    },
    convertS() {
      if (this.current_students_number < 0)
        this.current_students_number = Math.abs(this.current_students_number);
    },
    convertD() {
      if (this.duration < 0) this.duration = Math.abs(this.duration);
    },
    convertF() {
      if (this.limit < 0) this.limit = Math.abs(this.limit);
    },
    getStatus(val) {
      this.status = val.id;
      this.$emit("updateGroup", {
        id: this.gr.id,
        name: this.name,
        current_students_number: this.current_students_number,
        limit: this.limit,
        duration: this.duration,
        status: this.status,
        type: this.type,
      });
    },
    getType(val) {
      this.type = val.id;
      this.$emit("updateGroup", {
        id: this.gr.id,
        name: this.name,
        current_students_number: this.current_students_number,
        limit: this.limit,
        duration: this.duration,
        status: this.status,
        type: this.type,
      });
    },
  },
  watch: {
    isClassDateChanged() {
      this.closeVisibility();
    },
    name(val) {
      this.$emit("updateGroup", {
        id: this.gr.id,
        name: val,
        current_students_number: this.current_students_number,
        limit: this.limit,
        duration: this.duration,
        status: this.status,
        type: this.type,
      });
    },
    current_students_number(val) {
      this.$emit("updateGroup", {
        id: this.gr.id,
        name: this.name,
        current_students_number: val,
        limit: this.limit,
        duration: this.duration,
        status: this.status,
        type: this.type,
      });
    },
    limit(val) {
      this.$emit("updateGroup", {
        id: this.gr.id,
        name: this.name,
        current_students_number: this.current_students_number,
        limit: val,
        duration: this.duration,
        status: this.status,
        type: this.type,
      });
    },
    duration(val) {
      this.$emit("updateGroup", {
        id: this.gr.id,
        name: this.name,
        current_students_number: this.current_students_number,
        limit: this.limit,
        duration: val,
        status: this.status,
        type: this.type,
      });
    },
  },
};
</script>

<style scoped>
.btn-map2 {
  width: 40%;
  background: #016bd4;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
  padding: 6px 12px;
}
input,
textarea {
  font-size: 15px;
  line-height: 24px;
}
input {
  border-radius: 8px;
}
input::placeholder,
textarea::placeholder {
  color: #9d9d9d;
}
input.border-danger::placeholder,
textarea.border-danger::placeholder {
  color: #dc3545;
}
.delete-level {
  color: #ff4b55;
  position: absolute;
  right: 0;
  top: 70%;
  font-size: 14px;
  cursor: pointer;
}
#line {
  position: absolute;
  left: 40%;
  top: 0;
  height: 3px;
  width: 60%;
  text-align: end;
  background: #d9d9d9;
}
</style>
