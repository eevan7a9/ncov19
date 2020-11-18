/* eslint-disable no-console */
<template>
  <div id="mapContainer" class="h-100 w-100">
    <client-only>
      <l-map :zoom="map.zoom" :center="map.center">
        <l-tile-layer
          :url="tile.url"
          :attribution="tile.attribution"
        ></l-tile-layer>
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
        <l-marker
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
        </l-marker>
        <l-choropleth-layer
          :data="getSummaryCases"
          title-key="country"
          id-key="alpha3"
          :value="value"
          :extra-values="extraValues"
          geojson-id-key="id"
          :geojson="countriesGeojson"
          :color-scale="colorScale"
          ><template slot-scope="props"
            ><l-info-control
              :item="props.currentItem"
              :unit="props.unit"
              title="Country"
              placeholder="Hover over a country"
            ></l-info-control
            ><l-reference-chart
              title="Covid 19 Cases"
              :color-scale="colorScale"
              :min="props.min"
              :max="props.max"
              position="topright"
            ></l-reference-chart></template
        ></l-choropleth-layer>
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
      value: {
        key: 'TotalConfirmed',
        metric: 'cases'
      },
      extraValues: [
        {
          key: '',
          metric: ''
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
    console.log(this.getSummaryCases)
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
