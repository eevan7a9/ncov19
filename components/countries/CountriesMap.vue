<template lang="pug">
#mapContainer.h-100.w-100
  client-only
    l-map(:zoom='map.zoom', :center='map.center')
      l-tile-layer(:url='tile.url', :attribution='tile.attribution')
      l-choropleth-layer(
        :data='getSummaryCases',
        titleKey='country',
        idKey='country',
        :value='value',
        :extraValues='extraValues',
        geojsonIdKey='id',
        :geojson='countriesGeojson',
        :colorScale='colorScale'
      )
      //- l-marker(v-for="(marker, index) in getCountriesCases" :key="index" :lat-lng="marker.latLang")
      //- l-circle(
      //-   v-for="(marker, index) in getCountriesCases" :key="index"
      //-   :lat-lng="marker.latLang"  :color="circle.color"
      //-   :fillColor="circle.fillColor" :fillOpacity="circle.fillOpacity"
      //-   :radius="marker.radius * 2"
      //-    @add="$nextTick(()=> checkCountryIsTopFive($event.target, marker))"
      //- )
      //-   l-popup(:options="{closeOnClick: false,autoClose: false}")
      //-     p.m-0.p-0.text-center.text-uppercase
      //-       strong {{marker.Country}}
      //-     p.m-0.p-0 Total Confirmed :
      //-       strong.text-info {{marker.TotalConfirmed}}
      //-     p.m-0.p-0 Total Deaths :
      //-       strong.text-danger {{marker.TotalDeaths}}
      //-     p.m-0.p-0 Total Recovered :
      //-       strong.text-success {{marker.TotalRecovered}}
      //-     p.text-center.text-uppercase.m-0.mt-1.p-0
      //-       router-link(:to="{ name: 'Cases-country', params: { country:marker.name }}").font-weight-bolder.text-primary
      //-         u More Details
</template>

<script>
import countriesGeojson from 'assets/geojson/countries.json'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'CountriesMap',
  data() {
    return {
      value: {
        key: 'amount_w',
        metric: '% girls'
      },
      extraValues: [
        {
          key: 'amount_m',
          metric: '% boys'
        }
      ],
      colorScale: ['e7d090', 'e9ae7b', 'de7062'],
      map: {
        zoom: 4,
        center: [47.31322, -1.319482]
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
  computed: {
    ...mapGetters(['getSummaryCases']),
    ...mapGetters('countries', ['getCountriesCases']),
    countriesGeojson() {
      return countriesGeojson
    }
  },
  watch: {
    getSummaryCases() {
      this.setCountriesInfo()
      this.$nextTick(() => {
        this.map.center = [47.31322, -1.319482]
      })
    }
  },
  mounted() {
    this.setCountriesInfo()
    this.$nextTick(() => {
      this.map.center = [47.31322, -1.319482]
    })
    // eslint-disable-next-line no-console
    console.log(countriesGeojson)
  },
  created() {},
  methods: {
    ...mapActions('countries', ['setCountriesInfo']),
    checkCountryIsTopFive(target, marker) {
      // top three highest cases will inititalize with open popup
      const inTopThree = this.getCountriesCases
        .slice(0, 3)
        .some((top) => top.Country === marker.Country)
      if (inTopThree) {
        target.openPopup()
      }
    }
  }
}
</script>

<style scoped></style>
