<script lang="ts" setup>
import Chart, { type ChartData, type ChartItem } from 'chart.js/auto'

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
                    legend:{
                        labels: {
                            color: '#000',
                            font: {
                                size: 20
                            }
                        }
                    },
                    title: {
                        display: !!props.title,
                        text: props.title,
                        color: '#000',
                        font: {
                            size: 30,                            
                        }
                    }
                },
            }
        }
    );
})
</script>

<template>
    <canvas id="acquisitions" class="h-full w-full bg-white px-3 py-6 rounded-lg" ref="acquisitions"></canvas>
</template>