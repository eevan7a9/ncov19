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
        <!-- <l-circle
          v-for="(marker, index) in getCountriesCases"
          :key="index"
          :lat-lng="marker.latLang"
          :color="circle.color"
          :fill-color="circle.fillColor"
          :fill-opacity="circle.fillOpacity"
          :radius="marker.radius * 2"
          @add="$nextTick(()=&gt; checkCountryIsTopFive($event.target, marker))"
        ></l-circle> -->
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
      fillColor: '#f2efe9',
      map: {
        zoom: 2,
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
        // console.log(feature.id)
        const foundCountry = this.getCountriesCases.find(
          (country) => country.alpha3 === feature.id
        )
        if (foundCountry) {
          // we bind tooltips when hover on
          const highestDeath = this.getCountriesCases[0].TotalDeaths
          const percentToHighest =
            (foundCountry.TotalDeaths / highestDeath) * 100

          layer.bindTooltip(
            `<h6>Country: <strong>${foundCountry.name}</strong></h6>
            <div>Total Confirmed: ${foundCountry.TotalConfirmed.toLocaleString()}</div>
            <div>Deaths: ${foundCountry.TotalDeaths.toLocaleString()} </div>`,
            { permanent: false, sticky: true }
          )
          // we set the layers styles
          layer.setStyle({
            color: 'red',
            fillColor: this.shadeColor(
              '#dc3545',
              this.getEquivalentPercentage(percentToHighest)
            ),
            fillOpacity: 0.8
          })
        }
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
    console.log(this.getCountriesCases)
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
    },
    shadeColor(color, percent) {
      let R = parseInt(color.substring(1, 3), 16)
      let G = parseInt(color.substring(3, 5), 16)
      let B = parseInt(color.substring(5, 7), 16)

      R = parseInt((R * (100 + percent)) / 100)
      G = parseInt((G * (100 + percent)) / 100)
      B = parseInt((B * (100 + percent)) / 100)

      R = R < 255 ? R : 255
      G = G < 255 ? G : 255
      B = B < 255 ? B : 255

      const RR =
        R.toString(16).length === 1 ? '0' + R.toString(16) : R.toString(16)
      const GG =
        G.toString(16).length === 1 ? '0' + G.toString(16) : G.toString(16)
      const BB =
        B.toString(16).length === 1 ? '0' + B.toString(16) : B.toString(16)

      return '#' + RR + GG + BB
    },
    getEquivalentPercentage(percentage) {
      const number = Math.ceil(percentage.toFixed(2))
      if (number <= 1) return +25
      if (number <= 10) return +15
      if (number <= 15) return 0
      if (number <= 25) return -15
      if (number <= 50) return -25
      if (number <= 65) return -30
      if (number <= 75) return -45
      if (number <= 85) return -60
      if (number <= 100) return -75
    }
  }
}
</script>

<style scoped></style>
