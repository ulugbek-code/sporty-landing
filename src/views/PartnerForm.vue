<template>
  <section>
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
                  type="tel"
                  class="form-control"
                  placeholder="Номер телефона"
                />
              </div>
              <div class="input-group justify-content-between">
                <div class="d-flex justify-content-between address-wrapper">
                  <p class="py-2 fw-bold">Часы работы зала</p>
                  <div>
                    <div
                      class="d-flex align-items-center fw-bold border p-2 custom_date mb-2"
                    >
                      <p class="border-end my-0 px-2">Пн - СБ</p>
                      <p class="my-0 mx-2">09:00 - 23:00</p>
                      <span class="triangle mx-2"></span>
                    </div>
                  </div>
                </div>

                <div class="same-btn-wrapper">
                  <button class="btn btn-more p-2 px-4">
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
                <select class="form-select">
                  <option value="" disabled selected hidden>Не выбрано</option>
                  <option
                    value="amenity"
                    v-for="amenity in amenities"
                    :key="amenity"
                  >
                    {{ amenity }}
                  </option>
                </select>
              </div>
              <hr class="mt-5 mb-5 custom_hr" />
              <h4 class="mt-4 mb-3">Регистрация секции</h4>
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Название секции (например: йога, плавание, бодибилдинг)"
                />
              </div>
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Имя Фамилия тренера"
                />
              </div>
              <p class="mb-2 photo-header">Фотографии секции</p>
              <div class="d-flex justify-content-between mb-3">
                <div class="dropbox">
                  <input
                    class="input-file"
                    type="file"
                    ref="file"
                    @change="handleFileUpload"
                  />
                  <span class="icon">+</span>
                </div>
                <div class="dropbox">
                  <input
                    class="input-file"
                    type="file"
                    ref="file"
                    @change="handleFileUpload"
                  />
                  <span class="icon">+</span>
                </div>
                <div class="dropbox">
                  <input
                    class="input-file"
                    type="file"
                    ref="file"
                    @change="handleFileUpload"
                  />
                  <span class="icon">+</span>
                </div>
                <div class="dropbox">
                  <input
                    class="input-file"
                    type="file"
                    ref="file"
                    @change="handleFileUpload"
                  />
                  <span class="icon">+</span>
                </div>
                <div class="dropbox">
                  <input
                    class="input-file"
                    type="file"
                    ref="file"
                    @change="handleFileUpload"
                  />
                  <span class="icon">+</span>
                </div>
                <div class="dropbox">
                  <input
                    class="input-file"
                    type="file"
                    ref="file"
                    @change="handleFileUpload"
                  />
                  <span class="icon">+</span>
                </div>
              </div>
              <div class="input-group mb-3">
                <button class="btn btn-map" style="width: 40%">
                  Добавить видео
                </button>
              </div>
              <div class="input-group mb-3">
                <textarea
                  class="form-control"
                  rows="3"
                  placeholder="Описание секции"
                ></textarea>
              </div>
              <div class="input-group mb-3">
                <button class="btn btn-map" style="width: 40%">
                  Добавить расписание
                </button>
              </div>
              <div class="input-group mb-3">
                <button class="btn btn-more p-4">Добавить еще часы</button>
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
export default {
  data() {
    return {
      fileName: "",
      amenities: [
        "Парковка",
        "Бесплатный Wi-Fi",
        "Душ",
        "Сауна",
        "Фито-бар",
        "Питьевая вода",
        "Можно с ребенком",
        "Рядом с метро",
        "Бесплатные полотенца",
      ],
    };
  },
  methods: {
    handleFileUpload() {
      // console.log(this.$refs.file.files[0].name);
      this.fileName = this.$refs.file.files[0].name;
    },
  },
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
  width: 65%;
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
.triangle {
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #016bd4;
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
}
label {
  font-size: 15px;
  color: #1b1b1d;
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
@media screen and (max-width: 1200px) {
  .content-form {
    width: 100%;
  }
}
</style>
