<template lang="pug">
  div.text-light.h-100.text-left
    h2.text-uppercase.text-center Global Numbers
    div.mt-4.ml-sm-5
      h3.text-info.my-sm-3 Confirmed:
        small.m-0.ml-2.p-0.text-light.font-weight-bold {{ getTotalNumbers.cases.toLocaleString() }}
      h4.text-warning.my-sm-3 Active:
        small.m-0.ml-2.p-0.text-light.font-weight-bold
          | {{ getTotalNumbers.active.toLocaleString() }} -
          small.font-weight-bold.text-warning ({{ (getTotalNumbers.active / getTotalNumbers.cases * 100).toFixed(2) }}%)
      h4.text-danger.my-sm-3 Deaths:
        small.m-0.ml-2.p-0.text-light.font-weight-bold
          | {{ getTotalNumbers.death.toLocaleString() }} -
          small.font-weight-bold.text-danger ({{ (getTotalNumbers.death / getTotalNumbers.cases * 100).toFixed(2) }}%)
      h4.text-success.my-sm-3 Recovered:
        small.m-0.ml-2.p-0.text-light.font-weight-bold
          | {{ getTotalNumbers.treated.toLocaleString() }} -
          small.font-weight-bold.text-success ({{ (getTotalNumbers.treated / getTotalNumbers.cases * 100).toFixed(2) }}%)
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'GlobalNumbers',
  computed: mapGetters(['getTotalNumbers'])
  // methods
}
</script>

<style lang="scss" scoped></style>
