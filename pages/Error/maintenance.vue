<template lang="pug">
  div.bg-light.d-flex.flex-column.justify-content-center.align-items-center
    h1.text-capitalize.glow maintenance
    b-img(
      src="@/assets/illustration/undraw_clean_up_ucm0.svg"
      fluid
      alt="Responsive image")

</template>

<script>
export default {
  layout: 'dashboard'
}
</script>

<style lang="scss" scoped>
.glow {
  font-size: 80px;
  text-align: center;
  -webkit-animation: glow 1s ease-in-out infinite alternate;
  -moz-animation: glow 1s ease-in-out infinite alternate;
  animation: glow 1s ease-in-out infinite alternate;
}
@-webkit-keyframes glow {
  from {
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073,
      0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073;
  }

  to {
    text-shadow: 0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6,
      0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff4da6;
  }
}
</style>
