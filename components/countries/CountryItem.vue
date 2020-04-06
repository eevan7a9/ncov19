<template lang="pug">
  div#countryItem(@click="countryCase(country)")
    label.w-100.p-2.m-0(
      :class="{'bg-danger font-weight-bold' : country == $route.params.country}").
      {{country}}
</template>

<script>
export default {
  name: 'CountryItem',
  props: {
    country: {
      type: String,
      require: true,
      default: () => {
        return 'USA'
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
