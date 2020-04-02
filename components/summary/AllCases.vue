<template lang="pug">
  div#allCases.d-flex.justify-content-center.align-items-center
    div.chart-container.img-fluid(v-if="data")
      DoughnutChart.all-doughnut(:chart-data="data" :options="options")
</template>

<script>
import { mapGetters } from 'vuex'
import DoughnutChart from '@/components/charts/DoughnutChart'
export default {
  name: 'AllCases',
  components: {
    DoughnutChart
  },
  data() {
    return {
      data: null,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: '',
          fontColor: 'aliceblue'
        },
        legend: {
          position: 'top',
          labels: {
            fontColor: 'aliceblue',
            fontSize: 10
          }
        }
      }
    }
  },
  computed: mapGetters(['getSummaryCases', 'getTotalNumbers']),
  mounted() {
    this.fillData({
      active: this.getTotalNumbers.active,
      death: this.getTotalNumbers.death,
      treated: this.getTotalNumbers.treated
    })
    this.options.title.text = `Total Number of confirmed cases: ${this.getTotalNumbers.cases}`
  },
  methods: {
    fillData({ active, death, treated }) {
      this.data = {
        labels: ['Active', 'Death', 'Treated'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: ['#ffc107', '#dc3545', '#28a745'],
            data: [active, death, treated]
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#allCases {
  overflow: hidden;
  height: 100%;
  padding-bottom: 5px;
  .chart-container {
    width: 300px;
    width: 300px;
    .all-doughnut {
      max-height: 300px;
      width: 100%;
    }
  }
}
</style>
