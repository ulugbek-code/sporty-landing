<template>
  <div
    class="dropbox"
    :class="imageData ? 'border-0' : ''"
    :style="{ 'background-image': `url(${imageData})` }"
  >
    <span
      @click.stop="removeImage(imageData)"
      v-if="imageData"
      class="float-end"
      >&times;</span
    >
    <span v-if="isLoading" class="loading">загрузка...</span>
    <input
      class="input-file"
      type="file"
      accept="image/*"
      ref="file"
      @change="handleFileUpload"
    />
    <span v-if="!imageData" class="icon">+</span>
  </div>
</template>

<script>
// import axios from "axios";
export default {
  props: ["qty"],
  data() {
    return {
      isLoading: false,
      imageData: null,
    };
  },
  methods: {
    removeImage() {
      this.$emit("r-input", this.$refs.file.files[0]);
      this.$refs["file"].value = "";
      this.imageData = null;
    },
    handleFileUpload() {
      const input = this.$refs.file;
      const files = input.files;
      if (files && files[0]) {
        const reader = new FileReader();
        this.isLoading = true;
        reader.onload = (e) => {
          this.imageData = e.target.result;
          this.isLoading = false;
        };
        reader.readAsDataURL(files[0]);

        // this.$emit("input", this.imageData);
        this.$emit("input", { idx: this.qty, value: files[0] });

        // console.log(files[0]);
        // let data = new FormData();
        // data.append("image", files[0]);
        // let config = {
        //   header: {
        //     "Content-Type": "image/png",
        //   },
        // };

        // axios.post(
        //   "http://ec2-3-91-8-58.compute-1.amazonaws.com/api/v1/images/post/",
        //   data,
        //   config
        // );
      }
    },
  },
};
</script>

<style scoped>
.loading {
  position: absolute;
  height: 30%;
  top: 35%;
  left: 8%;
  background: rgb(255, 255, 255);
  z-index: 10;
}
.dropbox {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border: 2px dashed #dee2e6;
  border-radius: 10px;
  width: 100px;
  height: 100px;
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
span.float-end {
  position: relative;
  z-index: 1000;
  display: none;
  background: rgb(243, 66, 66);
  font-size: 15px;
  border-radius: 50%;
  padding: 0 5px 0 5.5px;
}
.dropbox:hover span.float-end {
  display: initial;
  cursor: pointer;
}
.dropbox:hover {
  background-blend-mode: luminosity;
}
@media screen and (max-width: 768px) {
  .dropbox {
    width: 80px;
    height: 80px;
  }
  .loading {
    font-size: 12px;
    left: 4%;
  }
}
</style>
