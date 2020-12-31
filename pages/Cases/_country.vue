<template lang="pug">
  div.d-flex.flex-column(v-if="initDom")
    div#topPanels.row.m-0.bg-dark(:class="showTopPanel ? 'show': 'hide'")
      div.country-cases.col-sm-4.p-0.h-100
        CountryCases(:country="country")
      div.country-numbers.col-sm-8.p-0.h-100
        CountryRecentCase
    button.slider-button.p-0.btn.btn-dark.d-flex.justify-content-center.align-items-center(
      @click="showTopPanel=!showTopPanel"
    )
      small
         BIconTriangleFill(:flip-v="!showTopPanel")
    div.flex-grow-1
      div.d-flex.justify-content-center.align-items-center.h-100
        b-spinner(style="width: 3rem; height: 3rem;" variant="danger" v-show="fetchingData")

      CountryTimeline(:key="showTopPanel" v-if="!fetchingData")

</template>

<script>
import { BIcon, BIconTriangleFill } from 'bootstrap-vue'
import { mapActions, mapMutations } from 'vuex'
import CountryTimeline from '@/components/countries/CountryTimeline'
import CountryRecentCase from '@/components/countries/CountryRecentCase'
import CountryCases from '@/components/casesVisualized/CountryCases'
export default {
  components: {
    BIcon,
    BIconTriangleFill,
    CountryTimeline,
    CountryRecentCase,
    CountryCases
  },
  layout: 'dashboard',
  // middleware: 'summaryCases',
  data() {
    return {
      fetchingData: false,
      initDom: true,
      showTopPanel: true,
      country: this.$route.params.country
    }
  },
  mounted() {
    const storedCases = JSON.parse(localStorage.getItem(`${this.country}`))

    if (storedCases) {
      const storedSeconds =
        (new Date().getTime() - storedCases.StoredTime) / 1000
      // if stored data is more than one hour we fetch a new one
      if (storedSeconds > 3600 || storedCases.Slug !== this.country) {
        localStorage.removeItem('DetailedCases')
        this.getDetailedCases().then(() => {
          this.initDom = true
          // console.log('fetch fresh - time expired or different slug')
        })
      } else {
        // if the stored data is lesss than 1hr old we fetch it
        // console.log('fetch stored')
        this.SET_COUNTRY_DETAILS(storedCases.Cases)
        this.initDom = true
      }
    } else {
      this.getDetailedCases().then(() => {
        this.initDom = true
        // console.log('fetch fresh - first')
      })
    }
  },
  methods: {
    ...mapActions('countries', ['fetchCountryDetailedCases']),
    ...mapMutations('countries', ['SET_COUNTRY_DETAILS']),

    async getDetailedCases() {
      try {
        this.fetchingData = true
        // console.log('fetching...')
        const cases = await this.fetchCountryDetailedCases(this.country)
        // console.log('done...')
        this.fetchingData = false
        // we store the data to localstorage
        localStorage.setItem(
          `${this.country}`,
          JSON.stringify({
            // cases of the country
            Cases: cases,
            Slug: this.country,
            // holds time item was stored
            StoredTime: new Date().getTime()
          })
        )
      } catch (error) {}
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
