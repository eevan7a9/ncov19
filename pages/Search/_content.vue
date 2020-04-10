<template lang="pug">
  div.container.pt-md-5
    div#resultCountries
      h2 Countries:
      div.py-5.d-flex.justify-content-center.align-items-center(v-if="!countries.isFetched")
        b-spinner(
          style="width: 3rem; height: 3rem;"
          label="Large Spinner"
          variant="danger")
      h1(v-else) {{ countries.content}}
    hr
    div#resultMedia
      h3 Media:
      div.py-5.d-flex.justify-content-center.align-items-center(v-if="!media.isFetched")
        b-spinner(
          style="width: 3rem; height: 3rem;"
          label="Large Spinner"
          variant="danger")
      p {{media.content}}
</template>

<script>
import axios from 'axios'
import countriesInfo from '@/assets/countries-info.json'
export default {
  async fetch() {
    if (this.$route.params.content) {
      const content = this.$route.params.content
      const searchedMedia = await axios.get(
        `https://tools.cdc.gov/api/v2/resources/media?namecontains=${content}`
      )
      this.media.content = searchedMedia.data.results
      this.media.isFetched = true

      const countries = countriesInfo.countries
        .map((c) => {
          const item = {}
          if (c.name_2nd) {
            item.name_2nd = c.name_2nd
          }
          item.name = c.name
          item.country_code = c.country_code
          item.capital = c.capital
          return item
        })
        .filter((country) => {
          const matched = []
          if (country.name_2nd) {
            if (country.name_2nd.toLowerCase().includes(content.toLowerCase()))
              matched.push(1)
          }
          if (country.name.toLowerCase().includes(content.toLowerCase()))
            matched.push(1)
          if (
            content.toLowerCase().includes(country.country_code.toLowerCase())
          )
            matched.push(1)
          if (matched.length) return country
        })
      this.countries.content = countries
      this.countries.isFetched = true
    }
  },
  data() {
    return {
      media: {
        content: [],
        isFetched: false
      },
      countries: {
        content: [],
        isFetched: false
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
