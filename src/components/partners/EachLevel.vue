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
      v-model.lazy="duration"
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
      v-model.lazy="number_students"
      type="number"
      class="form-control border"
      :class="isError && !number_students ? 'border-danger' : ''"
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
</template>

<script>
export default {
  props: ["level", "index", "isError"],
  emits: ["delLev", "updateLevel"],
  data() {
    return {
      levelName: this.level?.name,
      duration: this.level?.duration,
      status: this.level?.status,
      number_students: this.level?.number_students,
      price: this.level?.price,
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
    getAge(val) {
      this.status = val.id;
      this.$emit("updateLevel", {
        id: this.level.id,
        name: this.levelName,
        duration: this.duration,
        status: this.status,
        number_students: this.number_students,
        price: this.removedPrice,
      });
    },
    delLevel(id) {
      this.$emit("delLev", id);
    },
    converV() {
      if (this.duration < 0) this.duration = Math.abs(this.duration);
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
        number_students: this.number_students,
        price: this.removedPrice,
      });
    },
    duration(val) {
      this.$emit("updateLevel", {
        id: this.level.id,
        name: this.levelName,
        duration: val,
        status: this.status,
        number_students: this.number_students,
        price: this.removedPrice,
      });
    },
    number_students(val) {
      this.$emit("updateLevel", {
        id: this.level.id,
        name: this.levelName,
        duration: this.duration,
        status: this.status,
        number_students: val,
        price: this.removedPrice,
      });
    },
    price() {
      this.$emit("updateLevel", {
        id: this.level.id,
        name: this.levelName,
        duration: this.duration,
        status: this.status,
        number_students: this.number_students,
        price: this.removedPrice,
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
</style>
