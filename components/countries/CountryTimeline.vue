<template lang="pug">
  div#countryTimeline.h-100
    div.chart-container
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
      datacollection: {},
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
  watch: {
    getCountryDetailedCases(newValue, oldValue) {
      this.fillData()
    }
  },
  mounted() {
    this.fillData()
  },
  methods: {
    fillData() {
      const data = {
        dates: [],
        confirmed: [],
        deaths: [],
        recovered: []
      }
      this.getCountryDetailedCases.forEach(function(cases) {
        const date = new Date(cases.time)
        const ymd = `${date
          .getFullYear()
          .toString()
          .substr(-2)}-${date.getMonth() + 1}-${date.getDate()}`
        const alreadyExists = data.dates.find((d) => d === ymd)
        if (!alreadyExists) {
          data.dates.unshift(ymd)
          data.confirmed.unshift(cases.cases.total)
          data.deaths.unshift(cases.deaths.total)
          data.recovered.unshift(cases.cases.recovered)
        }
      })
      this.datacollection = {
        datasets: [
          {
            label: 'Confirmed',
            backgroundColor: '',
            borderColor: '#3f7bff',
            fill: false,
            data: data.confirmed
          },
          {
            label: 'Deaths',
            backgroundColor: '',
            borderColor: '#dc3545',
            fill: false,
            data: data.deaths
          },
          {
            label: 'Recovered',
            backgroundColor: '',
            borderColor: '#28a745',
            fill: false,
            data: data.recovered
          }
        ],
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: data.dates
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
