<template lang="pug">
  div.container.pt-md-5
    div#resultCountries
      div.py-5.vh-100.d-flex.justify-content-center.align-items-center(v-if="!countries.isFetched")
        b-spinner(
          style="width: 3rem; height: 3rem;"
          label="Large Spinner"
          variant="danger")
      div.row.justify-content-center
        div.col-10
          h2(v-if="countries.content.length") Country:
          b-card.overflow-hidden.mb-3(v-for="(country,i) in countries.content" :key="i"
            no-body @click="countryCase(country.name_2nd ? country.name_2nd : country.name)"
            style="cursor:pointer"
            )
            b-row( no-gutters )
              b-col
                b-card-header.text-center
                  h6.m-0.p-0 Country
                b-card-body
                  div.row
                    div.col-sm-6.text-primary.text-capitalize
                      h3 {{country.name}}
                    div.col-sm-6
                      p Country Code: {{country.country_code}}
                  b-card-text
                    strong Capital
                    | &nbsp;{{country.capital}}
    hr
    div#resultMedia.row.justify-content-center
      div.col-md-10
        h3(v-if="media.content.length") Media:
        div.media-container.row.justify-content-center.p-2
          div(v-for="(item, i) in media.content" :key="i" class="col-lg-12" style="height='200px'")
            MediaItem(:media="item" :showPhoto="false")
</template>

<script>
import axios from 'axios'
import countriesInfo from '@/assets/countries-info.json'
import MediaItem from '@/components/cdc/MediaItem'
export default {
  components: {
    MediaItem
  },
  async fetch() {
    if (this.$route.params.content) {
      const content = this.$route.params.content
      const searchedMedia = await axios.get(
        `https://tools.cdc.gov/api/v2/resources/media?namecontains=${content}`
      )
      this.media.content = searchedMedia.data.results.filter(
        (media) => media.language.isoCode === 'eng'
      )
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
  },
  methods: {
    countryCase(country) {
      this.$router.push({ name: 'Cases-country', params: { country } })
    }
  }
}
</script>

<style lang="scss" scoped></style>
