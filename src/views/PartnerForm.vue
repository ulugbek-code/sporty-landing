<template>
  <section>
    <!-- {{ lat }}-{{ lng }}
    <div ref="mapDiv" style="width: 100%; height: 80vh" /> -->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-3 d-none d-md-block">
          <img src="../assets/left-bar.png" alt="" />
        </div>
        <div class="col-md-9 px-5 pt-4">
          <div class="header-form">
            <img src="../assets/sporty-logo.svg" alt="" />
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
                  type="text"
                  class="form-control"
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
                  class="form-control"
                  placeholder="Номер телефона"
                />
              </div>
              <div class="input-group justify-content-between">
                <div class="d-flex justify-content-between address-wrapper">
                  <p class="py-2 fw-bold">Часы работы зала</p>
                  <div>
                    <template v-for="gym in gymHoursOpeningQty" :key="gym">
                      <gym-opening-hours
                        @minusDate="updateGymQty"
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
                    type="address"
                    class="form-control"
                    placeholder="Адрес"
                  />
                </div>

                <div class="same-btn-wrapper">
                  <button class="btn btn-map">Указать на карте</button>
                </div>
              </div>
              <div class="input-group mb-3">
                <textarea
                  class="form-control"
                  rows="3"
                  placeholder="Описание зала"
                ></textarea>
              </div>
              <div class="mb-3">
                <p class="fw-bold mb-2">Удобства</p>
                <base-drop-down
                  :options="amenities"
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
                    @deleteClass="updateClass"
                  ></dynamic-classes>
                </template>
              </template>
              <div class="input-group mb-3">
                <button @click="addClass" class="btn btn-more p-4">
                  Добавить еще секцию
                </button>
              </div>
              <div class="d-flex align-items-center my-5">
                <input type="checkbox" id="confirm" />
                <label for="confirm"
                  >Я подтверждаю правильность заполненной информации</label
                >
              </div>
              <div class="input-group mb-5">
                <button class="btn btn-map p-2">Сохранить</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import GymOpeningHours from "../components/partners/GymOpeningHours.vue";
import DynamicClasses from "../components/partners/DynamicClasses.vue";
// const API_KEY = "AIzaSyA5OFgEXYMwjaxzKJxfyyleOcmnpEKXtmo";
export default {
  components: {
    GymOpeningHours,
    DynamicClasses,
  },
  data() {
    return {
      // loader: new Loader({ apiKey: API_KEY }),
      // otherPos: null,
      // map: null,
      // watcher: null,
      // coords: { latitude: 0, longitude: 0 },
      // isSupported: "navigator" in window && "geolocation" in navigator,
      phoneNumber: "",
      gymHoursOpeningQty: [1],
      classesQty: [1],
      fileName: "",
    };
  },
  computed: {
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
  },
  methods: {
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
      if (this.gymHoursOpeningQty.length > 1)
        this.gymHoursOpeningQty = this.gymHoursOpeningQty.filter(
          (hour) => hour !== val
        );
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

    handleFileUpload() {
      this.fileName = this.$refs.file.files[0].name;
    },
  },
  async created() {
    await this.$store.dispatch("getQuestions");
  },
  mounted() {
    // if (this.isSupported) {
    //   this.watcher = navigator.geolocation.watchPosition(
    //     (position) => (this.coords = position.coords)
    //   );
    // }
    // await this.loader.load();
    // this.map = new google.maps.Map(this.$refs.mapDiv, {
    //   center: { lat: parseInt(this.lat), lng: parseInt(this.lng) },
    //   zoom: 9,
    // });
  },
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
.content-form {
  width: 70%;
}
.content-header h2 {
  font-weight: bold;
  margin-bottom: 5px;
}

.content-header p {
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
.btn-more:active {
  background: #d9d9d9;
}
@media screen and (max-width: 1200px) {
  .content-form {
    width: 100%;
  }
}
</style>
