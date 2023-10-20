<script lang="ts" setup>
import { storeToRefs } from 'pinia';

const mediaStore = useMediaStore()
const { mediaCdcList } = storeToRefs(mediaStore)

if (!mediaCdcList.value.length) {
    const res = await useLazyFetch<{ results: CDCMedia[], meta: CDCMeta }>('https://tools.cdc.gov/api/v2/resources/media?languageisocode=eng')
    mediaStore.setMediaCdcList(res.data.value?.results || []);
}


</script>

<template>
    <nuxt-layout>
        <div class="first-letter:w-full lg:w-10/12 mx-auto pb-3 grid lg:grid-cols-12 gap-6">
            <article class="flex flex-col gap-4  pt-6 col-span-9">
                <media-card v-for="media, i of mediaCdcList" :key="i" :media="media" />
            </article>

            <aside class="col-span-3 h-full">
                Side Content
            </aside>
        </div>
    </nuxt-layout>
</template>
