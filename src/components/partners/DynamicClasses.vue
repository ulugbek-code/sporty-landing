<template>
  <div class="head-class" @click="closeDateOut">
    <div class="d-flex justify-content-between align-items-center mt-5 mb-3">
      <h4>
        {{ each == "123" ? "Регистрация секции" : "Регистрация новый секции" }}
      </h4>
      <p
        v-if="each !== '123'"
        @click="$emit('deleteClass', each)"
        class="text-danger mb-2 delete-p"
      >
        Удалить секцию
      </p>
    </div>

    <p class="fw-bold mb-2">Название секции</p>
    <div class="input-group mb-3">
      <input
        v-model.lazy="className"
        type="text"
        class="form-control border"
        :class="isError && !className ? 'border-danger' : ''"
        placeholder="Название секции (например: математика, английский, немецкий)"
      />
    </div>
    <div class="mb-3">
      <p class="fw-bold mb-2">С чем ассоциируется данная секция</p>
      <base-drop-down
        :options="sections"
        @input="getFacilities"
        :isError="isError"
        default="Не выбрано"
      ></base-drop-down>
    </div>
    <div class="mb-3">
      <p class="fw-bold mb-2">Вид занятий</p>
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
    <div class="level" v-for="(level, idx) in levels" :key="level.id">
      <each-level
        :level="level"
        :index="idx"
        :isError="isError"
        @del-lev="deleteLevel"
        @updateLevel="updLevel"
      ></each-level>
    </div>
    <div class="input-group mb-3">
      <button @click="addLevel" class="btn btn-dashed py-2">
        Добавить еще уровень
      </button>
    </div>
    <div class="mb-3">
      <button
        @click.stop="classVisible = !classVisible"
        class="btn-map2"
        :class="!classDates.length && isError ? 'bg-danger' : ''"
      >
        {{
          !classDates.length && isError
            ? "Пожалуйста добавьте расписание!"
            : "Добавить расписание"
        }}
        <!-- <span
          class="triangle mx-2"
          :class="classVisible ? 'open-t' : ''"
        ></span> -->
      </button>
      <class-date
        :classId="each"
        :isClassTrue="classVisible"
        @close-opening="classVisible = false"
        @changeClassDate="$emit('updateClassDate', each)"
      ></class-date>
    </div>
    <p
      class="mb-2 photo-header"
      :class="isError && !images.length ? 'text-danger' : ''"
    >
      {{
        isError && !images.length
          ? "Выберите фотографии секции!"
          : "Фотографии секции"
      }}
    </p>
    <div class="d-flex mb-3">
      <image-upload @input="addImage" @r-input="removeImg"></image-upload>
      <image-upload
        class="mx-4"
        @input="addImage"
        @r-input="removeImg"
      ></image-upload>
      <image-upload @input="addImage" @r-input="removeImg"></image-upload>
      <!-- <image-upload @input="addImage" @r-input="removeImg"></image-upload>
      <image-upload @input="addImage" @r-input="removeImg"></image-upload> -->
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
          :id="'video-preview' + each"
          controls
          type="video/mp4"
          :muted="file == ''"
        />
      </div>
    </div>
    <p class="fw-bold mb-2">Описание секции</p>
    <div class="input-group mb-3">
      <textarea
        v-model.lazy="classDesc"
        class="form-control border"
        :class="isError && !classDesc ? 'border-danger' : ''"
        rows="3"
        placeholder="Напишите описание"
      ></textarea>
    </div>
    <div class="events" v-for="event in events" :key="event.id">
      <each-event
        :event="event"
        :isError="isError"
        @remove-event="deleteEvent"
        @update-event="changeEvent"
      ></each-event>
    </div>
    <div class="input-group mb-3">
      <button @click="addEvent" class="btn btn-dashed py-3">
        {{ events.length ? "Добавить еще ивент" : "Добавить ивент" }}
      </button>
    </div>
  </div>
</template>

