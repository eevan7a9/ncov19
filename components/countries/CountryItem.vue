<template lang="pug">
  div#countryItem
    label.w-100.p-2.m-0 {{country.Country}}
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
