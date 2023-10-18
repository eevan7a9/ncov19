<script lang="ts" setup>
import { storeToRefs } from 'pinia';
const route = useRoute()
const covidCasesStore = useCovidCasesStore()
const { globalCases } = storeToRefs(covidCasesStore)
const emits = defineEmits<{ close: [id: boolean] }>()

const currentOverall = ref<CountriesTotalCase>()
const currentOvertime = ref<CountryOvertimeCase>()

const tableData = computed(() => {
    return currentOvertime.value?.data?.reverse() || []
})

onMounted(() => {
    const { alpha2 } = route.query
    if (typeof alpha2 === 'string' && alpha2) {
        setCurrentCountry(alpha2)
    }
})

watch(() => route.query, (newVal) => {
    const { alpha2 } = route.query
    if (typeof alpha2 === 'string' && alpha2) {
        setCurrentCountry(alpha2)
    }
})

function setCurrentCountry(alpha2?: string) {
    const foundCountryTotal = globalCases.value.find(country => country.countryCode === alpha2)
    if (!foundCountryTotal) {
        return
    }
    currentOverall.value = foundCountryTotal
    nextTick(async () => {
        const res = await useFetch("/api/country-overtime/" + foundCountryTotal.countryCode);
        if (res.data.value) {
            currentOvertime.value = res.data?.value as CountryOvertimeCase
        }
    })
}
</script>

<template>
    <NuxtLayout name="common-modal" @close="emits('close', true)">
        <template #header>
            <section class="py-3 px-4 border-b-2 flex justify-between">
                <h1 class="text-xl ">
                    Country Details
                </h1>
                <button class="rounded-full hover:bg-gray-100" @click="emits('close', true)">
                    <Icon color="black" name="mdi:close-circle-outline" size="28px" />
                </button>
            </section>
        </template>

        <!-- BODY STARTS -->
        <h1 class=" text-xl font-bold">{{ currentOverall?.name }}
            <small>
                ({{ currentOverall?.countryCode }})
            </small>
        </h1>

        <div class="grid grid-cols-1 lg:grid-cols-6 mt-12 items-center w-full" v-if="currentOverall">
            <div class="flex justify-center col-span-2 h-500px lg:h-fit pb-7 lg:pb-0">
                <chart-doughnut-summary-cases :country="currentOverall" />
            </div>
            <div class="lg:col-span-4 overflow-y-auto">
                <div class="h-full">
                    <section class="grid grid-cols-5 bg-red-900 text-white">
                        <div class="p-3">
                            Date
                        </div>
                        <div class="p-3">
                            New Cases
                        </div>
                        <div class="p-3">
                            Total Cases
                        </div>
                        <div class="p-3">
                            New Deaths
                        </div>
                        <div class="p-3">
                            Total Deaths
                        </div>
                    </section>

                    <section class="overflow-y-auto h-500px custom-scrollbar">
                        <div class="grid grid-cols-5" v-for="(country, i) of tableData" :key="i">
                            <div class="border p-3">
                                {{ country.date }}
                            </div>
                            <div class="border p-3">
                                {{ country.newCases }}
                            </div>
                            <div class="border p-3">
                                {{ country.cumulativeCases }}
                            </div>
                            <div class="border p-3">
                                {{ country.newDeaths }}
                            </div>
                            <div class="border p-3">
                                {{ country.cumulativeDeaths }}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>

        <div class="h-full w-full pt-6 pl-6">
            <chart-line-summary-cases class="mt-6" :country="currentOvertime"/>
        </div>

        <!-- BODY ENDS -->

        <template #footer>
            <section class="border-t-2 py-6"></section>
        </template>
    </NuxtLayout>
</template>

<style lang="scss" scoped>
.h-500px {
    height: 500px;
}
</style>