<script>
import ImageUpload from "./ImageUpload.vue";
import ClassDate from "./ClassDate.vue";
import EachEvent from "./EachEvent.vue";
import EachLevel from "./EachLevel.vue";
export default {
  props: ["each", "sections", "isError"],
  emits: [
    "deleteClass",
    "changeImg",
    "changeVid",
    "updateValues",
    "updateEvent",
    "updatedLvl",
    "updateClassDate",
  ],
  components: {
    ImageUpload,
    ClassDate,
    EachEvent,
    EachLevel,
  },
  data() {
    return {
      isEmpty: false,
      className: "",
      facilities: [],
      trainType: "",
      classVisible: false,
      file: "",
      images: [],
      classDesc: "",
      events: [],
      levels: [
        {
          id: "" + Date.now(),
          name: "",
          duration: "",
          status: "",
          number_students: "",
          price: "",
        },
      ],
    };
  },
  computed: {
    classDates() {
      return this.$store.getters.eachWeekDates;
    },
  },
  methods: {
    updLevel(val) {
      this.levels = this.levels.map((level) => {
        if (level.id === val.id) {
          return val;
        } else {
          return level;
        }
      });
      this.$emit("updatedLvl", { id: this.each, level: this.levels });
    },
    deleteLevel(id) {
      this.levels = this.levels.filter((event) => event.id !== id);
      this.$emit("updatedLvl", { id: this.each, level: this.levels });
    },
    addLevel() {
      this.levels.push({
        id: "" + Date.now(),
        name: "",
        duration: "",
        status: "",
        number_students: "",
        price: "",
      });
    },
    changeEvent(val) {
      this.events = this.events.map((event) => {
        if (event.id === val.id) {
          return val;
        } else {
          return event;
        }
      });
      this.$emit("updateEvent", { id: this.each, event: this.events });
    },
    deleteEvent(id) {
      this.events = this.events.filter((event) => event.id !== id);
      this.$emit("updateEvent", { id: this.each, event: this.events });
    },
    addEvent() {
      this.events.push({
        id: "" + Date.now(),
        name: "",
        date: "",
        status: "",
        description: "",
      });
    },
    closeDateOut() {
      if (this.classVisible) this.classVisible = false;
    },
    getTrainType(val) {
      this.trainType = val.id;
    },
    getFacilities(val) {
      // console.log(val);
      // let a = val.map((v) => v.id);
      this.facilities = [val.id];
    },
    previewVideo() {
      let video = document.getElementById("video-preview" + this.each);
      let reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.addEventListener("load", function () {
        video.src = reader.result;
      });
    },
    handleFileUpload(event) {
      if (event) {
        this.file = event.target.files[0];
        if (Math.ceil(this.file.size / 1024) > 30720) {
          alert("Pазмер видео больше 30 мб");
          return;
        }
        if (this.file)
          this.$emit("changeVid", { id: this.each, video: this.file });
        this.previewVideo();
      }
    },
    //
    addImage(val) {
      if (!val.name) return;
      this.images.push(val);
      this.$emit("changeImg", { id: this.each, images: this.images });
    },
    removeImg(val) {
      this.images = this.images.filter((img) => img !== val);
      this.$emit("changeImg", { id: this.each, images: this.images });
    },
    deleteVid() {
      this.file = "";
      this.$emit("changeVid", { id: this.each, video: this.file });
    },
  },
  watch: {
    className(val) {
      this.$emit("updateValues", {
        id: this.each,
        name: val,
        fac: this.facilities,
        trainTy: this.trainType,
        desc: this.classDesc,
      });
    },
    facilities(val) {
      this.$emit("updateValues", {
        id: this.each,
        name: this.className,
        fac: val,
        trainTy: this.trainType,
        desc: this.classDesc,
      });
    },
    trainType(val) {
      this.$emit("updateValues", {
        id: this.each,
        name: this.className,
        fac: this.facilities,
        trainTy: val,
        desc: this.classDesc,
      });
    },
    classDesc(val) {
      this.$emit("updateValues", {
        id: this.each,
        name: this.className,
        fac: this.facilities,
        trainTy: this.trainType,
        desc: val,
      });
    },
  },
};
</script>

<style scoped>
.head-class {
  margin-top: 4rem;
  border-top: 1px solid #dee2e6;
}
.btn-dashed {
  width: 100%;
  color: #9d9d9d;
  border: 2px dashed #dee2e6;
}
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
  right: -40%;
  top: 6px;
  font-size: 14px;
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
    right: -50%;
  }
}
@media screen and (max-width: 596px) {
  .optional {
    right: -95%;
  }
  .btn-map2 {
    width: 100%;
  }
  .triangle {
    margin-top: 8px;
  }
}
</style>
