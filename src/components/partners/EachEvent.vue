<template>
  <div>
    <div class="title d-flex justify-content-between mb-3">
      <h4 class="mb-0">Регистрация ивента</h4>
      <span @click="removeEvent(event.id)" class="remove-title"
        >Удалить ивент</span
      >
    </div>
    <p class="fw-bold mb-2">Название ивента</p>
    <div class="input-group mb-3">
      <input
        v-model.lazy="name"
        class="form-control border"
        :class="isError && !name ? 'border-danger' : ''"
        placeholder="Введите название ивента"
      />
    </div>
    <p class="fw-bold mb-2">Дата проведения ивента</p>
    <div class="input-group mb-3">
      <input
        v-model.lazy="date"
        type="date"
        class="form-control border"
        :class="[
          isError && !date ? 'border-danger' : '',
          !date.length ? 'empty' : '',
        ]"
      />
    </div>
    <p class="fw-bold mb-2">Частота проведения ивента</p>
    <div class="input-group mb-3">
      <!-- <select v-model="quantity" class="form-select">
        <option value="Correct">To'g'ri</option>
        <option value="Mistake">Noto'g'ri</option>
      </select> -->
      <base-drop-down
        :options="[
          { name: 'Через день' },
          { name: '1-2 раза в неделю' },
          { name: '1-3 раза в месяц' },
          { name: 'Раз в 2 месяца' },
          { name: 'Другая частота проведения' },
        ]"
        @input="getQuantity"
        :isError="isError"
        default="Не выбрано"
      ></base-drop-down>
    </div>
    <p class="fw-bold mb-2">Описание ивента</p>
    <div class="input-group mb-3">
      <textarea
        v-model.lazy="description"
        class="form-control border"
        :class="isError && !description ? 'border-danger' : ''"
        rows="3"
        placeholder="Введите описание ивента"
      ></textarea>
    </div>
  </div>
</template>

<script>
export default {
  props: ["event", "isError"],
  emits: ["removeEvent", "updateEvent"],
  data() {
    return {
      name: this.event.name,
      date: this.event.date,
      description: this.event.description,
      status: this.event.status,
    };
  },
  methods: {
    removeEvent(id) {
      this.$emit("removeEvent", id);
    },
    getQuantity(val) {
      this.status = val.name;
      this.$emit("updateEvent", {
        id: this.event.id,
        name: this.name,
        date: this.date,
        description: this.description,
        status: this.status,
      });
    },
  },
  watch: {
    name(val) {
      this.$emit("updateEvent", {
        id: this.event.id,
        name: val,
        date: this.date,
        description: this.description,
        status: this.status,
      });
    },
    description(val) {
      this.$emit("updateEvent", {
        id: this.event.id,
        name: this.name,
        date: this.date,
        description: val,
        status: this.status,
      });
    },
    date(val) {
      this.$emit("updateEvent", {
        id: this.event.id,
        name: this.name,
        date: val,
        description: this.description,
        status: this.status,
      });
    },
  },
};
</script>

<style scoped>
.remove-title {
  color: #ff4b55;
  cursor: pointer;
  font-size: 14px;
}
input,
textarea {
  font-size: 15px;
  line-height: 24px;
}
input,
textarea {
  border-radius: 8px;
}
textarea {
  resize: none;
}
input::placeholder,
textarea::placeholder,
.empty {
  color: #9d9d9d;
}

input.border-danger::placeholder,
textarea.border-danger::placeholder {
  color: #dc3545;
}
::-webkit-calendar-picker-indicator {
  filter: invert(0.4);
}
</style>
