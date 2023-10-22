<script lang="ts" setup>
import { storeToRefs } from 'pinia'

const mediaStore = useMediaStore()
const { mediaCdcList } = storeToRefs(mediaStore)

onMounted(() => {
    nextTick(async () => {
        if (!mediaCdcList.value.length) {
            const { data: dataCdc } = await useLazyFetch<{ results: CDCMedia[], meta: CDCMeta }>('/api/v2/resources/media?languageisocode=eng', {
                baseURL: 'https://tools.cdc.gov',
                key: 'cdc-media',
                keepalive: true
            })
            if (dataCdc.value?.results) {
                mediaStore.setMediaCdcList(dataCdc.value?.results)
            }
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
                <health-articles-list />
            </aside>
        </div>
    </nuxt-layout>
</template>

<style lang="scss" scoped></style>