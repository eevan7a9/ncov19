<template lang="pug">
  div.text-light.h-100.text-left.overflow-hidden
    h3.text-uppercase.mt-5.mt-md-3.mt-lg-5.text-center The Numbers
    div.row(v-if="getTotalNumbers.content")
      div.col-6.text-info.text-title Detected:
      div.col-6
        small.m-0.p-0.text-light.font-weight-bold {{ getTotalNumbers.cases.toLocaleString() }}
      div.col-6.text-warning.text-title Active:
      div.col-6
        small.m-0.p-0.text-light.font-weight-bold
          | {{ getTotalNumbers.active.toLocaleString() }}
          div.p-0.m-0.percent-text
            small ({{ (getTotalNumbers.active / getTotalNumbers.cases * 100).toFixed(2) }}%)
      div.col-6.text-danger.text-title Deaths:
      div.col-6
        small.m-0.p-0.text-light.font-weight-bold
          | {{ getTotalNumbers.death.toLocaleString() }}
          div.p-0.m-0.percent-text
            small ({{ (getTotalNumbers.death / getTotalNumbers.cases * 100).toFixed(2) }}%)
      div.col-6.text-success.text-title Healed:
      div.col-6
        small.m-0.p-0.text-light.font-weight-bold
          | {{ getTotalNumbers.treated.toLocaleString() }}
          div.p-0.m-0.percent-text
            small ({{ (getTotalNumbers.treated / getTotalNumbers.cases * 100).toFixed(2) }}%)
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'GlobalNumbers',
  computed: mapGetters(['getTotalNumbers'])
  // methods
}
</script>

<style lang="scss" scoped>
div {
  font-size: 24px;
  text-shadow: 1px 2px 1px #0f0000;
}
.text-title {
  text-shadow: 2px 2px 1px #000000;
  text-align: right;
  font-weight: 800;
}
.percent-text {
  font-size: 18px;
  line-height: 16px;
  text-shadow: 1px 2px 1px #5f5e5e;
  font-weight: 900;
}
@media (max-width: 1000px) {
  div {
    font-size: 20px;
  }
}
@media (max-width: 576px) {
  div {
    font-size: 24px;
  }
}
</style>
