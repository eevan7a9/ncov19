<script setup lang="ts">
const covidCasesStore = useCovidCasesStore();
const router = useRouter();

const topCountries = computed(() =>
    covidCasesStore.globalCases.slice(0, 8).map((item) => ({
        ...item,
        emoji: covidCasesStore.countries.find(
            (country) => country.countryCode === item.countryCode
        )?.emoji,
    }))
);
</script>

<template>
    <section class="bg-slate-200 rounded-lg relative overflow-hidden">
        <h1 class="py-3 px-4 text-[16px] lg:text-[20px] border-b sticky top-0 bg-white">
            Top Countries
        </h1>

        <div
            class="w-full flex flex-row md:flex-col relative overflow-x-auto md:max-h-full md:overflow-y-auto custom-scrollbar pb-4 md:pb-[100px]">
            <template v-for="item of topCountries.slice(1, 12)" :key="item.name">
                <article @click="alpha2RouteQuery(item.countryCode, router)"
                    class="font-light flex-grow md:h-auto text-[14px] bg-white hover:bg-slate-50 mt-2 mx-3 min-w-[320px] md:min-w-0">
                    <div class="flex justify-between items-center text-[16px] lg:text-[18px] px-4 py-3">
                        <span class="">{{ item.name }}</span>
                        <span v-if="item.name.toLowerCase() === 'global'">🌏</span>
                        <span v-else>{{ item.emoji }}</span>
                    </div>

                    <div class="grid grid-cols-2 border-t py-2" v-if="item.name.toLowerCase() !== 'global'">
                        <span class="text-right border-r pr-3">Region</span>
                        <span class="pl-3 font-bold">{{ item.whoRegion }}</span>
                    </div>
                    <div class="grid grid-cols-2 border-t py-2">
                        <span class="text-right border-r pr-3">Total Cases</span>
                        <span class="pl-3 font-bold">
                            {{ formatNumberWithCommas(item.casesCumulativeTotal) }}
                        </span>
                    </div>
                    <div class="grid grid-cols-2 border-t py-2">
                        <span class="text-right border-r pr-3">Total Deaths</span>
                        <span class="pl-3 font-bold">
                            {{ formatNumberWithCommas(item.deathsCumulativeTotal) }}
                        </span>
                    </div>

                    <div class="bg-white h-[30px] border-t"></div>
                </article>
            </template>
        </div>

        <div class="bg-gradient-to-t from-slate-100 sticky bottom-0 h-[30px] w-full hidden md:block"></div>
    </section>
</template>
