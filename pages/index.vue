<template lang="pug">
  div.d-flex.flex-column(v-if="initDom")
    div#topPanels.row.m-0.bg-dark(:class="showTopPanel ? 'show': 'hide'")
      div.all-cases.col-4.p-0.h-100
        AllCases
      div.top-cases.col-4.p-0.h-100
        TopCases
      div.global-numbers.col-4.p-0.h-100
        GlobalNumbers
    button.slider-button.p-0.btn.btn-dark.d-flex.justify-content-center.align-items-center(
      @click="showTopPanel=!showTopPanel"
    )
      small
         BIconTriangleFill(:flip-v="!showTopPanel")
    div.flex-grow-1
      CountriesMap#icon(:key="showTopPanel")
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { BIcon, BIconTriangleFill } from 'bootstrap-vue'
import countriesData from 'assets/dummy-data.json' // for local development
import CountriesMap from '@/components/countries/CountriesMap'
import AllCases from '@/components/summary/AllCases'
import TopCases from '@/components/summary/TopCases'
import GlobalNumbers from '@/components/summary/GlobalNumbers'
export default {
  layout: 'dashboard',
  components: {
    BIcon,
    BIconTriangleFill,
    CountriesMap,
    AllCases,
    TopCases,
    GlobalNumbers
  },
  data() {
    return {
      casesSummary: [],
      initDom: false,
      showTopPanel: true
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
  overflow: hidden;
  // background: aliceblue;
  &.show {
    height: 300px;
  }
  &.hide {
    height: 0;
  }
  div {
    border: 1px solid rgb(121, 121, 121);
  }
}
.slider-button {
  height: 25px;
  color: #c4c4c4;
  border-radius: 0;
  &:hover:before {
    transform: scale(1.2);
    box-shadow: 0 0 15px #ffffff;
    filter: blur(3px);
  }
  &:hover {
    color: aliceblue;
    box-shadow: 0 0 15px #7e7976;
    text-shadow: 0 0 15px #fffcfa;
  }
}
</style>
