<script setup>
import "leaflet/dist/leaflet.css"
import { LMap, LGeoJson, LTileLayer } from "@vue-leaflet/vue-leaflet";


const covidCasesStore = useCovidCasesStore()
const geojsonStore = useGeojsonStore()

const geojsonOptions = ref({
    onEachFeature: onEachFeatureFunction()
})
const center = ref([47.41322, -1.219482])
const zoom = ref(3)

function onEachFeatureFunction() {
    return (feature, layer) => {
        // console.log(toRaw(feature))
        layer.bindTooltip(
            "<div>code:" + feature.id +
            "</div>",
            { permanent: false, sticky: true }
        );
    };
}

if (!covidCasesStore.globalCases?.length) {
    try {
        const [globalCasesRes, geojsonRes] = await Promise.all([
            useFetch('/api/global-total-case'), useFetch('/api/geojson/countries')
        ])
        covidCasesStore.setGlobalCases(globalCasesRes.data.value)
        geojsonStore.setGeoJSONCountries(geojsonRes.data.value)
    } catch (error) {
        console.error(error)
    }
}
</script>

<template>
    <div class="bg-blue-200">
        <l-map :useGlobalLeaflet="false" v-model:zoom="zoom" v-model:center="center">
            <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">
            </l-tile-layer>
            <l-geo-json :geojson="geojsonStore.countries" :options="geojsonOptions" />
        </l-map>
    </div>
</template>

<style lang="scss" scoped></style>