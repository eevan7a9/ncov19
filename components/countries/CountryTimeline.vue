<template lang="pug">
  div#countryTimeline.h-100
    //- p {{getCountryDetailedCases}}
    div.chart-container(v-if="datacollection")
      LineChart.country-timeline(:chart-data="datacollection" :options="options")
</template>

<script>
import { mapGetters } from 'vuex'
import LineChart from '@/components/charts/LineChart'
export default {
  name: 'CountryTimeline',
  components: {
    LineChart
  },
  data() {
    return {
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
    this.$nextTick(() => {
      const data = {
        labels: [],
        confirmed: [],
        deaths: [],
        recovered: []
      }
      this.getCountryDetailedCases.forEach(function(cases) {
        const date = new Date(cases.time)
        data.labels.unshift(
          `${date
            .getFullYear()
            .toString()
            .substr(-2)}-${date.getMonth()}-${date.getDate()}`
        )

        data.confirmed.unshift(cases.cases.total)
        data.deaths.unshift(cases.deaths.total)
        data.recovered.unshift(cases.cases.recovered)
      })
      this.fillData({
        dates: data.labels,
        confirmed: data.confirmed,
        deaths: data.deaths,
        recovered: data.recovered
      })
      // this.fillData({
      //   dates: [],
      //   confirmed: [],
      //   deaths: []
      // })
    })
  },
  methods: {
    fillData({ dates, confirmed, deaths, recovered }) {
      this.datacollection = {
        datasets: [
          {
            label: 'Confirmed',
            backgroundColor: '',
            borderColor: '#3f7bff',
            fill: false,
            data: confirmed
          },
          {
            label: 'Deaths',
            backgroundColor: '',
            borderColor: '#dc3545',
            fill: false,
            data: deaths
          },
          {
            label: 'Recovered',
            backgroundColor: '',
            borderColor: '#28a745',
            fill: false,
            data: recovered
          }
        ],
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: dates
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
