<template lang="pug">
  div#allCases.d-flex.justify-content-center.align-items-center
    div.chart-container
      AllDoughnut.chart(:chartdata="data" :options="options")
</template>

<script>
import { mapGetters } from 'vuex'
import AllDoughnut from '@/components/charts/AllDoughnut'
export default {
  name: 'AllCases',
  components: {
    AllDoughnut
  },
  data() {
    return {
      data: {
        datasets: [
          {
            borderColor: 'aliceblue',
            hoverBorderColor: '#fff',
            backgroundColor: ['#dc3545', '#17a2b8', '#28a745'],
            data: [5982, 92472, 12285]
          }
        ],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: ['Died', 'Cases', 'Treated']
      },
      options: {
        legend: {
          labels: {
            fontColor: 'aliceblue',
            fontSize: 10
          }
        }
      }
    }
  },
  computed: mapGetters(['getSummaryCases'])
}
</script>

<style lang="scss" scoped>
#allCases {
  overflow: hidden;
  height: 100%;
  padding-bottom: 5px;
  .chart-container {
    max-width: 300px;
    .chart {
      max-height: 100%;
      width: 100%;
    }
  }
}
</style>
