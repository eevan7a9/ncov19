<template lang="pug">
  div#countryTimeline.h-100(v-if="initDom")
    div.chart-container(v-if="datacollection")
      LineChart.country-timeline(:chart-data="datacollection" :options="options")
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import LineChart from '@/components/charts/LineChart'
export default {
  name: 'CountryTimeline',
  components: {
    LineChart
  },
  props: {
    country: {
      require: true,
      type: String,
      default: () => 'us'
    }
  },
  data() {
    return {
      initDom: false,
      datacollection: null,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          labels: {
            fontColor: '#333',
            fontSize: 10
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters('countries', ['getCountryDetailedCases'])
  },
  mounted() {
    this.fillData()

    const storedCases = JSON.parse(localStorage.getItem('DetailedCases'))

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
      const cases = await this.fetchCountryDetailedCases({
        countrySlug: this.country,
        status: 'confirmed'
      })
      // we store the data to localstorage
      localStorage.setItem(
        'DetailedCases',
        JSON.stringify({
          // cases of the country
          Cases: cases,
          Slug: this.country,
          // holds time item was stored
          StoredTime: new Date().getTime()
        })
      )
    },
    fillData() {
      this.datacollection = {
        datasets: [
          {
            label: 'data One',
            backgroundColor: '',
            borderColor: 'red',
            fill: false,
            data: [5, 15, 30, 35, 30, 38, 40, 38, 42]
          },
          {
            label: 'data two',
            backgroundColor: '',
            borderColor: 'green',
            fill: false,
            data: [10, 40, 60, 70, 40, 30, 30, 35, 28]
          }
        ],
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
          'jan',
          'march',
          'Feb',
          'aprl',
          'may',
          'june',
          'july',
          'aug',
          'sept'
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#countryTimeline {
  overflow: hidden;
  height: 100%;
  padding-left: 30px;
  .chart-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-right: -25px;
    margin-left: -25px;
    .country-timeline {
      flex: 100%;
      max-width: 100%;
    }
  }
}
</style>
