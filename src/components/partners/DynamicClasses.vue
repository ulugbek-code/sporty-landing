<template>
  <div @click="closeDateOut">
    <div class="d-flex justify-content-between align-items-center mt-5 mb-3">
      <h4 class="">{{ each > 1 ? `Секция ${each}` : "Регистрация секции" }}</h4>
      <p
        v-if="each > 1"
        @click="$emit('deleteClass', each)"
        class="text-danger mb-2 delete-p"
      >
        Удалить секцию
      </p>
    </div>

    <div class="input-group mb-3">
      <input
        v-model.lazy="className"
        type="text"
        class="form-control border"
        :class="isError && !className ? 'border-danger' : ''"
        placeholder="Название секции (например: йога, плавание, бодибилдинг)"
      />
    </div>
    <div class="input-group mb-3">
      <input
        v-model.lazy="teacherName"
        type="text"
        class="form-control border"
        :class="isError && !teacherName ? 'border-danger' : ''"
        placeholder="Имя Фамилия тренера"
      />
    </div>
    <div class="mb-3">
      <p class="fw-bold mb-2">С чем ассоциируется данная секция</p>
      <base-drop-down
        :options="sections"
        :multiselect="true"
        @multi="getFacilities"
        :isError="isError"
        default="Не выбрано"
      ></base-drop-down>
    </div>
    <div class="mb-3">
      <p class="fw-bold mb-2">Вид тренировок</p>
      <base-drop-down
        :options="[
          { id: 'individual', name: 'Индивидуальные' },
          { id: 'group', name: 'Групповые' },
        ]"
        @input="getTrainType"
        :isError="isError"
        default="Не выбрано"
      ></base-drop-down>
    </div>
    <div class="mb-3">
      <p class="fw-bold mb-2">Возрастная аудитория</p>
      <base-drop-down
        :options="[
          { id: 'old', name: 'Для взрослых' },
          { id: 'teenager', name: 'Для детей' },
        ]"
        @input="getAge"
        :isError="isError"
        default="Не выбрано"
      ></base-drop-down>
    </div>
    <div class="mb-3">
      <p class="fw-bold mb-2">Количество посещений в абонименте</p>
      <input
        v-model="visits"
        type="number"
        @input="converV()"
        min="0"
        class="form-control border"
        :class="isError && !visits ? 'border-danger' : ''"
        placeholder="Введите количество посещений"
      />
    </div>
    <p class="fw-bold mb-2">Стоимость абонимента</p>
    <div class="input-group mb-3">
      <input
        v-model="price"
        type="text"
        @input="convertP()"
        min="0"
        class="form-control border"
        :class="isError && !price ? 'border-danger' : ''"
        placeholder="Введите cтоимость абонимента"
      />
      <span class="input-group-text">СУМ</span>
    </div>
    <div class="mb-3">
      <button @click.stop="classVisible = !classVisible" class="btn-map2">
        Добавить расписание
        <span
          class="triangle mx-2"
          :class="classVisible ? 'open-t' : ''"
        ></span>
      </button>
      <class-date
        :isClassTrue="classVisible"
        @close-opening="classVisible = false"
      ></class-date>
    </div>
    <p
      class="mb-2 photo-header"
      :class="isError && !images.length ? 'text-danger' : ''"
    >
      Фотографии секции
    </p>
    <div class="d-flex justify-content-between mb-3">
      <image-upload @input="addImage" @r-input="removeImg"></image-upload>
      <image-upload @input="addImage" @r-input="removeImg"></image-upload>
      <image-upload @input="addImage" @r-input="removeImg"></image-upload>
      <image-upload @input="addImage" @r-input="removeImg"></image-upload>
      <image-upload @input="addImage" @r-input="removeImg"></image-upload>
    </div>
    <div class="input-group v-w mb-3">
      <div class="vid-btn-wrapper d-flex">
        <button>Добавить видео</button>
        <input
          type="file"
          accept="video/*"
          @change="handleFileUpload($event)"
        />
        <p class="optional">Не обязательно</p>
      </div>
      <div class="w-100">
        <span @click.stop="deleteVid" class="v-delete">x</span>
        <video
          class="w-100 my-3"
          v-show="file != ''"
          id="video-preview"
          controls
          type="video/mp4"
          :muted="file == ''"
          autoplay
        />
      </div>
    </div>
    <div class="input-group mb-3">
      <textarea
        v-model.lazy="classDesc"
        class="form-control border"
        :class="isError && !classDesc ? 'border-danger' : ''"
        rows="3"
        placeholder="Описание секции"
      ></textarea>
    </div>
  </div>
</template>

