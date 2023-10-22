<script lang="ts" setup>
import { type ChartDataset } from 'chart.js';
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
    <div class="bg-custom-bar w-full pt-6">
        <utils-charts-bar-chart :bar-data="{ labels, datasets }" :title-size="20" :title="'Top Coutries by Case'"
            :scale-tick-callback="scaleTickCallback" v-if="datasets.length" />
    </div>
</template>

<style lang="scss" scoped>
.bg-custom-bar {
    background-color: rgba(255, 255, 255, 0.13);
    transition: background-color 300ms linear;
    &:hover {
        background-color: rgba(255, 255, 255, 0.527);
    }
}
</style>