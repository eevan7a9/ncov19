<template lang="pug">
  div#mapContainer.h-100.w-100
    //- p {{getCountriesCases.slice(0,4)}}
    client-only(v-if="domReady")
      l-map(:zoom="map.zoom" :center="map.center")
        l-tile-layer(:url="tile.url" :attribution="tile.attribution")
        l-marker(v-for="(marker, index) in getCountriesCases" :key="index" :lat-lng="marker.latLang")


</template>

<script>
import countriesData from 'assets/dummy-data.json'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'CountriesMap',
  data() {
    return {
      map: {
        zoom: 4,
        center: [55.9464418, 8.1277591]
      },
      tile: {
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      },
      markers: [
        [55.1464418, 8.9277591],
        [55.9464418, 8.1274391]
      ],
      domReady: true
    }
  },
  computed: mapGetters('countries', ['getCountriesCases']),
  mounted() {
    this.getCountriesInfo(countriesData.Countries)
  },
  created() {},
  methods: {
    ...mapActions('countries', ['getCountriesInfo']),
    getCircleMarkers() {}
  }
}
</script>

<style scoped></style>
