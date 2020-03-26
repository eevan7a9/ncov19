<template lang="pug">
  div
    CountriesSearch.mb-2
    div#countryList(v-for="country in countries" :key="country.country")
      CountryItem(:country="country" v-if="country.Country")
</template>

<script>
import { mapGetters } from 'vuex'
import CountriesSearch from '@/components/countries/CountriesSearch'
import CountryItem from '@/components/countries/CountryItem'

export default {
  name: 'CountriesList',
  components: {
    CountriesSearch,
    CountryItem
  },
  computed: mapGetters('countries', ['countries'])
}
</script>

<style lang="scss" scoped></style>
