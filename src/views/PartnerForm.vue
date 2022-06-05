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
          <button class="w-100 btn btn-primary py-2 px-5">Готова</button>
        </router-link>
      </div>
    </template>
  </base-dialog>
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
      </div>
      <div class="d-grid text-center mt-5">
        <button
          @click="isNotSubmitted = false"
          class="w-100 btn btn-primary py-2 px-5"
        >
          Занова
        </button>
      </div>
    </template>
  </base-dialog>
  <!--  -->
  <section>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-3 d-none d-md-block">
          <img src="../assets/left-bar.png" alt="" />
        </div>
        <div class="col-md-9 px-5 pt-4">
          <!-- {{ isLoad }} -->
          <div class="header-form">
            <router-link to="/">
              <img src="../assets/sporty-logo.svg" alt="" />
            </router-link>
          </div>
          <div class="content-form mt-5">
            <div class="content-header mb-5">
              <h2>Станьте нашим партнером</h2>
              <p>Вы только заполняете форму, мы привлекаем клиентов</p>
            </div>
            <form @submit.prevent>
              <h4 class="mb-2">Регистрация зала</h4>
              <div class="input-group mb-3">
                <input
                  v-model="legalName"
                  type="text"
                  class="form-control border"
                  :class="isEmpty && !legalName ? 'border-danger' : ''"
                  placeholder="Юридическое название"
                />
              </div>
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
              <div class="input-group justify-content-between hello mb-2">
                <div class="d-flex justify-content-between address-wrapper">
                  <p
                    class="py-2 fw-bold"
                    :class="isEmpty && !openingDate.length ? 'text-danger' : ''"
                  >
                    Часы работы зала
                  </p>
                  <div>
                    <template v-for="gym in gymHoursOpeningQty" :key="gym">
                      <gym-opening-hours
                        @minusDate="updateGymQty"
                        @updateHours="updatingHours"
                        :qty="gym"
                      ></gym-opening-hours>
                    </template>
                  </div>
                </div>
                <div class="same-btn-wrapper">
                  <button @click="addGymHours" class="btn btn-more p-2 px-4">
                    Добавить еще часы
                  </button>
                </div>
              </div>
              <div class="input-group justify-content-between mb-3">
                <div class="address-wrapper">
                  <input
                    :value="getLocation"
                    type="address"
                    class="form-control border"
                    :class="
                      isEmpty && !location.length ? 'bg-danger text-light' : ''
                    "
                    placeholder="Адрес"
                    disabled
                  />
                </div>

                <div class="same-btn-wrapper">
                  <button
                    @click="isLocationOpen = !isLocationOpen"
                    class="btn btn-map"
                  >
                    {{
                      !isLocationOpen ? " Указать на карте" : "Закрыть карту"
                    }}
                  </button>
                </div>
              </div>
              <div v-if="isLocationOpen" class="my-4">
                <map-uzb @sendCoords="getCoords"></map-uzb>
              </div>
              <div class="input-group mb-3">
                <textarea
                  v-model="gymDesc"
                  class="form-control border"
                  :class="isEmpty && !gymDesc ? 'border-danger' : ''"
                  rows="3"
                  placeholder="Описание зала"
                ></textarea>
              </div>
              <div v-if="allQuestions.length" class="mb-3">
                <p class="fw-bold mb-2">Удобства</p>
                <base-drop-down
                  :options="allQuestions[6].variants"
                  @multi="getFac"
                  :isError="isEmpty"
                  :multiselect="true"
                  default="Не выбрано"
                ></base-drop-down>
              </div>
              <hr class="mt-5 mb-5 custom_hr" />
              <template v-if="partnerQuestions.length">
                <template v-for="eaachClass in classesQty" :key="eaachClass">
                  <dynamic-classes
                    :each="eaachClass"
                    :sections="partnerQuestions[0].variants"
                    :isError="isEmpty"
                    @deleteClass="updateClass"
                    @changeImg="updateImg"
                    @changeVid="updateVid"
                    @updateValues="updateVal"
                  ></dynamic-classes>
                </template>
              </template>
              <!-- <div class="input-group mb-3">
                <button @click="addClass" class="btn btn-more p-4">
                  Добавить еще секцию
                </button>
              </div> -->
              <div class="d-flex align-items-center my-5">
                <input v-model="isConfirm" type="checkbox" id="confirm" />
                <label
                  for="confirm"
                  :class="isEmpty && !isConfirm ? 'text-danger' : ''"
                >
                  Я подтверждаю правильность заполненной информации</label
                >
              </div>
              <div class="input-group mb-5">
                <button
                  @click="submitPartner"
                  class="btn btn-map p-2"
                  :disabled="!isConfirm"
                >
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
import GymOpeningHours from "../components/partners/GymOpeningHours.vue";
import DynamicClasses from "../components/partners/DynamicClasses.vue";
import BaseDialog from "../components/BaseDialog.vue";
import MapUzb from "../components/MapUzb.vue";

