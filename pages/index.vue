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
import { mapActions, mapMutations } from 'vuex'
import { BIcon, BIconTriangleFill } from 'bootstrap-vue'
import CountriesMap from '@/components/countries/CountriesMap'
import AllCases from '@/components/casesVisualized/AllCases'
import TopCases from '@/components/casesVisualized/TopCases'
import GlobalNumbers from '@/components/casesVisualized/GlobalNumbers'
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
      initDom: false,
      showTopPanel: true
    }
  },
  mounted() {
    const storedData = JSON.parse(localStorage.getItem('covid19'))
    if (storedData) {
      const storedSeconds =
        (new Date().getTime() - storedData.StoredTime) / 1000
      if (storedSeconds > 3600) {
        // console.log('fetch fresh')
        // every 1hr we fetch new data
        this.getApiData()
      } else {
        // console.log('fetch stored')
        this.SET_SUMMARY_CASES(storedData.Countries)
        this.initDom = true
      }
    } else {
      this.getApiData()
    }
  },
  methods: {
    ...mapActions(['fetchSummaryCases']),
    ...mapMutations(['SET_SUMMARY_CASES']),
    async getApiData() {
      const countries = await this.fetchSummaryCases()
      this.initDom = true
      // we set to localstorage
      localStorage.setItem(
        'covid19',
        JSON.stringify({
          Countries: countries,
          StoredTime: new Date().getTime()
        })
      )
    }
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
