<script lang="ts" setup>

const props = defineProps<{ country?: CountryOvertimeCase }>()
const data = ref({
    labels: ['sad', 'life', 'Jsa', 's', 'aa', 'sad', 'sdasd'],
    datasets: [{
        label: 'Timeline Chart',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        backgroundColor: 'rgb(75, 192, 192, .2)',
    }]
});

function setChartData () {
    const labels = props.country?.data.map(item => item.date).reverse()
    const dataCases = props.country?.data.map(item => Number(item.newCases)).reverse()
    const dataDeaths = props.country?.data.map(item => Number(item.newDeaths)).reverse()

    data.value.labels = labels || [];
    data.value.datasets = [
        {
            label: 'Covid Cases',
            data: dataCases || [],
            fill: true,
            borderColor: 'rgb(255, 128, 0)',
            tension: 0.1,
            backgroundColor: 'rgb(218, 93, 0, .1)',
        },
        {

            label: 'Covid Deaths',
            data: dataDeaths || [],
            fill: true,
            borderColor: 'rgb(218, 13, 0) ',
            tension: 0.1,
            backgroundColor: 'rgb(218, 0, 57, .2)',
        }
    ]
}

onMounted(() => {
    setChartData()
})

watch(() => props.country ,() => {
    setChartData()
})
</script>

<template>
    <utils-charts-line-chart :line-data="data" :title="'Summary Timeline Cases'" v-if="props.country" />
</template>