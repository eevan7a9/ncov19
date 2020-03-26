<template lang="pug">
  div
    div#countryList(v-for="country in countries" :key="country.country")
      CountryItem(:country="country" v-if="country.Country")
</template>

<script>
import countriesData from '@/assets/countries-list.json'
import CountryItem from '@/components/countries/CountryItem'
export default {
  name: 'CountriesList',
  components: {
    CountryItem
  },
  data() {
    return {
      countries: countriesData.countries
    }
  }
}
</script>

<style lang="scss" scoped></style>
