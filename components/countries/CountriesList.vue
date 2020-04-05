<template lang="pug">
  div
    CountriesSearch.mb-2
    div#countryList(v-for="country in countries" :key="country.country")
      CountryItem(:country="country" v-if="country.Country")
</template>

<script>
import countriesList from '@/assets/countries-list.json'
import CountriesSearch from '@/components/countries/CountriesSearch'
import CountryItem from '@/components/countries/CountryItem'

export default {
  name: 'CountriesList',
  components: {
    CountriesSearch,
    CountryItem
  },
  data() {
    return {
      countries: []
    }
  },

  created() {
    this.countries = countriesList.countries.sort((a, b) =>
      a.Country.localeCompare(b.Country)
    )
  }
}
</script>

<style lang="scss" scoped></style>
