<template lang="pug">
  div.bg-light.d-flex.flex-column.justify-content-center.align-items-center
    h1 Let's try again in...
      strong.text-danger {{timer}}
    b-img(
      src="@/assets/illustration/undraw_clean_up_ucm0.svg"
      fluid
      alt="Responsive image")

</template>

<script>
export default {
  layout: 'dashboard',
  data() {
    return {
      timer: 15
    }
  },
  mounted() {
    const timerInit = setInterval(() => {
      this.timer = this.timer - 1
      if (this.timer === 0) {
        clearInterval(timerInit)
        this.$router.push({ path: '/' })
      }
    }, 1000)
  },
  methods: {
    stopTimer(item) {
      clearInterval(item)
    }
  }
}
</script>

<style lang="scss" scoped></style>
