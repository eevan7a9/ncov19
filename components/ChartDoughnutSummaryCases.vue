<script lang="ts" setup>
import type { ChartDataset } from 'chart.js';

const props = defineProps<{ country?: CountriesTotalCase }>()
const labels = ref<string[]>([
    'Cases',
    'Deaths',
])
const datasets = ref<ChartDataset<"doughnut">[]>([{
    data: [300, 20],
    backgroundColor: [
        'rgb(255 111 9)',
        'rgb(139 5 5)',
    ],
    hoverOffset: 4
}]);


onMounted(() => {
    datasets.value = [{
        data: [Number(props.country?.casesCumulativeTotal), Number(props.country?.deathsCumulativeTotal)],
        backgroundColor: [
            'rgb(255 111 9)',
            'rgb(139 5 5)',
        ],
        hoverOffset: 4
    },
    ]
})
</script>

<template>
    <utils-charts-doughnut-chart :doughnut-data="datasets" :labels="labels" :title="'Summary Cases'" text-color="#000"
        :legendSize="20" v-if="props.country"></utils-charts-doughnut-chart>
</template>