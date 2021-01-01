<template lang="pug">
  div.bg-light.d-flex.flex-column.justify-content-center.align-items-center
    h1 Sever is down...
    h2(v-if="!showBtn") Let's try again in &#32;
      strong.text-danger {{timer}}
    button.btn.btn-danger.p-3.mb-3.font-weight-bold(type='button' v-else @click="redirect") Try Again
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
      timer: 15,
      showBtn: false
    }
  },
  watch: {},
  mounted() {
    const timerInit = setInterval(() => {
      this.timer = this.timer - 1
      if (this.timer === 0) {
        clearInterval(timerInit)
        this.showBtn = true
      }
    }, 1000)
  },
  methods: {
    redirect() {
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style lang="scss" scoped></style>
