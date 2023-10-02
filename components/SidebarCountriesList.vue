<script setup lang="ts">
type Country = {
    "countryCode": string,
    "country": string,
    "whoRegion": string
}
defineProps({
    showList: Boolean    
})
const response = await useFetch('/api/countries')
const countries = ref(response.data.value as Country[])
</script>

<template>
    <ul class="text-white overflow-auto h-full" v-if="showList">
        <li class="pl-4 pr-2 py-2 cursor-pointer hover:bg-gray-700" v-for="counry of countries">
            {{  counry.country }}
        </li>
    </ul>
</template>

<style scoped>
/* width */
::-webkit-scrollbar {
    width: 10px;
}
/* Track */
::-webkit-scrollbar-track {
    background: rgb(31 41 55 / var(--tw-bg-opacity));
}
/* Handle */
::-webkit-scrollbar-thumb {
    background: rgb(75 85 99 / var(--tw-bg-opacity));
    border-radius: 5px;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>