<template>
  <base-dialog :show="isSubmitted">
    <template #default>
      <div class="form-task text-center">
        <img src="../assets/correct.png" alt="" />
        <h4 style="color: #222">Спасибо за ваш вклад!</h4>
        <p>Вам остается только ждать, все остальное сделаем сами</p>
      </div>
      <div class="d-grid text-center mt-5">
        <router-link to="/">
          <button class="w-100 btn btn-primary py-2 px-5">Готово</button>
        </router-link>
      </div>
    </template>
  </base-dialog>
  <!--  -->
  <base-dialog :show="isLoading && !isSubmitted">
    <template #default>
      <div class="form-task text-center">
        <h2>Загрузка...</h2>
      </div>
    </template>
  </base-dialog>
  <base-dialog :show="isNotSubmitted">
    <template #default>
      <div class="form-task text-center">
        <img src="../assets/remove.png" alt="" />
        <h2 class="mt-2">Не отправлено</h2>
        <p v-if="error">Номер телефона уже существует</p>
      </div>
      <div class="d-grid text-center mt-5">
        <button
          @click="isNotSubmitted = false"
          class="w-100 btn btn-primary py-2 px-5"
        >
          Заново
        </button>
      </div>
    </template>
  </base-dialog>
  <!--  -->
  <section @click="toggleError">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-3 d-none d-md-block">
          <img src="../assets/left-bar.png" alt="" />
        </div>
        <div class="col-md-9 px-3 px-md-5 pt-4">
          <div class="header-form">
            <router-link to="/">
              <img src="../assets/logo.svg" alt="" />
            </router-link>
          </div>
          <div class="content-header my-5">
            <h2>Помогите нам подобрать для вас идеальные занятия</h2>
            <p>Вам нужно лишь заполнить информацию, поиском займемся мы сами</p>
          </div>
          <div v-if="userQuestions.length" class="content-form">
            <form @submit.prevent>
              <label class="my-2">Дата вашего рождения</label>
              <input
                v-model="birthDate"
                type="date"
                class="form-control border mb-2"
                :class="[
                  isEmpty && !birthDate ? 'border-danger' : '',
                  !birthDate.length ? 'empty' : '',
                ]"
              />
              <p class="fw-bold mb-2">Ваш город</p>
              <div class="input-group mb-3">
                <base-drop-down
                  :options="userQuestions[1].variants"
                  @input="getCity"
                  :isError="isEmpty"
                  default="Не выбрано"
                ></base-drop-down>
              </div>
              <p class="fw-bold mb-2">Чему вы хотите обучиться?</p>
              <div class="input-group mb-3">
                <base-drop-down
                  :options="userQuestions[0].variants"
                  :multiselect="true"
                  @multi="getTypeSport"
                  :isError="isEmpty"
                  default="Не выбрано"
                ></base-drop-down>
              </div>
              <p class="fw-bold mb-2">
                Как часто вы посещаете образовательные учреждения?
              </p>
              <div class="input-group mb-3">
                <base-drop-down
                  :options="userQuestions[2].variants"
                  @input="getFrequencyTrain"
                  :isError="isEmpty"
                  default="Не выбрано"
                ></base-drop-down>
              </div>
              <p class="fw-bold mb-2">
                Покупаете ли вы абонемент в учебный центр или другие
                образовательные учреждения?
              </p>
              <div class="input-group mb-3">
                <base-drop-down
                  :options="userQuestions[3].variants"
                  @input="getBuySubscription"
                  :isError="isEmpty"
                  default="Не выбрано"
                ></base-drop-down>
              </div>
              <p class="fw-bold mb-2">
                Сколько вы тратите на обучение в месяц?
              </p>
              <div class="input-group mb-3">
                <input
                  v-model="howSpend"
                  type="text"
                  @input="convertSpend()"
                  min="0"
                  class="form-control border"
                  :class="isEmpty && !howSpend ? 'border-danger' : ''"
                  placeholder="Введите сумму"
                />
                <span class="input-group-text">СУМ</span>
              </div>
              <p class="fw-bold mb-2">
                Какую сумму вы готовы тратить в месяц на учебные заведения?
              </p>
              <div class="input-group mb-3">
                <input
                  v-model="howWouldSpend"
                  type="text"
                  @input="convertWouldSpend()"
                  min="0"
                  class="form-control border"
                  :class="isEmpty && !howWouldSpend ? 'border-danger' : ''"
                  placeholder="Введите сумму"
                />
                <span class="input-group-text">СУМ</span>
              </div>
              <p class="fw-bold mb-2">
                Если бы был тариф на сумму указанную выше, вы бы посещали эти
                секции?
              </p>
              <div class="input-group mb-3">
                <base-drop-down
                  :options="userQuestions[4].variants"
                  @input="getExpensiveSubs"
                  :isError="isEmpty"
                  default="Не выбрано"
                ></base-drop-down>
              </div>
              <p class="fw-bold mb-2">
                Какие удобства для вас важны в учебных заведениях?
              </p>
              <div class="input-group mb-3">
                <base-drop-down
                  :options="userQuestions[5].variants"
                  :multiselect="true"
                  :isError="isEmpty"
                  @multi="getFacilities"
                  default="Не выбрано"
                ></base-drop-down>
              </div>
              <p class="fw-bold mb-2">
                Оставьте свой номер телефона и мы вас уведомим как только найдем
                подходящие для вас занятия
              </p>
              <div class="input-group mb-3">
                <span class="input-group-text"
                  ><img
                    src="../assets/uzb.svg"
                    class="mx-2"
                    alt="uzb"
                  />+998</span
                >
                <input
                  v-model="phoneNumber"
                  @input="formatPhoneNumber()"
                  type="tel"
                  class="form-control border"
                  :class="isEmpty && !phoneNumber ? 'border-danger' : ''"
                  placeholder="Номер телефона"
                />
              </div>
              <div class="input-group my-5">
                <button @click.stop="submitClient" class="btn btn-map p-2">
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import BaseDialog from "../components/BaseDialog.vue";
export default {
  components: {
    BaseDialog,
  },
  data() {
    return {
      error: false,
      isLoading: false,
      isNotSubmitted: false,
      isSubmitted: false,
      isEmpty: false,
      birthDate: "",
      city: null,
      typeSport: null,
      frequencyTrain: null,
      buySubscription: null,
      howSpend: null,
      howWouldSpend: null,
      expensiveSubs: null,
      facilities: null,
      variant: [],
      phoneNumber: "",
    };
  },
  computed: {
    removedSpend() {
      return this.howSpend.replace(/\s/g, "");
    },
    removedWouldSpend() {
      return this.howWouldSpend.replace(/\s/g, "");
    },
    resolvedNumber() {
      return "+998" + this.phoneNumber.replace(/[() \s-]+/g, "");
    },
    allQuestions() {
      return this.$store.getters.questions;
    },
    userQuestions() {
      return this.allQuestions.filter((question) => question.status === "user");
    },
  },
  methods: {
    convertSpend() {
      if (isNaN(this.howSpend[0])) this.howSpend = "";
      this.howSpend = this.howSpend.replaceAll(" ", "");
      let x = Number(this.howSpend);
      this.howSpend = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      if (this.howSpend < 0) this.howSpend = Math.abs(this.howSpend);
    },
    convertWouldSpend() {
      if (isNaN(this.howWouldSpend[0])) this.howWouldSpend = "";
      this.howWouldSpend = this.howWouldSpend.replaceAll(" ", "");
      let x = Number(this.howWouldSpend);
      this.howWouldSpend = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      if (this.howWouldSpend < 0)
        this.howWouldSpend = Math.abs(this.howWouldSpend);
    },
    toggleError() {
      if (this.isEmpty) this.isEmpty = false;
    },
    async submitClient() {
      try {
        if (
          !this.birthDate ||
          !this.howSpend ||
          !this.howWouldSpend ||
          !this.city ||
          !this.frequencyTrain ||
          !this.buySubscription ||
          !this.expensiveSubs ||
          !this.typeSport.length ||
          !this.facilities.length
        ) {
          this.isEmpty = true;
          return;
        }
        this.isLoading = true;
        await axios.post("https://e-hub/api/v1/user/post/", {
          birth_date: this.birthDate,
          spend: this.removedSpend,
          amount: this.removedWouldSpend,
          variant: [
            this.city,
            this.frequencyTrain,
            this.buySubscription,
            this.expensiveSubs,
            ...this.typeSport,
            ...this.facilities,
          ],
          phone_number: this.resolvedNumber,
        });
        this.isLoading = false;
        this.isSubmitted = true;
      } catch (e) {
        if (e.response.status === 400) {
          this.error = true;
        }
        this.isLoading = false;
        this.isNotSubmitted = true;
      }
    },
    getCity(val) {
      this.city = val.id;
    },
    getTypeSport(val) {
      let a = val.map((v) => v.id);
      this.typeSport = a;
    },
    getFrequencyTrain(val) {
      this.frequencyTrain = val.id;
    },
    getBuySubscription(val) {
      this.buySubscription = val.id;
    },
    getExpensiveSubs(val) {
      this.expensiveSubs = val.id;
    },
    getFacilities(val) {
      let a = val.map((v) => v.id);
      this.facilities = a;
    },
    formatPhoneNumber() {
      let x = this.phoneNumber
        .replace(/\D/g, "")
        .match(/(\d{0,2})(\d{0,3})(\d{0,4})/);
      this.phoneNumber = !x[2]
        ? x[1]
        : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
      if (this.phoneNumber.length > 11) {
        this.phoneNumber =
          this.phoneNumber.substring(0, 11) +
          "-" +
          this.phoneNumber.substring(11);
      }
    },
  },
  async created() {
    if (!this.allQuestions.length) {
      await this.$store.dispatch("getQuestions");
    }
  },
};
</script>

