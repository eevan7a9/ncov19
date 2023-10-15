<script lang="ts" setup>
import { storeToRefs } from 'pinia';

const covidCasesStore = useCovidCasesStore()
const { globalCases } = storeToRefs(covidCasesStore)
</script>

<template>
    <NuxtLayout name="dashboard">
        <div class="flex-1 flex flex-col">
            <div class="max-height-custom flex-1 grid grid-cols-1 lg:grid-cols-4 grid-rows-2 lg:grid-rows-1">
                <section class="col-span-3 grid-cols-1">
                    <WorldMap class="h-full" v-if="globalCases.length" />
                </section>

                <section class="bg-gray-900 ">
                    <SidebarCaseSummaryList v-if="globalCases.length" />
                </section>
            </div>
        </div>
    </NuxtLayout>
</template>

<style lang="scss" scoped>
.max-height-custom {
    height: 100%;
    max-height: calc(100vh - 52px);
}
</style>