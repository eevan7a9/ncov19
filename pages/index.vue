<template lang="pug">
  div.d-flex.flex-column.h-100.w-100.overflow-hidden
    div.d-flex.justify-content-center.align-items-center.h-100(style="max-width: 100%" v-if="!initDom")
      b-spinner(style="width: 3rem; height: 3rem;" variant="danger" )
    div.d-flex.h-100.position-relative( v-else)
      div#topPanels.row.m-0.p-0.w-100
        div.data-container.row.w-100.m-0.p-0(:class="showTopPanel ? 'show': 'hide'" v-dragscroll)
          div.all-cases.col-md-4.col-sm-6.p-0.h-100
            GlobalNumbers
          div.top-cases.col-md-4.col-sm-6.p-0.h-100
            TopCases
          div.global-numbers.col-md-4.col-0.p-0.h-100
            AllCases
        button.col-12.slider-button.p-0.btn.d-flex.justify-content-center.align-items-center(
          @click="showTopPanel=!showTopPanel"
          :class="{'hide': !showTopPanel}"
        )
          small
            BIconTriangleFill(:flip-v="!showTopPanel")

      div.flex-grow-1()
        CountriesMap.mapContainer(:key="showTopPanel")
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import { BIcon, BIconTriangleFill } from 'bootstrap-vue'
import CountriesMap from '@/components/countries/CountriesMap'
import AllCases from '@/components/casesVisualized/AllCases'
import TopCases from '@/components/casesVisualized/TopCases'
import GlobalNumbers from '@/components/casesVisualized/GlobalNumbers'
export default {
  components: {
    BIcon,
    BIconTriangleFill,
    CountriesMap,
    AllCases,
    TopCases,
    GlobalNumbers
  },
  layout: 'dashboard',
  data() {
    return {
      initDom: false,
      showTopPanel: true
    }
  },
  mounted() {
    const storedData = JSON.parse(localStorage.getItem('covid19'))
    if (storedData) {
      if (storedData.Countries) {
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
        // if Countries are empty we fetch
        this.getApiData()
      }
    } else {
      // if no data is stored we fetch
      this.getApiData()
    }
  },
  methods: {
    ...mapActions(['fetchSummaryCases']),
    ...mapMutations(['SET_SUMMARY_CASES']),
    async getApiData() {
      const countries = await this.fetchSummaryCases()
      if (countries.length) {
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
}
</script>

<style lang="scss" scoped>
#topPanels {
  overflow: hidden;
  position: absolute;
  background: rgba(0, 0, 0, 0.507);
  width: 100%;
  z-index: 10000;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */

  .data-container {
    &.show {
      height: 335px;
    }
    &.hide {
      height: 0;
    }
  }
  div {
    border: 1px solid rgb(121, 121, 121);
  }
}
.slider-button {
  height: 25px;
  color: #c4c4c4;
  border-radius: 0;
  margin: 0;
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
  &.hide {
    background: rgb(43, 43, 43);
  }
}
@media (max-width: 768px) {
  #topPanels {
    overflow: hidden;
    overflow-y: scroll;
  }
}
</style>
