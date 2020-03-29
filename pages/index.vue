<template lang="pug">
  div.d-flex.flex-column
    div.row.m-0
      div.col-4.bg-success
        h1 Col -1
      div.col-4.bg-secondary
        h1 Col -2
      div.col-4.bg-primary
        h1 Col -3
    div.flex-grow-1
      CountriesMap
</template>

<script>
import CountriesMap from '@/components/countries/CountriesMap'
export default {
  layout: 'dashboard',
  components: {
    CountriesMap
  }
}
</script>

<style scoped></style>
