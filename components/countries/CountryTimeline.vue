<template lang="pug">
  div#countryTimeline.h-100.bg-info
    div.chart-container(v-if="datacollection")
      LineChart.country-timeline(:chart-data="datacollection" :options="options")

</template>

<script>
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
            fontColor: 'aliceblue',
            fontSize: 10
          }
        }
      }
    }
  },
  mounted() {
    this.fillData()
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: [this.getRandomInt(), this.getRandomInt()],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [this.getRandomInt(), this.getRandomInt()]
          },
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [this.getRandomInt(), this.getRandomInt()]
          }
        ]
      }
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
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
