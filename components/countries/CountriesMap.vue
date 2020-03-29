<template lang="pug">
  div#mapContainer.h-100.w-100
    client-only
      l-map(:zoom="map.zoom" :center="map.center")
        l-tile-layer(:url="tile.url" :attribution="tile.attribution")
        //- l-marker(v-for="(marker, index) in getCountriesCases" :key="index" :lat-lng="marker.latLang")
        l-circle-marker(
          v-for="(marker, index) in getCountriesCases" :key="index"
          :lat-lng="marker.latLang"  :color="circle.color"
          :fillColor="circle.fillColor" :fillOpacity="circle.fillOpacity"
          :radius="marker.radius"
        )
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
      circle: {
        radius: 5,
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5
      }
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
