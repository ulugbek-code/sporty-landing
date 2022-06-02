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
      type="text"
      class="form-control"
      placeholder="Название секции (например: йога, плавание, бодибилдинг)"
    />
  </div>
  <div class="input-group mb-3">
    <input type="text" class="form-control" placeholder="Имя Фамилия тренера" />
  </div>
  <div class="mb-3">
    <p class="fw-bold mb-2">С чем ассоциируется данная секция</p>
    <base-drop-down
      :options="sections"
      :multiselect="true"
      default="Не выбрано"
    ></base-drop-down>
  </div>
  <div class="mb-3">
    <p class="fw-bold mb-2">Вид тренировок</p>
    <base-drop-down
      :options="TypeOfTraining"
      default="Не выбрано"
    ></base-drop-down>
  </div>
  <div class="mb-3">
    <p class="fw-bold mb-2">Возрастная аудитория</p>
    <base-drop-down
      :options="amenities"
      :multiselect="true"
      default="Не выбрано"
    ></base-drop-down>
  </div>
  <div class="mb-3">
    <p class="fw-bold mb-2">Количество посещений в абонименте</p>
    <input
      type="number"
      class="form-control"
      placeholder="Введите количество посещений"
    />
  </div>
  <div class="input-group mb-3">
    <input
      type="number"
      class="form-control"
      placeholder="Стоимость абонимента"
    />
    <span class="input-group-text">СУМ</span>
  </div>
  <p class="mb-2 photo-header">Фотографии секции</p>
  <div class="d-flex justify-content-between mb-3">
    <image-upload @input="addImage"></image-upload>
    <image-upload @input="addImage"></image-upload>
    <image-upload @input="addImage"></image-upload>
    <image-upload @input="addImage"></image-upload>
    <image-upload @input="addImage"></image-upload>
  </div>
  <div class="input-group mb-3">
    <div class="vid-btn-wrapper">
      <button>Добавить видео</button>
      <input type="file" accept="video/*" @change="handleFileUpload($event)" />
    </div>
    <div class="w-100">
      <video
        class="w-100 my-3"
        v-show="file != ''"
        id="video-preview"
        controls
        type="video/mp4"
        autoplay
      />
    </div>
  </div>
  <div class="input-group mb-3">
    <textarea
      class="form-control"
      rows="3"
      placeholder="Описание секции"
    ></textarea>
  </div>
  <div class="input-group mb-3">
    <button class="btn btn-map" style="width: 40%">Добавить расписание</button>
  </div>
</template>

<script>
import ImageUpload from "./ImageUpload.vue";
export default {
  props: ["each", "sections"],
  emits: ["deleteClass"],
  components: {
    ImageUpload,
  },
  data() {
    return {
      file: "",
      images: [],
    };
  },
  methods: {
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
      this.previewVideo();
    },
    //
    addImage(val) {
      if (!val.name) return;
      console.log(val);
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
  line-height: 24px;
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

.delete-p {
  font-size: 15px;
  transition: all 0.2s ease;
  cursor: pointer;
}
.delete-p:hover {
  color: #ec7884 !important;
}
</style>
