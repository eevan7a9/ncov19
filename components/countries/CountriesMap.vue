/* eslint-disable no-console */
<template>
  <div id="mapContainer" class="h-100 w-100">
    <client-only>
      <l-map :zoom="map.zoom" :center="map.center">
        <l-tile-layer
          :url="tile.url"
          :attribution="tile.attribution"
        ></l-tile-layer>
        <l-geo-json
          v-if="true"
          :geojson="countriesGeojson"
          :options="options"
          :options-style="styleFunction"
        ></l-geo-json>
        <l-circle
          v-for="(marker, index) in getCountriesCases"
          :key="index"
          :lat-lng="marker.latLang"
          :color="circle.color"
          :fill-color="circle.fillColor"
          :fill-opacity="circle.fillOpacity"
          :radius="marker.radius * 2"
          @add="$nextTick(()=&gt; checkCountryIsTopFive($event.target, marker))"
        ></l-circle>
        <!-- <l-marker
          v-for="(marker, index) in getCountriesCases"
          :key="index"
          :lat-lng="marker.latLang"
        >
          <l-popup :options="{ closeOnClick: false, autoClose: false }">
            <p class="m-0 p-0 text-center text-uppercase">
              <strong>{{ marker.Country }}</strong>
            </p>
            <p class="m-0 p-0">
              Total Confirmed :<strong class="text-info">{{
                marker.TotalConfirmed
              }}</strong>
            </p>
            <p class="m-0 p-0">
              Total Deaths :<strong class="text-danger">{{
                marker.TotalDeaths
              }}</strong>
            </p>
            <p class="m-0 p-0">
              Total Recovered :<strong class="text-success">{{
                marker.TotalRecovered
              }}</strong>
            </p>
            <p class="text-center text-uppercase m-0 mt-1 p-0">
              <router-link
                class="font-weight-bolder text-primary"
                :to="{
                  name: 'Cases-country',
                  params: { country: marker.name }
                }"
                ><u>More Details</u></router-link
              >
            </p>
          </l-popup>
        </l-marker> -->
      </l-map>
    </client-only>
  </div>
</template>

<script>
import countriesGeojson from 'assets/geojson/countries.json'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'CountriesMap',
  data() {
    return {
      fillColor: '#e4ce7f',
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
    },
    options() {
      return {
        onEachFeature: this.onEachFeatureFunction
      }
    },
    styleFunction() {
      const fillColor = this.fillColor // important! need touch fillColor in computed for re-calculate when change fillColor
      return () => {
        return {
          weight: 2,
          color: '#ECEFF1',
          opacity: 1,
          fillColor,
          fillOpacity: 1
        }
      }
    },
    onEachFeatureFunction() {
      return (feature, layer) => {
        layer.bindTooltip(
          '<div>code:' +
            'people' +
            '</div><div>nom: ' +
            'of the world' +
            '</div>',
          { permanent: false, sticky: true }
        )
      }
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
    // eslint-disable-next-line no-console
    console.log(this.map)
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
