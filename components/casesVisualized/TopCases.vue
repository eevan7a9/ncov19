<template lang="pug">
  div#topCases.d-flex.justify-content-center.align-items-center
    div.chart-container.img-fluid(v-if="data")
      BarChart.bar-chart(:chart-data="data" :options="options")
</template>

<script>
import { mapGetters } from 'vuex'
import BarChart from '@/components/charts/BarChart'
export default {
  name: 'TopCases',
  components: {
    BarChart
  },
  data() {
    return {
      data: null,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          labels: {
            fontColor: 'aliceblue',
            fontSize: 10
          }
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ],
          xAxes: [
            {
              ticks: {
                fontColor: 'aliceblue',
                fontSize: 14,
                callback: (value) => {
                  return value.substr(0, 10)
                }
              }
            }
          ]
        }
      }
    }
  },
  computed: mapGetters(['getSummaryCases']),
  watch: {
    getSummaryCases() {
      this.fillData()
    }
  },
  mounted() {
    this.fillData()
  },
  methods: {
    fillData() {
      if (this.getSummaryCases.length) {
        const countries = this.getSummaryCases
          .map((country) => {
            if (country.Country) {
              return {
                Country: country.Country,
                TotalConfirmed: country.TotalConfirmed
              }
            }
          })
          .sort((a, b) => b.TotalConfirmed - a.TotalConfirmed)
        this.data = {
          labels: [
            countries[0].Country,
            countries[1].Country,
            countries[2].Country
          ],
          fontColor: 'red',
          datasets: [
            {
              label: 'Top Cases',
              backgroundColor: ['#a50212', '#ff5503', '#ef9a00'],
              data: [
                countries[0].TotalConfirmed,
                countries[1].TotalConfirmed,
                countries[2].TotalConfirmed
              ]
            }
          ]
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#topCases {
  overflow: hidden;
  height: 100%;
  padding-bottom: 5px;
  .chart-container {
    width: 300px;
    width: 300px;
    .bar-chart {
      max-height: 300px;
      width: 100%;
    }
  }
}
</style>
