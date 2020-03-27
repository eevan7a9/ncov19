<template lang="pug">
  div#countryItem(@click="countryCase(country.Slug)")
    label.w-100.p-2.m-0(
      :class="{'bg-danger font-weight-bold' : country.Slug == $route.params.country}").
      {{country.Country}}
</template>

<script>
export default {
  name: 'CountryItem',
  props: {
    country: {
      type: Object,
      require: true,
      default: () => {
        return {
          Country: ''
        }
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

<style lang="scss" scoped>
#countryItem {
  label:hover {
    cursor: pointer;
    background: #333;
  }
}
</style>
