<template>
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
      :class="isEmpty && !className ? 'border-danger' : ''"
      placeholder="Название секции (например: йога, плавание, бодибилдинг)"
    />
  </div>
  <div class="input-group mb-3">
    <input
      v-model.lazy="teacherName"
      type="text"
      class="form-control border"
      :class="isEmpty && !teacherName ? 'border-danger' : ''"
      placeholder="Имя Фамилия тренера"
    />
  </div>
  <div class="mb-3">
    <p class="fw-bold mb-2">С чем ассоциируется данная секция</p>
    <base-drop-down
      :options="sections"
      :multiselect="true"
      @multi="getFacilities"
      :isError="isEmpty"
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
      default="Не выбрано"
    ></base-drop-down>
  </div>
  <div class="mb-3">
    <p class="fw-bold mb-2">Количество посещений в абонименте</p>
    <input
      v-model.lazy="visits"
      type="number"
      min="0"
      class="form-control border"
      :class="isEmpty && !visits ? 'border-danger' : ''"
      placeholder="Введите количество посещений"
    />
  </div>
  <div class="input-group mb-3">
    <input
      v-model.lazy="price"
      type="number"
      min="0"
      class="form-control border"
      :class="isEmpty && !price ? 'border-danger' : ''"
      placeholder="Стоимость абонимента"
    />
    <span class="input-group-text">СУМ</span>
  </div>
  <div class="mb-3">
    <button
      @click="classVisible = !classVisible"
      class="btn btn-map"
      style="width: 40%"
    >
      Добавить расписание
    </button>
    <class-date
      :isClassTrue="classVisible"
      @close-opening="classVisible = false"
    ></class-date>
  </div>
  <p class="mb-2 photo-header">Фотографии секции</p>
  <div class="d-flex justify-content-between mb-3">
    <image-upload @input="addImage" @r-input="removeImg"></image-upload>
    <image-upload @input="addImage" @r-input="removeImg"></image-upload>
    <image-upload @input="addImage" @r-input="removeImg"></image-upload>
    <image-upload @input="addImage" @r-input="removeImg"></image-upload>
    <image-upload @input="addImage" @r-input="removeImg"></image-upload>
  </div>
  <div class="input-group v-w mb-3">
    <div class="vid-btn-wrapper">
      <button>Добавить видео</button>
      <input type="file" accept="video/*" @change="handleFileUpload($event)" />
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
      :class="isEmpty && !classDesc ? 'border-danger' : ''"
      rows="3"
      placeholder="Описание секции"
    ></textarea>
  </div>
</template>

<script>
import ImageUpload from "./ImageUpload.vue";
import ClassDate from "./ClassDate.vue";
export default {
  props: ["each", "sections"],
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
      this.file = event.target.files[0];
      this.$emit("changeVid", this.file);
      // console.log(this.file);
      this.previewVideo();
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
  overflow: hidden;
  display: inline-block;
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
}
.vid-btn-wrapper input[type="file"] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
.btn-map {
  width: 100%;
  background: #016bd4;
  color: #fff;
  font-weight: 700;
  font-size: 14px;
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
.photo-header {
  color: #9d9d9d;
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
input.border-danger,
textarea.border-danger {
  color: #dc3545;
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
</style>
