<template lang="pug">
  div.h-100.bg-light
    //- p {{items}}
    b-table(striped sticky-header head-variant="dark"  hover :items="items" :fields="fields" caption-top)
      template(v-slot:table-caption)
        span.m-0.p-0.pl-1.text-secondary  Recent reports of {{countryName}} New Cases & New Deaths.
      template(v-slot:cell(new_cases)="data")
        b(:class="data.value ? 'text-primary' : 'text-success'")  {{ data.value }}
      template(v-slot:cell(new_deaths)="data")
        b(:class="data.value ? 'text-danger' : 'text-success'")  {{ data.value }}
      template(v-slot:cell(total_tests)="data")
        b(class="text-info")  {{ data.value }}
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CountryRecentCase',
  data() {
    return {
      countryName: '',
      fields: [
        {
          key: 'time',
          label: 'Date Time'
        },
        {
          key: 'new_cases',
          label: 'New Cases',
          formatter: (val) => {
            return !val ? 0 : val
          }
        },
        {
          key: 'new_deaths',
          label: 'New Deaths',
          formatter: (val) => {
            return !val ? 0 : val
          }
        },
        {
          key: 'total_tests',
          label: 'Total Tests',
          formatter: (val) => {
            return !val ? 'Not Available' : val
          }
        }
      ],
      items: []
    }
  },
  computed: mapGetters('countries', ['getCountryDetailedCases']),
  watch: {
    getCountryDetailedCases() {
      this.fillData()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.fillData()
    })
  },
  methods: {
    getCaseTime(dateTime) {
      const date = new Date(dateTime)
      const day = date.getDate()
      const month = date.toLocaleString('default', { month: 'long' })
      const time = date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      })
      return `${month} ${day} ${time}`
    },
    fillData() {
      const reports = this.getCountryDetailedCases.map((country) => {
        this.countryName = country.country
        return {
          time: this.getCaseTime(country.time),
          new_cases: country.cases.new,
          new_deaths: country.deaths.new,
          total_tests: country.tests.total
        }
      })
      this.items = reports.slice(0, 15)
    }
  }
}
</script>

<style lang="scss" scoped></style>
