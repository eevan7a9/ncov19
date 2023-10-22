<script lang="ts" setup>
import Chart, { type ChartData, type ChartItem } from 'chart.js/auto'

const acquisitions = ref<ChartItem>()
const props = withDefaults(defineProps<{
    barData: ChartData<"bar">;
    title?: string;
    titleSize?: number;
    textColor?: string;
    scaleTickCallback?: Function
}>(), {
    title: 'Bar Chart',
    titleSize: 30,
    textColor: '#000'
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
                        text: props.title,
                        color: props.textColor,

                        font: {
                            size: props.titleSize,
                        }
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