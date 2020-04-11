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
  computed: mapGetters('countries', [
    'getCountriesCases',
    'getCountryDetailedCases'
  ]),
  watch: {
    getCountryDetailedCases: {
      // eslint-disable-next-line object-shorthand
      handler: function(newVal) {
        this.fillData()
      },
      deep: true
    }
  },
  mounted() {
    this.fillData()
  },
  methods: {
    fillData() {
      const doughnut = {}

      const countryDetails = this.getCountriesCases.find(
        (country) => country.name.toLowerCase() === this.country.toLowerCase()
      )

      if (countryDetails) {
        // if country exists in countries cases
        doughnut.active =
          countryDetails.TotalConfirmed -
          (countryDetails.TotalDeaths + countryDetails.TotalRecovered)
        doughnut.deaths = countryDetails.TotalDeaths
        doughnut.recovered = countryDetails.TotalRecovered
        doughnut.cases = countryDetails.TotalConfirmed
      } else {
        // if canot find country exists, we get the latest case
        const recentDetailed = this.getCountryDetailedCases[0]
        if (recentDetailed) {
          doughnut.active =
            recentDetailed.cases.total -
            (recentDetailed.deaths.total + recentDetailed.cases.recovered)

          doughnut.deaths = recentDetailed.deaths.total
          doughnut.recovered = recentDetailed.cases.recovered
          doughnut.cases = recentDetailed.cases.total
        }
      }

      this.options.title.text = `Total Number of confirmed cases: ${doughnut.cases}`
      this.data = {
        labels: ['Active', 'Death', 'Treated'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: ['#ffc107', '#dc3545', '#28a745'],
            data: [doughnut.active, doughnut.deaths, doughnut.recovered]
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
