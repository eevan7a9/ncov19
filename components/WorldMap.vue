<script setup lang="ts">
import { Icon, IconOptions, LatLngExpression, PointExpression } from 'leaflet';
import { GeoJsonObject } from 'geojson';
import "leaflet/dist/leaflet.css"

import { LMap, LGeoJson, LTileLayer, LMarker, LPopup, LIcon } from "@vue-leaflet/vue-leaflet";
import { storeToRefs } from "pinia";

const covidCasesStore = useCovidCasesStore()
const { globalCases, getTopThree } = storeToRefs(covidCasesStore)

const geojsonStore = useGeojsonStore()
const { countriesGeoJSON } = storeToRefs(geojsonStore)


const geojsonOptions = ref({
    onEachFeature: onEachFeatureFunction()
})

const myMap = ref<any>(null)
const center = ref<PointExpression>([18.453557, -35.572679])
const zoom = ref(3)
const attribution = ref('&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors')

function onEachFeatureFunction() {
    return (feature: GeoFeature, layer: any) => {
        const foundCountry = globalCases.value.find(
            (country) => country.countryCode === feature.properties.alpha2
        )
        layer.bindTooltip(
            "<div>Cases:" + foundCountry?.casesCumulativeTotal +
            "</div>",
            { permanent: false, sticky: true }
        );

        const highestDeaths = getTopThree.value[1]?.casesCumulativeTotal || 0
        layer.setStyle({
            color: 'red',
            fillColor: shadeColor(
                Number(foundCountry?.casesCumulativeTotal),
                Number(highestDeaths),
            ),
            fillOpacity: 0.8
        })
    };
}




if (!globalCases.value.length) {
    try {
        const [globalCasesRes, geojsonRes] = await Promise.all([
            useFetch('/api/global-total-case'), useFetch('/api/geojson/countries')
        ])
        covidCasesStore.setGlobalCases(globalCasesRes.data.value || [])
        geojsonStore.setGeoJSONCountries(geojsonRes.data.value || {})
    } catch (error) {
        console.error(error)
    }
}

</script>

<template>
    <div class="bg-blue-200">

        <client-only>
            <l-map :useGlobalLeaflet="false" ref="myMap" v-model:zoom="zoom" :center="center">
                <l-tile-layer :max-zoom="6" :min-zoom="3" :no-wrap="true"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" :attribution="attribution">
                </l-tile-layer>

                <l-geo-json :geojson="(countriesGeoJSON as GeoJsonObject)" :options="geojsonOptions" />

                <l-marker v-for="country of getTopThree" @l-add="$event.target.openPopup()"
                    :lat-lng="(country.latlng as LatLngExpression)">
                    <l-popup>
                        <h1>text</h1>
                    </l-popup>

                    <l-icon :icon-size="[64, 64]" :icon-anchor="[32, 15]" :icon-url="'/coronavirus.png'">
                    </l-icon>
                </l-marker>
            </l-map>
        </client-only>
    </div>
</template>

<style lang="scss" scoped></style>