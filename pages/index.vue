<template lang="pug">
  div.d-flex.flex-column(v-if="initDom")
    div#topPanels.row.m-0
      div.col-4.bg-success
        h1 Col -1
      div.col-4.bg-secondary
        h1 Col -2
      div.col-4.bg-primary
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

export default {
  layout: 'dashboard',
  components: {
    BIcon,
    BIconTriangleFill,
    CountriesMap
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
}
.slider-button {
  height: 15px;
  &:hover {
    height: 25px;
  }
}
</style>
