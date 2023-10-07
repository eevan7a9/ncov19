<script setup>
import "leaflet/dist/leaflet.css"
import { LMap, LGeoJson, LTileLayer } from "@vue-leaflet/vue-leaflet";


const geojson = ref(null)
const geojsonOptions = ref({})
const center = ref([47.41322, -1.219482])
const zoom = ref(3)


onMounted(async () => {
    const response = await useFetch('/api/geojson/countries')
    geojson.value = response.data.value
})

</script>

<template>
    <div class="bg-red-200">
        <l-map :useGlobalLeaflet="false" v-model:zoom="zoom" v-model:center="center">
            <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">
            </l-tile-layer>
            <l-geo-json :geojson="geojson" :options="geojsonOptions" />
        </l-map>
    </div>
</template>

<style lang="scss" scoped></style>