<style scoped>
.form-task img {
  width: 150px;
  margin: 2rem 0;
}
.form-task p {
  color: #9d9d9d;
}
input,
select,
textarea {
  font-size: 15px;
  line-height: 24px;
}
input,
.input-group-text,
.custom_date,
.btn-more,
.btn-map,
textarea,
select {
  border-radius: 8px;
}
.row .col-md-3 {
  padding: 0;
}
.header-form {
  width: 80px;
}
img {
  width: 100%;
  height: 100%;
}
.content-form {
  width: 60%;
}
.content-header h2 {
  font-weight: bold;
  margin-bottom: 5px;
}
.content-header p,
.default-val {
  color: #9d9d9d;
}
.gender-wrapper {
  width: 45%;
}
label {
  font-weight: 600;
  color: #1b1b1d;
}
.input-group-text {
  background: transparent;
  font-weight: bold;
  font-size: 15px;
}
.btn-map {
  width: 100%;
  background: #016bd4;
  color: #fff;
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
}
.empty {
  color: #9d9d9d;
}
.empty.border-danger,
input.border-danger::placeholder {
  color: #dc3545;
}
::-webkit-calendar-picker-indicator {
  filter: invert(0.4);
}

@media screen and (max-width: 1200px) {
  .content-form {
    width: 100%;
  }
}
@media screen and (max-width: 576px) {
  .res-container {
    flex-direction: column;
  }
  .gender-wrapper {
    width: 100%;
  }
}
</style>