<script>
import ImageUpload from "./ImageUpload.vue";
import ClassDate from "./ClassDate.vue";
export default {
  props: ["each", "sections", "isError"],
  emits: ["deleteClass", "changeImg", "changeVid", "updateValues"],
  components: {
    ImageUpload,
    ClassDate,
  },
  data() {
    return {
      isEmpty: false,
      className: "",
      teacherName: "",
      facilities: [],
      trainType: "",
      ageType: "",
      visits: null,
      price: null,
      classVisible: false,
      file: "",
      images: [],
      classDesc: "",
    };
  },
  methods: {
    closeDateOut() {
      if (this.classVisible) this.classVisible = false;
    },
    converV() {
      if (this.visits < 0) this.visits = Math.abs(this.visits);
    },
    convertP() {
      if (isNaN(this.price[0])) this.price = "";
      this.price = this.price.split(" ").join("").split("");
      let formatted = [];
      while (this.price.length) {
        for (let i = 0; i < 3 && this.price.length; i++) {
          formatted.push(this.price.shift());
        }
        if (this.price.length) formatted.push(" ");
      }
      this.price = formatted.join("");
      if (this.price < 0) this.price = Math.abs(this.price);
    },
    getAge(val) {
      this.ageType = val.id;
    },
    getTrainType(val) {
      this.trainType = val.id;
    },
    getFacilities(val) {
      let a = val.map((v) => v.id);
      this.facilities = a;
    },
    previewVideo() {
      let video = document.getElementById("video-preview");
      let reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.addEventListener("load", function () {
        video.src = reader.result;
      });
    },
    handleFileUpload(event) {
      if (event) {
        this.file = event.target.files[0];
        if (Math.ceil(this.file.size / 1024) > 10240) {
          alert("Pазмер видео больше 10 мб");
          return;
        }
        this.$emit("changeVid", this.file);
        this.previewVideo();
      }
    },
    //
    addImage(val) {
      if (!val.name) return;
      this.images.push(val);
      this.$emit("changeImg", this.images);
    },
    removeImg(val) {
      this.images = this.images.filter((img) => img !== val);
      this.$emit("changeImg", this.images);
    },
    deleteVid() {
      this.file = "";
      this.$emit("changeVid", this.file);
    },
  },
  watch: {
    className(val) {
      this.$emit("updateValues", {
        name: val,
        teacher: this.teacherName,
        fac: this.facilities,
        trainTy: this.trainType,
        ageTy: this.ageType,
        visit: this.visits,
        price: this.price,
        desc: this.classDesc,
      });
    },
    teacherName(val) {
      this.$emit("updateValues", {
        name: this.className,
        teacher: val,
        fac: this.facilities,
        trainTy: this.trainType,
        ageTy: this.ageType,
        visit: this.visits,
        price: this.price,
        desc: this.classDesc,
      });
    },
    facilities(val) {
      this.$emit("updateValues", {
        name: this.className,
        teacher: this.teacherName,
        fac: val,
        trainTy: this.trainType,
        ageTy: this.ageType,
        visit: this.visits,
        price: this.price,
        desc: this.classDesc,
      });
    },
    trainType(val) {
      this.$emit("updateValues", {
        name: this.className,
        teacher: this.teacherName,
        fac: this.facilities,
        trainTy: val,
        ageTy: this.ageType,
        visit: this.visits,
        price: this.price,
        desc: this.classDesc,
      });
    },
    ageType(val) {
      this.$emit("updateValues", {
        name: this.className,
        teacher: this.teacherName,
        fac: this.facilities,
        trainTy: this.trainType,
        ageTy: val,
        visit: this.visits,
        price: this.price,
        desc: this.classDesc,
      });
    },
    visits(val) {
      this.$emit("updateValues", {
        name: this.className,
        teacher: this.teacherName,
        fac: this.facilities,
        trainTy: this.trainType,
        ageTy: this.ageType,
        visit: val,
        price: this.price,
        desc: this.classDesc,
      });
    },
    price(val) {
      this.$emit("updateValues", {
        name: this.className,
        teacher: this.teacherName,
        fac: this.facilities,
        trainTy: this.trainType,
        ageTy: this.ageType,
        visit: this.visits,
        price: val,
        desc: this.classDesc,
      });
    },
    classDesc(val) {
      this.$emit("updateValues", {
        name: this.className,
        teacher: this.teacherName,
        fac: this.facilities,
        trainTy: this.trainType,
        ageTy: this.ageType,
        visit: this.visits,
        price: this.price,
        desc: val,
      });
    },
  },
};
</script>

<style scoped>
.vid-btn-wrapper {
  width: 40%;
  position: relative;
  /* overflow: hidden; */
  display: inline-block;
  cursor: pointer;
}
.vid-btn-wrapper button {
  width: 100%;
  border: none;
  border-radius: 8px;
  padding: 6px 12px;
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
.btn-map,
.btn-map2 {
  width: 100%;
  background: #016bd4;
  color: #fff;
  font-weight: 700;
  font-size: 14px;
}
.btn-map2 {
  width: 40%;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
  padding: 6px 12px;
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
.photo-header,
.optional {
  color: #9d9d9d;
}
.optional {
  position: absolute;
  right: -50%;
  top: 6px;
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
input.border-danger::placeholder,
textarea.border-danger::placeholder {
  color: #dc3545;
}
.triangle {
  position: absolute;
  width: 0;
  height: 0;
  margin: 8px 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #fff;
  transition: all 0.2s ease;
}
.triangle.open-t {
  transform: rotate(180deg);
}
.v-delete {
  display: none;
  position: absolute;
  background: #dc3545;
  padding: 1px 8px 3px 10px;
  border-radius: 50%;
  right: 5%;
  top: 20%;
  z-index: 10;
  cursor: pointer;
}
.v-w .w-100:hover > .v-delete {
  display: initial;
}
.delete-p {
  font-size: 15px;
  transition: all 0.2s ease;
  cursor: pointer;
}
.delete-p:hover {
  color: #ec7884 !important;
}
@media screen and (max-width: 996px) {
  .optional {
    right: -60%;
  }
}
@media screen and (max-width: 596px) {
  .optional {
    right: -110%;
  }
  .btn-map2 {
    width: 100%;
  }
  .triangle {
    margin-top: 8px;
  }
}
</style>
