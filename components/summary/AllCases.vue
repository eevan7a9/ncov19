<template lang="pug">
  div#allCases.d-flex.justify-content-center.align-items-center
    div.chart-container.img-fluid(v-if="data")
      AllDoughnut.all-doughnut(:chart-data="data" :options="options")
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
      data: null,
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
  computed: mapGetters(['getSummaryCases']),
  mounted() {
    this.fillData()
  },
  methods: {
    fillData() {
      this.data = {
        labels: ['Died', 'Cases', 'Treated'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: ['#dc3545', '#17a2b8', '#28a745'],
            data: [5982, 92472, 12285]
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
