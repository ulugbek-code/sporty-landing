<template>
  <section>
    <div class="first-circle"></div>
    <div class="second-circle"></div>
    <div class="container">
      <div class="row py-4">
        <div class="col-12">
          <div class="logo_detail">
            <img src="../assets/sporty-logo.svg" alt="" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 q-div">
          <div class="q-wrapper">
            <div class="question">
              <h1>
                К какой категории <br />
                вы относитесь?
              </h1>
            </div>
            <div class="actions mt-3">
              <router-link to="/partners" class="">
                <button class="">Владелец зала / Тренер</button>
              </router-link>
              <router-link to="/clients">
                <button class="mt-3">Атлет</button>
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="man-image float-end">
            <img src="../assets/sports-man.png" alt="" />
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
section {
  position: relative;
  overflow-x: hidden;
}
.first-circle {
  width: 700px;
  height: 700px;
  position: absolute;
  right: -10%;
  top: -15%;
  bottom: 20.83%;
  border-radius: 50%;
  background: linear-gradient(
    0deg,
    rgba(0, 204, 255, 0.1) 0%,
    rgba(0, 60, 191, 0.1) 100%
  );
  z-index: -1;
}
.second-circle {
  width: 650px;
  height: 650px;
  position: absolute;
  right: -10%;
  top: -15%;
  bottom: 30%;
  border-radius: 50%;
  background: linear-gradient(0deg, #00ccff 0%, #003cbf 100%);
  z-index: -1;
}
.logo_detail {
  width: 112px;
}
.man-image {
  width: 580px;
}
.man-image img {
  position: relative;
  left: 20%;
}
img {
  width: 100%;
}
.q-div {
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.actions {
  display: flex;
  flex-direction: column;
}
h1 {
  color: #1b1b1d;
  font-weight: 600;
}
button {
  width: 300px;
  height: 70px;
  font-size: 16px;
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 50px;
  background: linear-gradient(180deg, #00ccff -107.29%, #003cbf 228.65%);
  box-shadow: 0px 0px 25px rgba(1, 107, 212, 0.25);
}
button:hover {
  color: #fff;
  background: linear-gradient(180deg, #00ccff -107.29%, #003cbf 102.56%);
}
@media screen and (max-width: 1112px) {
  .first-circle {
    width: 600px;
    height: 600px;
  }
  .second-circle {
    width: 550px;
    height: 550px;
  }
  .man-image {
    width: 520px;
  }
  button {
    width: 250px;
    height: 50px;
  }
}
@media screen and (max-width: 768px) {
  .first-circle {
    width: 300px;
    height: 300px;
  }
  .second-circle {
    width: 250px;
    height: 250px;
  }
  .man-image {
    display: none;
  }
  .q-div {
    justify-content: flex-end;
  }
  .actions {
    margin-bottom: 4rem;
  }
}
</style>
