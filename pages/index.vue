<template lang="pug">
  div.d-flex.flex-column(v-if="initDom")
    div#topPanels.row.m-0.bg-dark
      div.all-cases.col-4.p-0.h-100
        AllCases
      div.col-4.bg-info
        h1 Col -2
      div.col-4.bg-success
        h1 Col -3
    button.slider-button.btn.btn-dark.d-flex.justify-content-center.align-items-center
      small
         BIconTriangleFill
    div.flex-grow-1
      CountriesMap
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { BIcon, BIconTriangleFill } from 'bootstrap-vue'
import countriesData from 'assets/dummy-data.json' // for local development
import CountriesMap from '@/components/countries/CountriesMap'
import AllCases from '@/components/summary/AllCases'
export default {
  layout: 'dashboard',
  components: {
    BIcon,
    BIconTriangleFill,
    CountriesMap,
    AllCases
  },
  data() {
    return {
      casesSummary: [],
      initDom: false
    }
  },
  computed: mapGetters(['getSummaryCases']),
  async created() {
    await this.fetchSummaryCases(countriesData)
    this.initDom = true
  },
  methods: {
    ...mapActions(['fetchSummaryCases'])
  }
}
</script>

<style lang="scss" scoped>
#topPanels {
  height: 300px;
  overflow: hidden;
  // background: aliceblue;
  div {
    border: 1px solid rgb(121, 121, 121);
  }
}
.slider-button {
  height: 15px;
  &:hover {
    height: 25px;
  }
}
</style>
