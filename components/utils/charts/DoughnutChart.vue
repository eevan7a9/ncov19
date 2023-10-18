<script lang="ts" setup>
import Chart, { ChartData, ChartItem } from 'chart.js/auto'

const acquisitions = ref<ChartItem>()
const props = withDefaults(defineProps<{
    doughnutData: ChartData<"doughnut">;
    title?: string;
    textColor?: string;
    titleSize?: number;
    legendSize?: number;
    scaleTickCallback?: Function
}>(), {
    title: 'Doughnut Chart',
    textColor: '#333',
    legendSize: 16
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
                color: props.textColor,
                font:{
                    size: 30
                },
                plugins: {
                    legend:{
                        labels:{
                            color: props.textColor,
                            font:{
                                size: props.legendSize,
                                weight: 'bold'
                            }
                        }
                    },
                    title: {
                        display: !!props.title,
                        text: props.title,
                        color:props.textColor,
                        font: {
                            size: 30,
                            weight: 'bold'
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