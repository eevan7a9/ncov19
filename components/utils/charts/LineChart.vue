<script lang="ts" setup>
import Chart, { ChartData, ChartItem } from 'chart.js/auto'

const acquisitions = ref<ChartItem>()
const props = withDefaults(defineProps<{
    lineData: ChartData<"line">;
    title?: string;
    scaleTickCallback?: Function
}>(), {
    title: 'Line Chart'
})

onMounted(async () => {
    if (!acquisitions.value) {
        return
    }
    new Chart(
        acquisitions.value,
        {
            type: 'line',
            data: props.lineData,

            options: {
                plugins: {
                    title: {
                        display: !!props.title,
                        text: props.title
                    }
                },
            }
        }
    );
})
</script>

<template>
    <canvas id="acquisitions" class="h-full w-full" ref="acquisitions"></canvas>
</template>