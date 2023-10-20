<script lang="ts" setup>
import { storeToRefs } from 'pinia';

const mediaStore = useMediaStore()
const { mediaCdcList, aticlesHealthList } = storeToRefs(mediaStore)

if (!mediaCdcList.value.length || !aticlesHealthList.value.length) {
    const [resCDC, resHealth] = await Promise.all([
        useLazyFetch<{ results: CDCMedia[], meta: CDCMeta }>('https://tools.cdc.gov/api/v2/resources/media?languageisocode=eng'),
        useLazyFetch<{ Result: ArticlesRes }>('https://health.gov/myhealthfinder/api/v3/itemlist.json?Type=topic')
    ])
    mediaStore.setMediaCdcList(resCDC.data.value?.results || []);
    mediaStore.setArticlesHealth(resHealth.data.value?.Result?.Items.Item || [])
}
</script>

<template>
    <nuxt-layout>
        <div class="first-letter:w-full lg:w-10/12 mx-auto pb-3 grid lg:grid-cols-12 gap-6">
            <article class="flex flex-col gap-4  pt-6 col-span-12 lg:col-span-9">
                <media-card v-for="media, i of mediaCdcList" :key="i" :media="media" />
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

                    <ul class="p-3">
                        <li class="p-3 underline rounded-lg hover:bg-gray-100" v-for="(article, i) of aticlesHealthList"
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