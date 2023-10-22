<script lang="ts" setup>
import { storeToRefs } from 'pinia';

const covidCasesStore = useCovidCasesStore()
const { globalCases } = storeToRefs(covidCasesStore)
const geojsonStore = useGeojsonStore()

if (!globalCases.value.length) {
  try {
    const [globalCasesRes, geojsonRes, countriesRes] = await Promise.all([
      useFetch('/api/global-total-case'), useFetch('/api/geojson/countries'), useLazyFetch('/api/countries')
    ])
    covidCasesStore.setGlobalCases(globalCasesRes.data.value || [])
    geojsonStore.setGeoJSONCountries(geojsonRes.data.value || {})
    covidCasesStore.setCountriesList(countriesRes.data?.value || [])
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div>
    <!-- Markup shared across all pages, ex: NavBar -->
    <NuxtPage />
  </div>
</template>
