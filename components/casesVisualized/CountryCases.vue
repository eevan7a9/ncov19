<template lang="pug">
  div#countryCases.d-flex.justify-content-center.align-items-center
    div.chart-container.img-fluid(v-if="data")
      DoughnutChart.all-doughnut(:chart-data="data" :options="options")
</template>

<script>
import { mapGetters } from 'vuex'
import DoughnutChart from '@/components/charts/DoughnutChart'
export default {
  name: 'CountryCases',
  components: {
    DoughnutChart
  },
  props: {
    country: {
      require: true,
      type: String,
      default: () => 'USA'
    }
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
  computed: mapGetters('countries', ['getCountriesCases']),
  mounted() {
    const countryDetails = this.getCountriesCases.find(
      (c) => c.name.toLowerCase() === this.country.toLowerCase()
    )
    const active =
      countryDetails.TotalConfirmed -
      (countryDetails.TotalDeaths + countryDetails.TotalRecovered)
    this.fillData({
      active,
      death: countryDetails.TotalDeaths,
      treated: countryDetails.TotalRecovered
    })
    this.options.title.text = `Total Number of confirmed cases: ${countryDetails.TotalConfirmed}`
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
#countryCases {
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
