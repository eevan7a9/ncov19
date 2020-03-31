<script>
import { Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
export default {
  extends: Doughnut,
  mixins: [reactiveProp],
  props: {
    options: {
      required: false,
      type: Object,
      default: () => []
    }
  },
  watch: {
    chartData() {
      this.$data._chart.update()
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
