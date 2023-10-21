<script lang="ts" setup>
import Chart, { type ChartData, type ChartDataset, type ChartItem } from 'chart.js/auto'

const acquisitions = ref<ChartItem>()
const props = withDefaults(defineProps<{
    doughnutData: ChartDataset<"doughnut">[];
    labels: string[],
    title?: string;
    textColor?: string;
    titleSize?: number;
    legendSize?: number;
    scaleTickCallback?: Function
}>(), {
    title: 'Doughnut Chart',
    titleSize: 30,
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
            data: {
                labels: props.labels,
                datasets: props.doughnutData
            },
            options: {
                color: props.textColor,
                font: {
                    size: 30
                },
                plugins: {
                    legend: {
                        labels: {
                            color: props.textColor,
                            font: {
                                size: props.legendSize,
                            }
                        }
                    },
                    title: {
                        display: !!props.title,
                        text: props.title,
                        color: props.textColor,
                        font: {
                            size: props.titleSize,
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