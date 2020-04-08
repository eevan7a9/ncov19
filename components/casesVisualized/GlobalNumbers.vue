<template lang="pug">
  div.text-light.h-100.text-left.overflow-hidden
    h3.text-uppercase.text-center.mt-md-2.mt-sm-3 Global Numbers
    div.mt-4.d-flex.flex-column.align-items-center(v-if="getTotalNumbers.content")
      p.confirmed.text-info.my-md-2 Confirmed:
        small.m-0.ml-2.p-0.text-light.font-weight-bold {{ getTotalNumbers.cases.toLocaleString() }}
      p.active.text-warning.my-md-2 Active:
        small.m-0.ml-2.p-0.text-light.font-weight-bold
          | {{ getTotalNumbers.active.toLocaleString() }}
          small.font-weight-bold.text-warning -({{ (getTotalNumbers.active / getTotalNumbers.cases * 100).toFixed(2) }}%)
      p.deaths.text-danger.my-md-2 Deaths:
        small.m-0.ml-2.p-0.text-light.font-weight-bold
          | {{ getTotalNumbers.death.toLocaleString() }}
          small.font-weight-bold.text-danger -({{ (getTotalNumbers.death / getTotalNumbers.cases * 100).toFixed(2) }}%)
      p.recovered.text-success.my-md-2 Recovered:
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
p {
  font-size: 24px;
}
@media (max-width: 1000px) {
  p {
    font-size: 18px;
  }
}
@media (max-width: 576px) {
  p {
    font-size: 24px;
  }
}
</style>
