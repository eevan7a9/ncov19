<script>
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  props: {
    chartdata: {
      required: true,
      type: Object
    },
    options: {
      required: true,
      type: Object
    }
  },
  mounted() {
    this.renderChart(this.chartdata, this.options)
  }
}
</script>

<style></style>
