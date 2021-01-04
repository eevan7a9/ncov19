<template lang="pug">
  div.text-light.h-100.text-left.overflow-hidden
    h3.text-uppercase.mt-md-4.mt-3.text-center Global Numbers
    div.row(v-if="getTotalNumbers.content")
      div.col-6.confirmed.text-info.text-right.text-title.text-uppercase Confirmed:
      div.col-6
        small.m-0.ml-2.p-0.text-light.font-weight-bold {{ getTotalNumbers.cases.toLocaleString() }}
      div.col-6.active.text-warning.text-right.text-title.text-uppercase Active:
      div.col-6
        small.m-0.ml-2.p-0.text-light.font-weight-bold
          | {{ getTotalNumbers.active.toLocaleString() }}
          small.font-weight-bold.text-warning -({{ (getTotalNumbers.active / getTotalNumbers.cases * 100).toFixed(2) }}%)
      div.col-6.deaths.text-danger.text-right.text-title.text-uppercase Deaths:
      div.col-6
        small.m-0.ml-2.p-0.text-light.font-weight-bold
          | {{ getTotalNumbers.death.toLocaleString() }}
          small.font-weight-bold.text-danger -({{ (getTotalNumbers.death / getTotalNumbers.cases * 100).toFixed(2) }}%)
      div.col-6.recovered.text-success.text-right.text-title.text-uppercase Recovered:
      div.col-6
        small.m-0.ml-2.p-0.text-light.font-weight-bold
          | {{ getTotalNumbers.treated.toLocaleString() }}
          small.font-weight-bold.text-success -({{ (getTotalNumbers.treated / getTotalNumbers.cases * 100).toFixed(2) }}%)
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
  text-shadow: 1px 1px 1px #0f0000;
}
.text-title {
  text-shadow: 2px 2px 1px #000000;
}
@media (max-width: 1000px) {
  div {
    font-size: 18px;
  }
}
@media (max-width: 576px) {
  div {
    font-size: 24px;
  }
}
</style>
