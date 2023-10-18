<script lang="ts" setup>
import { ChartDataset } from 'chart.js';
import { storeToRefs } from 'pinia';

const labels = ref<string[]>(["Cases"])
const datasets = ref<ChartDataset<"bar">[]>([])

const covidCasesStore = useCovidCasesStore()
const { topCountriesByCases } = storeToRefs(covidCasesStore)

function scaleTickCallback(tickValue: number) {
    return (tickValue < 1000000) ? tickValue / 1000 + 'K' : tickValue / 1000000 + 'M';
}

onMounted(() => {

    const highestDeaths = topCountriesByCases.value[1]?.casesCumulativeTotal || 0

    datasets.value = topCountriesByCases.value.map((country) => (
        {
            label: country.countryCode,
            data: [Number(country.casesCumulativeTotal)],
            backgroundColor: shadeColor(
            Number(country?.casesCumulativeTotal),
            Number(highestDeaths))
        }
    ))
})
</script>

<template>
    <div class="w-full bg-white opacity-80 hover:opacity-100">
        <utils-charts-bar-chart :bar-data="{ labels, datasets }" :title="'Top Coutries by Case'"
            :scale-tick-callback="scaleTickCallback" v-if="datasets.length" />
    </div>
</template>
