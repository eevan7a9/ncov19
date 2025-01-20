<script setup lang="ts">
import { storeToRefs } from 'pinia';

const props = defineProps({
    showList: Boolean,
    filterCountry: String
});

const covidCasesStore = useCovidCasesStore();
const { countries } = storeToRefs(covidCasesStore);

const countriesList = computed(() => {
    const text = props.filterCountry?.toLowerCase().trim()
    if (!text) {
        return countries.value;
    }
    const filterCountries = countries.value.filter((item) => {
        if (item.country.toLowerCase().includes(text) || item.countryCode.toLowerCase() === text) {
            return item;
        }
    });
    return filterCountries;
})

</script>

<template>
    <ul class="text-white overflow-auto h-full custom-dark-scrollbar" v-if="props.showList">
        <li class="pl-4 pr-5 py-2 cursor-pointer hover:bg-gray-700 flex justify-between"
            v-for="(counry, i) of countriesList" :key="i" @click="alpha2RouteQuery(counry.countryCode, $router)">
            <p class="block text-ellipsis line-clamp-1 whitespace-nowrap">{{ counry.country }}</p>
            <span>{{ counry?.emoji }}</span>
        </li>
    </ul>
</template>
