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
          <div class="content-header my-5">
            <h2>Помогите нам подобрать для вас идеальные занятия</h2>
            <p>Вам нужно лишь заполнить информацию, поиском займемся мы сами</p>
          </div>
          <div class="content-form">
            <form @submit.prevent>
              <div class="input-group justify-content-between mb-3">
                <div class="gender-wrapper">
                  <label class="mb-1">Ваш пол</label>
                  <select class="form-select">
                    <option value="" disabled selected hidden>
                      Не выбрано
                    </option>
                    <option value="1">Мужской</option>
                    <option value="1">Женский</option>
                  </select>
                </div>
                <div class="gender-wrapper">
                  <label class="mb-1">Дата рождения</label>
                  <input type="date" class="form-control" />
                </div>
              </div>
              <div class="input-group justify-content-between mb-3">
                <div class="gender-wrapper">
                  <label class="mb-1">Ваш рост</label>
                  <div class="input-group">
                    <input
                      type="number"
                      class="form-control"
                      placeholder="Ваш рост"
                    />
                    <span class="input-group-text">СМ</span>
                  </div>
                </div>
                <div class="gender-wrapper">
                  <label class="mb-1">Ваш вес</label>
                  <div class="input-group">
                    <input
                      type="number"
                      class="form-control"
                      placeholder="Ваш рост"
                    />
                    <span class="input-group-text">КГ</span>
                  </div>
                </div>
              </div>
              <p class="fw-bold mb-2">Ваш город</p>
              <div class="input-group mb-3">
                <select class="form-select">
                  <option value="" disabled selected hidden>Не выбрано</option>
                  <option value="city" v-for="city in cities" :key="city">
                    {{ city }}
                  </option>
                </select>
              </div>
              <p class="fw-bold mb-2">
                Ваши предпочитаемые виды занятия спортом
              </p>
              <div class="input-group mb-3">
                <select class="form-select">
                  <option value="" disabled selected hidden>Не выбрано</option>
                  <option value="sport" v-for="sport in favSports" :key="sport">
                    {{ sport }}
                  </option>
                </select>
              </div>
              <p class="fw-bold mb-2">Как часто вы упражняетесь?</p>
              <div class="input-group mb-3">
                <select class="form-select">
                  <option value="" disabled selected hidden>Не выбрано</option>
                  <option
                    value="freq"
                    v-for="freq in sportFrequency"
                    :key="freq"
                  >
                    {{ freq }}
                  </option>
                </select>
              </div>
              <p class="fw-bold mb-2">
                Сколько времени вы проводите за упражнениями?
              </p>
              <div class="input-group mb-3">
                <select class="form-select">
                  <option value="" disabled selected hidden>Не выбрано</option>
                  <option
                    value="perTimeSpent"
                    v-for="perTimeSpent in sportTimeSpent"
                    :key="perTimeSpent"
                  >
                    {{ perTimeSpent }}
                  </option>
                </select>
              </div>
              <p class="fw-bold mb-2">
                Покупаете ли вы абонимент в спортзал или другие занятия?
              </p>
              <div class="input-group mb-3">
                <select class="form-select">
                  <option value="" disabled selected hidden>Не выбрано</option>
                  <option value="Да">Да</option>
                  <option value="Нет">Нет</option>
                </select>
              </div>
              <p class="fw-bold mb-2">
                Сколько вы тратите на упражнения в месяц?
              </p>
              <div class="input-group mb-3">
                <input
                  type="number"
                  class="form-control"
                  placeholder="Введите сумму"
                />
                <span class="input-group-text">СУМ</span>
              </div>
              <p class="fw-bold mb-2">
                Какую сумму вы готовы тратить в месяц на занятия
                спортом/посещение залов?
              </p>
              <div class="input-group mb-3">
                <input
                  type="number"
                  class="form-control"
                  placeholder="Введите сумму"
                />
                <span class="input-group-text">СУМ</span>
              </div>
              <p class="fw-bold mb-2">
                Если бы был абонимент на сумму указанную выше, вы бы посещали
                эти секции?
              </p>
              <div class="input-group mb-3">
                <select class="form-select">
                  <option value="" disabled selected hidden>Не выбрано</option>
                  <option value="Да">Да</option>
                  <option value="Нет">Нет</option>
                </select>
              </div>
              <p class="fw-bold mb-2">
                Какие удобства для вас важны в спортивных секциях/залах?
              </p>
              <div class="input-group mb-3">
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
                  type="tel"
                  class="form-control"
                  placeholder="Номер телефона"
                />
              </div>
              <div class="input-group my-5">
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
      cities: [
        "Ташкент",
        "Ташкентская область",
        "Андижанская область",
        "Бухарская область",
        "Джизакская область",
        "Кашкадарьинская область",
        "Навоийская область",
        "Наманганская область",
        "Самаркандская область",
        "Сурхандарьинская область",
        "Сырдарьинская область",
        "Ферганская область",
        "Хорезмская область",
        "Республика Каракалпакстан",
      ],
      favSports: [
        "Тренажерный зал",
        "Занятия в бассейне",
        "Функциональный тренинг",
        "EMS",
        "Йога",
        "Стретчинг и Пилатес",
        "Занятия бегом",
        "Танцы",
        "Боевые искусства",
        "Теннис",
        "Балет",
        "Скалолазание",
        "Интенсивные тренировки",
        "Горный туризм",
        "Индивидуальные занятия",
        "Восстановительные процедуры",
        "Анализ и диагностика",
        "Тренировки на открытом воздухе",
        "Аренда спортивного оборудования",
        "Командные виды спорта",
      ],
      sportFrequency: [
        "Каждый день",
        "1 раз в неделю",
        "2-3 раза в неделю",
        "4+ раза в неделю",
        "1 раз в месяц",
        "Не упражняюсь",
      ],
      sportTimeSpent: [
        "0 часов",
        "1 час и меньше",
        "До 2х часов",
        "До 3х часов",
        "До 4х часов",
        "До 5ти часов",
        "Больше 5 часов",
      ],
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
};
</script>

<style scoped>
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
  width: 100px;
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
::-webkit-calendar-picker-indicator {
  filter: invert(0.5);
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
@media screen and (max-width: 1200px) {
  .content-form {
    width: 100%;
  }
}
</style>
