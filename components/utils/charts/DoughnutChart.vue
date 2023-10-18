<script lang="ts" setup>
import Chart, { ChartData, ChartItem } from 'chart.js/auto'

const acquisitions = ref<ChartItem>()
const props = withDefaults(defineProps<{
    doughnutData: ChartData<"doughnut">;
    title?: string;
    scaleTickCallback?: Function
}>(), {
    title: 'Doughnut Chart'
})

onMounted(async () => {
    if (!acquisitions.value) {
        return
    }
    new Chart(
        acquisitions.value,
        {
            type: 'doughnut',
            data: props.doughnutData,
            options: {
                plugins: {
                    title: {
                        display: !!props.title,
                        text: props.title
                    }
                }
            }
        }
    );
})
</script>

<template>
    <canvas id="acquisitions" class="h-full w-full" ref="acquisitions"></canvas>
</template>