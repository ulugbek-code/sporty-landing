<template>
  <template v-if="index !== 0">
    <hr />
  </template>
  <div class="mb-3 position-relative">
    <p class="fw-bold mb-2">Уровень обучения</p>
    <span v-if="index !== 0" @click="delLevel(level.id)" class="delete-level"
      >Удалить уровень</span
    >
    <input
      v-model.lazy="levelName"
      type="text"
      class="form-control border"
      :class="isError && !levelName ? 'border-danger' : ''"
      placeholder="Введите уровень"
    />
  </div>
  <p class="fw-bold mb-2">Длительность обучения</p>
  <div class="input-group mb-3">
    <input
      v-model="duration"
      type="number"
      @input="converV()"
      class="form-control border"
      :class="isError && !duration ? 'border-danger' : ''"
      placeholder="Укажите длительность"
    />
    <span class="input-group-text">МЕСЯЦЕВ</span>
  </div>
  <div class="mb-3">
    <p class="fw-bold mb-2">Возрастная аудитория</p>
    <base-drop-down
      :options="[
        { id: 'old', name: 'Для взрослых' },
        { id: 'teen', name: 'Для детей' },
        { id: 'all', name: 'Для всех возрастов' },
      ]"
      @input="getAge"
      :isError="isError"
      default="Не выбрано"
    ></base-drop-down>
  </div>
  <div class="mb-3">
    <p class="fw-bold mb-2">Количество посещений в тарифе</p>
    <input
      v-model="number_of_lessons"
      @input="convertS()"
      type="number"
      class="form-control border"
      :class="isError && !number_of_lessons ? 'border-danger' : ''"
      placeholder="Введите количество посещений"
    />
  </div>
  <p class="fw-bold mb-2">Стоимость абонимента</p>
  <div class="input-group mb-3">
    <input
      v-model="price"
      type="text"
      @input="convertP()"
      class="form-control border"
      :class="isError && !price ? 'border-danger' : ''"
      placeholder="Введите cтоимость абонимента"
    />
    <span class="input-group-text">СУМ</span>
  </div>
  <div v-for="(gr, idx) in group" :key="gr.id">
    <each-group
      :gr="gr"
      :index="idx"
      :isError="isError"
      @updateGroup="updateGroup"
      @delete-group="deleteGroup"
      @sendDates="reachDates"
    ></each-group>
  </div>
  <div class="input-group mb-3">
    <button @click="addGroup" class="btn btn-dashed py-2">
      Добавить еще группу
    </button>
  </div>
</template>

<script>
import EachGroup from "./EachGroup.vue";
export default {
  props: ["level", "index", "isError"],
  emits: ["addGroup", "delGroup", "delLev", "updateLevel"],
  components: {
    EachGroup,
  },
  data() {
    return {
      levelName: this.level?.name,
      duration: this.level?.duration,
      status: this.level?.status,
      number_of_lessons: this.level?.number_of_lessons,
      price: this.level?.price,
      group: this.level?.group,
    };
  },
  computed: {
    removedPrice() {
      if (this.price) {
        return this.price.replace(/\s/g, "");
      } else return "";
    },
  },
  methods: {
    reachDates(val) {
      this.group = this.group.map((gr) => {
        if (gr.id == val.id) {
          return {
            ...gr,
            level_date: val.value,
          };
        } else {
          return gr;
        }
      });
      this.$emit("updateLevel", {
        id: this.level.id,
        name: this.levelName,
        duration: this.duration,
        status: this.status,
        number_of_lessons: this.number_of_lessons,
        price: this.removedPrice,
        group: this.group,
      });
    },
    updateGroup(val) {
      this.group = this.group.map((gr) => {
        if (gr.id === val.id) {
          return val;
        } else {
          return gr;
        }
      });
      this.$emit("updateLevel", {
        id: this.level.id,
        name: this.levelName,
        duration: this.duration,
        status: this.status,
        number_of_lessons: this.number_of_lessons,
        price: this.removedPrice,
        group: this.group,
      });
    },
    addGroup() {
      this.$emit("addGroup", this.level.id);
    },
    deleteGroup(id) {
      this.group = this.group.filter((gr) => gr.id !== id);
      this.$emit("delGroup", { id: this.level.id, value: this.group });
    },
    getAge(val) {
      this.status = val.id;
      this.$emit("updateLevel", {
        id: this.level.id,
        name: this.levelName,
        duration: this.duration,
        status: this.status,
        number_of_lessons: this.number_of_lessons,
        price: this.removedPrice,
        group: this.group,
      });
    },
    delLevel(id) {
      this.$emit("delLev", id);
    },
    converV() {
      if (this.duration < 0) this.duration = Math.abs(this.duration);
    },
    convertS() {
      if (this.number_of_lessons < 0)
        this.number_of_lessons = Math.abs(this.number_of_lessons);
    },
    convertP() {
      if (isNaN(this.price[0])) this.price = "";

      this.price = this.price.replaceAll(" ", "");
      let x = Number(this.price);
      this.price = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      if (this.price < 0) this.price = Math.abs(this.price);
    },
  },
  watch: {
    levelName(val) {
      this.$emit("updateLevel", {
        id: this.level.id,
        name: val,
        duration: this.duration,
        status: this.status,
        number_of_lessons: this.number_of_lessons,
        price: this.removedPrice,
        group: this.group,
      });
    },
    duration(val) {
      this.$emit("updateLevel", {
        id: this.level.id,
        name: this.levelName,
        duration: val,
        status: this.status,
        number_of_lessons: this.number_of_lessons,
        price: this.removedPrice,
        group: this.group,
      });
    },
    number_of_lessons(val) {
      this.$emit("updateLevel", {
        id: this.level.id,
        name: this.levelName,
        duration: this.duration,
        status: this.status,
        number_of_lessons: val,
        price: this.removedPrice,
        group: this.group,
      });
    },
    price() {
      this.$emit("updateLevel", {
        id: this.level.id,
        name: this.levelName,
        duration: this.duration,
        status: this.status,
        number_of_lessons: this.number_of_lessons,
        price: this.removedPrice,
        group: this.group,
      });
    },
  },
};
</script>

<style scoped>
hr {
  height: 1px;
  margin-top: 3rem;
  margin-bottom: 2.5rem;
  background: #9d9d9d;
}
.delete-level {
  color: #ff4b55;
  position: absolute;
  right: 0;
  top: 0;
  font-size: 14px;
  cursor: pointer;
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
.btn-dashed {
  width: 100%;
  color: #9d9d9d;
  border: 2px dashed #dee2e6;
}
</style>
