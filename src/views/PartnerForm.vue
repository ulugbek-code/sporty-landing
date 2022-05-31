<template>
  <section>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-3">
          <img src="../assets/blue-frame.png" alt="" />
        </div>
        <div class="col-md-9 px-5 pt-4">
          <div class="header-form">
            <img src="../assets/SportyLogo.svg" alt="" />
          </div>
          <div class="content-form">
            <div class="content-header">
              <h2>Станьте нашим партнером</h2>
              <p>Вы только заполняете форму, мы привлекаем клиентов</p>
            </div>
            <form @submit.prevent></form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style scoped>
.row * {
  padding: 0;
}
.header-form {
  width: 112px;
}
img {
  width: 100%;
}
.content-form {
  width: 60%;
  margin: 0 auto;
}
.content-header h2 {
  font-weight: bold;
  margin-bottom: 5px;
}
.content-header p {
  color: #9d9d9d;
}
</style>
