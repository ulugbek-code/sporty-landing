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
  <base-dialog :show="isLoading && !isSubmitted">
    <template #default>
      <div class="form-task text-center">
        <h2>
          Загрузка
          <span class="mt-1"><img src="../assets/loader.gif" alt="" /></span>
        </h2>
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
          Заново
        </button>
      </div>
    </template>
  </base-dialog>
  <!--  -->
  <section @click="triggerError">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-3 d-none d-md-block">
          <img src="../assets/left-bar.png" alt="" />
        </div>
        <div class="col-md-9 px-3 px-md-5 pt-4">
          <!-- {{ isLoad }} -->
          <div class="header-form">
            <router-link to="/">
              <img src="../assets/logo.svg" alt="" />
            </router-link>
          </div>
          <div class="content-form mt-5">
            <div class="content-header mb-5">
              <h2>Станьте нашим партнером</h2>
              <p>Вы только заполняете форму, мы привлекаем клиентов</p>
            </div>
            <form @submit.prevent>
              <h4 class="mb-4">Регистрация заведения</h4>
              <p class="fw-bold mb-2">Юридическое название</p>
              <div class="input-group mb-3">
                <input
                  v-model="legalName"
                  type="text"
                  class="form-control border"
                  :class="isEmpty && !legalName ? 'border-danger' : ''"
                  placeholder="Юридическое название"
                />
              </div>
              <p class="fw-bold mb-2">Контактный номер телефона</p>
              <div class="tel-container input-group mb-3">
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
              <p class="fw-bold mb-2">Контактное имя и фамилия</p>
              <div class="input-group mb-3">
                <input
                  v-model="userName"
                  type="text"
                  class="form-control border"
                  :class="isEmpty && !userName ? 'border-danger' : ''"
                  placeholder="Имя Фамилия"
                />
              </div>
              <div class="input-group justify-content-between hello mb-2">
                <div class="d-flex justify-content-between address-wrapper">
                  <p
                    class="py-2 fw-bold"
                    :class="isEmpty && !openingDate.length ? 'text-danger' : ''"
                  >
                    Часы работы
                  </p>
                  <div class="gym-width">
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
              <p class="fw-bold mb-2">Адрес</p>
              <div class="input-group justify-content-between mb-3">
                <div class="address-wrapper">
                  <input
                    :value="getLocation"
                    type="address"
                    class="form-control border px-2"
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
              <p class="fw-bold mb-2">О заведении</p>
              <div class="input-group mb-3">
                <textarea
                  v-model="gymDesc"
                  class="form-control border"
                  :class="isEmpty && !gymDesc ? 'border-danger' : ''"
                  rows="3"
                  placeholder="Описание заведения"
                ></textarea>
              </div>
              <div v-if="partnerQuestions.length" class="mb-3">
                <p class="fw-bold mb-2">Удобства</p>
                <base-drop-down
                  :options="partnerQuestions[1].variants"
                  @multi="getFac"
                  :isError="isEmpty"
                  :multiselect="true"
                  default="Не выбрано"
                ></base-drop-down>
              </div>
              <p class="fw-bold mb-2">Логотип заведения</p>
              <div class="vid-btn-wrapper mb-3">
                <template v-if="preview">
                  <div class="preview-img">
                    <img :src="preview" alt="" />
                  </div>
                  <div class="img-info">
                    <h6>{{ imageData.name }}</h6>
                    <p>{{ (imageData.size / 1024).toFixed(2) }} KB</p>
                  </div>
                </template>
                <button :class="!imageData && isEmpty ? 'bg-danger' : ''">
                  {{
                    !imageData && isEmpty
                      ? "Пожалуйста, выберите файл!"
                      : "Выбрать файл"
                  }}
                </button>
                <input
                  type="file"
                  accept="image/*"
                  @change="handleImage($event)"
                />
              </div>
              <p
                class="fw-bold mb-2"
                :class="isEmpty && !partnerImages.length ? 'text-danger' : ''"
              >
                {{
                  isEmpty && !partnerImages.length
                    ? "Пожалуйста, выберите фотографии учебного центра!"
                    : "Фотографии учебного центра"
                }}
              </p>
              <div class="d-flex gap-3 mb-3">
                <image-upload
                  :qty="0"
                  @input="addImage"
                  @r-input="removeImg"
                ></image-upload>
                <image-upload
                  :qty="1"
                  :class="!partnerImages[0] ? 'activate' : ''"
                  @input="addImage"
                  @r-input="removeImg"
                ></image-upload>
                <image-upload
                  :qty="2"
                  :class="!partnerImages[1] ? 'activate' : ''"
                  @input="addImage"
                  @r-input="removeImg"
                ></image-upload>
                <image-upload
                  :qty="3"
                  :class="!partnerImages[2] ? 'activate' : ''"
                  @input="addImage"
                  @r-input="removeImg"
                ></image-upload>
              </div>
              <template v-if="partnerQuestions.length">
                <div v-for="eachClass in classes" :key="eachClass.id">
                  <dynamic-classes
                    :each="eachClass.id"
                    :sections="partnerQuestions[0].variants"
                    :isError="isEmpty"
                    @deleteClass="removeClass"
                    @changeImg="updateImg"
                    @changeVid="updateVid"
                    @updateValues="updateVal"
                    @updateEvent="updateEvents"
                    @updatedLvl="updateLevel"
                  ></dynamic-classes>
                </div>
              </template>
              <div class="input-group mb-3">
                <button @click="addClass" class="btn btn-more p-4">
                  Добавить еще курс
                </button>
              </div>
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
                  @click.stop="submitPartner"
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
import ImageUpload from "../components/partners/ImageUpload.vue";

