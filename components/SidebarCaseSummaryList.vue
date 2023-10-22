<script lang="ts" setup>
import { storeToRefs } from 'pinia';

const covidCasesStore = useCovidCasesStore()
const router = useRouter()
const { globalCases } = storeToRefs(covidCasesStore)
</script>


<template>
    <div class="h-full overflow-x-hidden overflow-y-auto custom-dark-scrollbar">
        <div class="flex flex-col gap-4 px-3 pt-6">
            <template v-for="(country, i) of globalCases" :key="i">
                <div class="bg-white cursor-pointer rounded-md hover:bg-gray-100"
                    @click="alpha2RouteQuery(country.countryCode, router)" v-if="i">
                    <h1 class="text-xl font-bold mb-3 border-b-2 py-3 px-4">
                        {{ country.name }}
                        <small v-if="country.countryCode">
                            ({{ country.countryCode }})
                        </small>
                    </h1>

                    <ul class="flex flex-col ga3 justify-between  xl:flex-row xl:gap-5 mb-3 px-4 py-3">
                        <li class="flex flex-col">
                            <span class=" font-semibold">Region</span>
                            <span v-if="country.name !== 'Global'">{{ country.whoRegion }}</span>
                            <span v-else>World</span>
                        </li>
                        <li class="flex flex-col">
                            <span class=" font-semibold">Total Cases</span>
                            <span>{{ formatNumberWithCommas(country.casesCumulativeTotal) }}</span>
                        </li>
                        <li class="flex flex-col">
                            <span class=" font-semibold">Total Deaths</span>
                            <span>{{ formatNumberWithCommas(country.deathsCumulativeTotal) }}</span>
                        </li>
                    </ul>

                    <ul class="gap-3 px-4 border-t-2 py-3">
                        <li class="flex flex-col mb-3">
                            <span class=" font-semibold">Cases Per Hundred Thousand</span>
                            <span>{{ formatNumberWithCommas(country.casesCumulativeTotalPer100000Population) }}</span>
                        </li>
                        <li class="flex flex-col">
                            <span class=" font-semibold">Death Per Hundred Thousand</span>
                            <span>{{ formatNumberWithCommas(country.casesCumulativeTotal) }}</span>
                        </li>
                    </ul>
                </div>
            </template>

        </div>
    </div>
</template>