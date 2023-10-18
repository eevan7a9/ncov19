<script lang="ts" setup>
import { ChartDataset } from 'chart.js';
import { storeToRefs } from 'pinia';

const labels = ref<string[]>([])
const datasets = ref<ChartDataset<"doughnut">[]>([])

const covidCasesStore = useCovidCasesStore()
const { topCountriesByCases } = storeToRefs(covidCasesStore)

function setChartData() {
    if (!topCountriesByCases.value.length) return

    const [top1, top2, top3] = topCountriesByCases.value
    labels.value = [top1.countryCode || top1.name, top2.countryCode || top2.name, top3.countryCode || top3.name]

    const highestDeaths = topCountriesByCases.value[1]?.casesCumulativeTotal || 0
    datasets.value = [
        {
            data: [Number(top1.casesCumulativeTotal), Number(top2.casesCumulativeTotal), Number(top3.casesCumulativeTotal)],
            backgroundColor: [
                shadeColor(
                    Number(top1?.casesCumulativeTotal),
                    Number(highestDeaths),
                ),
                shadeColor(
                    Number(top2?.casesCumulativeTotal),
                    Number(highestDeaths)),
                shadeColor(
                    Number(top3?.casesCumulativeTotal),
                    Number(highestDeaths))
            ],
            hoverOffset: 4,
        },
    ]
}

watch(topCountriesByCases, () => {
    setChartData()
})

onMounted(() => {
    setChartData()
})
</script>

<template>
    <div class="w-full bg-custom-doughnut pb-6">
        <utils-charts-doughnut-chart :doughnut-data="datasets" :labels="labels" :textColor="'#000'" :title="'Top Cases'"
            v-if="datasets.length"></utils-charts-doughnut-chart>
    </div>
</template>


<style lang="scss" scoped>

.bg-custom-doughnut {
    background-color: rgba(255, 255, 255, 0.13);
    transition: background-color 300ms linear;
    &:hover {
        background-color: rgba(255, 255, 255, 0.438);
    }
}
</style>