export default {
  components: {
    GymOpeningHours,
    DynamicClasses,
    BaseDialog,
    MapUzb,
    ImageUpload,
  },
  data() {
    return {
      isLocationOpen: false,
      isNotSubmitted: false,
      isLoading: false,
      isSubmitted: false,
      isEmpty: false,
      //
      legalName: "",
      userName: "",
      phoneNumber: "",
      gymDesc: "",
      location: "",
      preview: "",
      imageData: "",
      openingDate: [],
      facilities: [],
      partnerImages: [],
      //
      isConfirm: false,
      gymHoursOpeningQty: [1],
      classesQty: [1],
      classes: [
        {
          id: "123",
          name: "",
          description: "",
          videoFile: null,
          category: "",
          images: [],
          events: [],
          level: [],
        },
      ],
    };
  },
  computed: {
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
    getLocation() {
      return `Ваши координаты: ${
        this.location.length ? this.location[0].toFixed(2) : "еще нет"
      } - ${this.location.length ? this.location[1].toFixed(2) : "еще нет"}`;
    },
  },
  methods: {
    addImage(val) {
      if (!val.value?.name) return;
      if (this.partnerImages[val.idx]) {
        this.partnerImages[val.idx] = val.value;
      } else {
        this.partnerImages.push(val.value);
      }
    },
    removeImg(val) {
      this.partnerImages = this.partnerImages.filter((img) => img !== val);
    },
    triggerError() {
      this.$store.dispatch("changeClassDate");
      if (this.isEmpty) this.isEmpty = false;
    },
    handleImage(e) {
      const files = e.target.files[0];
      if (files) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        };
        reader.readAsDataURL(files);
        this.imageData = e.target.files[0];
      }
    },
    updateLevel(val) {
      this.classes = this.classes.map((clas) => {
        if (clas.id === val.id) {
          return {
            ...clas,
            level: val.level,
          };
        } else {
          return clas;
        }
      });
    },
    updateEvents(val) {
      this.classes = this.classes.map((clas) => {
        if (clas.id === val.id) {
          return {
            ...clas,
            events: val.event,
          };
        } else {
          return clas;
        }
      });
    },
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
    },
    updateVal(val) {
      this.classes = this.classes.map((clas) => {
        if (clas.id === val.id) {
          return {
            ...clas,
            id: val.id,
            name: val.name,
            description: val.desc,
            category: val.fac,
          };
        } else {
          return clas;
        }
      });
    },
    updateVid(val) {
      this.classes = this.classes.map((clas) => {
        if (clas.id === val.id) {
          return {
            ...clas,
            videoFile: val.video,
          };
        } else {
          return clas;
        }
      });
    },
    updateImg(val) {
      this.classes = this.classes.map((clas) => {
        if (clas.id === val.id) {
          return {
            ...clas,
            images: val.images,
          };
        } else {
          return clas;
        }
      });
    },
    async submitPartner() {
      try {
        if (
          !this.legalName ||
          !this.phoneNumber ||
          !this.userName ||
          !this.gymDesc ||
          !this.location.length ||
          !this.imageData ||
          !this.openingDate.length ||
          !this.facilities.length ||
          !this.partnerImages.length
        ) {
          this.isEmpty = true;
          return;
        }

        let anyEmpty = false;
        for (let i = 0; i < this.classes.length; i++) {
          if (
            !this.classes[i].name ||
            !this.classes[i].description ||
            !this.classes[i].category ||
            !this.classes[i].images.length ||
            !this.classes[i].level.length
          ) {
            anyEmpty = true;
            break;
          } else if (this.classes[i].level.length) {
            for (let j = 0; j < this.classes[i].level.length; j++) {
              if (
                !this.classes[i].level[j].name ||
                !this.classes[i].level[j].duration ||
                !this.classes[i].level[j].status ||
                !this.classes[i].level[j].number_of_lessons ||
                !this.classes[i].level[j].price
              ) {
                anyEmpty = true;
                break;
              } else if (this.classes[i].level[j].group.length) {
                for (
                  let k = 0;
                  k < this.classes[i].level[j].group.length;
                  k++
                ) {
                  if (
                    !this.classes[i].level[j].group[k].name ||
                    !this.classes[i].level[j].group[k]
                      .current_students_number ||
                    !this.classes[i].level[j].group[k].limit.length == 0 ||
                    !this.classes[i].level[j].group[k].duration ||
                    !this.classes[i].level[j].group[k].status ||
                    !this.classes[i].level[j].group[k].type ||
                    !this.classes[i].level[j].group[k].level_date.length
                  ) {
                    anyEmpty = true;
                    break;
                  }
                }
              }
            }
          }
        }
        if (anyEmpty) {
          this.isEmpty = true;
          return;
        }

        let fileData = new FormData();
        fileData.append(
          "class",
          JSON.stringify({
            module: {
              legal_name: this.legalName,
              phone_number: this.resolvedNumber,
              contact_name: this.userName,
              description: this.gymDesc,
              location: this.location,
              facilities: this.facilities,
              opening_date: this.filteredOpeningDate,
            },
            class: this.classes,
          })
        );
        fileData.append("logo", this.imageData);

        for (let i = 0; i < this.partnerImages.length; i++) {
          fileData.append("partner-image", this.partnerImages[i]);
        }

        for (let i = 0; i < this.classes.length; i++) {
          for (let j = 0; j < this.classes[i].images.length; j++) {
            let file = this.classes[i].images[j];
            fileData.append(`image-${i}`, file);
          }
        }

        for (let i = 0; i < this.classes.length; i++) {
          fileData.append(`video-${i}`, this.classes[i].videoFile);
        }

        let config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        this.isLoading = true;

        // await axios.post(
        //   window.getEnvParam("API_BASE_URL") + "class/post/",
        //   fileData,
        //   config
        // );

        await axios.post("https://e-hub/api/v1/class/post/", fileData, config);
        this.isLoading = false;
        this.isSubmitted = true;
      } catch (e) {
        console.log(e.message);
        this.isLoading = false;
        this.isNotSubmitted = true;
      }
    },
    getFac(val) {
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
      this.classes.push({
        id: "" + Date.now(),
        name: "",
        description: "",
        videoFile: null,
        category: "",
        images: [],
        events: [],
        level: [],
      });
    },
    removeClass(id) {
      this.classes = this.classes.filter((clas) => clas.id !== id);
    },
  },
  async created() {
    if (!this.allQuestions.length) {
      await this.$store.dispatch("getQuestions");
    }
  },
  beforeRouteEnter(to, from) {
    alert(to.fullPath);
    alert(from.fullPath);
  },
  // watch: {
  //   isEmpty() {
  //     setTimeout(() => (this.isEmpty = false), 2500);
  //   },
  // },
};
</script>

