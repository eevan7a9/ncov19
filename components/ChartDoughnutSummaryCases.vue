<script lang="ts" setup>

const props = defineProps<{ country?: CountriesTotalCase }>()
const data = ref({
    labels: [
        'Cases',
        'Deaths',
    ],
    datasets: [{
        labels: 'Cases',
        data: [300, 20],
        backgroundColor: [
            'rgb(255 111 9)',
            'rgb(139 5 5)',
        ],
        hoverOffset: 4
    }]
});


onMounted(() => {
    data.value.datasets = [{
        labels: "Cases",
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
    <utils-charts-doughnut-chart :doughnut-data="data" :title="'Summary Cases'"
        v-if="props.country"></utils-charts-doughnut-chart>
</template>