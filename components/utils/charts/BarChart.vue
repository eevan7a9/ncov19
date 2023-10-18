<script lang="ts" setup>
import Chart, { ChartData, ChartItem } from 'chart.js/auto'

const acquisitions = ref<ChartItem>()
const props = withDefaults(defineProps<{
    barData: ChartData<"bar">;
    title?: string;
    scaleTickCallback?: Function
}>(), {
    title: 'Bar Chart'
})

onMounted(async () => {
    if (!acquisitions.value) {
        return
    }
    new Chart(
        acquisitions.value,
        {
            type: 'bar',
            data: props.barData,

            options: {
                plugins: {
                    title: {
                        display: !!props.title,
                        text: props.title
                    }
                },
                scales: {
                    y: {
                        ticks: {
                            // @ts-ignore
                            callback: props.scaleTickCallback
                        }
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