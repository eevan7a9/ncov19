<script setup lang="ts">
import { storeToRefs } from 'pinia';

defineProps({
    showList: Boolean
})

const covidCasesStore = useCovidCasesStore()
const { countries } = storeToRefs(covidCasesStore)
if (!covidCasesStore.countries.length) {
    const response = await useFetch('/api/countries')
    setTimeout(() => {
        covidCasesStore.setCountriesList(response.data?.value || [])
    }, 3000)
}
</script>

<template>
    <ul class="text-white overflow-auto h-full" v-if="showList">
        <li class="pl-4 pr-2 py-2 cursor-pointer hover:bg-gray-700" v-for="counry of countries">
            {{ counry.country }}
        </li>
    </ul>
</template>
