<script setup lang="ts">
import { LatLngExpression, PointExpression } from 'leaflet';
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
const markerRefs = ref<any[]>([])

function onEachFeatureFunction() {
    return (feature: GeoFeature, layer: any) => {
        const foundCountry = globalCases.value.find(
            (country) => country.countryCode === feature.properties.alpha2
        )
        layer.bindTooltip(
            `<div>
                <h1 class="text-xl font-semibold">
                    ${feature.properties.name} <small>(${feature.properties.alpha2})</small>
                </h1>
                <div class="text-base">
                    Total Cases: ${formatNumberWithCommas(foundCountry?.casesCumulativeTotal)}
                </div>
                <div class="text-base text-red-600">
                    Total Death: ${formatNumberWithCommas(foundCountry?.deathsCumulativeTotal)}
                </div>
                <div class="text-sm text-blue-700 mt-3">
                    (Click to learn more!!!)
                </div>
            </div>`,
            { permanent: false, sticky: true }
        );

        const highestDeaths = getTopThree.value[1]?.casesCumulativeTotal || 0
        layer.setStyle({
            color: '#690606', // Dark Burgundy
            fillColor: shadeColor(
                Number(foundCountry?.casesCumulativeTotal),
                Number(highestDeaths),
            ),
            fillOpacity: 0.8
        })
        layer.on('click', (e: PointerEvent) => {
            const target = e.target as any
            console.log(target.feature?.properties?.name)
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

/**
 * Open Markers Popup when ready
 */
function popReady(): void {
    for (const marker of markerRefs.value as any) {
        // mapObject or leafletObject
        marker.leafletObject.openPopup()
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

                <l-marker v-for="(country, i) of getTopThree" :key="country.name" :ref="el => { markerRefs[i] = el }"
                    @l-add="$event.target.openPopup()" :lat-lng="(country.latlng as LatLngExpression)">
                    <l-popup @ready="popReady" :options="{ closeOnClick: false, autoClose: false }">
                        <div class=" flex flex-col">
                            <h1 class="text-xl font-bold">
                                {{ country.name }} <small class="text-sm text-gray-500">Top #{{ i + 1 }}</small>
                            </h1>
                            <div class="text-sm">
                                Total Case: {{ formatNumberWithCommas(country.casesCumulativeTotal) }}
                            </div>
                            <div class="text-sm text-red-700">
                                Total Death: {{ formatNumberWithCommas(country.deathsCumulativeTotal) }}
                            </div>
                            <button class="text-blue-700 mx-auto mt-3 text-sm underline">More Details</button>
                        </div>
                    </l-popup>

                    <l-icon :icon-size="[64, 64]" :icon-anchor="[32, 15]" :icon-url="'/coronavirus.png'">
                    </l-icon>
                </l-marker>
            </l-map>
        </client-only>
    </div>
</template>

<style lang="scss">
// remove retangle square when click layer
path.leaflet-interactive:focus {
    outline: none;
}

// change leaflet canvas color 
.leaflet-container {
    background: #aad3df;
    outline: 0;
}
</style>