<script lang="ts" setup>
import { storeToRefs } from 'pinia';

const covidCasesStore = useCovidCasesStore()
const { globalCases } = storeToRefs(covidCasesStore)
const route = useRoute()
const router = useRouter()
const showCountryDetails = ref(false)

onMounted(() => {
    const { alpha2 } = route.query;
    if (alpha2) {
        showCountryDetails.value = !!alpha2
    }
})

function closeCountryModal() {
    const query = Object.assign({}, route.query)
    delete query.alpha2;
    router.replace({ query })
    showCountryDetails.value = false
}

watch(()=> route.query, (newVal) => {
    const { alpha2 } = newVal
    if(alpha2) {
        showCountryDetails.value = !!alpha2
    }
})
</script>

<template>
    <NuxtLayout name="dashboard">
        <div class="flex-1 flex flex-col relative">
            <div class="max-height-custom flex-1 grid grid-cols-1 lg:grid-cols-4 grid-rows-2 lg:grid-rows-1">
                <section class="col-span-3 grid-cols-1">
                    <WorldMap class="h-full" v-if="globalCases.length" />
                </section>

                <section class="bg-gray-900 overflow-hidden">
                    <SidebarCaseSummaryList v-if="globalCases.length" />
                </section>
            </div>

            <ModalsCountryDetails footer-title="deahh" @close="closeCountryModal" v-if="showCountryDetails" />
        </div>
    </NuxtLayout>
</template>

<style lang="scss" scoped>
.max-height-custom {
    height: 100%;
    max-height: calc(100vh - 66px);
}
</style>