// const API_KEY = "456787f4-294f-4b71-9233-05be8554dd23";

export default {
  components: {
    GymOpeningHours,
    DynamicClasses,
    BaseDialog,
    MapUzb,
  },
  data() {
    return {
      // settings: {
      //   apiKey: "456787f4-294f-4b71-9233-05be8554dd23",
      //   lang: "ru_RU",
      //   coordorder: "latlong",
      //   enterprise: false,
      //   version: "2.1",
      // },
      // watcher: null,
      // coords: { latitude: 0, longitude: 0 },
      // isSupported: "navigator" in window && "geolocation" in navigator,
      //
      isLocationOpen: false,
      isNotSubmitted: false,
      isLoading: false,
      isSubmitted: false,
      isEmpty: false,
      legalName: "",
      phoneNumber: "",
      gymDesc: "",
      location: "",
      openingDate: [],
      facilities: [],
      //
      className: "",
      teacherName: "",
      activities: "activities",
      classDesc: "",
      typeTraining: "",
      typeAge: "",
      visits: null,
      videoFile: null,
      hashtags: [],
      price: null,
      images: [],
      // classDates: [],
      isConfirm: false,
      gymHoursOpeningQty: [1],
      classesQty: [1],
    };
  },
  computed: {
    removedPrice() {
      if (this.price) {
        return this.price.replace(/\s/g, "");
      } else return "";
    },
    classDates() {
      return this.$store.getters.eachWeekDates;
    },
    filteredOpeningDate() {
      return this.openingDate.map((date) => {
        return {
          week: this.toNum(date.week),
          start_date: date.start_date,
          finish_date: date.finish_date,
        };
      });
    },
    resolvedNumber() {
      return "+998" + this.phoneNumber.replace(/[() \s-]+/g, "");
    },
    allQuestions() {
      return this.$store.getters.questions;
    },
    partnerQuestions() {
      return this.allQuestions.filter(
        (question) => question.status === "partner"
      );
    },
    // lat() {
    //   return this.coords.latitude;
    // },
    // lng() {
    //   return this.coords.longitude;
    // },
    getLocation() {
      return `Ваши координаты: ${
        this.location.length ? this.location[0].toFixed(2) : "еще нет"
      } - ${this.location.length ? this.location[1].toFixed(2) : "еще нет"}`;
    },
  },
  methods: {
    getCoords(val) {
      this.location = val;
    },
    toNum(arr) {
      return arr.map((item) => parseInt(item));
    },
    updatingHours(val) {
      this.openingDate = this.openingDate.filter(
        (date) => date.qty !== val.qty
      );

      this.openingDate.push(val);
      // console.log(this.filteredOpeningDate);
    },
    updateVal(val) {
      this.className = val.name;
      this.teacherName = val.teacher;
      this.classDesc = val.desc;
      this.typeTraining = val.trainTy;
      this.typeAge = val.ageTy;
      this.visits = val.visit;
      this.hashtags = val.fac;
      this.price = val.price;
    },
    updateVid(val) {
      this.videoFile = val;
    },
    updateImg(val) {
      this.images = val;
    },
    async submitPartner() {
      try {
        if (
          !this.legalName ||
          !this.phoneNumber ||
          !this.gymDesc ||
          !this.location.length ||
          !this.openingDate.length ||
          !this.facilities.length ||
          !this.className ||
          !this.teacherName ||
          !this.classDesc ||
          !this.typeTraining ||
          !this.typeAge ||
          !this.visits ||
          !this.hashtags.length ||
          !this.price ||
          !this.images.length
        ) {
          this.isEmpty = true;
          return;
        }

        let fileData = new FormData();

        // fileData.append("image", this.images);
        fileData.append(
          "class",
          JSON.stringify({
            gym: {
              legal_name: this.legalName,
              phone_number: this.resolvedNumber,
              description: this.gymDesc,
              location: this.location,
              facilities: this.facilities,
              opening_date: this.filteredOpeningDate,
            },
            class: [
              {
                name: this.className,
                teacher_name: this.teacherName,
                activities: "Activities",
                description: this.classDesc,
                type_training: this.typeTraining,
                type_age: this.typeAge,
                number_visitors: this.visits,
                price: this.removedPrice,
                // video: this.videoFile,
                hashtag: this.hashtags,
                // image: this.images,
                class_date: this.classDates,
              },
            ],
          })
        );

        for (let i = 0; i < this.images.length; i++) {
          let file = this.images[i];
          fileData.append("image", file);
        }

        fileData.append("video", this.videoFile);
        let config = {
          headers: {
            "Content-Type": "multipart/form-data",
            // "Content-Type": "image/png",
          },
        };
        this.isLoading = true;
        await axios.post(
          "https://sporty.uz/api/v1/class/post/",
          fileData,
          config
        );
        this.isLoading = false;

        this.isSubmitted = true;
      } catch (e) {
        this.isLoading = false;
        this.isNotSubmitted = true;
        console.log(e);
      }
    },
    getFac(val) {
      let a = val.map((v) => v.id);
      this.facilities = a;
      // console.log(this.facilities);
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
    updateGymQty(val) {
      if (this.gymHoursOpeningQty.length > 1) {
        this.gymHoursOpeningQty = this.gymHoursOpeningQty.filter(
          (hour) => hour !== val
        );
        this.openingDate = this.openingDate.filter((date) => date.qty !== val);
      }
    },
    addGymHours() {
      this.gymHoursOpeningQty.push(
        this.gymHoursOpeningQty[this.gymHoursOpeningQty.length - 1] + 1
      );
    },
    addClass() {
      this.classesQty.push(this.classesQty[this.classesQty.length - 1] + 1);
    },
    updateClass(val) {
      if (this.classesQty.length > 1)
        this.classesQty = this.classesQty.filter((hour) => hour !== val);
    },
  },
  async created() {
    await this.$store.dispatch("getQuestions");
  },
  watch: {
    isEmpty() {
      setTimeout(() => (this.isEmpty = false), 2500);
    },
  },
  // async mounted() {
  //   if (this.isSupported) {
  //     this.watcher = navigator.geolocation.watchPosition(
  //       (position) => (this.coords = position.coords)
  //     );
  //   }
  // },
  // unmounted() {
  //   if (this.watcher) navigator.geolocation.clearWatch(this.watcher);
  // },
};
</script>

<style scoped>
section {
  overflow-x: hidden;
}
.row .col-md-3 {
  padding: 0;
}
.header-form {
  width: 100px;
}
img {
  width: 100%;
  height: 100%;
}
.form-task img {
  width: 150px;
  margin: 2rem 0;
}
.content-form {
  width: 70%;
}
.content-header h2 {
  font-weight: bold;
  margin-bottom: 5px;
}

.content-header p,
.form-task p {
  color: #9d9d9d;
}
.input-group-text {
  background: transparent;
  font-weight: bold;
  font-size: 15px;
}
.input-group-text img {
  border-radius: 2px;
}
.custom_date {
  cursor: pointer;
}
input,
textarea,
select {
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
textarea {
  resize: none;
}
input::placeholder,
textarea::placeholder,
.photo-header {
  color: #9d9d9d;
}
.photo-header {
  font-weight: 600;
}
.btn-more {
  width: 100%;
  background: transparent;
  border: 2px dashed #dee2e6;
  font-size: 14px;
  color: #9d9d9d;
}

.address-wrapper {
  width: 65%;
}
.same-btn-wrapper {
  width: 33.5%;
}
.btn-map {
  width: 100%;
  background: #016bd4;
  color: #fff;
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
}
#confirm {
  width: 16px;
  height: 16px;
  margin-right: 15px;
  cursor: pointer;
}
label {
  font-size: 15px;
  color: #1b1b1d;
  transition: all 0.2s ease;
}
#confirm:checked + label {
  color: #016bd4;
}
/*  */
.dropbox {
  border: 2px dashed #dee2e6;
  border-radius: 10px;
  width: 90px;
  height: 90px;
  margin-top: 10px;
  padding: 10px 10px;
  position: relative;
  cursor: pointer;
}
.input-file {
  opacity: 0; /* invisible but it's there! */
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0%;
  top: 0%;
  cursor: pointer;
  z-index: 1;
}
.icon {
  font-weight: 600;
  font-size: 36px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #d9d9d9;
  pointer-events: none;
}
input.border-danger::placeholder,
textarea.border-danger::placeholder {
  color: #dc3545;
}
.btn-more:active {
  background: #d9d9d9;
}
@media screen and (max-width: 1200px) {
  .content-form {
    width: 100%;
  }
}
@media screen and (max-width: 996px) {
  .hello {
    flex-direction: column;
    gap: 1rem;
  }
  .address-wrapper {
    width: 100%;
  }
}

@media screen and (max-width: 996px) {
  .same-btn-wrapper button:last-child {
    margin-top: 10px;
  }
}
</style>
