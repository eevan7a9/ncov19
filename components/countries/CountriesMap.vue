<template lang="pug">
  div#mapContainer.h-100.w-100
    client-only
      l-map(:zoom="map.zoom" :center="map.center")
        l-tile-layer(:url="tile.url" :attribution="tile.attribution")
        //- l-marker(v-for="(marker, index) in getCountriesCases" :key="index" :lat-lng="marker.latLang")
        l-circle(
          v-for="(marker, index) in getCountriesCases" :key="index"
          :lat-lng="marker.latLang"  :color="circle.color"
          :fillColor="circle.fillColor" :fillOpacity="circle.fillOpacity"
          :radius="marker.radius * 2"
           @add="$nextTick(()=> checkCountryIsTopFive($event.target, marker))"
        )
          l-popup(:options="{closeOnClick: false,autoClose: false}")
            p.m-0.p-0.text-center.text-uppercase
              strong {{marker.Country}}
            p.m-0.p-0 Total Confirmed :
              strong.text-primary {{marker.TotalConfirmed}}
            p.m-0.p-0 Total Deaths :
              strong.text-danger {{marker.TotalDeaths}}
            p.m-0.p-0 Total Recovered :
              strong.text-success {{marker.TotalRecovered}}
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
        fillOpacity: 0.3
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
    checkCountryIsTopFive(target, marker) {
      const inTopFive = this.getCountriesCases
        .slice(0, 4)
        .some((top) => top.Country === marker.Country)
      if (inTopFive) {
        target.openPopup()
      }
    }
  }
}
</script>

<style scoped></style>
