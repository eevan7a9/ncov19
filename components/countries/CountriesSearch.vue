<template lang="pug">
  div.pr-1
    input#searchCountry.w-100(
      type="text" v-model.trim="country" @keyup="filtering" placeholder="search..."
      )
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'CountriesSearch',
  data() {
    return {
      country: ''
    }
  },
  methods: {
    ...mapActions('countries', ['filterCountries']),
    filtering() {
      this.filterCountries(this.country)
    }
  }
}
</script>

<style scoped></style>
