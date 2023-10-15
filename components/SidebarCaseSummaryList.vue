<script setup>
import { storeToRefs } from 'pinia';

const covidCasesStore = useCovidCasesStore()
const { globalCases } = storeToRefs(covidCasesStore)
</script>


<template>
    <div class="h-full overflow-auto">
        <div class="flex flex-col gap-4 px-3 pt-6">
            <div v-for="(country, i) of globalCases" :key="i" class="bg-white rounded-sm p-3 cursor-pointer hover:bg-gray-100">
                <h1 class="text-xl font-bold mb-3">
                    {{ country.name }}
                    <small v-if="country.countryCode">
                        ({{ country.countryCode }})
                    </small>
                </h1>

                <ul class="flex flex-col  xl:flex-row xl:gap-5 mb-3">
                    <li class="flex flex-col">
                        <span class=" font-semibold">Total Cases</span>
                        <span>{{ formatNumberWithCommas(country.casesCumulativeTotal) }}</span>
                    </li>
                    <li class="flex flex-col">
                        <span class=" font-semibold">Total Deaths</span>
                        <span>{{ formatNumberWithCommas(country.deathsCumulativeTotal) }}</span>
                    </li>
                </ul>

                <ul>
                    <li class="flex flex-col">
                        <span class=" font-semibold">Cases Per Hundred Thousand</span>
                        <span>{{ formatNumberWithCommas(country.casesCumulativeTotalPer100000Population) }}</span>
                    </li>
                    <li class="flex flex-col">
                        <span class=" font-semibold">Death Per Hundred Thousand</span>
                        <span>{{ formatNumberWithCommas(country.casesCumulativeTotal) }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>