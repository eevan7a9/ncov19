<template lang="pug">
  div#countryTimeline.h-100
    p {{getCountryDetailedCases}}
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
    this.fillData()
  },
  methods: {
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
