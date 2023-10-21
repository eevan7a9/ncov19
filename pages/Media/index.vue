<script lang="ts" setup>
import { storeToRefs } from 'pinia'

const mediaStore = useMediaStore()
const { mediaCdcList, articlesHealthList } = storeToRefs(mediaStore)

onMounted(() => {
    nextTick(async () => {
        const { data: dataCdc, refresh: refreshCdc } = await useLazyFetch<{ results: CDCMedia[], meta: CDCMeta }>('/api/v2/resources/media?languageisocode=eng', {
            baseURL: 'https://tools.cdc.gov',
            key: 'cdc-media',
            keepalive: true
        })
        if (dataCdc.value?.results) {
            mediaStore.setMediaCdcList(dataCdc.value?.results)
        }

        const { data: dataHealth, refresh: refreshHealth } = await useLazyFetch<{ Result: ArticlesRes }>('/myhealthfinder/api/v3/itemlist.json?Type=topic', {
            baseURL: 'https://health.gov',
            key: 'health-gov',
            keepalive: true
        })
        if (dataHealth.value?.Result) {
            mediaStore.setArticlesHealth(dataHealth.value?.Result?.Items.Item)
        }
    })
})
</script>

<template>
    <nuxt-layout>
        <div class="w-full lg:w-10/12 mx-auto pb-3 grid lg:grid-cols-12 gap-6">
            <article class="flex flex-col gap-4  pt-6 col-span-12 lg:col-span-9">
                <div class="bg-white py-8 flex flex-col items-center justify-center" v-if="!mediaCdcList.length">
                    <h1 class=" text-2xl font-bold py-6">Fetching Data...</h1>
                    <utils-spinner-circular />
                </div>
                <div class="bg-red-200 p-6 rounded-lg" v-else>
                    <div id="cdcAttribution" class="cdcAttribution">
                        Content provided and maintained by the
                        <a href="http://www.cdc.gov/" target="_blank">
                            US Centers for Disease Control and Prevention</a>
                        (CDC). Please see our system
                        <a href="https://tools.cdc.gov/medialibrary/index.aspx#/usageguidelines/info"
                            class="usageGuidelines" target="_blank">usage guidelines and disclaimer</a>.
                    </div>
                </div>

                <nuxt-link v-for="(media, i) of mediaCdcList" :key="i" :to="'/media/' + media.id">
                    <media-card :media="media" />
                </nuxt-link>
            </article>

            <aside class="col-span-12 lg:col-span-3 pt-6">
                <div class="bg-white rounded-lg">
                    <div class="bg-gray-200 p-6 rounded-t-lg">
                        <h4 class="text-2xl">Health and Wellness Topics</h4>
                        <div class="text-lg mb-2 mt-3 text-gray-700">
                            Additional info from
                            <a href="https://health.gov/">health.gov </a>
                        </div>
                    </div>

                    <div class="flex flex-col items-center justify-center py-3" v-if="!articlesHealthList.length">
                        <h1 class="text-xl py-3">Fetching Data...</h1>
                        <utils-spinner-circular />
                    </div>

                    <ul class="p-3">
                        <li class="p-3 underline rounded-lg hover:bg-gray-100" v-for="(article, i) of articlesHealthList"
                            :key="i">
                            {{ article.Title }}
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    </nuxt-layout>
</template>

<style lang="scss" scoped></style>