<style scoped>
.gym-width {
  width: 70%;
}
.preview-img {
  width: 120px;
  height: 120px;
  margin-bottom: 1rem;
  background: rgba(65, 105, 225, 0.1);
  padding: 4px;
  border-radius: 10px;
}
.img-info {
  position: absolute;
  top: 40%;
  left: 70%;
  transform: translate(10%, -40%);
}
.img-info h6 {
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 0;
}
.img-info p {
  font-size: 12px;
}
.preview img {
  position: relative;
  width: 100%;
}
h2 {
  margin-bottom: 0;
}
section {
  overflow-x: hidden;
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
.form-task img {
  width: 150px;
  margin: 2rem 0;
}
.form-task span img {
  width: 24px;
  padding-top: 12px;
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

input.border-danger::placeholder,
textarea.border-danger::placeholder {
  color: #dc3545;
}
.btn-more:active {
  background: #d9d9d9;
}
.vid-btn-wrapper {
  position: relative;
  display: inline-block;
  cursor: pointer;
}
.vid-btn-wrapper button {
  width: 100%;
  border: none;
  border-radius: 8px !important;
  padding: 6px 3rem;
  background: #016bd4;
  color: #fff;
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
  cursor: pointer;
}
.vid-btn-wrapper input[type="file"] {
  font-size: 0px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0;
  cursor: pointer;
}
.activate {
  pointer-events: none;
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
@media screen and (max-width: 576px) {
  .gym-width {
    width: 100%;
  }
  .address-wrapper {
    flex-direction: column;
  }
  .same-btn-wrapper {
    width: 100%;
  }
  input[type="checkbox"] {
    -ms-transform: scale(2); /* IE */
    -moz-transform: scale(2); /* FF */
    -webkit-transform: scale(2); /* Safari and Chrome */
    -o-transform: scale(2); /* Opera */
    transform: scale(2);
    margin-left: 8px;
  }
}
</style>
